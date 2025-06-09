import { toast } from "@/hooks/use-toast";

import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { ResponseApi } from "@/types/index";

export const useCompany = () => {
  async function useGetAllCompanies(
    id_corporation: string,
  ): Promise<ResponseApi<IUnidadeSchema[]> | undefined> {
    try {
      return await GetAllCompaniesAction(id_corporation);
    } catch (error) {
      console.error("Erro no login com Google:", error);
      toast({
        variant: "danger",
        title: "Error",
        description: "Falha ao carrregar as unidades.",
      });
    }
  }

  return {
    useGetAllCompanies,
  };
};
