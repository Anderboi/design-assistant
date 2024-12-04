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

export const ConstructionInfoSchema = z.object({
  floor: z.array(
    z
      .object({
        id: z.coerce.number(),
        material: z.string(),
        rooms: z.array(z.string()),
      })
      .optional(),
  ),
  ceiling: z.array(
    z
      .object({
        id: z.coerce.number(),
        material: z.string(),
        rooms: z.array(z.string()),
      })
      .optional(),
  ),
  walls: z.array(
    z.object({
      id: z.coerce.number(),
      material: z.string(),
      rooms: z.array(z.string()),
    }),
  ),
});
export type ConstructionFormValues = z.infer<typeof ConstructionInfoSchema>;

export const DemolitionSchema = z.object({
  planChange: z.boolean().optional(),
  planChangeInfo: z.string().optional(),
  entranceDoorChange: z.boolean().optional(),
  enteranceDoorType: z.string().optional(),
  windowsChange: z.boolean().optional(),
  windowsType: z.string().optional(),
  furnitureDemolition: z.boolean().optional(),
  furnitureToDemolish: z.string().optional(),
});
export type DemolitionType = z.infer<typeof DemolitionSchema>;
