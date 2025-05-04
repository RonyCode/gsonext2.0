import { z } from "zod";
import { AddressSchema } from "./AddressSchema";

export const MemberSchema = z
  .object({
    id: z
      .string()
      .min(1, {
        message: "id inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    id_company: z
      .string()
      .min(1, {
        message: "id inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    id_car: z.string().optional().nullable(),
    id_user: z.string().optional().nullable(),
    id_schedule: z.string().optional().nullable(),
    id_function: z.string().optional().nullable(),
    id_corporation: z.string().optional().nullable(),
    short_name_function: z.string().optional().nullable(),
    competence: z
      .string()
      .min(1, {
        message: "competence inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    status: z.number().optional().nullable(),
    entry_date: z
      .string()
      .min(1, {
        message: "entry_date inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    excluded: z.number().optional().nullable(),

    name: z
      .string()
      .min(1, {
        message: "name inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    cpf: z
      .string()
      .min(11, {
        message: "cpf inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    email: z.string().email().optional().nullable(),
    birthday: z
      .string()
      .min(10, {
        message:
          "Data aniversário inválida deve conter no mínimo 10 caracteres",
      })
      .optional()
      .nullable(),
    date_creation: z
      .string()
      .min(10, {
        message:
          "Data registro usuário inválido deve conter no mínimo 10 caracteres",
      })
      .optional()
      .nullable(),
    phone: z
      .string()
      .min(10, {
        message: "Telefone inválido deve conter no mínimo 13 caracteres",
      })
      .optional()
      .nullable(),
    image: z
      .string()
      .min(1, {
        message: "image inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    address: AddressSchema.optional(),
    street: z.string().optional().nullable(),
    number: z.string().optional().nullable(),
    zipcode: z.string().optional().nullable(),
    complement: z.string().optional(),
    district: z.string().optional().nullable(),
    city: z.string().optional().nullable(),

    state: z.string().optional().nullable(),
    short_name: z
      .string()
      .min(2, {
        message: "Sigla Estado inválido deve conter no mínimo 1 caracteres",
      })
      .optional()
      .nullable(),
    role: z.string().optional().nullable(),
    date_granted: z.string().optional().nullable(),
    date_expires: z
      .string()
      .min(11, {
        message:
          "Data privilegio expirado inválido deve conter no mínimo 10 caracteres",
      })
      .optional()
      .nullable(),
    granted_by_iduser: z.string().optional().nullable(),
  })
  .optional();

export type IMemberSchema = z.infer<typeof MemberSchema>;
