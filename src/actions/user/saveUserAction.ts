"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type IEditUserSchema } from "@/schemas/EditUserSchema";
import { type IRegisterUserSchema } from "@/schemas/RegisterUserSchema";
import { type ResultUserRegistered } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function saveUserAction(
  formData?: IEditUserSchema | IRegisterUserSchema,
): Promise<ResultUserRegistered> {
  try {
    if (formData != null) {
      const token = GetTokenCookie("token");
      const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/cadastro`;

      return await fetchWrapper<ResultUserRegistered>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData }),
      });
    }
    return {
      code: 400,
      status: "failure",
      data: null,
      message: "Erro ao cadastrar usuário! 🤯 ",
    };
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      data: null,
      message: "Erro ao cadastrar usuário! 🤯 ",
    };
  }
}
