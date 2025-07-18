// Em: actions/user/LoginAction.ts
"use server";

import { ResponseApi, UserLogged } from "@/types/index";

export async function LoginUserAction(
  email: string | undefined,
  senha: string | undefined,
): Promise<ResponseApi<UserLogged>> {
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const apiResult: ResponseApi<UserLogged> = await response.json();
    if (
      apiResult.status === "success" &&
      apiResult.code === 202 &&
      apiResult.data !== null &&
      apiResult.data !== undefined
    ) {
      apiResult.data.access_token = response.headers.get("Authorization");
      apiResult.data.refresh_token = response.headers.get("x-refresh-token");

      return {
        status: apiResult.status,
        code: apiResult.code,
        message: apiResult.message,
        data: apiResult.data ?? undefined,
      };
    } else {
      // Se a API retornou um erro conhecido (ex: senha errada)
      return {
        message: apiResult.message || "Credenciais inválidas.",
        code: 500,
        status: "failure",
      };
    }
  } catch (error) {
    console.error("[ERRO NA LOGIN ACTION - FETCH]:", error);
    return {
      message: "Não foi possível conectar ao servidor de autenticação",
      code: 500,
      status: "failure",
    };
  }
}
