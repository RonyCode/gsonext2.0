import { fetchWrapper } from "@/functions/fetch";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const getMyUnidade = async (
  idCorporation?: string | undefined | null,
  idCompany?: string | undefined | null,
  $idUser?: string | undefined | null,
): Promise<ResponseApi<IUnidadeSchema>> => {
  if ($idUser == null || idCompany == null || idCorporation == null)
    return {} as ResponseApi<IUnidadeSchema>;

  const token = await GetTokenCookie("token");

  return await fetchWrapper<ResponseApi<IUnidadeSchema>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/minha-unidade?id-corporation=${idCorporation}&id-company=${idCompany}&id-user=${$idUser}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
