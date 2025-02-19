import { fetchWrapper } from "@/functions/fetch";
import { cityStore } from "@/stores/Address/CityByStateStore";
import { AddressProps } from "@/types/index";

export const getAllCitiesByState = async (
  state: string,
): Promise<AddressProps[]> => {
  const res = await fetchWrapper<AddressProps[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cidades/${state}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  cityStore.setState({ cities: res });
  return res;
};
