import { fetchWrapper } from "@/functions/fetch";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { type ResponseApi } from "@/types/index";
import { TokenManager } from "@/functions/TokenManager";

export const getAllOrganizacoes = async (): Promise<
  ResponseApi<IOrganizacaoSchema[]>
> => {
  const token = await TokenManager("token");
  return await fetchWrapper<ResponseApi<IOrganizacaoSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/organizacoes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
