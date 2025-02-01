import { AddressSchema } from './AddressSchema'
import { VehicleSchema } from './CarsSchema'
import { MemberSchema } from './MemberSchema'
import { UnidadeSchema } from './UnidadeSchema'
import { z } from 'zod'

export const OrganizacaoSchema = z.object({
  id: z.string().optional().nullable(),
  _id: z.object({ $oid: z.string().nullable() }).optional(),
  name: z
    .string()
    .min(1, { message: 'Nome inválido deve conter no mínimo 1 caracteres' }),
  cnpj: z.string().min(18, { message: 'CNPJ inválido' }),
  phone: z.string().min(11, { message: 'Telefone inválido' }),
  short_name_corp: z
    .string()
    .min(1, { message: 'Sigla  inválido deve conter no mínimo 1 caracteres' }),
  image: z.string().optional(),
  address: AddressSchema,
  companies: z.array(UnidadeSchema).optional(),
  excluded: z.number(),
  members: z.array(MemberSchema).optional(),
  vehicles: z.array(VehicleSchema).optional(),
})

export type IOrganizacaoSchema = z.infer<typeof OrganizacaoSchema>
