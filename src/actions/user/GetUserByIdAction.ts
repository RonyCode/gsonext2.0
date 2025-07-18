"use server";

import { fetchWrapper } from "@/functions/fetch";
import { GetTokenCookie } from "@/functions/TokenManager";
import { ResponseApi, UserType } from "@/types/index";

export async function GetUserByIdAction(
  id: string | null,
): Promise<ResponseApi<UserType>> {
  try {
    if (id != null) {
      const token = await GetTokenCookie("token");
      const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-id/${id}`;

      return await fetchWrapper<UserType>(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return {
      code: 400,
      status: "failure",
      message: "Erro ao buscar usuário! 🤯 ",
    };
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao buscar usuário! 🤯 ",
    };
  }
}
