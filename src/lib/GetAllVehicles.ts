import { fetchWrapper } from "@/functions/fetch";
import type { IVehicleSchema } from "@/schemas/CarsSchema";

export const getAllVehicles = async (query = ""): Promise<IVehicleSchema> => {
  return await fetchWrapper<IVehicleSchema>(query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Subscription-Token": process.env.NEXT_PUBLIC_KEY_FIPE ?? "",
    },
    cache: "force-cache",
  });
};
