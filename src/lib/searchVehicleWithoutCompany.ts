import { type ResponseApi } from "@/types/index";

import { fetchWrapper } from "@/functions/fetch";

export const searchVehicleWithoutCompany = async (
  idCorporation: string | undefined | null,
): Promise<ResponseApi> => {
  return await fetchWrapper<ResponseApi>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/vehicles-without-company?id_corporation=${idCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    },
  );
};
