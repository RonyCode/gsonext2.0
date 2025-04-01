import { VehicleSchema } from "./CarsSchema";
import { z } from "zod";

export const ScheduleFormSave = z.object({
  id: z.string().nullable().optional(),
  _id: z
    .object({ $oid: z.string().nullable().optional() })
    .nullable()
    .optional(),
  id_period: z.number().nullable().optional(),
  id_corporation: z.string().nullable().optional(),
  id_company: z.string().nullable().optional(),
  id_cmt_sos: z.string().optional(),
  id_member_comunication: z.string().optional(),
  id_member_creator: z.string().nullable().optional(),
  hour_start: z.string().min(1, {
    message: "horário inválido deve conter no mínimo 1 caracteres",
  }),
  hour_finish: z.string().optional(),
  team: z.number().min(1, {
    message: "equipe inválido deve conter no mínimo 1 caracteres",
  }),
  type: z.number().min(1, {
    message: "type inválido deve conter no mínimo 1 caracteres",
  }),
  date_creation: z.string(),
  day: z.number().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  date_start: z.string().optional(),
  date_finish: z.string().optional(),
  obs: z
    .string()
    .min(1, {
      message: "obs inválido deve conter no mínimo 1 caracteres",
    })
    .max(400, {
      message: "obs inválido deve conter no máximo 400 caracteres",
    }),
  vehicle: VehicleSchema.optional(),
  vehicles: z.array(VehicleSchema).optional(),
  excluded: z.number().optional(),
  subscription: z.string().optional(),
});

export type IScheduleFormSave = z.infer<typeof ScheduleFormSave>;
