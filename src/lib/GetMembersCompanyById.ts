import { fetchWrapper } from "@/functions/fetch";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { type ResponseApi } from "@/types/index";
import { IMemberSchema } from "@/schemas/MemberSchema";

export const getMembersCompanyById = async (
  idCompany: string,
): Promise<ResponseApi<IMemberSchema>> => {
  return await fetchWrapper<ResponseApi<IMemberSchema>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/membros-unidade?id_company=${idCompany}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 1, tags: ["unidadesFetch"] },
    },
  );
};
