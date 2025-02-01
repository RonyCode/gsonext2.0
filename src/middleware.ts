// middleware.ts
import { chain } from './middlewares/chain'
import { withAuthMiddleware } from './middlewares/withAuthMiddleware'

export default chain([withAuthMiddleware])

export const config = {
  matcher: [
    '/auth/:path*',
    '/:sigla/',
    '/escalas/:path*',
    '/corporacao/:path*',
    '/module/:path*',
    '/ocorrencias/:path*',
    '/corporacao/:path*',
    '/unidades/:path*',
    '/dashboard/:path*',
    '/private/:path*',
    '/about/:path*',
    '/contact/:path*',
    '/conta/:path*',
    '/((?!api|images|cadastro-usuario|recuperar-senha|_next/static|favicon.ico).*)',
  ],
}
