"use server";

import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

export async function GetAllCompaniesAction(
  IdCorporation: string | undefined | null,
): Promise<ResponseApi<IUnidadeSchema[]>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/get-all/${IdCorporation || undefined}`;

  return await fetchWrapper<IUnidadeSchema[]>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use o token obtido
    },
  });
}
