import { fetchWrapper } from "@/functions/fetch";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { type ResponseApi } from "@/types/index";

export const getCompanyById = async (
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<IUnidadeSchema>> => {
  return await fetchWrapper<ResponseApi<IUnidadeSchema>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidade?id_corporation=${idCorporation}&id_company=${idCompany}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 1, tags: ["unidadesFetch"] },
    },
  );
};
