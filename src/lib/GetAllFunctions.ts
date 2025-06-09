import { fetchWrapper } from "@/functions/fetch";
import { type FunctionsMembers, type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const getAllFunctions = async (): Promise<
  ResponseApi<FunctionsMembers[]>
> => {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<FunctionsMembers[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/functions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
