"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roomList } from "@/lib/templates";
import CreatableSelect from "react-select/creatable";
import { Premises, PremisesSchema } from "@/schemas/schemas";
import { createRooms } from "@/app/actions/actions";

function PremisesBlock({ projectId }: { projectId: string }) {
  const [options, setOptions] = useState(roomList);

  const form = useForm<Premises>({
    resolver: zodResolver(PremisesSchema),
    defaultValues: {
      rooms: [{ name: "Гостиная", order: 1, project_id: projectId }],
    },
  });

  const {
    fields: roomFields,
    append,
    move,
    remove,
    update,
  } = useFieldArray({
    control: form.control,
    name: "rooms",
  });

  //? 3. Сохранение данных формы
  const onSubmit = (data: Premises) => {
    createRooms(data);
  };

  const handleCreateOption = (inputValue: string, index: number) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions((prev) => [...prev, newOption]);
    form.setValue(`rooms.${index}.name`, inputValue);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex h-full flex-col justify-between"
      >
        <section className="flex h-full flex-col justify-start gap-4 pb-4">
          {roomFields.map((room, index) => (
            <article key={index} className="flex w-full gap-2">
              <FormField
                control={form.control}
                name={`rooms.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CreatableSelect
                        blurInputOnSelect
                        captureMenuScroll
                        //closeMenuOnSelect
                        isClearable
                        minMenuHeight={800}
                        menuPlacement={"auto"}
                        formatCreateLabel={(value) => `Создать '${value}'`}
                        value={
                          options.find(
                            (option) => option.value === field.value,
                          ) || null
                        }
                        placeholder="Помещение..."
                        options={options}
                        onChange={(val) => field.onChange(val?.value)}
                        classNames={{
                          control: (
                            state,
                          ) => `h-8 !rounded-md border-red-300 !border-neutral-200 !focused:border-teal-500
                                                  !focused:ring-teal-500 
                                                  dark:bg-neutral-900 
                                                  dark:!text-neutral-50 dark:!border-neutral-600`,

                          input: (state) =>
                            "text-base sm:text-sm dark:text-neutral-200",
                          valueContainer: (state) => "",
                          singleValue: (state) =>
                            "text-sm dark:text-neutral-50",
                          placeholder: (state) =>
                            "text-sm dark:text-neutral-500",
                          menu: (state) =>
                            "text-sm dark:text-neutral-50 dark:!bg-neutral-800",
                          option: (state) =>
                            state.isFocused
                              ? "text-sm dark:text-neutral-50 !bg-teal-200 dark:!bg-neutral-600 !text-black"
                              : state.isSelected
                                ? "!bg-teal-500 hover:!bg-teal-600"
                                : "dark:!bg-neutral-800",

                          menuPortal: (state) =>
                            "text-sm dark:text-neutral-50 dark:!bg-neutral-800",
                        }}
                        createOptionPosition="last"
                        onCreateOption={(inputValue) =>
                          handleCreateOption(inputValue, index)
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
                size={"sm"}
              >
                <Trash2Icon size={20} />
              </Button>
            </article>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                name: "rooms",
                order: roomFields.length + 1,
                project_id: projectId,
              })
            }
          >
            Добавить помещение
          </Button>
        </section>
        {/* Кнопка добавления помещения */}
        <Button
          className="sticky bottom-2 w-full shadow-2xl shadow-white"
          type="submit"
        >
          Сохранить
        </Button>
      </form>
    </Form>
  );
}

export default PremisesBlock;
