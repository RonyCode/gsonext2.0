import { z } from "zod";
export const AuthUserSchema = z.object({
  id: z.string().optional().nullable(),
  email: z.string().min(1, {
    message: "email inválido deve conter no mínimo 1 caracteres",
  }),

  is_user_external: z.number().optional().nullable(),

  date_creation: z.string().min(1, {
    message: "granted_by_id user inválida",
  }),
});

export type IAuthUserSchema = z.infer<typeof AuthUserSchema>;
