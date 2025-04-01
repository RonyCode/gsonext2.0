import { type ResponseApi } from "@/types/index";

import { fetchWrapper } from "@/functions/fetch";
import { TokenManager } from "@/functions/TokenManager";

export const saveVehicleIntoCompany = async (
  idCorporation: string | undefined | null,
  idCompany: string | undefined | null,
  idVehicle: string | undefined | null,
): Promise<ResponseApi> => {
  const token = await TokenManager("token");

  return await fetchWrapper<ResponseApi>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/vehicles-save-company`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_corporation: idCorporation,
        id_company: idCompany,
        id_vehicle: idVehicle,
      }),
      cache: "no-cache",
    },
  );
};
