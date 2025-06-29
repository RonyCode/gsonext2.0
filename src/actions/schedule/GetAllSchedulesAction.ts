"use server";
import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { IScheduleFormSave } from "@/schemas/ScheduleFormSave";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function GetAllSchedulesAction(
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<IScheduleFormSave[]>> {
  try {
    const token = await GetTokenCookie("token");
    const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/schedules?id_corporation=${idCorporation}&id_company=${idCompany}`;

    const res = await fetchWrapper<ResponseApi<IScheduleFormSave[]>>(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 1, tags: ["save-schedules"] },
    });

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
