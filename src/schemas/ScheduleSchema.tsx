import { VehicleSchema } from "./CarsSchema";
import { MemberSchema } from "./MemberSchema";
import { z } from "zod";

export const ScheduleSchema = z.object({
  id: z.string().min(1, {
    message: "id inválido deve conter no mínimo 1 caracteres",
  }),
  id_period: z.string().nullable().optional(),
  id_company: z.string().min(1, {
    message: "id_company inválido deve conter no mínimo 1 caracteres",
  }),
  id_member_creator: z.number().min(1, {
    message: "id_member_creator inválido deve conter no mínimo 1 caracteres",
  }),
  date: z.date().optional(),
  hour_start: z.string().min(6, {
    message: "horário inválido deve conter no mínimo 1 caracteres",
  }),
  hour_finish: z.string().optional(),
  team: z.number().min(1, {
    message: "equipe inválido deve conter no mínimo 1 caracteres",
  }),
  situation: z.number().min(1, {
    message: "situação inválido deve conter no mínimo 1 caracteres",
  }),
  type: z.number().min(1, {
    message: "type inválido deve conter no mínimo 1 caracteres",
  }),
  status: z.number().min(1, {
    message: "status inválido deve conter no mínimo 1 caracteres",
  }),
  date_creation: z.string().optional(),
  obs: z
    .string()
    .min(1, {
      message: "obs inválido deve conter no mínimo 1 caracteres",
    })
    .max(400, {
      message: "obs inválido deve conter no máximo 400 caracteres",
    }),
  short_name_corp: z.string().optional(),
  short_name_comp: z.string().optional(),
  members: z.array(MemberSchema).optional(),
  day: z.number().optional().nullable(),
  month: z.number().optional().nullable(),
  year: z.number().optional().nullable(),
  isMuted: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  cars: z
    .array(
      z.object({
        car: VehicleSchema,
        members: z.array(MemberSchema).optional(),
      }),
    )
    .optional(),
  excluded: z.number().optional(),
});

export type IScheduleSchema = z.infer<typeof ScheduleSchema>;
