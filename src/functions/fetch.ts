import { isValidJSON } from "./isValidJson";
import { NextRequest } from "next/server";

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init: RequestInit | NextRequest | undefined,
): Promise<T | undefined> {
  try {
    const dataResponse = await fetch(input, init);
    if (!dataResponse.ok) {
      console.log(dataResponse.statusText);
    }
    return (await isValidJSON(dataResponse)) as T;
  } catch (error) {
    console.log(error);
  }
}
