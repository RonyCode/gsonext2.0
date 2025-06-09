import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi, UserNotification } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const DeleteAllNotificationUser = async (
  queueName: string,
  exchangeName: string,
  $routingKey: string,
): Promise<ResponseApi<UserNotification[]>> => {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<UserNotification[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/notification-delete-all?exchange_name=${exchangeName}&routing_key=${$routingKey}&queue_name=${queueName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
