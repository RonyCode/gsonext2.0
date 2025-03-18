import { fetchWrapper } from "@/functions/fetch";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { type ResponseApi } from "@/types/index";

export const getAllCompanies = async (
  IdCorporation: string | undefined | null,
): Promise<ResponseApi<IOrganizacaoSchema[]>> => {
  return await fetchWrapper<ResponseApi<IOrganizacaoSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id_corporation=${IdCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
