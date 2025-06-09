"use server";

import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

export async function GetAllCompaniesAction(
  IdCorporation: string,
): Promise<ResponseApi<IUnidadeSchema[]>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id_corporation=${IdCorporation}`;

  return await fetchWrapper<ResponseApi<IUnidadeSchema[]>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use o token obtido
    },
  });
}
