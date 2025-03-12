import { fetchWrapper } from "../functions/fetch";
import { type ResponseApi, UserNotification } from "@/types/index";

export const GetUserNotification = async (
  queueName: string,
  exchangeName: string,
  idMessage: string | null | undefined,
): Promise<ResponseApi<UserNotification[]>> => {
  return await fetchWrapper<ResponseApi<UserNotification[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/notification-view?queue_name=${queueName}&exchange_name=${exchangeName}&routing_key=${idMessage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
