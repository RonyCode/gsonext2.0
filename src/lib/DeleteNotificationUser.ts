import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi, UserNotification } from "@/types/index";

export const DeleteNotificationUser = async (
  exchangeName: string,
  $idUser: string,
  idMessage: string,
): Promise<ResponseApi<UserNotification[]>> => {
  return await fetchWrapper<ResponseApi<UserNotification[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/notification-delete?exchange_name=${exchangeName}&id_user=${$idUser}&id_message=${idMessage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
