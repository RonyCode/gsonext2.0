import { getValidImageUrl } from "@/functions/checkImageUrl";
import { getPlaiceholder } from "plaiceholder";

export async function GetBlurImage(
  url: string | undefined | null,
): Promise<string | null | undefined> {
  let test: string | null | undefined;
  // getValidImageUrl(url).then((res) => {

  if (url == null) return;
  fetch(url).then(async (res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;

    // });
    return test;
  });
}
