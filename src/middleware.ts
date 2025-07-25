// middleware.ts
import { chain } from "./middlewares/chain";
import { withAuthMiddleware } from "./middlewares/withAuthMiddleware";
import { permissionUserMiddleware } from "./middlewares/permissionUserMiddleware";

export default chain([withAuthMiddleware, permissionUserMiddleware]);

export const config = {
  matcher: [
    "/auth/:path*",
    "/servicos/:path*",
    "/((?!api|public|images|assets|manifest.json|cadastro-usuario|suporte|politica-de-privacidade|termos-de-uso|recuperar-senha|recuperar-senha|_next/static|favicon.ico).*)",
  ],
};
