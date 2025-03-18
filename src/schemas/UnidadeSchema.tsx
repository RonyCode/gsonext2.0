import { AddressSchema } from "./AddressSchema";
import { VehicleSchema } from "./CarsSchema";
import { MemberSchema } from "./MemberSchema";
import { ScheduleSchema } from "./ScheduleSchema";
import { z } from "zod";

export const UnidadeSchema = z.object({
  id: z.string().min(1, { message: "id inválido" }).optional().nullable(),
  _id: z
    .object({ $oid: z.string().optional().nullable() })
    .optional()
    .nullable(),
  id_corporation: z.string().optional().nullable(),
  short_name_corp: z.string().optional(),
  short_name_comp: z.string().optional(),
  name: z.string().optional(),
  cnpj: z.string().min(14, { message: "CNPJ inválido" }).optional(),
  phone: z.string().min(3, { message: "Telefone inválido" }).optional(),
  image: z.string().optional().nullable(),
  date_creation: z.string().min(10, { message: "Data inválida" }).optional(),
  type: z.number().optional().nullable(),
  schedules: z.array(ScheduleSchema).nullable().optional(),
  companyAddress: AddressSchema.optional().nullable(),
  members: z.array(MemberSchema).optional(),
  vehicles: z.array(VehicleSchema).optional(),
  manager: z.string().optional().nullable(),
  director: z.string().optional().nullable(),
  director_company: z.string().optional().nullable(),
  excluded: z.number().optional().nullable(),
});

export type IUnidadeSchema = z.infer<typeof UnidadeSchema>;
