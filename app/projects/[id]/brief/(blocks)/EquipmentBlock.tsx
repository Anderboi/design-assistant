"use client";

import React from "react";
import { Equipment, Premise } from "@/schemas/schemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FormBlock from "@/components/ui/FormBlock";
import StyledSelect from "@/components/ui/creatable-select";
import { equipmentOptions } from "@/lib/templates";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function EquipmentBlock({ roomList }: { roomList: Premise[] }) {
  type FormValues = {
    rooms: {
      room_id: string;
      equipment: Equipment[];
      furniture: Equipment[];
    }[];
  };

  const form = useForm<FormValues>({
    defaultValues: {
      rooms: roomList.map((room) => ({
        room_id: room.id,
        equipment: [],
        furniture: [],
      })),
    },
  });

  const onInvalid = (errors: any) => console.error(errors);

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="h-[calc(100%-68px)]"
      >
        <Carousel
          orientation="horizontal"
          opts={{ align: "start" }}
          className="flex h-full flex-col gap-4"
        >
          <CarouselContent className="h-full min-h-[600px] w-[90%]">
            {roomList.map((room, roomIndex) => {
              const {
                fields: furnitureFields,
                append: appendFurniture,
                remove: removeFurniture,
              } = useFieldArray({
                control: form.control,
                name: `rooms.${roomIndex}.furniture`, // Управление мебелью
              });

              const {
                fields: equipmentFields,
                append: appendEquipment,
                remove: removeEquipment,
              } = useFieldArray({
                control: form.control,
                name: `rooms.${roomIndex}.equipment`, // Управление оборудованием
              });

              return (
                <CarouselItem key={roomIndex}>
                  <FormBlock title={`${room.order}. ${room.name}`}>
                    <Tabs defaultValue={"furniture"}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="furniture">Мебель</TabsTrigger>
                        <TabsTrigger value="equipment">
                          Оборудование
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="furniture" className="space-y-4 pt-4">
                        {furnitureFields.map((furnfield, furnfieldIndex) => (
                          <div
                            key={furnfield.id}
                            className="flex w-full items-center gap-4"
                          >
                            <FormField
                              control={form.control}
                              name={`rooms.${roomIndex}.furniture.${furnfieldIndex}.name`}
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <StyledSelect
                                      // formatGroupLabel={(option) => option.group}
                                      options={equipmentOptions}
                                      value={
                                        equipmentOptions.find(
                                          (option) =>
                                            option.value === field.value,
                                        ) || null
                                      }
                                      onChange={(val) => field.onChange(val)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            ></FormField>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeFurniture(furnfieldIndex)}
                              size={"sm"}
                            >
                              <Trash2Icon size={20} />
                            </Button>
                          </div>
                        ))}
                        <Button
                          className="w-full"
                          type="button"
                          variant="secondary"
                          onClick={() =>
                            appendFurniture({
                              name: "",
                              room_id: room.id,
                              id: uuidv4(),
                            })
                          }
                        >
                          Добавить предмет
                        </Button>
                      </TabsContent>
                      <TabsContent value="equipment" className="space-y-4 pt-4">
                        {equipmentFields.map((equipfield, equipfieldIndex) => (
                          <div
                            key={equipfield.id}
                            className="flex w-full items-center gap-4"
                          >
                            <FormField
                              key={equipfieldIndex}
                              control={form.control}
                              name={`rooms.${roomIndex}.equipment.${equipfieldIndex}.name`}
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <StyledSelect
                                      options={equipmentOptions}
                                      formatGroupLabel={(option) =>
                                        option.group
                                      }
                                      value={
                                        equipmentOptions.find(
                                          (option) =>
                                            option.value === field.value,
                                        ) || null
                                      }
                                      onChange={(val) => field.onChange(val)}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            ></FormField>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeEquipment(equipfieldIndex)}
                              size={"sm"}
                            >
                              <Trash2Icon size={20} />
                            </Button>
                          </div>
                        ))}
                        <Button
                          className="w-full"
                          type="button"
                          variant="secondary"
                          onClick={() =>
                            appendEquipment({
                              name: "",
                              room_id: room.id,
                              id: uuidv4(),
                            })
                          }
                        >
                          Добавить предмет
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </FormBlock>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
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

export default EquipmentBlock;
