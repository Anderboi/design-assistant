"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const ResidentsSchema = z.object({
  adults: z
    .array(
      z.object({
        height: z
          .number({ invalid_type_error: "Введите рост числом" })
          .positive("Рост должен быть положительным")
          .lte(250, "Рост не может быть больше 250 см"),
        gender: z.string(),
      }),
    )
    .min(1, "Должен быть хотя бы один взрослый"),
  children: z.array(
    z.object({
      age: z
        .number({ invalid_type_error: "Введите возраст числом" })
        .positive("Возраст должен быть положительным")
        .lte(18, "Возраст должен быть меньше 18 лет"),
    }),
  ),
  hobbies: z.string().optional(),
  healthIssues: z.string().optional(),
  hasPets: z.boolean(),
  petDetails: z.string().optional(),
});

type ResidentsFormValues = z.infer<typeof ResidentsSchema>;

function ResidentsBlock() {
  const form = useForm<ResidentsFormValues>({
    resolver: zodResolver(ResidentsSchema),
    defaultValues: {
      adults: [{ height: 0, gender: "" }],
      children: [],
      hasPets: false,
      petDetails: "",
    },
  });
  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const {
    fields: adultFields,
    append: addAdult,
    remove: removeAdult,
  } = useFieldArray({
    control,
    name: "adults",
  });

  const {
    fields: childFields,
    append: addChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: "children",
  });

  const watchHasPets = watch("hasPets");

  function onSubmit(values: ResidentsFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* <h2 className="text-xl font-bold">Информация о проживающих</h2> */}
        {/* Взрослые */}
        <section className="space-y-2">
          <h3 className="font-medium">Взрослые</h3>
          <article className="space-y-4 rounded-xl border p-4">
            {adultFields.map((block, index) => (
              <div key={block.id} className="flex items-end space-x-2">
                <FormField
                  control={control}
                  name={`adults.${index}.height`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Рост</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          min={80}
                          max={280}
                          placeholder="Рост (см)"
                          type="number"
                          className="w-full"
                          onFocus={(e) => e.target.select()}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`adults.${index}.gender`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      {/* <FormLabel>Пол</FormLabel> */}
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Пол" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="man">Мужской</SelectItem>
                            <SelectItem value="woman">Женский</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  className="w-fit"
                  type="button"
                  onClick={() => removeAdult(index)}
                  variant="destructive"
                >
                  <Trash2Icon size={20} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => addAdult({ height: 0, gender: "" })}
            >
              Добавить взрослого
            </Button>
          </article>
          {errors.adults && (
            <p className="text-red-600">{errors.adults.message}</p>
          )}
        </section>

        {/* Дети */}
        <section className="space-y-2">
          <h3 className="font-medium">Дети</h3>
          <article className="space-y-4 rounded-xl border p-4">
            {childFields.map((field, index) => (
              <div key={field.id} className="flex w-full items-end space-x-2">
                <FormField
                  control={control}
                  name={`children.${index}.age`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Возраст</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          min={0}
                          max={18}
                          placeholder="Возраст"
                          type="number"
                          className="w-full"
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                          onFocus={(e) => e.target.select()}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={() => removeChild(index)}
                  variant="destructive"
                >
                  <Trash2Icon size={20} />
                </Button>
              </div>
            ))}
            <Button
              className="w-full"
              type="button"
              variant="secondary"
              onClick={() => addChild({ age: 0 })}
            >
              Добавить ребенка
            </Button>
          </article>
        </section>

        {/* Увлечения */}
        <section className="space-y-2">
          <h3 className="font-medium">Увлечения</h3>
          <FormField
            control={control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Увлечения</FormLabel> */}
                <FormControl>
                  <Input {...field} placeholder="Увлечения членов семьи" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        {/* Ограничения по здоровью */}
        <section className="space-y-2">
          <h3 className="font-medium">Ограничения по здоровью</h3>
          <FormField
            control={control}
            name="healthIssues"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Ограничения по здоровью</FormLabel> */}
                <FormControl>
                  <Input {...field} placeholder="Укажите ограничения" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>

        {/* Домашние животные */}
        <section className="space-y-4 pb-2">
          <FormField
            control={control}
            name="hasPets"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Есть домашние животные?</FormLabel> */}
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-sm">Есть домашние животные?</span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {watchHasPets && (
            <div>
              <FormField
                control={control}
                name="petDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Что предусмотреть для домашних животных?
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Опишите животных и их потребности"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </section>
        {/* Кнопка отправки */}
        <Button type="submit" className="w-full">
          Сохранить
        </Button>
      </form>
    </Form>
  );
}

export default ResidentsBlock;
