"use server";
import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { IScheduleFormSave } from "@/schemas/ScheduleFormSave";
import { TokenManager } from "@/functions/TokenManager";

export async function saveScheduleAction(
  formData: IScheduleFormSave,
): Promise<ResponseApi> {
  try {
    if (formData != null) {
      const token = await TokenManager("token");

      return await fetchWrapper<ResponseApi>(
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
    }
    return {
      code: 400,
      status: "failure",
      message: "Erro ao cadastrar membro em uma corporação! 🤯 ",
    };
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao cadastrar membro em uma corporação! 🤯 ",
    };
  }
}
