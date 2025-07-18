"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function saveCorporationAction(
  formData?: Partial<IOrganizacaoSchema>,
): Promise<ResponseApi<Partial<IOrganizacaoSchema>>> {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<Partial<IOrganizacaoSchema>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/corporation-save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    },
  );
}
