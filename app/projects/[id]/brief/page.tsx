import React from "react";
import { ChevronRight } from "lucide-react";
import { staticStagesTemplate } from "@/lib/templates";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ResidentsBlock from "./(blocks)/ResidentsBlock";
import PremisesBlock from "./(blocks)/PremisesBlock";
import ConstructionBlock from "./(blocks)/ConstructionBlock";
import DemolitionBlock from "./(blocks)/DemolitionBlock";
import { StyledDialog } from "@/components/ui/styled-dialog";
import EngeneeringSystemsBlock from "./(blocks)/EngeneeringSystemsBlock";
import { getProjectRooms } from "@/app/actions/actions";
import EquipmentBlock from "./(blocks)/EquipmentBlock";

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

  const roomList = await getProjectRooms(projectId);

  // const stageBlocks = await fetchStageBlocks(stageId);

  return (
    <>
      {technicalTaskStage.stage_blocks.map((block, index) => (
        <React.Fragment key={index}>
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="flex w-full justify-between hover:underline">
                <h5>{block.name}</h5>
                <div>
                  <ChevronRight className="text-neutral-400 hover:text-neutral-900" />
                </div>
              </div>
            </DialogTrigger>
            <StyledDialog title={block.name}>
              {block.name === "Информация о проживающих" && <ResidentsBlock />}
              {block.name === "Перечень помещений" && (
                <PremisesBlock projectId={projectId} roomsList={roomList} />
              )}
              {block.name === "Информация по демонтажу" && <DemolitionBlock />}
              {block.name === "Информация по монтажу" && (
                <ConstructionBlock roomList={roomList} />
              )}
              {block.name === "Инженерные системы" && (
                <EngeneeringSystemsBlock roomList={roomList} />
              )}
              {block.name === "Отделка и оборудование" && (
                <EquipmentBlock roomList={roomList} />
              )}
            </StyledDialog>
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
