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
      rooms: [{ name: "", order: 1, project_id: projectId }],
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
            <article key={index} className="flex w-full items-center gap-2">
              <span className="px-4">{room.order}</span>
              <FormField
                control={form.control}
                name={`rooms.${index}.name`}
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormControl>
                      <CreatableSelect
                        blurInputOnSelect
                        // captureMenuScroll
                        closeMenuOnSelect
                        // menuPortalTarget={document.body}
                        // menuPosition="fixed"
                        // menuShouldScrollIntoView={false}
                        isClearable
                        // styles={{
                        //   control: (base) => ({ ...base, zIndex: 90 }),
                        //   menuPortal: (base) => ({ ...base, zIndex: 100 }),

                        //   menu: (base) => ({ ...base, zIndex: 9999 }),
                        // }}
                        minMenuHeight={800}
                        menuPlacement="auto"
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
                          ) => `h-8 !rounded-md border-neutral-300 !border-neutral-200 !focused:border-neutral-500
                                !focused:ring-neutral-500 
                                dark:bg-neutral-900 
                                dark:!text-neutral-50 dark:!border-neutral-600`,

                          input: (state) =>
                            "text-base sm:text-base dark:text-neutral-200",
                          valueContainer: (state) => "",
                          singleValue: (state) =>
                            "text-base dark:text-neutral-50",
                          placeholder: (state) =>
                            "text-base dark:text-neutral-500",
                          menu: (state) =>
                            "text-base !rounded-lg overflow-clip dark:text-neutral-50 dark:!bg-neutral-800",
                          option: (state) =>
                            state.isFocused
                              ? "text-base z-50 dark:text-neutral-50 !bg-neutral-200 dark:!bg-neutral-600 !text-black"
                              : state.isSelected
                                ? "!bg-neutral-500 hover:!bg-neutral-600"
                                : "dark:!bg-neutral-800",

                          menuPortal: (state) =>
                            "text-base dark:text-neutral-50 dark:!bg-neutral-800",
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
        <div className="sticky bottom-0 w-full rounded-lg bg-white p-4 shadow-card shadow-neutral-300">
          <Button type="submit" className="//shadow-white w-full">
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PremisesBlock;
