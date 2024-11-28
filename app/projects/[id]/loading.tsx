import { staticStagesTemplate } from "@/lib/templates";
import React from "react";

function LoadingPage() {
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-3xl font-bold pb-4">Стадии</h1>
      {staticStagesTemplate.map((item, index) => (
        <div key={index} className="h-[94px] w-full rounded-lg border"></div>
      ))}
    </div>
  );
}

export default LoadingPage;
