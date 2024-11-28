import React from "react";
import { ChevronRight } from "lucide-react";
import { staticStagesTemplate } from "@/lib/templates";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResidentsBlock from "./(blocks)/ResidentsBlock";
import PremisesBlock from "./(blocks)/PremisesBlock";
import { Button } from "@/components/ui/button";

async function BriefPage({
  searchParams,
}: {
  searchParams: {
    stageId: string;
  };
}) {
  const { stageId } = await searchParams;

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
            <DialogContent className="h-full max-h-[90vh] overflow-clip rounded-xl no-scrollbar sm:max-w-[460px]">
              <DialogHeader>
                <DialogTitle>{block.name}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <section className="h-full overflow-y-scroll no-scrollbar">
                {block.name === "Информация о проживающих" && (
                  <ResidentsBlock />
                )}
                {block.name === "Перечень помещений" && <PremisesBlock />}
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
