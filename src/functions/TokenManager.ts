"use server";
import { cookies } from "next/headers";

export async function TokenManager(nameToken: string) {
  return (await cookies())?.get(nameToken)?.value;
}
