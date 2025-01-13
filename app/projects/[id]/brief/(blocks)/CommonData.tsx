"use client";

import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import FormBlock from "@/components/ui/FormBlock";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonDataSchema, CommonDataType } from "@/schemas/schemas";
import { getCurrentProject } from "@/app/actions/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { StyledDialogFooter } from "@/components/ui/styled-dialog";

function CommonData({ projectId }: { projectId: string }) {
  useEffect(() => {
    async function fetchData() {
      const projectData = await getCurrentProject({ projectId });

      if (projectData) {
        form.setValue("address", projectData.address);
        form.setValue("area", projectData.area);
        form.setValue("contractNumber", projectData.contract_number || "");
        form.setValue("startDate", projectData.created_at);
        form.setValue("finalDate", projectData.finalDate);
      }
    }
    fetchData();
  }, [projectId]);

  const form = useForm<CommonDataType>({
    resolver: zodResolver(CommonDataSchema),
    defaultValues: {
      address: "",
      area: 0,
      contractNumber: "",
      startDate: new Date(),
      finalDate: new Date(),
    },
  });

  const dateRange = (firstDate: any, secondDate: any) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return "date";
  };

  function onSubmit(values: CommonDataType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormBlock title="">
          <div className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      onFocus={(e) => e.target.select()}
                      type="address"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size="icon" variant="ghost">
              <Edit />
            </Button>
          </div>
          <div className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Площадь</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      onFocus={(e) => e.target.select()}
                      type="address"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size="icon" variant="ghost">
              <Edit />
            </Button>
          </div>
          <div className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name="contractNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Номер договора</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      onFocus={(e) => e.target.select()}
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size="icon" variant="ghost">
              <Edit />
            </Button>
          </div>
          <div className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Дата начала проекта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={
                        field.value &&
                        new Date(field.value).toISOString().split("T")[0]
                      }
                      type="date"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finalDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Дата начала проекта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : new Date().toISOString().split("T")[0]
                      }
                      type="date"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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

export default CommonData;
