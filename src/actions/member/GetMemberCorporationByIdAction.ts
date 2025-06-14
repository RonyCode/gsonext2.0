"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { IMemberSchema } from "@/schemas/MemberSchema";

export async function GetMemberCorporationByIdAction(
  id_corporation?: string,
): Promise<ResponseApi<IMemberSchema[]>> {
  const token = await GetTokenCookie("token");

  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/members/${id_corporation}`;

  return await fetchWrapper<ResponseApi<IMemberSchema[]>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
