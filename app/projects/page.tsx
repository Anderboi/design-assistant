import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select();

  console.log(projects);

  if (!projects) {
    return <p>No projects found</p>;
  } else {
    return (
      <div className="w-full">
        <h2>Projects:</h2>
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}?&projectId=${project.id}`}
          >
            <Card className="shadow-lg hover:shadow-xl hover:bg-popover">
              <CardHeader>
                <CardTitle className="line-clamp-1 sm:line-clamp-2 sm:min-h-[2lh]">
                  {`Проект №${project.id}`}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm sm:min-h-[2lh]">
                  {project.address}
                </CardDescription>
              </CardHeader>
              <CardFooter className="items-end justify-between">
                <span className="text-sm text-secondary">
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
