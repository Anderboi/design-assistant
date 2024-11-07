import React from "react";

const stages = [
  {
    title: "Техническое задание",
    icon: "",
    description: "",
  },
  {
    title: "Договор",
    icon: "",
    description: "",
  },
  {
    title: "Авансовый платеж",
    icon: "",
    description: "",
  },
  {
    title: "Планировочное решение",
    icon: "",
    description: "",
  },
  {
    title: "Эскиз",
    icon: "",
    description: "",
  },
];

async function ProjectPage({
  searchParams,
}: {
  searchParams: {
    projectId: string;
  };
}) {
  return (
    <div>
      {stages.map((stage) => (
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          {stage.icon}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{stage.title}</p>
            <p className="text-sm text-muted-foreground">{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectPage;
