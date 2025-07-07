"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function SearchUserByCriteriaAction(
  nested: string | null,
): Promise<ResponseApi> {
  try {
    if (nested != null) {
      const token = await GetTokenCookie("token");
      return await fetchWrapper<ResponseApi>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/user/search-user/${nested}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
    return {
      code: 400,
      status: "failure",
      message: "Erro ao cadastrar usuário! 🤯 ",
    };
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao cadastrar usuário! 🤯 ",
    };
  }
}
