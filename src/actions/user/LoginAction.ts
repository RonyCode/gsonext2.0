"use server";

import { type ResponseApi } from "@/types/index";
import { fetchWrapper } from "@/functions/fetch";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

export async function LoginAction(
  email: string | undefined,
  senha: string | undefined,
  isUserExternal: number | undefined,
  subscriptions: string | undefined,
): Promise<Response> {
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/login`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
      is_user_external: isUserExternal,
      subscription_user: subscriptions,
    }),
  });
}
