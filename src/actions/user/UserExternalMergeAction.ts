"use server";

import { fetchWrapper } from "@/functions/fetch";
import { PayloaduserExternal, ResponseApi } from "@/types/index";

async function UserExternalMergeAction(formData?: PayloaduserExternal) {
  try {
    if (formData != null) {
      const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/vincula-user`;

      const resp = await fetchWrapper<ResponseApi>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      console.log(resp);

      if (resp && resp["code"] !== 200) {
        return {
          code: 400,
          status: "failure",
          message:
            "Erro ao mesclar usuário! . ERROR: " + resp &&
            resp["message"] + " 🤯 ",
        };
      }
      return {
        code: 200,
        status: "sucess",
        message: "Usuário vinculado! 🚀",
      } as ResponseApi;
    }
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao mesclar usuário! ERROR: " + error?.toString() + " 🤯 ",
    };
  }
}

export default UserExternalMergeAction;
