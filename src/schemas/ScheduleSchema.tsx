import { VehicleSchema } from "./CarsSchema";
import { z } from "zod";

export const ScheduleSchema = z.object({
  id: z.string().nullable().optional(),
  id_period: z.number().nullable().optional(),
  id_company: z.string().nullable().optional(),
  id_corporation: z.string().nullable().optional(),
  id_cmt_sos: z.string().nullable().optional(),
  id_member_comunication: z.string().nullable().optional(),
  id_member_creator: z.string().nullable().optional(),
  hour_start: z.string().nullable().optional(),
  hour_finish: z.string().nullable().optional(),
  date_finish: z.string().nullable().optional(),
  team: z.number().nullable().optional(),
  situation: z.number().nullable().optional(),
  type: z.number().nullable().optional(),
  status: z.number().nullable().optional(),
  date_creation: z.string().optional(),
  date_start: z.string().optional(),
  obs: z
    .string()
    .min(1, {
      message: "obs inválido deve conter no mínimo 1 caracteres",
    })
    .max(400, {
      message: "obs inválido deve conter no máximo 400 caracteres",
    })
    .nullable()
    .optional(),
  day: z.number().optional().nullable(),
  month: z.number().optional().nullable(),
  year: z.number().optional().nullable(),
  isMuted: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  vehicle: VehicleSchema.optional(),
  vehicles: z.array(VehicleSchema.optional()).nullable().optional(),
  excluded: z.number().optional(),
});

export type IScheduleSchema = z.infer<typeof ScheduleSchema>;
