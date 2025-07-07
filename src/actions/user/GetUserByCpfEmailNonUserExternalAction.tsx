import { ResponseApi } from "@/types/index";
import { IUserSchema } from "@/schemas/UsersSchema";
import { fetchWrapper } from "@/functions/fetch";

export async function GetUserByCpfEmailNonUserExternalAction(
  cpf: string | null,
  email: string | null,
): Promise<ResponseApi<IUserSchema[]>> {
  try {
    if (cpf != null) {
      const result = await fetchWrapper<ResponseApi<IUserSchema[]>>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-external?cpf=${cpf}&email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!result) {
        throw new Error("Failed to fetch user data");
      }

      return result;
    }
    throw new Error("CPF is required");
  } catch (error) {
    console.error("Error in GetUserByCpfAction:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
