import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

function ProjectsLoadingPage() {
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-3xl font-bold">Проекты</h1>
      <Link href={`projects/create`}>
        <Button>
          <Plus />
          Создать проект
        </Button>
      </Link>
    </div>
  );
}

export default ProjectsLoadingPage;
