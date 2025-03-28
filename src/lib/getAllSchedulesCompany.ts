import { fetchWrapper } from "@/functions/fetch";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import { type ResponseApi } from "@/types/index";

export const getAllSchedulesCompany = async (
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<IScheduleSchema[]>> => {
  return await fetchWrapper<ResponseApi<IScheduleSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/escalas?id_corporation=${idCorporation}&id_company=${idCompany}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
