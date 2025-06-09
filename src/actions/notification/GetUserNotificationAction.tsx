"use server";

import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";

export async function GetUserNotificationAction(
  nameQueue: string,
  exchangeName: string,
  routingKey: string,
): Promise<ResponseApi> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/services/amqp/view-notifications?queue_name=${nameQueue}&exchange_name=${exchangeName}&routing_key=${routingKey}`;

  return await fetchWrapper<ResponseApi>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
