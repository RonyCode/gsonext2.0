"use server";
import { getRefreshToken } from "./GetRefreshToken";
import { DeleteTokenCookies, SetTokenCookie } from "@/functions/TokenManager";

interface TokenResponse {
  token: string;
  refresh_token: string;
}

export async function RefreshTokenLayout(
  refreshToken: string | undefined,
): Promise<void> {
  const resp = await getRefreshToken(refreshToken);

  if (resp.ok) {
    const tokenRes = (await resp.json()) as TokenResponse;

    // Atualiza os tokens nos headers

    await SetTokenCookie("token", tokenRes.token);
    await SetTokenCookie("x-refresh-token", tokenRes.token, {
      maxAge: 60 * 60 * 24 * 7,
    });
  } else {
    await clearAllTokens();
  }
}

export async function clearAllTokens(): Promise<void> {
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
    DeleteTokenCookies(cookieName);
  });
}
