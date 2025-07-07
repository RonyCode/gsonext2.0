"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type IEditUserSchema } from "@/schemas/EditUserSchema";
import { type IRegisterUserSchema } from "@/schemas/RegisterUserSchema";
import { ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

async function SaveUserAction(
  formData?: Partial<IEditUserSchema> | Partial<IRegisterUserSchema>,
): Promise<ResponseApi | undefined> {
  try {
    if (formData != null) {
      const token = GetTokenCookie("token");
      const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/save`;

      const resp = await fetchWrapper<ResponseApi>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData }),
      });

      return resp;
    }
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao cadastrar usuário! 🤯 ",
    };
  }
}

export default SaveUserAction;
