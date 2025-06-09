import { fetchWrapper } from "@/functions/fetch";
import { ResponseApi, type UserType } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const GetUserById = async (
  id: string | null | undefined,
): Promise<ResponseApi<UserType>> => {
  const token = await GetTokenCookie("token");

  const response = await fetchWrapper<ResponseApi<UserType>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user-id?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};
