import { type UserType } from "@/types/index";

import { fetchWrapper } from "@/functions/fetch";
import { TokenManager } from "@/functions/TokenManager";

export const getProfile = async (
  idUser: string | null | undefined,
): Promise<UserType> => {
  const token = await TokenManager("token");
  return await fetchWrapper<UserType>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/profile/${idUser}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
