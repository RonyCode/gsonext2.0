import { GetTokenCookie } from "@/functions/TokenManager";

export const GetUserNotification = async (
  queueName: string,
  exchangeName: string,
  idMessage: string | null | undefined,
) => {
  const token = await GetTokenCookie("token");

  if (idMessage !== null && idMessage !== undefined) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/notification-view?queue_name=${queueName}&exchange_name=${exchangeName}&routing_key=${idMessage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }
};
