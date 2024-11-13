"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Project, ProjectSchema } from "@/schemas/CreateProject";
import { Button } from "@/components/ui/button";
import { createProject } from "@/app/actions/actions";
import AddressSuggest from "@/components/AddressSuggest";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { createClient } from "@/utils/supabase/client";

export default function CreateProjectForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const form = useForm<Project>({
    mode: "onBlur",
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      address: "",
      area: 0,
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      phone: "",
    },
  });

  //? Получение информации об авторизованном пользователе
  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // Если `isClient` установлен в true, подтягиваем данные из профиля
        if (isClient && profile) {
          form.reset({
            address: "",
            area: 0,
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            middle_name: profile.middle_name || "",
            email: user.email || profile.email || "",
            phone: profile.phone || "",
          });
        }
      }
    };

    if (isClient) {
      fetchUserData();
    } else {
      // Очищаем поля, если `isClient` не выбран
      form.reset({
        address: "",
        area: 0,
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        phone: "",
      });
    }
  }, [isClient, form]);

  //? bool value to indicate form has not been saved
  useEffect(() => {
    localStorage.setItem(
      "projectFormModified",
      form.formState.isDirty.toString(),
    );
  }, [form.formState.isDirty]);

  async function onSubmit(values: Project) {
    setMessage("");
    setErrors({});

    const createdProject = await createProject(values);
    if (createdProject) {
      form.reset();
      router.push("/projects");
      toast.success("Вы создали проект", {
        description: new Date().toLocaleString(),
        action: {
          label: "Перейти к проекту",
          onClick: () => {
            router.push(
              `/projects`,
              //   /${createProject.id}?&projectId=${createProject.id}
            );
          },
        },
      });
    }
  }

  return (
    <div>
      {message ? <h2 className="text-2xl">{message}</h2> : null}

      {errors ? (
        <div className="mb-10 text-red-500">
          {Object.keys(errors).map((key) => (
            <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
          ))}
        </div>
      ) : null}

      <FormProvider {...form}>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Адрес</FormLabel>
                <FormControl>
                  <AddressSuggest {...field} />
                </FormControl>
                <FormDescription>
                  Укажите адрес объекта проектирования.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Площадь</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={1000000}
                    onFocus={(e) => e.target.select()}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Площадь подлежащая проектированию.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <h2 className="text-xl font-semibold">Информация о клиенте</h2>
            <div className="flex items-center justify-start space-x-4 py-2">
              <Switch
                checked={isClient}
                onCheckedChange={() => setIsClient(!isClient)}
              />
              <Label>Являюсь клиентом</Label>
            </div>
          </div>

          <>
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input onFocus={(e) => e.target.select()} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input onFocus={(e) => e.target.select()} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Отчество *</FormLabel>
                  <FormControl>
                    <Input onFocus={(e) => e.target.select()} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Эл. почта</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      onFocus={(e) => e.target.select()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="RU" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>

          <div className="flex gap-4">
            <Button type="submit">Создать</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => form.reset()}
            >
              Сбросить
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
