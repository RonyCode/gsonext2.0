"use server";

import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";
import { IVehicleSchema } from "@/schemas/CarsSchema";

export async function GetAllVehiclesWithoutCompanyAction(
  idCorporation: string,
): Promise<ResponseApi<IVehicleSchema[]>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/get-vehicles-without-company?id_corporation=${idCorporation}`;

  return await fetchWrapper<IVehicleSchema[]>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
