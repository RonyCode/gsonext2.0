"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { IUserSchema } from "@/schemas/UsersSchema";

export async function GetUserByEmailAction(
  $email: string | null,
): Promise<ResponseApi<IUserSchema>> {
  try {
    if ($email != null) {
      const token = await GetTokenCookie("token");
      return await fetchWrapper<ResponseApi<IUserSchema>>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-email/${$email}`,
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
