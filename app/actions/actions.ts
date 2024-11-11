"use server"

import { Project, ProjectSchema } from "@/schemas/CreateProject"
import { createClient } from "@/utils/supabase/server"


// type ReturnType = {
//     message: string,
//     errors?: Record<string, unknown>
// }



export async function createProject(project: Project) {
    const supabase = await createClient()

    const user = supabase.auth.getUser()
    const userId = (await user).data.user?.id

    const data = await supabase.from('projects').insert([{
        address: project.address, area: project.area, owner_id: userId
    }]).select()

    // const parsed = ProjectSchema.safeParse(project)

    // if(!data.error) {
    //     return {
    //         message: 'Создание не получилось',
    //         errors: parsed.error.flatten().fieldErrors
    //     }
    // } else {
    //     return  {
    //         message: 'Создание получилось'
    //     }
    }

