"use server";

import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";
import { IVehicleSchema } from "@/schemas/CarsSchema";

export async function GetAllVehiclesCompanyAction(
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<IVehicleSchema[]>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/vehicles?id_corporation=${idCorporation}&id_company=${idCompany}`;

  return await fetchWrapper<ResponseApi<IVehicleSchema[]>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["update-vehicles"] },
  });
}
