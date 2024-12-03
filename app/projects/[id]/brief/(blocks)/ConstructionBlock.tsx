"use client";

import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CreatableSelect from "react-select/creatable";
import { Badge } from "@/components/ui/badge";
import FormBlock from "@/components/ui/FormBlock";
import { Button } from "@/components/ui/button";
import StyledSelect from "@/components/ui/creatable-select";
import {
  ceilingMaterials,
  floorMaterials,
  optionsMaker,
  wallMaterials,
} from "@/lib/templates";
import { getProjectRooms } from "@/app/actions/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2Icon } from "lucide-react";
import { SelectChip } from "@/components/ui/select-chip";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";

const ConstructionInfoSchema = z.object({
  floor: z.array(
    z
      .object({
        id: z.coerce.number(),
        material: z.string(),
        rooms: z.array(z.string()),
      })
      .optional(),
  ),
  ceiling: z.array(
    z
      .object({
        id: z.coerce.number(),
        material: z.string(),
        rooms: z.array(z.string()),
      })
      .optional(),
  ),
  walls: z.array(
    z.object({
      id: z.coerce.number(),
      material: z.string(),
      rooms: z.array(z.string()),
    }),
  ),
});

type ConstructionFormValues = z.infer<typeof ConstructionInfoSchema>;

function ConstructionBlock({ projectId }: { projectId: string }) {
  const [roomsList, setRoomsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadRooms() {
      const fetchedRooms = await getProjectRooms(projectId);
      setRoomsList(fetchedRooms);
      setLoading(false);
    }
    loadRooms();
  }, [projectId]);

  //TODO: fix useEffect on modal open
  //TODO: if 1 material - auto all rooms selected

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
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                            floorOptions.find(
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
                        {loading ? (
                          <Skeleton className="h-8 w-full" />
                        ) : (
                          roomsList.map((room, index) => (
                            <SelectChip
                              id={room.name}
                              key={index}
                              className="cursor-pointer"
                              variant={
                                field.value?.includes(room.name)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                field.onChange(
                                  field.value?.includes(room.name)
                                    ? field.value.filter(
                                        (v: string) => v !== room.name,
                                      )
                                    : [...(field.value || []), room.name],
                                );
                              }}
                            >
                              {room.name}
                            </SelectChip>
                          ))
                        )}
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
                          {roomsList.map((room, index) => (
                            <SelectChip
                              id={room.name}
                              key={index}
                              className="cursor-pointer"
                              variant={
                                field.value?.includes(room.name)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                field.onChange(
                                  field.value?.includes(room.name)
                                    ? field.value.filter(
                                        (v: string) => v !== room.name,
                                      )
                                    : [...(field.value || []), room.name],
                                );
                              }}
                            >
                              {room.name}
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
                          {roomsList.map((room, index) => (
                            <SelectChip
                              id={room.name}
                              key={index}
                              className="cursor-pointer"
                              variant={
                                field.value?.includes(room.name)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                field.onChange(
                                  field.value?.includes(room.name)
                                    ? field.value.filter(
                                        (v: string) => v !== room.name,
                                      )
                                    : [...(field.value || []), room.name],
                                );
                              }}
                            >
                              {room.name}
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
