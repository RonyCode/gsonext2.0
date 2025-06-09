import { type AddressProps } from "@/types/index";

export const getAllStates = async (): Promise<AddressProps[]> => {
  // const url = `${process.env.NEXT_PUBLIC_NEXT_URL}/api/estados`;
  // const res = await fetchWrapper<AddressProps[]>(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // )
  // stateStore.setState({ states: res })
  // return res

  const url = process.env.NEXT_PUBLIC_API_ESTADOS ?? "";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  return await res.json();
};
