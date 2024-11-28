import React from "react";
import { ChevronRight } from "lucide-react";
import { staticStagesTemplate } from "@/lib/templates";
import { Separator } from "@/components/ui/separator";

function LoadingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Техническое задание</h1>
      <section className="space-y-2 rounded-xl p-4 shadow-card shadow-neutral-200">
        {staticStagesTemplate.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full justify-between">
              <h5>{item.title}</h5>
              <ChevronRight className="text-neutral-400" />
            </div>
            {index < 7 && <Separator />}
          </React.Fragment>
        ))}
      </section>
    </>
  );
}

export default LoadingPage;
