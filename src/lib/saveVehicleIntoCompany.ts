import { type ResponseApi } from '../../../teste/types'

import { fetchWrapper } from '../../../teste/src/functions/fetch'

export const saveVehicleIntoCompany = async (
  idCorporation: string | undefined | null,
  idCompany: string | undefined | null,
  idVehicle: string | undefined | null,
): Promise<ResponseApi> => {
  return await fetchWrapper<ResponseApi>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/vehicles-save-company`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_corporation: idCorporation,
        id_company: idCompany,
        id_vehicle: idVehicle,
      }),
      cache: 'no-cache',
    },
  )
}
