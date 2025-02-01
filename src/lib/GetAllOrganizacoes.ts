import { fetchWrapper } from '../../../teste/src/functions/fetch'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { type ResponseApi } from '../../../teste/types/index'

export const getAllOrganizacoes = async (): Promise<
  ResponseApi<IOrganizacaoSchema[]>
> => {
  return await fetchWrapper<ResponseApi<IOrganizacaoSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/organizacoes`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    },
  )
}
