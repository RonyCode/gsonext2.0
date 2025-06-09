import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { IMemberSchema } from "@/schemas/MemberSchema";

export const getMembersCorporation = async (
  idCorporation: string,
): Promise<ResponseApi<IMemberSchema[]>> => {
  return await fetchWrapper<ResponseApi<IMemberSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/membros-corporacao?id_corporation=${idCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
