import { ChevronRight } from "lucide-react";
import React from "react";

function LoadingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Техническое задание</h1>
      <div className="//bg-primary-foreground space-y-2 rounded-xl p-4 shadow-card shadow-neutral-200">
        <div className="flex w-full justify-between">
          <h5>Общие данные</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
        <div className="border-b" />
        <div className="flex w-full justify-between">
          <h5>Информация о проживающих</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
        <div className="border-b" />
        <div className="flex w-full justify-between">
          <h5>Перечень помещений</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
        <div className="border-b" />
        <div className="flex w-full justify-between">
          <h5>Информация по демонтажу</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
        <div className="border-b" />
        <div className="flex w-full justify-between">
          <h5>Информация по монтажу</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
        <div className="border-b" />
        <div className="flex w-full justify-between">
          <h5>Инженерные системы</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
        <div className="border-b" />
        <div className="flex w-full justify-between">
          <h5>Отделка и оборудование</h5>
          <ChevronRight className="text-neutral-400" />
        </div>
      </div>
    </>
  );
}

export default LoadingPage;
