import React from "react";
import { staticStagesTemplate } from "@/lib/templates";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingPage() {
  return (
    <>
      <section className="space-y-2 rounded-xl p-4">
        {staticStagesTemplate.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full">
              <Skeleton className="h-6 w-full" />
            </div>
            {index < 7 && <Separator />}
          </React.Fragment>
        ))}
      </section>
    </>
  );
}

export default LoadingPage;
