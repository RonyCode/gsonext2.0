"use server";

import { revalidatePath } from "next/cache";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { IMemberSchema } from "@/schemas/MemberSchema";

export async function GetAllMembersCorporationsAction(
  id_corporation?: string,
): Promise<ResponseApi<IMemberSchema[]>> {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<IMemberSchema[]>>(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/members/${id_corporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
