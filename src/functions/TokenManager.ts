"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function GetTokenCookie(nameToken: string) {
  return (await cookies())?.get(nameToken)?.value ?? "";
}

class CookieSerializeOptions {}

export type CookieOptions = Partial<CookieSerializeOptions>;

/**
 * Define um cookie no servidor de forma segura.
 * Utiliza o `cookies()` do `next/headers`.
 *
 * @param name - O nome do token/cookie.
 * @param value - O valor do token/cookie. Se for null, undefined ou uma string vazia, a função não fará nada.
 * @param options - Opções de configuração do cookie, como `maxAge`, `httpOnly`, etc.
 */
export async function SetTokenCookie(
  name: string,
  value: string | undefined | null,
  options: CookieOptions = {}, // Define um objeto vazio como padrão
): Promise<void> {
  // Validação para garantir que não tentemos salvar um cookie sem valor.
  if (!value) {
    return;
  }

  // Define as opções padrão para segurança, que podem ser sobrescritas.
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use `secure` em produção
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  };

  try {
    // A função `cookies().set()` não retorna um valor útil que precise ser aguardado ou retornado.
    // Ela agenda a configuração do cookie no cabeçalho da resposta.
    (await cookies())?.set(name, value, {
      ...defaultOptions,
      ...options, // As opções enviadas pelo usuário sobrescrevem as padrões
    });
  } catch (error) {
    // Em alguns contextos (como durante a construção estática), `cookies()` pode lançar um erro.
    console.error("Falha ao definir o cookie:", error);
  }
}

export async function DeleteTokenCookies(nameToken: string) {
  return (await cookies())?.delete(nameToken);
}

export async function CheckValidToken(token: string) {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!token) return false;

    if (!decodedToken?.exp) return false;

    return decodedToken?.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}
