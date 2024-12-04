import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllProjects } from "../actions/actions";

export default async function Page() {
  const projects = await getAllProjects();

  if (!projects) {
    return <p>No projects found</p>;
  } else {
    return (
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-3xl font-bold">Проекты</h1>
        <section className="flex grid-cols-2 flex-col gap-2 sm:grid lg:grid-cols-3">
          <Link href={`projects/create`}>
            <Button className="h-full w-full sm:flex-col">
              <Plus size={32} absoluteStrokeWidth />
              Создать проект
            </Button>
          </Link>
          {projects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${index + 1}?&projectId=${project.id}`}
            >
              <Card className="hover:bg-popover hover:shadow-md">
                <CardHeader>
                  <CardTitle className="line-clamp-1 sm:line-clamp-2 sm:min-h-[2lh]">
                    {/* {project.address} */}
                    {`Проект №${index + 1}`}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-base sm:min-h-[2lh]">
                    {project.address}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="items-end justify-between">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(project.created_at)}
                  </span>
                  {/* <MenuProjectButton projectId={project.id} token={token} /> */}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    );
  }
}
