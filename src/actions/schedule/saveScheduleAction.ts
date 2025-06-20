"use server";
import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { IScheduleFormSave } from "@/schemas/ScheduleFormSave";
import { GetTokenCookie } from "@/functions/TokenManager";
import { revalidateTag } from "next/cache";

export async function saveScheduleAction(
  formData: IScheduleFormSave,
): Promise<ResponseApi> {
  try {
    const token = await GetTokenCookie("token");

    const res = await fetchWrapper<ResponseApi>(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cadastrar-escala`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );

    revalidateTag("save-schedules");
    return res;
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao cadastrar membro em uma corporação! 🤯 ",
    };
  }
}
