import React from "react";
import {
  Box,
  FileStack,
  FileText,
  ListChecks,
  PencilRuler,
  Proportions,
  ShoppingCart,
  SquarePen,
  SwatchBook,
  View,
} from "lucide-react";
import { getCurrentProject, getProjectStages } from "@/app/actions/actions";
import Link from "next/link";
import { Stage } from "@/types/types";

const staticStages: Stage[] = [
  {
    id: 1,
    title: "Техническое задание",
    icon: <ListChecks />,
    href: "brief",
    description: "Составление подробного описания требований и пожеланий",
  },
  {
    id: 2,
    title: "Договор",
    icon: <FileText />,
    href: "contract",
    description: "Закрепление условий сотрудничества и объёма работ",
  },
  {
    id: 3,
    title: "Авансовый платеж",
    icon: null,
    href: "brief",
    description: "Получение первой части оплаты для начала работы над проектом",
  },
  {
    id: 4,
    title: "Обмер помещений",
    icon: <PencilRuler />,
    href: "measurement",
    description: "Сбор информации о текущем состоянии помещений",
  },
  {
    id: 5,
    title: "Планировочное решение",
    icon: <Proportions />,
    href: "plans",
    description: "Разработка вариантов планировки пространства",
  },
  {
    id: 6,
    title: "Коллаж",
    icon: <SwatchBook />,
    href: "collage",
    description:
      "Создание визуальных концепций для согласования стилевых решений",
  },
  {
    id: 7,
    title: "Визуализация",
    icon: <Box />,
    href: "visualisation",
    description: "Демонстрация будущего интерьера в фотореалистичном формате",
  },
  {
    id: 8,
    title: "Чертежи и схемы",
    icon: <SquarePen />,
    href: "layouts",
    description:
      "Создание схем по электрике, сантехнике и прочим коммуникациям",
  },
  {
    id: 9,
    title: "Инженерные проекты",
    icon: <FileStack />,
    href: "engeneering",
    description:
      "Проекты систем: электрика, отопление, вентиляция, водоснабжение",
  },
  {
    id: 10,
    title: "Комплектация",
    icon: <ShoppingCart />,
    href: "equipment",
    description:
      "Подбор необходимых материалов, мебели и аксессуаров для реализации проекта",
  },
  {
    id: 11,
    title: "Авторский контроль",
    icon: <View />,
    href: "authcontrol",
    description: "Проверка соответствия принимаемых решений проектным",
  },
];

async function ProjectPage({
  searchParams,
}: {
  searchParams: {
    projectId: string;
  };
}) {
  const projectId = searchParams.projectId;

  const dynamicStages = await getProjectStages({
    projectId,
  });

  if (!dynamicStages) {
    return <div>Проект не найден</div>;
  }

  const stagesWithCompletion = staticStages.map((staticStage) => {
    const dynamicStage = dynamicStages.find(
      (stage) => stage.order === staticStage.id,
    );

    return {
      ...staticStage,
      stage_status: dynamicStage?.stage_status || "blocked",
      is_completed: dynamicStage?.is_completed || false,
      updated_at: dynamicStage?.updated_at || null,
    };
  });

  console.log(stagesWithCompletion);

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-2xl font-bold">Стадии</h1>

      {stagesWithCompletion.map((stage, index) => (
        <Link
          key={index}
          href={`${projectId}/${stage.href}` || ""}
          replace={false}
          className={`${stage.stage_status === "blocked" ? "cursor-not-allowed bg-secondary" : "border hover:shadow-lg"} rounded-xl p-6`}
        >
          <div className="//shadow-md flex items-start space-x-4">
            <div>{stage.icon}</div>
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-medium leading-none">
                {stage.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {stage.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProjectPage;
