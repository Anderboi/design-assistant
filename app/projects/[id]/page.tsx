import React from "react";
import { Check, ChevronRight, Lock } from "lucide-react";
import { getProjectStages } from "@/app/actions/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { staticStagesTemplate } from "@/lib/templates";
import Icon from "@/components/Icon";

async function ProjectPage({
  searchParams,
}: {
  searchParams: {
    projectId: string;
  };
}) {
  const { projectId } = await searchParams;

  const dynamicStages = await getProjectStages({
    projectId,
  });

  console.log(dynamicStages);
  

  if (!dynamicStages) {
    return <div>Проект не найден</div>;
  }

  const stagesWithCompletion = staticStagesTemplate.map(
    (staticStage, index) => {
      const dynamicStage = dynamicStages.find(
        (stage) => stage.order === index + 1,
      );

      return {
        ...staticStage,
        stage_status: dynamicStage?.stage_status || "blocked",
        is_completed: dynamicStage?.is_completed || false,
        updated_at: dynamicStage?.updated_at || null,
        id: dynamicStage?.id,
      };
    },
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-3xl font-bold">Стадии</h1>

      {stagesWithCompletion.map((stage, index) =>
        stage.type === "action" ? (
          <Button key={index} disabled={stage.stage_status === "blocked"}>
            {stage.title}
          </Button>
        ) : (
          <Link
            key={index}
            href={`${projectId}/${stage.href}?stageId=${stage.id}` || ""}
            replace={false}
            className={`${stage.stage_status === "blocked" ? "cursor-not-allowed bg-secondary" : "border hover:shadow-lg"} rounded-xl p-6`}
          >
            <div className="//shadow-md flex items-start space-x-4">
              <Icon
                name={stage.icon}
                className={` ${stage.stage_status === "blocked" && "text-neutral-400"}`}
              />
              <div className="flex-1 space-y-1">
                <h2
                  className={`text-xl font-medium leading-none ${stage.stage_status === "blocked" && "text-neutral-600"}`}
                >
                  {stage.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
              {stage.stage_status === "active" ? (
                <ChevronRight />
              ) : stage.stage_status === "blocked" ? (
                <Lock className="text-neutral-400" />
              ) : (
                <Check />
              )}
            </div>
          </Link>
        ),
      )}
    </div>
  );
}

export default ProjectPage;
