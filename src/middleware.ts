// middleware.ts
import { chain } from "./middlewares/chain";
import { withAuthMiddleware } from "./middlewares/withAuthMiddleware";
import { permissionUserMiddleware } from "./middlewares/permissionUserMiddleware";

export default chain([withAuthMiddleware, permissionUserMiddleware]);

export const config = {
  matcher: [
    "/auth/:path*",
    "/servicos/:path*",
    "/((?!api|public|images|assets|cadastro-usuario|recuperar-senha|_next/static|favicon.ico).*)",
  ],
};
