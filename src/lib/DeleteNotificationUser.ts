import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi, UserNotification } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const DeleteNotificationUser = async (
  exchangeName: string,
  $idUser: string,
  idMessage: string,
): Promise<ResponseApi<UserNotification[]>> => {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<UserNotification[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/notification-delete?exchange_name=${exchangeName}&id_user=${$idUser}&id_message=${idMessage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
