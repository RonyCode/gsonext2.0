"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { IMemberSchema } from "@/schemas/MemberSchema";

export async function GetAllMembersCompanyAction(
  id_company?: string,
): Promise<ResponseApi<IMemberSchema[]>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/members/${id_company}`;

  return await fetchWrapper<IMemberSchema[]>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 1, tags: ["update-members"] },
  });
}
