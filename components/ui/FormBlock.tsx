import React from "react";

function FormBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-1 rounded-xl border-neutral-600 p-4 shadow-card shadow-neutral-200 dark:border dark:shadow-none">
      <h3 className="font-medium">{title}</h3>
      <article className="space-y-4">{children}</article>
    </section>
  );
}

export default FormBlock;
