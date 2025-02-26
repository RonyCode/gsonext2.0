import Image from "next/image";
import React from "react";

import getBase64 from "@/lib/getLocalBase64";
import { Card, CardContent, CardDescription, CardTitle } from "@/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/ui/separator";

type CardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconDescription?: React.ReactNode;
  image?: string;
  imageMobile?: string;
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
  const [myBlurDataUrl, myBlurDataUrlMobile] = await Promise.all([
    getBase64(image),
    getBase64(imageMobile),
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
          {image != null && (
            <Image
              src={image}
              quality="100"
              priority={true}
              fill
              sizes={"100"}
              blurDataURL={myBlurDataUrl}
              placeholder="blur"
              alt="image"
              className="rounded-[5px] object-cover brightness-[80%]"
            />
          )}
        </div>

        <div className="relative col-start-7 col-end-13 h-full p-0 md:col-start-4 md:hidden">
          {imageMobile != null && (
            <Image
              src={imageMobile}
              fill
              sizes="100"
              placeholder="blur"
              blurDataURL={myBlurDataUrlMobile}
              priority={true}
              alt="image"
              className="block rounded-[8px] object-cover brightness-[80%]"
            />
          )}
        </div>
      </div>
      {/*<BreadcrumbGso />*/}
      <Separator />
      <CardContent className="mt-4 grid h-auto w-full flex-1 rounded-[5px] p-0 md:min-h-[calc(100vh-18rem)] md:border md:border-foreground/15">
        {children}
      </CardContent>
    </Card>
  );
}
