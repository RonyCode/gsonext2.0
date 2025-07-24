import Image from "next/image";
import React, { Suspense } from "react";

import getBase64 from "@/lib/getLocalBase64";
import { Card, CardContent, CardDescription, CardTitle } from "@/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/ui/separator";
import { getValidImageUrl } from "@/functions/checkImageUrl";
import SkeletonCardDefault from "@/components/skeleton/skeletonCardDefault";

type CardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconDescription?: React.ReactNode;
  image?: string | null | undefined;
  imageMobile?: string | null | undefined;
  className?: React.HTMLAttributes<HTMLDivElement>;
  children: React.ReactNode;
} & React.ComponentProps<typeof Card>;

export async function CardDefault({
  title,
  description,
  icon,
  iconDescription,
  image,
  imageMobile,
  className,
  children,
  ...props
}: CardProps) {
  const imageUrl = await getValidImageUrl(image);
  const imageMobileUrl = await getValidImageUrl(imageMobile);

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

  const [myBlurDataUrl, myBlurDataUrlMobile] = await Promise.all([
    getBlurDataUrl(imageUrl),
    getBlurDataUrl(imageMobileUrl),
  ]);

  return (
    <Card
      className={cn(
        "m-0 mx-auto min-h-screen w-full bg-background p-0 md:min-h-[calc(100vh-4rem)] md:p-6",
        className,
      )}
      {...props}
    >
      <div className="grid h-36 w-full grid-cols-12 rounded-[8px] border border-foreground/15 p-0">
        <div className="text-md col-start-1 col-end-7 md:col-start-1 md:col-end-5 md:text-xl">
          <CardTitle>
            <div className="flex flex-col items-start p-3 md:p-6">
              <div className="mb-2 flex items-center gap-1">
                <span>{icon}</span>
                <span>{title}</span>
              </div>
              <CardDescription>
                <div className="flex items-center gap-1">
                  <div>{iconDescription}</div>
                  {description}
                </div>
              </CardDescription>
            </div>
          </CardTitle>
        </div>
        <div className="relative hidden h-full cursor-pointer p-0 transition-all duration-700 ease-in-out md:col-start-5 md:col-end-13 md:block">
          <Image
            src={imageUrl}
            quality="100"
            priority={true}
            fill
            sizes="100"
            blurDataURL={myBlurDataUrl ?? undefined}
            placeholder={myBlurDataUrl ? "blur" : "empty"}
            alt="image"
            className="rounded-[5px] object-cover brightness-[80%]"
          />
        </div>

        <div className="relative col-start-7 col-end-13 h-full p-0 md:col-start-4 md:hidden">
          <Image
            src={imageMobileUrl}
            fill
            sizes="100"
            blurDataURL={myBlurDataUrlMobile ?? undefined}
            placeholder={myBlurDataUrlMobile ? "blur" : "empty"}
            priority={true}
            alt="image"
            className="block rounded-[8px] object-cover brightness-[80%]"
          />
        </div>
      </div>
      <Separator />
      <CardContent className="mt-4 grid h-auto w-full flex-1 rounded-[5px] p-0 md:min-h-[calc(100vh-18rem)] md:border md:border-foreground/15">
        {children}
      </CardContent>
    </Card>
  );
}
