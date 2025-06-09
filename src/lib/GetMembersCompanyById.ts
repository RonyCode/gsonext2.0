import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { IMemberSchema } from "@/schemas/MemberSchema";
import { GetTokenCookie } from "@/functions/TokenManager";

export const getMembersCompanyById = async (
  idCompany: string,
): Promise<ResponseApi<IMemberSchema[]>> => {
  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<IMemberSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/membros-unidade?id_company=${idCompany}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
