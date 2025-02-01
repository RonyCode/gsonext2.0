import { z } from 'zod'

export const TokenSchema = z.object({
  token: z.string().min(1, {
    message: 'token inválido deve conter no mínimo 1 caracteres',
  }),
  refresh_token: z.string().min(1, {
    message: 'refresh_token inválida',
  }),
  date_creation: z.number().min(1, {
    message: 'date_creation inválida',
  }),
  date_expires: z.number().min(1, {
    message: 'date_expires inválida',
  }),
})

export type ITokenSchema = z.infer<typeof TokenSchema>
