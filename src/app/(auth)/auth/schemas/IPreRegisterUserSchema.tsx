import { z } from 'zod'

export const PreRegisterUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  status: z.string().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
})
export type IPreRegisterUserSchema = z.infer<typeof PreRegisterUserSchema>
