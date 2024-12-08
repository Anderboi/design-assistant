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

export const equipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url("Введите корректный URL").optional(),
  price: z
    .number()
    .nonnegative("Стоимость должна быть положительным числом")
    .optional(),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
  quantity: z
    .number()
    .positive("Количество должно быть больше нуля")
    .optional(),
  room_id: z.string().uuid(),
});
export type Equipment = z.infer<typeof equipmentSchema>;

export const PremiseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Необходимо укащать название"),
  order: z.coerce.number(),
  area: z.coerce.number().optional(),
  project_id: z.string(),
  equipment: z.array(equipmentSchema).optional(),
});
export type Premise = z.infer<typeof PremiseSchema>;

export const PremisesSchema = z.object({
  rooms: z.array(PremiseSchema).min(1, "Добавьте хотя бы одно помещение"),
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

export const EngineeringSystemsSchema = z.object({
  heatingSystem: z
    .array(
      z.object({
        id: z.coerce.number(),
        system: z.string(),
        rooms: z.array(z.string()),
      }),
    )
    .optional(),
  // warmFloor: z.boolean().optional(),
  warmFloorRooms: z
    .array(
      z.object({
        id: z.coerce.number(),
        system: z.string(),
        rooms: z.array(z.string()),
      }),
    )
    .optional(),

  conditioningSystem: z
    .array(
      z.object({
        id: z.coerce.number(),
        system: z.string(),
        rooms: z.array(z.string()),
      }),
    )
    .optional(),

  purificationSystem: z
    .array(
      z.object({
        id: z.coerce.number(),
        system: z.string(),
        rooms: z.array(z.string()),
      }),
    )
    .optional(),

  electricSystem: z
    .array(
      z.object({
        id: z.coerce.number(),
        system: z.string(),
        rooms: z.array(z.string()),
      }),
    )
    .optional(),
});
export type EngineeringSystemsType = z.infer<typeof EngineeringSystemsSchema>;
