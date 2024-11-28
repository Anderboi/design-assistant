import React from "react";

function BriefPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-2">
      <h1 className="pb-4 text-3xl font-bold">Техническое задание</h1>
      <div className="space-y-2 rounded-xl border-border p-4 shadow-card shadow-neutral-200 dark:border dark:shadow-none">
        {children}
      </div>
    </div>
  );
}

export default BriefPageLayout;
