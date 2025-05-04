import { fetchWrapper } from "@/functions/fetch";
import { type ResponseApi } from "@/types/index";
import { TokenManager } from "@/functions/TokenManager";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

export const getAllCompanies = async (
  IdCorporation: string | undefined | null,
): Promise<ResponseApi<IUnidadeSchema[]>> => {
  const token = await TokenManager("token");
  return await fetchWrapper<ResponseApi<IUnidadeSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id_corporation=${IdCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
