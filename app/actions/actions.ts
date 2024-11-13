"use server";

import { Project, ProjectSchema } from "@/schemas/CreateProject";
import { createClient } from "@/utils/supabase/server";

export async function createProject(project: Project) {
  const { address, area, first_name, last_name, middle_name, email, phone } =
    project;

  const supabase = await createClient();

  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  const userInfo = (await user).data.user;

  try {
    //? Проверяем, существует ли клиент с указанным email
    const { data: existingClient } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    let clientId;

    if (existingClient) {
      //? Если клиент уже существует, сохраняем его id
      clientId = existingClient.id;
    } else {
      //? Если клиента нет, создаем нового
      const { data: newClient, error: clientError } = await supabase
        .from("profiles")
        .insert([
          {
            first_name,
            last_name,
            middle_name,
            email,
            phone,
          },
        ])
        .select('*').single()

        console.log(project);
        console.log(clientError);

      if (clientError) throw clientError;

      clientId = newClient.id;
    }

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          address,
          area,
          owner_id: userId,
          client_id: clientId,
        },
      ])
      .select();

    if (projectError) {
      console.error("Error posting Project:", projectError.message);
      return { message: "Создание не получилось" };
    } else {
      return projectData;
    }
  } catch (error) {
    console.error("Не удалось создать проект");
  }

  //   const parsed = ProjectSchema.safeParse(project);

  //   if (!projectError) {
  //     return {
  //       message: "Создание не получилось",
  //       errors: parsed.error.flatten().fieldErrors,
  //     };
  //   } else {
  //     return {
  //       message: "Создание получилось",
  //     };
  //   }
}
