export async function isValidJSON(response: Response) {
  const json = await response.text();
  try {
    return JSON.parse(json);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {};
  }
}
