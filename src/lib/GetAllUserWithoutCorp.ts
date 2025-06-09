import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi, type UserType } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const getAllUserWithoutCorp = async (): Promise<
  ResponseApi<UserType[]>
> => {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<UserType[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/users-without-corp`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
