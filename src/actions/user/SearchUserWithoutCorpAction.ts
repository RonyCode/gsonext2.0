"use server";

import { revalidatePath } from "next/cache";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";

export async function SearchUserWithoutCorpAction(
  idCorporation: string | null,
  nested: string | null,
): Promise<ResponseApi> {
  revalidatePath("/");

  try {
    if (nested != null) {
      return await fetchWrapper<ResponseApi>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/user/get-all-without-corp?id_corporation=${idCorporation}&criteria=${nested}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
