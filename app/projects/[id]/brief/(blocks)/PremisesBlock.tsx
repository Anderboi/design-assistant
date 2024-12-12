"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roomList, Option } from "@/lib/templates";
import CreatableSelect from "react-select/creatable";
import { Premise, Premises, PremisesSchema } from "@/schemas/schemas";
import { createRooms, updateRooms } from "@/app/actions/actions";
import { v4 as uuidv4 } from "uuid";
import { ClassNamesConfig } from "react-select";
import StyledSelect from "@/components/ui/styled-creatable-select";
import FormBlock from "@/components/ui/FormBlock";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";

function PremisesBlock({
  projectId,
  roomsList,
}: {
  projectId: string;
  roomsList: Premise[];
}) {
  const [options, setOptions] = useState(roomList);

  const form = useForm<Premises>({
    resolver: zodResolver(PremisesSchema),
    defaultValues: {
      rooms:
        roomsList.length !== 0
          ? roomsList
          : [{ id: uuidv4(), name: "", order: 1, project_id: projectId }],
    },
  });
  // TODO: roomList - при открытии окна выводить уже имеющиеся помещения и при корректировке обновлять Supabase
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
    roomsList.length !== 0 ? updateRooms(data) : createRooms(data);
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
        className="flex h-full flex-col justify-between"
      >
        <div className="space-y-4 pb-8">
          <FormBlock title="">
            {roomFields.map((room, index) => (
              <article key={index} className="flex w-full items-center gap-2">
                <span className="px-4">{room.order}</span>
                <FormField
                  control={form.control}
                  name={`rooms.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <StyledSelect
                          placeholder="Помещение..."
                          options={options}
                          onChange={(val) => field.onChange(val)}
                          value={
                            options.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
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
              className="w-full"
              onClick={() =>
                append({
                  id: uuidv4(),
                  name: "rooms",
                  order: roomFields.length + 1,
                  project_id: projectId,
                })
              }
            >
              Добавить помещение
            </Button>
          </FormBlock>
        </div>
        {/* Кнопка добавления помещения */}
        <StyledDialogFooter>
          <Button type="submit" className="w-full">
            Сохранить
          </Button>
        </StyledDialogFooter>
      </form>
    </Form>
  );
}

export default PremisesBlock;
