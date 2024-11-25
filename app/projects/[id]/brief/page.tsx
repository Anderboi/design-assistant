import React from "react";
import { ChevronRight } from "lucide-react";
import { fetchStageBlocks } from "@/app/actions/actions";
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
import { Input } from "@/components/ui/input";
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

  const stageBlocks = await fetchStageBlocks(stageId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Техническое задание</h1>
      <div className="//bg-primary-foreground space-y-2 rounded-xl p-4 shadow-card shadow-neutral-200">
        {technicalTaskStage.stage_blocks.map((block, index) => (
          <React.Fragment key={index}>
            <Dialog>
              <DialogTrigger>
                <div className="flex w-full justify-between hover:underline">
                  <h5>{block.name}</h5>
                  <ChevronRight className="text-neutral-400 hover:text-neutral-900" />
                </div>
              </DialogTrigger>
              <DialogContent className="rounded-xl sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{block.name}</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Input />
                <Input />
                <Input />
                <Button>Сохранить</Button>
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
      </div>
    </div>
  );
}

export default BriefPage;
