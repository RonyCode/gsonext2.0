import { z } from 'zod'
export const AccountUserSchema = z.object({
  name: z.string().min(1, {
    message: 'name inválido deve conter no mínimo 1 caracteres',
  }),
  cpf: z
    .string()
    .min(11, {
      message: 'Cpf inválido',
    })
    .max(14, { message: 'Cpf inválido' })
    .refine((cpf: string) => {
      cpf = cpf.replace(/\D+/g, '')
      if (cpf.length !== 11 || !(cpf.match(/(\d)\1{10}/) == null)) return false
      const cpfDigits = cpf.split('').map((el) => +el)
      const rest = (count: number): number => {
        return (
          ((cpfDigits
            .slice(0, count - 12)
            .reduce((soma, el, index) => soma + el * (count - index), 0) *
            10) %
            11) %
          10
        )
      }
      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
    }, 'Cpf não existe.'),
  phone: z.string().min(1, {
    message: 'date_expires inválida',
  }),

  birthday: z.string().min(1, {
    message: 'date_expires inválida',
  }),

  image: z.string().optional().nullable(),
})
export type IAccountUserSchema = z.infer<typeof AccountUserSchema>
