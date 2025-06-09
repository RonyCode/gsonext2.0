"use server";

import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";

export async function GetAllCorporationsAction(): Promise<
  ResponseApi<IOrganizacaoSchema[]>
> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/get-all`;

  return await fetchWrapper<ResponseApi<IOrganizacaoSchema[]>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
