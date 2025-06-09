import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { type ResponseApi } from "@/types/index";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";

export const getAllOrganizacoes = async () => {
  // return await fetchWrapper<ResponseApi<IOrganizacaoSchema[]>>(
  //   `${process.env.NEXT_PUBLIC_NEXT_URL}/api/organizacoes`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  const res = await GetAllCorporationsAction();

  // if ((await res.code) !== 202) {
  //   throw new Error(res.message);
  // }

  // console.log(await res.json());

  return res;
};
