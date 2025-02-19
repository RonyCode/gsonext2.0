import { type CepProps } from "@/types/index";

import { fetchWrapper } from "@/functions/fetch";
import { toast } from "@/hooks/use-toast";

export const useCep = (): { findCep: (cep: string) => Promise<CepProps> } => {
  const findCep = async (cep: string): Promise<CepProps> => {
    try {
      return await fetchWrapper<CepProps>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cep?cep=${cep?.replace(
          /\D/g,
          "",
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "danger",
        title: "Cep Incorreto! 🤯 ",
        description: "Cep não encontrado",
      });
      return {
        city: "",
        cityId: "",
        complement: "",
        district: "",
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        ibge: 0,
        gia: "",
        ddd: 0,
        siafi: 0,
        districtId: "",
        ibgeId: "",
        state: "",
        stateShortname: "",
        street: "",
        zipcode: "",
        code: 0,
        error: false,
        message: "",
        unknown: "",
      } satisfies CepProps;
    }
  };

  return {
    findCep,
  };
};
