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
import { getCurrentProject } from "@/app/actions/actions";

const stages = [
  {
    title: "Техническое задание",
    icon: <ListChecks />,
    description: "Составление подробного описания требований и пожеланий",
  },
  {
    title: "Договор",
    icon: <FileText />,
    description: "Закрепление условий сотрудничества и объёма работ",
  },
  {
    title: "Авансовый платеж",
    icon: "",
    description: "Получение первой части оплаты для начала работы над проектом",
  },
  {
    title: "Обмер помещений",
    icon: <PencilRuler />,
    description: "Сбор информации о текущем состоянии помещений",
  },
  {
    title: "Планировочное решение",
    icon: <Proportions />,
    description: "Разработка вариантов планировки пространства",
  },
  {
    title: "Коллаж",
    icon: <SwatchBook />,
    description:
      "Создание визуальных концепций для согласования стилевых решений",
  },
  {
    title: "Визуализация",
    icon: <Box />,
    description: "Демонстрация будущего интерьера в фотореалистичном формате",
  },
  {
    title: "Чертежи и схемы",
    icon: <SquarePen />,
    description:
      "Создание схем по электрике, сантехнике и прочим коммуникациям",
  },
  {
    title: "Инженерные проекты",
    icon: <FileStack />,
    description:
      "Проекты систем: электрика, отопление, вентиляция, водоснабжение",
  },
  {
    title: "Комплектация",
    icon: <ShoppingCart />,
    description:
      "Подбор необходимых материалов, мебели и аксессуаров для реализации проекта",
  },
  {
    title: "Авторский контроль",
    icon: <View />,
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
  const project = await getCurrentProject({
    projectId: searchParams?.projectId,
  });
  console.log(searchParams);
  
  if (!project) {
    return <div>Проект не найден</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-2xl font-bold">Стадии</h1>

      {stages.map((stage, index) => (
        <div
          key={index}
          className="//shadow-md flex items-start space-x-4 rounded-xl border p-6"
        >
          <div>{stage.icon}</div>
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-medium leading-none">{stage.title}</h2>
            <p className="text-sm text-muted-foreground">{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectPage;
