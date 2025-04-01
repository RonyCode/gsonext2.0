import { fetchWrapper } from "@/functions/fetch";
import { IVehicleSchema } from "@/schemas/CarsSchema";
import { type ResponseApi } from "@/types/index";
import { TokenManager } from "@/functions/TokenManager";

export const getAllVehiclesCorporation = async (
  idCorporation: string,
): Promise<ResponseApi<IVehicleSchema[]>> => {
  const token = await TokenManager("token");

  return await fetchWrapper<ResponseApi<IVehicleSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/veiculos-corporacao?id_corporation=${idCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
