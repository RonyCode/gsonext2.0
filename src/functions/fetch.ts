import { isValidJSON } from './isValidJson'
export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
): Promise<T> {
  const dataResponse = await fetch(input, init)
  if (!dataResponse.ok) {
    throw new Error(dataResponse.statusText)
  }
  return (await isValidJSON(dataResponse)) as T
}
