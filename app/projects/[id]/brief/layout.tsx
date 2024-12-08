import React from "react";
import BlockHeaderWithNav from "./_components/BlockHeaderWithNav";

function BriefPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BlockHeaderWithNav title="Техническое задание" />
      <div className="space-y-2 rounded-xl border-border bg-background p-4 dark:border dark:shadow-none">
        {children}
      </div>
    </div>
  );
}

export default BriefPageLayout;
