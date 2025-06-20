import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";
import { IUserSchema } from "@/schemas/UsersSchema";

export const getAllUsers = async (): Promise<ResponseApi<IUserSchema[]>> => {
  const token = await GetTokenCookie("token");
  return await fetchWrapper<ResponseApi<IUserSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
