"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBlock from "@/components/ui/FormBlock";
import { Button } from "@/components/ui/button";
import StyledSelect from "@/components/ui/creatable-select";
import {
  ceilingMaterials,
  floorMaterials,
  optionsMaker,
  wallMaterials,
} from "@/lib/templates";
import { Trash2Icon } from "lucide-react";
import { SelectChip } from "@/components/ui/select-chip";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";
import {
  ConstructionFormValues,
  ConstructionInfoSchema,
} from "@/schemas/schemas";
import { Premise } from "@/types/types";

function ConstructionBlock({ roomList }: { roomList: Premise[] }) {
  //TODO: if 1 material - auto all rooms selected
  //TODO: Badge - all rooms select

  const form = useForm<ConstructionFormValues>({
    resolver: zodResolver(ConstructionInfoSchema),
    defaultValues: {
      floor: [{ id: 1, material: "", rooms: [] }],
      walls: [{ id: 1, material: "", rooms: [] }],
      ceiling: [{ id: 1, material: "", rooms: [] }],
    },
  });

  const {
    fields: wallFields,
    append: appendWall,
    remove: removeWall,
  } = useFieldArray({
    control: form.control,
    name: "walls",
  });
  const {
    fields: floorFields,
    append: appendFloor,
    remove: removeFloor,
  } = useFieldArray({
    control: form.control,
    name: "floor",
  });
  const {
    fields: ceilingFields,
    append: appendCeiling,
    remove: removeCeiling,
  } = useFieldArray({
    control: form.control,
    name: "ceiling",
  });

  function onSubmit(values: ConstructionFormValues) {
    console.log(values);
  }

  const wallOptions = optionsMaker(wallMaterials);
  const floorOptions = optionsMaker(floorMaterials);
  const ceilingOptions = optionsMaker(ceilingMaterials);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Стены */}
        <FormBlock title="Стены">
          {wallFields.map((_, index) => (
            <article key={index} className="space-y-4">
              <FormField
                control={form.control}
                name={`walls.${index}.material`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex w-full gap-2">
                        <StyledSelect
                          className="w-full flex-grow"
                          options={wallOptions}
                          value={
                            wallOptions.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
                          onChange={(val) => field.onChange(val)}
                        />
                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={() => removeWall(index)}
                          size={"sm"}
                        >
                          <Trash2Icon size={20} />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`walls.${index}.rooms`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {roomList.map((room, index) => (
                          <SelectChip
                            id={room.id}
                            key={index}
                            className="cursor-pointer"
                            variant={
                              field.value?.includes(room.id)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              field.onChange(
                                field.value?.includes(room.id)
                                  ? field.value.filter(
                                      (v: string) => v !== room.id,
                                    )
                                  : [...(field.value || []), room.id],
                              );
                            }}
                          >
                            {`${room.order}. ${room.name}`}
                          </SelectChip>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </article>
          ))}
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              appendWall({
                material: "",
                id: wallFields.length + 1,
                rooms: [],
              })
            }
          >
            Добавить материал
          </Button>
        </FormBlock>

        {/* Напольные покрытия */}
        <FormBlock title="Напольные покрытия">
          {floorFields.map((_, index) => (
            <article key={index} className="space-y-4">
              <FormField
                control={form.control}
                name={`floor.${index}.material`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex w-full gap-2">
                        <StyledSelect
                          className="w-full flex-grow"
                          options={floorOptions}
                          value={
                            floorOptions.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
                          onChange={(val) => field.onChange(val)}
                        />
                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={() => removeFloor(index)}
                          size={"sm"}
                        >
                          <Trash2Icon size={20} />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-1">
                <FormField
                  control={form.control}
                  name={`floor.${index}.rooms`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-wrap gap-1">
                          {roomList.map((room, index) => (
                            <SelectChip
                              id={room.id}
                              key={index}
                              className="cursor-pointer"
                              variant={
                                field.value?.includes(room.id)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                field.onChange(
                                  field.value?.includes(room.id)
                                    ? field.value.filter(
                                        (v: string) => v !== room.id,
                                      )
                                    : [...(field.value || []), room.id],
                                );
                              }}
                            >
                              {`${room.order}. ${room.name}`}
                            </SelectChip>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </article>
          ))}
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              appendFloor({
                material: "",
                id: floorFields.length + 1,
                rooms: [],
              })
            }
          >
            Добавить материал
          </Button>
        </FormBlock>

        {/* Потолок */}
        <FormBlock title="Потолок">
          {ceilingFields.map((_, index) => (
            <article key={index} className="space-y-4">
              <FormField
                control={form.control}
                name={`ceiling.${index}.material`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex w-full gap-2">
                        <StyledSelect
                          className="w-full flex-grow"
                          options={ceilingOptions}
                          value={
                            ceilingOptions.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
                          onChange={(val) => field.onChange(val)}
                        />
                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={() => removeCeiling(index)}
                          size={"sm"}
                        >
                          <Trash2Icon size={20} />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap gap-1">
                <FormField
                  control={form.control}
                  name={`ceiling.${index}.rooms`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-wrap gap-1">
                          {roomList.map((room, index) => (
                            <SelectChip
                              id={room.id}
                              key={index}
                              className="cursor-pointer"
                              variant={
                                field.value?.includes(room.id)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                field.onChange(
                                  field.value?.includes(room.id)
                                    ? field.value.filter(
                                        (v: string) => v !== room.id,
                                      )
                                    : [...(field.value || []), room.id],
                                );
                              }}
                            >
                              {`${room.order}. ${room.name}`}
                            </SelectChip>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </article>
          ))}
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              appendCeiling({
                material: "",
                id: ceilingFields.length + 1,
                rooms: [],
              })
            }
          >
            Добавить материал
          </Button>
        </FormBlock>

        {/* Кнопка отправки */}
        <StyledDialogFooter>
          <Button type="submit" className="w-full">
            Сохранить
          </Button>
        </StyledDialogFooter>
      </form>
    </Form>
  );
}

export default ConstructionBlock;
