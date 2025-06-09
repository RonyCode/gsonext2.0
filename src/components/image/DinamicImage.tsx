import { cn } from "@/lib/utils";
import { getImage } from "@/lib/getImage";
import Image from "next/image";

export const DinamicImage = async (
  url: string,
  alt: string,
  className: string,
) => {
  const { base64, img } = await getImage(url);

  return (
    <div className={cn("h-full w-full") + className}>
      <Image
        {...img}
        alt={alt}
        blurDataURL={base64}
        placeholder="blur"
        sizes=" ( max-width: 768px ) 100vw,
              ( max-width: 1200px ) 50vw, 33vw"
      />
    </div>
  );
};
