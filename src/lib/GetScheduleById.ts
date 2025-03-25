import { fetchWrapper } from "@/functions/fetch";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import { type ResponseApi } from "@/types/index";

export const getScheduleById = async (
  idCorporation: string,
  idCompany: string,
  idSchedule: string,
): Promise<ResponseApi<IScheduleSchema>> => {
  return await fetchWrapper<ResponseApi<IScheduleSchema>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/escala?id_corporation=${idCorporation}&id_company=${idCompany}&id_schedule=${idSchedule}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
