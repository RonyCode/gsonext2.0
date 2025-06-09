"use server";
import { cookies } from "next/headers";

export async function GetTokenCookie(nameToken: string) {
  return (await cookies())?.get(nameToken)?.value;
}

export async function SetTokenCookies(
  nameToken: string,
  valueToken: string | null | undefined,
) {
  if (valueToken == null || valueToken === "") return;
  return (await cookies())?.set(nameToken, valueToken);
}

export async function DeleteTokenCookies(nameToken: string) {
  return (await cookies())?.delete(nameToken);
}
