import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { type CustomMiddleware } from "./chain";
import { handleTokenRefresh } from "@/lib/tokenManager";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const getAllowedOrigins = () => {
  const baseOrigins = [
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    "https://viacep.com.br",
    process.env.NEXT_PUBLIC_API_GSO,
    process.env.NEXT_PUBLIC_API_NEXT,
    process.env.NEXT_PUBLIC_NEXT_URL,
  ];
  if (!IS_PRODUCTION) {
    baseOrigins.push("https://gso-dev.vercel.app/");
  }
  return baseOrigins.filter(Boolean); // Filtra valores indefinidos se as variáveis de ambiente não estiverem definidas
};

export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const allowedOrigins = getAllowedOrigins();
    const origin = request.headers.get("origin");

    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse(null, {
        status: 403, // 403 Forbidden é frequentemente mais apropriado para problemas de origem
        statusText: "Forbidden",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const token = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    const sessaoToken =
      request.cookies.get("next-auth.session-token")?.value ??
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    const response = NextResponse.next();

    if (!token && sessaoToken && refreshToken) {
      return handleTokenRefresh(refreshToken, response);
    }

    if (!sessaoToken) {
      const isAuthPage = request.nextUrl.pathname === "/auth";
      const isRootPage = request.nextUrl.pathname === "/";
      if (isAuthPage || isRootPage) {
        return middleware(request, event, response);
      }
      const authRedirectUrl = new URL("/auth", request.url);
      return NextResponse.redirect(authRedirectUrl);
    }

    if (sessaoToken && request.nextUrl.pathname === "/auth") {
      const homeRedirectUrl = new URL("/", request.url);
      return NextResponse.redirect(homeRedirectUrl);
    }

    if (token) {
      response.headers.set("Authorization", `Bearer ${token}`);
    }
    if (refreshToken) {
      response.headers.set("x-refresh-token", refreshToken);
    }
    return middleware(request, event, response);
  };
}
