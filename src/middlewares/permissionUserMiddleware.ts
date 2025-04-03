import { decodeJwt, JWTPayload } from "jose";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export type UserRole = "admin" | "user" | "manager";

interface RoutePermission {
  paths: string[];
  roles: UserRole[];
  methods?: string[];
}

export const routePermissions: RoutePermission[] = [
  {
    paths: ["^/servicos/gestor.*"],
    roles: ["admin"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },

  {
    paths: ["^/servicos/unidades/[^/]+/gestor-unidade.*"],
    roles: ["admin", "manager"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  {
    paths: ["/servicos/usuarios.*"],
    roles: ["admin", "manager"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
];

export function permissionUserMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const path = request.nextUrl.pathname;
    const method = request.method;

    const token = request.cookies.get("token")?.value;
    const payloadToken = decodeJwt(token ?? "");
    const dataPayload = payloadToken.data as JWTPayload;
    const userRole = dataPayload?.role as UserRole;

    const permission = routePermissions.some((route) => {
      const pathMatch = route.paths.some((routePath) => {
        if (
          routePath.includes("^") ||
          routePath.includes(".*") ||
          routePath.includes("(?:")
        ) {
          try {
            const regex = new RegExp(routePath);
            const result = regex.test(path);
            return result;
          } catch (error) {
            console.error("  Erro no regex:", error);
            return false;
          }
        }
        const result = routePath === path;
        return result;
      });

      if (pathMatch) {
        const hasPermission =
          route.roles.includes(userRole) &&
          (!route.methods || route.methods.includes(method));

        if (!hasPermission) {
          return false;
        }
        return true;
      }
      return false;
    });

    if (
      !routePermissions.some((route) =>
        route.paths.some((p) => new RegExp(p).test(path)),
      )
    ) {
      return middleware(request, event, response);
    }

    if (!permission) {
      return NextResponse.redirect(new URL("/permissao", request.url));
    }
    return middleware(request, event, response);
  };
}
