import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { ArrowDownToDot, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: projects } = await supabase
    .from("projects")
    .select();

  if (!projects) {
    return <p>No projects found</p>;
  } else {
    return (
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-3xl font-bold">Проекты</h1>
        <Link href={`projects/create`}>
          <Button>
            <Plus />
            Создать проект
          </Button>
        </Link>
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}?&projectId=${project.id}`}
          >
            <Card className="//shadow-lg hover:bg-popover hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-1 sm:line-clamp-2 sm:min-h-[2lh]">
                  {project.address}
                  {/* {`Проект №${index + 1}`} */}
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
      </div>
    );
  }
}
