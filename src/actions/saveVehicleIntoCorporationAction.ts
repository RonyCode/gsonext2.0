"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { fetchWrapper } from "@/functions/fetch";
import type { IVehicleSchema } from "@/schemas/CarsSchema";
import { type ResponseApi, type UserNotification } from "../../types/index";

export async function saveVehicleIntoCorporationAction(
  formData?: IVehicleSchema,
): Promise<ResponseApi<UserNotification> | undefined> {
  revalidatePath("/");
  try {
    const cookiesInstance = await cookies();

    if (formData != null) {
      const subscription = cookiesInstance.get("subscription")?.value;

      if (subscription != null) {
        formData.subscription = JSON.parse(subscription);
      } else {
        formData.subscription = "";
      }

      return await fetchWrapper<ResponseApi<UserNotification>>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/vehicle/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
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
