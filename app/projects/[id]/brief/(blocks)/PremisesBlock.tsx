"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import FormLayout from "../_components/FormLayout";
import CreatableSelect from "react-select/creatable";
import { roomList } from "@/lib/templates";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PremisesSchema = z.object({
  rooms: z
    .array(
      z.object({
        name: z.string().min(1, "Необходимо укащать название"),
      }),
    )
    .min(1, "Добавьте хотя бы одно помещение"),
});

type PremisesFormValues = z.infer<typeof PremisesSchema>;

function PremisesBlock() {
  const form = useForm<PremisesFormValues>({
    resolver: zodResolver(PremisesSchema),
    defaultValues: {
      rooms: [],
    },
  });

  const { control } = form;

  const {
    fields: roomFields,
    append,
    move,
    remove,
    update,
  } = useFieldArray({
    control: control,
    name: "rooms",
  });

  //? 3. Сохранение данных формы
  const onSubmit = (data: PremisesFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <section>
        {roomFields.map((room, index) => (
          <article key={index}>
            <FormField
              control={control}
              name={`rooms.${index}.name`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    {/* <Input /> */}
                    <CreatableSelect
                      formatCreateLabel={(value) => `Создать '${value}'`}
                      onChange={(val) => field.onChange(val?.value)}
                      isClearable
                      options={roomList}
                      value={
                        roomList.find(
                          (option) => option.value === field.value,
                        ) || null
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => remove(index)}
            >
              <Trash2Icon />
            </Button>
          </article>
        ))}
      </section>
      {/* Кнопка добавления помещения */}
      <Button type="button" onClick={() => append({ name: "rooms" })}>
        Добавить помещение
      </Button>
      <Button type="submit">Сохранить</Button>
    </Form>
  );
}

export default PremisesBlock;
