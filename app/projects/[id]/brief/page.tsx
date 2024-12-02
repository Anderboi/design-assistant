import React from "react";
import { ChevronRight } from "lucide-react";
import { staticStagesTemplate } from "@/lib/templates";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResidentsBlock from "./(blocks)/ResidentsBlock";
import PremisesBlock from "./(blocks)/PremisesBlock";
import ConstructionBlock from "./(blocks)/ConstructionBlock";

async function BriefPage({
  searchParams,
}: {
  searchParams: {
    projectId: string;
  };
}) {
  const { projectId } = await searchParams;

  const technicalTaskStage = staticStagesTemplate.find(
    (stage) => stage.title === "Техническое задание",
  );

  if (!technicalTaskStage || !technicalTaskStage.stage_blocks) {
    return (
      <div>Стадия "Техническое задание" не найдена или не имеет блоков</div>
    );
  }

  // const stageBlocks = await fetchStageBlocks(stageId);

  return (
    <>
      {technicalTaskStage.stage_blocks.map((block, index) => (
        <React.Fragment key={index}>
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="flex w-full justify-between hover:underline">
                <h5>{block.name}</h5>
                <ChevronRight className="text-neutral-400 hover:text-neutral-900" />
              </div>
            </DialogTrigger>
            <DialogContent className="h-full max-h-[90vh] overflow-y-scroll rounded-xl no-scrollbar sm:max-w-[460px]">
              <DialogHeader className="h-fit">
                <DialogTitle>{block.name}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <section className="h-full">
                {block.name === "Информация о проживающих" && (
                  <ResidentsBlock />
                )}
                {block.name === "Перечень помещений" && (
                  <PremisesBlock projectId={projectId} />
                )}
                {block.name === "Информация по демонтажу" && <article />}
                {block.name === "Информация по монтажу" && (
                  <ConstructionBlock projectId={projectId} />
                )}
                {block.name === "Инженерные системы" && <article />}
                {block.name === "Отделка и оборудование" && <article />}
              </section>
            </DialogContent>
          </Dialog>

          {technicalTaskStage.stage_blocks &&
          technicalTaskStage.stage_blocks?.length - 1 > index ? (
            <Separator />
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default BriefPage;
