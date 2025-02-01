import { fetchWrapper } from '../../../teste/src/functions/fetch'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { unidadeStore } from '@/stores/unidades/unidadeStore'
import { type ResponseApi } from '../../../teste/types/index'

export const getUnidadeById = async (
  idCorporation: string,
  idCompany: string,
  idSchedule?: string,
  idCar?: string,
): Promise<ResponseApi<IUnidadeSchema>> => {
  const response = await fetchWrapper<ResponseApi<IUnidadeSchema>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidade?id-corporation=${idCorporation}&id-company=${idCompany}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['unidadesFetch'] },
    },
  )
  if (
    response?.code === 202 &&
    idSchedule != null &&
    idCar != null &&
    response?.data != null
  )
    unidadeStore.setState({ state: { unidades: [response?.data] } })
  return response
}
