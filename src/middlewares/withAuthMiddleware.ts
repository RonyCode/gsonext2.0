// middlewares/withAuthMiddleware.ts
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

import { type CustomMiddleware } from './chain'
import {getRefreshToken} from "@/lib/GetRefreshToken";


export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const allowedOrigins =
      process.env.NODE_ENV === 'production'
        ? [
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
            'https://viacep.com.br',
            `${process.env.NEXT_PUBLIC_API_GSO}`,
            `${process.env.NEXT_PUBLIC_API_NEXT}`,
            `${process.env.NEXT_PUBLIC_NEXT_URL}`,
          ]
        : [
            'https://gso-dev.vercel.app/',
            'https://viacep.com.br',
            `${process.env.NEXT_PUBLIC_API_GSO}`,
            `${process.env.NEXT_PUBLIC_API_NEXT}`,
            `${process.env.NEXT_PUBLIC_NEXT_URL}`,
          ]
    const origin = request.headers.get('origin')
    if (origin != null && !allowedOrigins.includes(origin)) {
      return new NextResponse(null, {
        status: 400,
        statusText: 'Bad Request',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': origin !== '' || '*',
        },
      })
    }

    const token = request.cookies.get('token')?.value
    const sessaoToken =
      request.cookies.get('next-auth.session-token')?.value ??
      request.cookies.get('__Secure-next-auth.session-token')?.value
    const refreshToken = request.cookies.get('refresh_token')?.value
    const regex = /[.!]/g
    const tokenPayload = token?.replaceAll(regex, '+')
    const response = NextResponse.next()

    // SE TEM NÃO TEM SESSION-TOKEN VERIFICA O TOKEN
    if (refreshToken == null && sessaoToken != null) {
      if (token != null) {
        // RENOVA OS TOKENS

        const resp = await getRefreshToken(tokenPayload, token)
        // SALVA NOVOS COKKIES
        if (resp.ok) {
          const tokenRes = await resp?.json()
          response.cookies.set({
            name: 'token',
            value: tokenRes.token,
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: '/',
          })
          response.cookies.set({
            name: 'refresh_token',
            value: tokenRes.refresh_token,
            httpOnly: true,
            maxAge: 60 * 60 * 2,
            path: '/',
          })
          return response
        }
        if (!resp.ok) {
          response?.cookies?.set({
            name: 'next-auth.session-token',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: '__Secure-next-auth.session-token',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: 'next-auth.callback-url',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: '__Secure-next-auth.callback-url',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: 'next-auth.csrf-token',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: '__Host-next-auth.csrf-token',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: 'token',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          response.cookies.set({
            name: 'subscription',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
          })

          return response
        }
      } else {
        response.cookies.set({
          name: 'next-auth.session-token',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: '__Secure-next-auth.session-token',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: 'next-auth.callback-url',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: '__Secure-next-auth.callback-url',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: 'next-auth.csrf-token',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: '__Host-next-auth.csrf-token',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: 'token',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })

        response.cookies.set({
          name: 'subscription',
          value: '',
          httpOnly: true,
          maxAge: -1,
          path: '/',
        })
        return response
      }
    }

    // SE NÃO TEM O REFRESH-TOKEN PROTEGE TUDO
    if (sessaoToken == null) {
      if (
        request.nextUrl.pathname === '/auth' ||
        request.nextUrl.pathname === '/'
      ) {
        return response
      } else {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
    }

    // SE JÁ LOGADO IMPEDE PAGINA DE LOGIN
    if (sessaoToken !== '' && request.nextUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // if (token == null) {
    //   return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    // }

    return await middleware(request, event, response)
  }
}
