"use server";

import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

export async function GetCompanyByIdAction(
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<IUnidadeSchema>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company?id_corporation=${idCorporation}&id_company=${idCompany}`;

  return await fetchWrapper<ResponseApi<IUnidadeSchema>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
