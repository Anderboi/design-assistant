import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select();

    console.log(projects);


  if (!projects) {
    return <p>No projects found</p>;
  } else {
    return (
      <div>
        <h2>Projects:</h2>
        {projects.map((project) => (
          <div key={project.id}>{project.name}</div>
        ))}
      </div>
    );
  }
}
