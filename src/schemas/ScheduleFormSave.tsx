import { VehicleSchema } from "./CarsSchema";
import { z } from "zod";

export const ScheduleFormSave = z.object({
  id: z.string().nullable().optional(),
  _id: z
    .object({ $oid: z.string().nullable().optional() })
    .nullable()
    .optional(),
  id_period: z.number().nullable().optional(),
  id_corporation: z.string().min(1, {
    message: "id_corporation inválido deve conter no mínimo 1 caracteres",
  }),
  id_company: z.string().min(1, {
    message: "id_company inválido deve conter no mínimo 1 caracteres",
  }),
  id_cmt_sos: z.string().min(1, {
    message: "id_cmt_sos inválido deve conter no mínimo 1 caracteres",
  }),
  id_member_comunication: z.string().min(1, {
    message:
      "id_member_comunication inválido deve conter no mínimo 1 caracteres",
  }),
  id_member_creator: z.string().min(1, {
    message: "id_member_creator inválido deve conter no mínimo 1 caracteres",
  }),
  hour_start: z.string().min(1, {
    message: "horário inválido deve conter no mínimo 1 caracteres",
  }),
  hour_finish: z.string().optional().nullable(),
  team: z.number().min(1, {
    message: "equipe inválido deve conter no mínimo 1 caracteres",
  }),
  type: z.number().min(1, {
    message: "type inválido deve conter no mínimo 1 caracteres",
  }),
  date_creation: z.string(),
  day: z.number().min(1, {
    message: "O campo Dia é obrigatório.",
  }),
  month: z.number().min(1, {
    message: "O campo Mês é obrigatório.",
  }),
  year: z.number().min(1, {
    message: "O campo Ano é obrigatório.",
  }),
  date_start: z.string().min(1, {
    message: "A Data de início é obrigatória.",
  }),
  date_finish: z.string().optional().nullable(),
  obs: z
    .string()
    .min(1, {
      message: "obs inválido deve conter no mínimo 1 caracteres",
    })
    .max(400, {
      message: "obs inválido deve conter no máximo 400 caracteres",
    }),
  vehicle: VehicleSchema.optional().nullable(),
  vehicles: z.array(VehicleSchema.optional().nullable()).optional().nullable(),
  excluded: z.number().optional(),
  subscription: z.string().optional().nullable(),
});

export type IScheduleFormSave = z.infer<typeof ScheduleFormSave>;
