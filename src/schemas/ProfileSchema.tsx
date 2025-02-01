import { z } from 'zod'

export const ProfileSchema = z.object({
  role: z.string().min(1, {
    message: 'role inválido deve conter no mínimo 1 caracteres',
  }),
  date_granted: z.string().min(1, {
    message: 'date_granted inválida',
  }),
  date_expires: z.string().min(1, {
    message: 'date_expires inválida',
  }),

  granted_by_iduser: z.string().min(1, {
    message: 'granted_by_iduser inválida',
  }),
})

export type IProfileSchema = z.infer<typeof ProfileSchema>
