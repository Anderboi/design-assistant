"use server";

import { Project, ProjectSchema } from "@/schemas/CreateProject";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function createProject(project: Project) {
  const { address, area, first_name, last_name, middle_name, email, phone } =
    project;

  const supabase = await createClient();

  //? Получаем id текущего пользователя (создателя проекта)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (userError || !userId) {
    console.error("Error fetching user ID:", userError);
    return { message: "Ошибка аутентификации" };
  }

  const tempId = uuidv4();

  try {
    //? Шаг 1: Проверяем, существует ли клиент с указанным email
    const { data: existingClient } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .select()
      .single();

    let clientId = existingClient?.id;

    //? Шаг 1.1: Если клиент не существует, создаем временную запись
    if (!clientId) {
      const { error: clientError } = await supabase
        .from("temporary_profiles")
        .insert({
          temporary_id: tempId,
          first_name,
          last_name,
          middle_name,
          email,
          phone,
        });

      if (clientError) {
        console.error("Error creating temporary client profile:", clientError);
        return { message: "Создание временного пользователя не получилось" };
      }
    }

    //?Шаг2: Создаем проект
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          address,
          area,
          owner_id: userId,
        },
      ])
      .select("id")
      .single();

    if (projectError) {
      console.error("Error posting Project:", projectError.message);
      return { message: "Создание проекта не получилось" };
    }

    const projectId = project.id;
    
    console.log(projectId);

    //? Шаг 3: Добавить клиента в project_members как invited client
    const { error: memberError } = await supabase
      .from("project_members")
      .insert({
        project_id: projectId,
        user_id: clientId || null,
        temporary_user_id: clientId ? null : tempId,
        role: "client",
        status: clientId ? "active" : "invited",
      });

    if (memberError) {
      console.error("Error adding client to project_members:", memberError);
      return { message: "Создание участника проекта не получилось" };
    }

    //? Шаг 4: Если пользователя нет, добавляем его в таблицу приглашений и в project_members
    if (!existingClient) {
      const { error: inviteError } = await supabase
        .from("invites")
        .insert([{ email, project_id: projectId }]);

      if (inviteError) {
        console.error("Error creating invite:", inviteError);
        return { message: "Ошибка отправки приглашения" };
      }
    }

    //? Шаг 5: Отправляем приглашение на почту
    // const { error: inviteEmailError } =
    //   await supabase.auth.admin.inviteUserByEmail(email, {
    //     redirectTo: `/projects/${projectId}`,
    //   });

    // if (inviteEmailError) {
    //   console.error("Error sending invite email:", inviteEmailError);
    //   return { message: "Ошибка отправки email приглашения" };
    // }

    //? Создается Magic Link с приглашением
    // const { data: mLinkData, error: mLinkError } =
    //   await supabase.auth.admin.generateLink({
    //     type: "magiclink",
    //     email: "email@example.com",
    //   });

    // if (mLinkError) throw mLinkError;

    return projectId;
  } catch (error) {
    console.error("Не удалось создать проект:", error);
    return { message: "Ошибка создания проекта" };
  }
}
