import { fetchWrapper } from "./fetch";
import { type ResponseApi, UserNotification } from "@/types/index";

export const GetUserNotification = async (
  queueName: string,
  exchangeName: string,
  idMessage: string | null | undefined,
): Promise<ResponseApi<UserNotification[]>> => {
  return await fetchWrapper<ResponseApi<UserNotification[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message?namequeue=${queueName}&exchangename=${exchangeName}&routingkey=${idMessage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
