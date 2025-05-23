"use server";

import { revalidatePath } from "next/cache";

import { fetchWrapper } from "@/functions/fetch";
import { type IEditUserSchema } from "@/schemas/EditUserSchema";
import { type IRegisterUserSchema } from "@/schemas/RegisterUserSchema";
import { type ResultUserRegistered } from "../../types/index";
import { TokenManager } from "@/functions/TokenManager";

export async function saveUserAction(
  formData?: IEditUserSchema | IRegisterUserSchema,
): Promise<ResultUserRegistered> {
  revalidatePath("/");

  try {
    if (formData != null) {
      const token = TokenManager("token");
      return await fetchWrapper<ResultUserRegistered>(
        `${process?.env?.NEXT_PUBLIC_NEXT_URL}/api/cadastrar-usuario`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData }),
        },
      );
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
