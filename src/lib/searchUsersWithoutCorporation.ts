import { type ResponseApi } from "@/types/index";

import { fetchWrapper } from "@/functions/fetch";

export const searchUsersWithoutCorporation = async (
  idCorporation: string | undefined | null,
  criteria: string | undefined | null,
): Promise<ResponseApi> => {
  return await fetchWrapper<ResponseApi>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/users-without-corp?id_corporation=${idCorporation}&criteria=${criteria}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    },
  );
};
