import Image from "next/image";
import React from "react";

import getBase64 from "@/lib/getLocalBase64";
import { cn } from "@/lib/utils";
import { getValidImageUrl } from "@/functions/checkImageUrl";

type imageProps = {
  image?: string | null | undefined;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export async function ImageApp({ image, className, ...props }: imageProps) {
  const imageUrl = await getValidImageUrl(image);

  // Add error handling and fallback for blur data URLs
  const getBlurDataUrl = async (imageUrl?: string) => {
    if (!imageUrl) return null; // Corrected condition
    try {
      return await getBase64(imageUrl);
    } catch (error) {
      console.error("Error generating blur data URL:", error);
      return null;
    }
  };

  const myBlurDataUrl = await getBlurDataUrl(imageUrl);

  return (
    <Image
      src={imageUrl}
      quality="100"
      priority={true}
      fill
      sizes="100"
      blurDataURL={myBlurDataUrl ?? undefined}
      placeholder={myBlurDataUrl ? "blur" : "empty"}
      alt="image"
      className={cn("rounded-[5px] object-cover brightness-[80%]", className)}
      {...props}
    />
  );
}
