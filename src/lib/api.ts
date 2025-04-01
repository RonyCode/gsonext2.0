import { cookies } from "next/headers";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!token) {
    return {
      error: "Token não encontrado",
      status: 401,
    };
  }

  // Configuração padrão dos headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Refresh-Token": refreshToken ?? "",
  };

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    // Se receber 401 e tiver refresh token, tenta renovar
    if (response.status === 401 && refreshToken) {
      try {
        // Tenta renovar o token
        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_URL}/api/refresh-token`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Refresh-Token": refreshToken,
            },
          },
        );

        if (refreshResponse.ok) {
          const newTokens = await refreshResponse.json();

          // Atualiza os cookies com os novos tokens
          await cookieStore.set({
            name: "token",
            value: newTokens.token,
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/",
          });

          await cookieStore.set({
            name: "refresh_token",
            value: newTokens.refresh_token,
            httpOnly: true,
            maxAge: 60 * 60 * 2,
            path: "/",
          });

          // Tenta a requisição original novamente com o novo token
          const retryResponse = await fetch(endpoint, {
            ...options,
            headers: {
              ...defaultHeaders,
              Authorization: `Bearer ${newTokens.token}`,
              ...options.headers,
            },
          });

          if (!retryResponse.ok) {
            throw new Error(`Erro na requisição: ${retryResponse.statusText}`);
          }

          return {
            data: await retryResponse.json(),
            status: retryResponse.status,
          };
        }
      } catch (refreshError) {
        // Se falhar ao renovar o token, limpa os cookies
        await cookieStore.delete("token");
        await cookieStore.delete("refresh_token");
        throw new Error("Falha ao renovar o token");
      }
    }

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido",
      status: 500,
    };
  }
}
