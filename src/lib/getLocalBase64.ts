import { getPlaiceholder } from "plaiceholder";

export default async function getBase64(
  imageUrl: string | undefined,
): Promise<string | undefined> {
  try {
    if (imageUrl == null) return;
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;

  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
