import { fetchWrapper } from "@/functions/fetch";
import { IVehicleSchema } from "@/schemas/CarsSchema";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const getAllVehiclesCompany = async (
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<IVehicleSchema[]>> => {
  const token = await GetTokenCookie("token");
  return await fetchWrapper<ResponseApi<IVehicleSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/veiculos-unidade?id_corporation=${idCorporation}&id_unidade=${idCompany}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
