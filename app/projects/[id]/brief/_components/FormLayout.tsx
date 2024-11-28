import React from "react";
import { Form } from "react-hook-form";

function FormLayout({
  children,
  form,
  // title,
}: {
  children: React.ReactNode;
  form: any;
  // title: string;
}) {
  return (
    <Form {...form} className="space-y-4">
      {/* <h2 className="text-xl font-bold">{title}</h2> */}
      {children}
    </Form>
  );
}

export default FormLayout;
