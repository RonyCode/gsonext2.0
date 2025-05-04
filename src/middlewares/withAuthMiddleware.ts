// middlewares/withAuthMiddleware.tsimport type { NextFetchEvent, NextRequest } from "next/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { type CustomMiddleware } from "./chain";
import { handleTokenRefresh } from "@/lib/tokenManager";
import { decodeJwt } from "jose";

export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? [
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
            "https://viacep.com.br",
            `${process.env.NEXT_PUBLIC_API_GSO}`,
            `${process.env.NEXT_PUBLIC_API_NEXT}`,
            `${process.env.NEXT_PUBLIC_NEXT_URL}`,
          ]
        : [
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
            "https://gso-dev.vercel.app/",
            "https://viacep.com.br",
            `${process.env.NEXT_PUBLIC_API_GSO}`,
            `${process.env.NEXT_PUBLIC_API_NEXT}`,
            `${process.env.NEXT_PUBLIC_NEXT_URL}`,
          ];
    const origin = request.headers.get("origin");
    if (origin != null && !allowedOrigins.includes(origin)) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Bad Request",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": origin !== "" || "*",
        },
      });
    }

    const token = request.cookies.get("token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;
    const tokenDecoded = token && decodeJwt(token);
    const objetTokenParsed = Object(tokenDecoded);
    const userEsternalToConfirmSigUp =
      objetTokenParsed?.data?.user_external_confirmed == true;
    const sessaoToken =
      request.cookies.get("next-auth.session-token")?.value ??
      request.cookies.get("__Secure-next-auth.session-token")?.value;
    const response = NextResponse.next();

    if (token == null && sessaoToken != null) {
      return await handleTokenRefresh(refreshToken, response);
    }

    if (sessaoToken == null) {
      if (
        request.nextUrl.pathname === "/auth" ||
        request.nextUrl.pathname === "/"
      ) {
        return response;
      } else {
        return NextResponse.redirect(new URL("/auth", request.url));
      }
    }

    if (sessaoToken !== "" && request.nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!userEsternalToConfirmSigUp && request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/cadastro-usuario", request.url));
    }

    response.headers.set("Authorization", `Bearer ${token}`);
    response.headers.set("x-refresh-token", refreshToken ?? "");

    return middleware(request, event, response);
  };
}
