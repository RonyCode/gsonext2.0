import { z } from 'zod'

export const SaveVehicleCompanySchema = z.object({
  id_corporation: z.string().min(1, { message: 'corporação não selecionada' }),
  id_company: z.string().min(1, { message: 'Unidade não selecionada' }),
  id_vehicle: z.string().min(4, { message: 'Veiculo não selecionado' }),
  termo_busca: z.string().optional(),
})

export type ISaveVehicleCompanySchema = z.infer<typeof SaveVehicleCompanySchema>
