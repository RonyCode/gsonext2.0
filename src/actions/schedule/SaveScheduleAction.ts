"use server";
import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { IScheduleFormSave } from "@/schemas/ScheduleFormSave";
import { GetTokenCookie } from "@/functions/TokenManager";
import { revalidateTag } from "next/cache";

export async function SaveScheduleAction(
  formData: IScheduleFormSave,
): Promise<ResponseApi<IScheduleFormSave[]>> {
  try {
    const token = await GetTokenCookie("token");
    const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/schedule/save`;

    const res = await fetchWrapper<IScheduleFormSave[]>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

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
