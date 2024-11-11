import {z} from 'zod'

export const ProjectSchema = z.object({
    address: z.string().min(2, {message: 'Должно быть минимум 2 знака'}),
    area: z.number(),
})

export type Project = z.infer<typeof ProjectSchema>