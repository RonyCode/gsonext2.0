import { fetchWrapper } from "@/functions/fetch";
import { cityStore } from "@/stores/Address/CityByStateStore";
import { AddressProps } from "@/types/index";

export const getAllCities = async (): Promise<AddressProps[]> => {
  const res = await fetchWrapper<AddressProps[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cidades`,
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
