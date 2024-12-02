import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().optional(),
  address: z.string().min(2, { message: "Должно быть минимум 2 знака" }),
  area: z.coerce.number().gt(0),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  middle_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const PremisesSchema = z.object({
  rooms: z
    .array(
      z.object({
        name: z.string().min(1, "Необходимо укащать название"),
        order: z.coerce.number(),
        area: z.coerce.number().optional(),
        project_id: z.string(),
      }),
    )
    .min(1, "Добавьте хотя бы одно помещение"),
});

export type Premises = z.infer<typeof PremisesSchema>;
