"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DemolitionSchema, DemolitionType } from "@/schemas/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormBlock from "@/components/ui/FormBlock";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

function DemolitionBlock() {
  const form = useForm<DemolitionType>({
    resolver: zodResolver(DemolitionSchema),
    defaultValues: {
      planChange: false,
      entranceDoorChange: false,
      furnitureDemolition: false,
      windowsChange: false,
    },
  });

  function onSubmit(values: DemolitionType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between"
      >
        <div className="space-y-4 pb-8">
          <FormBlock title="">
            <FormField
              control={form.control}
              name="planChange"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>Демонтаж перегородок</FormLabel>
                  <FormControl>
                    <Switch
                      className="!m-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("planChange") && (
              <FormField
                control={form.control}
                // TODO Change pets
                name="planChangeInfo"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormControl>
                      <Textarea
                        placeholder="Подробная информация по необходимому демонтажу."
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    Подробная информация по необходимому демонтажу.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </FormBlock>
          <FormBlock title="">
            <FormField
              control={form.control}
              name="entranceDoorChange"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>Замена входной двери</FormLabel>
                  <FormControl>
                    <Switch
                      className="!m-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("entranceDoorChange") && (
              <FormField
                control={form.control}
                name="enteranceDoorType"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormControl>
                      <Textarea
                        placeholder="Предпочтительный тип входной двери. Более подробное
                    описание."
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    Предпочтительный тип входной двери. Более подробное
                    описание.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </FormBlock>
          <FormBlock title="">
            <FormField
              control={form.control}
              name="windowsChange"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>Замена окон</FormLabel>
                  <FormControl>
                    <Switch
                      className="!m-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("windowsChange") && (
              <FormField
                control={form.control}
                name="windowsType"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormControl>
                      <Textarea
                        placeholder=" Предпочтительный тип окон. Более подробное описание."
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    Предпочтительный тип окон. Более подробное описание.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </FormBlock>
          <FormBlock title="">
            <FormField
              control={form.control}
              name="furnitureDemolition"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>Демонтаж встроенной мебели</FormLabel>
                  <FormControl>
                    <Switch
                      className="!m-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("furnitureDemolition") && (
              <FormField
                control={form.control}
                // TODO Change pets
                name="furnitureToDemolish"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormControl>
                      <Textarea
                        placeholder="Описание демонтируемой мебели."
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    Описание демонтируемой мебели.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </FormBlock>
        </div>
        <StyledDialogFooter>
          <Button type="submit" className="w-full">
            Сохранить
          </Button>
        </StyledDialogFooter>
      </form>
    </Form>
  );
}

export default DemolitionBlock;
