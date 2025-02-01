import { z } from 'zod'
export const AuthUserSchema = z.object({
  id: z.string().optional().nullable(),
  email: z.string().min(1, {
    message: 'email inválido deve conter no mínimo 1 caracteres',
  }),

  password: z.string().min(1, {
    message: 'password inválida',
  }),

  is_user_external: z.number().optional().nullable(),

  date_creation: z.string().min(1, {
    message: 'granted_by_iduser inválida',
  }),
})

export type IAuthUserSchema = z.infer<typeof AuthUserSchema>
