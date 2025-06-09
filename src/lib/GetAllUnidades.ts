import { fetchWrapper } from "@/functions/fetch";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { type ResponseApi } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export const getAllUnidades = async (
  idCorporation: string,
): Promise<ResponseApi<IUnidadeSchema[]>> => {
  const token = await GetTokenCookie("token");
  return await fetchWrapper<ResponseApi<IUnidadeSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id-corporation=${idCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
