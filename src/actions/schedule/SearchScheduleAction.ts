"use server";

import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";

export async function SearchScheduleAction(
  $idSchedule?: string,
  type?: string,
): Promise<ResponseApi<IScheduleSchema[]>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/schedule/search?${type}=${$idSchedule}`;

  return await fetchWrapper<ResponseApi<IScheduleSchema[]>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 1, tags: ["update-schedule"] },
  });
}
