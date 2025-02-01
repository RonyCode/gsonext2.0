import { z } from 'zod'

export const SaveMemberSchema = z.object({
  id_corporation: z.string().min(1, { message: 'corporação não selecionada' }),
  id_user: z.string().min(1, { message: 'corporação não selecionada' }),
  termo_busca: z.string().optional(),
})

export type ISaveMemberSchema = z.infer<typeof SaveMemberSchema>
