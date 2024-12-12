"use client";

import React, { useState } from "react";
import { Equipment, Premise } from "@/schemas/schemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FormBlock from "@/components/ui/FormBlock";
import StyledSelect from "@/components/ui/styled-creatable-select";
import { equipmentOptions, furnitureOptions, Option } from "@/lib/templates";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function EquipmentBlock({ roomList }: { roomList: Premise[] }) {
  const [furnitureOptionsNew, setFurnitureOptions] =
    useState<Option[]>(furnitureOptions);
  const [equipmentOptionsNew, setEquipmentOptions] =
    useState<Option[]>(equipmentOptions);

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
        equipment: [{ name: "", id: uuidv4(), room_id: room.id }],
        furniture: [{ name: "", id: uuidv4(), room_id: room.id }],
      })),
    },
  });

  const handleCreateOption = (
    block: "furniture" | "equipment",
    inputValue: string,
    index: number,
    name: any,
  ) => {
    const newOption = { label: inputValue, value: inputValue };
    block === "furniture"
      ? setFurnitureOptions((prev) => [...prev, newOption])
      : setEquipmentOptions((prev) => [...prev, newOption]);
    form.setValue(name, inputValue);
  };

  const onInvalid = (errors: any) => console.error(errors);

  function onSubmit(values: FormValues) {
    const trimmedRooms = values.rooms.map((room) => ({
      room_id: room.room_id,
      equipment: room.equipment.filter((item) => item.name !== ""),
      furniture: room.furniture.filter((item) => item.name !== ""),
    }));
    console.log(trimmedRooms);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="flex h-full flex-col justify-between"
      >
        <div className="space-y-4 pb-8">
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
                        <TabsContent
                          value="furniture"
                          className="space-y-4 pt-4"
                        >
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
                                        // autoFocus
                                        options={furnitureOptionsNew}
                                        value={
                                          furnitureOptionsNew.find(
                                            (option) =>
                                              option.value === field.value,
                                          ) || null
                                        }
                                        onChange={(val) => {
                                          field.onChange(val);
                                          appendFurniture({
                                            name: "",
                                            room_id: room.id,
                                            id: uuidv4(),
                                          });
                                        }}
                                        onCreateOption={(inputValue) => {
                                          handleCreateOption(
                                            "furniture",
                                            inputValue,
                                            furnfieldIndex,
                                            `rooms.${roomIndex}.furniture.${furnfieldIndex}.name`,
                                          );
                                          appendFurniture({
                                            name: "",
                                            room_id: room.id,
                                            id: uuidv4(),
                                          });
                                        }}
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
                        <TabsContent
                          value="equipment"
                          className="space-y-4 pt-4"
                        >
                          {equipmentFields.map(
                            (equipfield, equipfieldIndex) => (
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
                                          // autoFocus
                                          // openMenuOnFocus
                                          options={equipmentOptionsNew}
                                          formatGroupLabel={(option) =>
                                            option.group
                                          }
                                          value={
                                            equipmentOptionsNew.find(
                                              (option) =>
                                                option.value === field.value,
                                            ) || null
                                          }
                                          onChange={(val) => {
                                            field.onChange(val);
                                            appendEquipment({
                                              name: "",
                                              room_id: room.id,
                                              id: uuidv4(),
                                            });
                                          }}
                                          onCreateOption={(inputValue) => {
                                            handleCreateOption(
                                              "equipment",
                                              inputValue,
                                              equipfieldIndex,
                                              `rooms.${roomIndex}.equipment.${equipfieldIndex}.name`,
                                            );
                                            appendFurniture({
                                              name: "",
                                              room_id: room.id,
                                              id: uuidv4(),
                                            });
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                ></FormField>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() =>
                                    removeEquipment(equipfieldIndex)
                                  }
                                  size={"sm"}
                                >
                                  <Trash2Icon size={20} />
                                </Button>
                              </div>
                            ),
                          )}
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
        </div>
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
