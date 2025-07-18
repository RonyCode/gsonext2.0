"use server";

import { fetchWrapper } from "@/functions/fetch";
import { PayloaduserExternal, UserLogged } from "@/types/index";

async function UserExternalMergeAction(formData?: PayloaduserExternal) {
  try {
    if (formData != null) {
      const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/vincula-user`;

      return await fetchWrapper<UserLogged>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
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
