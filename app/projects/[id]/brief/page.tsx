import React from "react";
import { ChevronRight } from "lucide-react";
import { fetchStageBlocks } from "@/app/actions/actions";
import { staticStagesTemplate } from "@/lib/templates";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
          // <StageBlock
          //   key={index}
          //   blockId={block.id}
          //   blockName={block.block_name}
          //   isFilled={block.is_approved}
          // />
          <>
            <Link
              href={"/"}
              key={index}
              className="flex w-full justify-between hover:underline"
            >
              <h5>{block.name}</h5>
              <ChevronRight className="text-neutral-400 hover:text-neutral-900" />
            </Link>
            {technicalTaskStage.stage_blocks &&
            technicalTaskStage.stage_blocks?.length > index + 1 ? (
              <Separator />
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default BriefPage;
