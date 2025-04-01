import { fetchWrapper } from "@/functions/fetch";
import { IMemberSchema } from "@/schemas/MemberSchema";
import { type ResponseApi } from "@/types/index";
import { TokenManager } from "@/functions/TokenManager";

export const getAllUsers = async (): Promise<ResponseApi<IMemberSchema[]>> => {
  const token = await TokenManager("token");
  return await fetchWrapper<ResponseApi<IMemberSchema[]>>(
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
