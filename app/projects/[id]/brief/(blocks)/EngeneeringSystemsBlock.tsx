"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EngineeringSystemsSchema,
  EngineeringSystemsType,
} from "@/schemas/schemas";
import FormBlock from "@/components/ui/FormBlock";
import StyledSelect from "@/components/ui/styled-creatable-select";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  conditioningSystems,
  electricSystems,
  heatingSystems,
  optionsMaker,
  purificationSystems,
} from "@/lib/templates";
import { Premise } from "@/types/types";
import { SelectChip } from "@/components/ui/select-chip";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";

function EngeneeringSystemsBlock({ roomList }: { roomList: Premise[] }) {
  const form = useForm<EngineeringSystemsType>({
    resolver: zodResolver(EngineeringSystemsSchema),
    defaultValues: {
      heatingSystem: [{ id: 1, system: "", rooms: [] }],
      conditioningSystem: [{ id: 1, system: "", rooms: [] }],
      purificationSystem: [{ id: 1, system: "", rooms: [] }],
      electricSystem: [{ id: 1, system: "", rooms: [] }],
    },
  });

  const heatingOptions = optionsMaker(heatingSystems);
  const conditioningOptions = optionsMaker(conditioningSystems);
  const purificationOptions = optionsMaker(purificationSystems);
  const electricOptions = optionsMaker(electricSystems);

  const [heatingOptionsList, setHeatingOptionsList] = useState(heatingOptions);
  const [conditioningOptionsList, setConditioningOptionsList] =
    useState(conditioningOptions);
  const [purificationOptionsList, setPurificationOptionsList] =
    useState(purificationOptions);
  const [electricOptionsList, setElectricOptionsList] =
    useState(electricOptions);

  const {
    fields: heatingSystemFields,
    append: appendHeatingSystem,
    remove: removeHeatingSystem,
  } = useFieldArray({
    control: form.control,
    name: "heatingSystem",
  });
  const {
    fields: conditioningSystemFields,
    append: appendConditioningSystem,
    remove: removeConditioningSystem,
  } = useFieldArray({
    control: form.control,
    name: "conditioningSystem",
  });
  const {
    fields: purificationSystemFields,
    append: appendPurificationgSystem,
    remove: removePurificationSystem,
  } = useFieldArray({
    control: form.control,
    name: "purificationSystem",
  });
  const {
    fields: electricSystemFields,
    append: appendElectricSystem,
    remove: removeElectricSystem,
  } = useFieldArray({
    control: form.control,
    name: "electricSystem",
  });

  const handleCreateOption = (
    block:
      | "heatingSystem"
      | "conditioningSystem"
      | "purificationSystem"
      | "electricSystem",
    inputValue: string,
    index: number,
    name: any,
  ) => {
    const newOption = { label: inputValue, value: inputValue };
    block === "heatingSystem" &&
      setHeatingOptionsList((prev) => [...prev, newOption]);
    block === "conditioningSystem" &&
      setConditioningOptionsList((prev) => [...prev, newOption]);
    block === "purificationSystem" &&
      setPurificationOptionsList((prev) => [...prev, newOption]);
    block === "electricSystem" &&
      setElectricOptionsList((prev) => [...prev, newOption]);
    form.setValue(name, inputValue);
  };

  function onSubmit(values: EngineeringSystemsType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4 pb-8">
          {/* //? Система отопления */}
          <FormBlock title="Система отопления">
            {heatingSystemFields.map((_, index) => (
              <article key={index} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`heatingSystem.${index}.system`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full gap-2">
                          <StyledSelect
                            className="w-full flex-grow"
                            options={heatingOptionsList}
                            value={
                              heatingOptionsList.find(
                                (option) => option.value === field.value,
                              ) || null
                            }
                            onChange={(val) => field.onChange(val)}
                            onCreateOption={(inputValue) =>
                              handleCreateOption(
                                "heatingSystem",
                                inputValue,
                                index,
                                `heatingSystem.${index}.system`,
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => removeHeatingSystem(index)}
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
                  name={`heatingSystem.${index}.rooms`}
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
                appendHeatingSystem({
                  system: "",
                  id: heatingSystemFields.length + 1,
                  rooms: [],
                })
              }
            >
              Добавить систему
            </Button>
          </FormBlock>

          {/* //? Система кондиционирования */}
          <FormBlock title="Система кондиционирования">
            {conditioningSystemFields.map((_, index) => (
              <article key={index} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`conditioningSystem.${index}.system`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full gap-2">
                          <StyledSelect
                            className="w-full flex-grow"
                            options={conditioningOptionsList}
                            value={
                              conditioningOptionsList.find(
                                (option) => option.value === field.value,
                              ) || null
                            }
                            onChange={(val) => field.onChange(val)}
                            onCreateOption={(inputValue) =>
                              handleCreateOption(
                                "conditioningSystem",
                                inputValue,
                                index,
                                `conditioningSystem.${index}.system`,
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => removeConditioningSystem(index)}
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
                  name={`conditioningSystem.${index}.rooms`}
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
                appendConditioningSystem({
                  system: "",
                  id: conditioningSystemFields.length + 1,
                  rooms: [],
                })
              }
            >
              Добавить систему
            </Button>
          </FormBlock>

          {/* //? Система водоочистки */}
          <FormBlock title="Система водоочистки">
            {purificationSystemFields.map((_, index) => (
              <article key={index} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`purificationSystem.${index}.system`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full gap-2">
                          <StyledSelect
                            className="w-full flex-grow"
                            options={purificationOptionsList}
                            value={
                              purificationOptionsList.find(
                                (option) => option.value === field.value,
                              ) || null
                            }
                            onChange={(val) => field.onChange(val)}
                            onCreateOption={(inputValue) =>
                              handleCreateOption(
                                "purificationSystem",
                                inputValue,
                                index,
                                `purificationSystem.${index}.system`,
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => removePurificationSystem(index)}
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
                  name={`purificationSystem.${index}.rooms`}
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
                appendPurificationgSystem({
                  system: "",
                  id: purificationSystemFields.length + 1,
                  rooms: [],
                })
              }
            >
              Добавить систему
            </Button>
          </FormBlock>

          {/* //? Система управления и автоматизации */}
          <FormBlock title="Система управления и автоматизации">
            {electricSystemFields.map((_, index) => (
              <article key={index} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`electricSystem.${index}.system`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex w-full gap-2">
                          <StyledSelect
                            className="w-full flex-grow"
                            options={electricOptionsList}
                            value={
                              electricOptionsList.find(
                                (option) => option.value === field.value,
                              ) || null
                            }
                            onChange={(val) => field.onChange(val)}
                            onCreateOption={(inputValue) =>
                              handleCreateOption(
                                "electricSystem",
                                inputValue,
                                index,
                                `electricSystem.${index}.system`,
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant={"destructive"}
                            onClick={() => removeElectricSystem(index)}
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
                  name={`electricSystem.${index}.rooms`}
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
                appendElectricSystem({
                  system: "",
                  id: electricOptions.length + 1,
                  rooms: [],
                })
              }
            >
              Добавить систему
            </Button>
          </FormBlock>
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

export default EngeneeringSystemsBlock;
