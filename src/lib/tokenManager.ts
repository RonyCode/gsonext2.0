import { NextResponse } from "next/server";
import { getRefreshToken } from "./GetRefreshToken";

interface TokenResponse {
  token: string;
  refresh_token: string;
}

export async function handleTokenRefresh(
  refreshToken: string | undefined,
  response: NextResponse,
): Promise<NextResponse> {
  const resp = await getRefreshToken(refreshToken);

  if (resp.ok) {
    const tokenRes = (await resp.json()) as TokenResponse;

    // Atualiza os tokens nos headers
    response.headers.set("Authorization", `Bearer ${tokenRes.token}`);
    response.headers.set("x-refresh-token", tokenRes.refresh_token);

    // Atualiza os cookies
    response.cookies.set({
      name: "token",
      value: tokenRes.token,
      httpOnly: true,
      maxAge: 60 * 20,
      path: "/",
    });

    response.cookies.set({
      name: "refresh_token",
      value: tokenRes.refresh_token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } else {
    return clearAllTokens(response);
  }

  return response;
}

export function clearAllTokens(response: NextResponse): NextResponse {
  // Limpa os headers
  response.headers.delete("Authorization");
  response.headers.delete("x-refresh-token");

  // Limpa os cookies
  const cookiesToClear = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.callback-url",
    "__Secure-next-auth.callback-url",
    "next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
    "token",
    "refresh_token",
    "subscription",
  ];

  cookiesToClear.forEach((cookieName) => {
    response.cookies.set({
      name: cookieName,
      value: "",
      httpOnly: true,
      maxAge: -1,
      path: "/",
    });
  });

  return response;
}
