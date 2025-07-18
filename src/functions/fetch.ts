import { ResponseApi } from "@/types/index";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | NextRequest | undefined,
): Promise<ResponseApi<T>> {
  try {
    const response = await fetch(input, init);

    const data = (await response.json()) as ResponseApi<T>;

    if (data.code === 401) {
      console.log("Sessão expirada!");
      await signOut({ redirect: false });
      redirect("/login");
    }

    if (data.code === 400) {
      console.log(data.message);
    }

    if (!response.ok) {
      console.log(data.message);
    }

    return data as ResponseApi<T>;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
