"use server";

import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { fetchWrapper } from "@/functions/fetch";

export async function DeleteAllNotificationAction(
  nameQueue: string,
  exchangeName: string,
  routingKey: string,
): Promise<ResponseApi<Partial<IOrganizacaoSchema[]>>> {
  const token = await GetTokenCookie("token");
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/services/amqp/delete-all-notifications?queue_name=${nameQueue}&exchange_name=${exchangeName}&routing_key=${routingKey}`;

  return await fetchWrapper<Partial<IOrganizacaoSchema[]>>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
