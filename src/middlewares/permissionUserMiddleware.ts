import { decodeJwt, JWTPayload } from "jose"; // Adicionar JWTInvalid para checagem
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export type UserRole = "admin" | "user" | "manager";

interface RoutePermission {
  paths: RegExp[]; // Usar RegExp pré-compiladas para performance e clareza
  roles: UserRole[];
  methods?: string[];
}

// Pré-compilar regex para melhor performance e evitar recompilação a cada request
// Adicionar tratamento de erro na criação das RegExp aqui, se necessário.
export const routePermissions: RoutePermission[] = [
  {
    paths: [
      /^\/servicos\/corporacao\/membros\/.*/,
      /^\/servicos\/gestor.*/,
      /^\/servicos\/corporacao\/veiculos\/.*/,
      /^\/servicos\/corporacao\/usuarios\/.*/,
    ],
    roles: ["admin"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  {
    paths: [/^\/servicos\/unidades\/[^/]+\/gestor-unidade.*/],
    roles: ["admin", "manager"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  {
    // Cuidado com paths que não são regex, como este.
    // Se a intenção é uma correspondência exata, não precisa de regex.
    // Se for um prefixo, use /^\/servicos\/usuario.*/
    paths: [/^\/servicos\/usuarios.*/],
    roles: ["admin", "manager"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
];

// Função auxiliar para validar o UserRole
function isValidUserRole(role: string): role is UserRole {
  return ["admin", "user", "manager"].includes(role);
}

export function permissionUserMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const path = request.nextUrl.pathname;
    const method = request.method;

    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie?.value) {
      // Se não há token, e a rota é protegida, redirecionar para login ou retornar 401
      // Esta lógica pode depender se o withAuthMiddleware já lidou com isso.
      // Por simplicidade, vamos assumir que o withAuthMiddleware já tratou a ausência total de token.
      // Se chegar aqui sem token, mas a rota requer permissão, é um problema.
      // Considerar redirecionar para /auth ou /permissao dependendo da política.
      console.warn(
        "Middleware de permissão: Token não encontrado nos cookies.",
      );
      // Se a rota não estiver em routePermissions, permite passar. Caso contrário, nega.
      const isProtectedRoute = routePermissions.some((route) =>
        route.paths.some((regex) => regex.test(path)),
      );
      if (isProtectedRoute) {
        return NextResponse.redirect(
          new URL("/permissao?error=token_missing", request.url),
        );
      }
      return middleware(request, event, response);
    }

    let userRole: UserRole | undefined;
    try {
      const payloadToken = decodeJwt(tokenCookie.value);
      // Validação mais segura do payload do token seria ideal aqui (ex: com Zod)
      const dataPayload = payloadToken.data as JWTPayload | undefined;
      if (dataPayload && isValidUserRole(dataPayload.role as string)) {
        userRole = dataPayload.role as UserRole;
      } else {
        console.error(
          "Middleware de permissão: Role inválida ou ausente no payload do token.",
          dataPayload,
        );
      }
    } catch (error) {
      console.error(
        "Middleware de permissão: Erro ao decodificar o token JWT:",
        error,
      );
      // Se o token é inválido, negar acesso a rotas protegidas
      const isProtectedRoute = routePermissions.some((route) =>
        route.paths.some((regex) => regex.test(path)),
      );
      if (isProtectedRoute) {
        return NextResponse.redirect(
          new URL("/permissao?error=invalid_token", request.url),
        );
      }
      return middleware(request, event, response);
    }

    if (!userRole) {
      // Se o role não pôde ser determinado ou é inválido, negar acesso a rotas protegidas
      const isProtectedRoute = routePermissions.some((route) =>
        route.paths.some((regex) => regex.test(path)),
      );
      if (isProtectedRoute) {
        return NextResponse.redirect(
          new URL("/permissao?error=invalid_role", request.url),
        );
      }
      return middleware(request, event, response);
    }

    let hasExplicitPermission = false;
    let isPathCoveredByPermissions = false;

    for (const route of routePermissions) {
      const pathMatch = route.paths.some((regex) => regex.test(path));
      if (pathMatch) {
        isPathCoveredByPermissions = true;
        if (
          route.roles.includes(userRole) &&
          (!route.methods || route.methods.includes(method))
        ) {
          hasExplicitPermission = true;
          break; // Encontrou uma permissão correspondente, pode parar
        }
      }
    }

    if (isPathCoveredByPermissions) {
      if (hasExplicitPermission) {
        return middleware(request, event, response); // Usuário tem permissão
      } else {
        // Caminho coberto, mas usuário não tem a role/método necessário
        return NextResponse.redirect(new URL("/permissao", request.url));
      }
    } else {
      // Caminho não está em routePermissions, permite o acesso (fail-open)
      // Se preferir fail-close, redirecione para /permissao aqui também.
      return middleware(request, event, response);
    }
  };
}
