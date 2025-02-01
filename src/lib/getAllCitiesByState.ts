import { type AddressProps } from '../../../teste/types'

import { fetchWrapper } from '../../../teste/src/functions/fetch'
import { cityStore } from '@/stores/Address/CityByStateStore'

export const getAllCitiesByState = async (
  state: string,
): Promise<AddressProps[]> => {
  const res = await fetchWrapper<AddressProps[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cidades/${state}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  cityStore.setState({ cities: res })
  return res
}
