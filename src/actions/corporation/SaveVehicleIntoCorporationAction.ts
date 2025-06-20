"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { fetchWrapper } from "@/functions/fetch";
import type { IVehicleSchema } from "@/schemas/CarsSchema";
import { type ResponseApi, type UserNotification } from "@/types/index";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function saveVehicleIntoCorporationAction(
  formData?: IVehicleSchema,
): Promise<ResponseApi<UserNotification> | undefined> {
  try {
    const cookiesInstance = await cookies();

    if (formData != null) {
      const subscription = cookiesInstance.get("subscription")?.value;

      if (subscription != null) {
        formData.subscription = JSON.parse(subscription);
      } else {
        formData.subscription = "";
      }
      const token = await GetTokenCookie("token");
      const resp = await fetchWrapper<ResponseApi<UserNotification>>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/vehicle/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      revalidateTag("update-vehicles");
      return resp;
    }
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      status: "failure",
      message: "Erro ao salvar veículo na corporação! 🤯 ",
    };
  }
}
