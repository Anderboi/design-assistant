import React from "react";
import { ChevronRight, X } from "lucide-react";
import { staticStagesTemplate } from "@/lib/templates";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResidentsBlock from "./(blocks)/ResidentsBlock";
import PremisesBlock from "./(blocks)/PremisesBlock";
import ConstructionBlock from "./(blocks)/ConstructionBlock";
import DemolitionBlock from "./(blocks)/DemolitionBlock";

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
            <DialogContent className="h-[calc(100%-280px)] max-h-[90vh] overflow-y-scroll rounded-xl no-scrollbar sm:max-w-[520px]">
              <DialogHeader className="sticky top-2 z-50 flex h-fit flex-row items-center justify-between rounded-lg bg-secondary p-4">
                <DialogTitle>{block.name}</DialogTitle>
                <DialogClose className="h-fit">
                  <X className="h-6 w-6" />
                </DialogClose>
              </DialogHeader>
              <section className="h-full pt-6">
                {block.name === "Информация о проживающих" && (
                  <ResidentsBlock />
                )}
                {block.name === "Перечень помещений" && (
                  <PremisesBlock projectId={projectId} />
                )}
                {block.name === "Информация по демонтажу" && (
                  <DemolitionBlock />
                )}
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
