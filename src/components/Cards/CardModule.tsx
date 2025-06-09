import Link from "next/link";
import { type ReactElement } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { cn } from "@/lib/utils";

type CardProps = {
  title?: string;
  subtitle?: string;
  link?: string;
  icon?: React.ReactNode;
} & React.ComponentProps<typeof Card>;

export function CardModule({
  title,
  subtitle,
  icon,
  link,
  className,
  ...props
}: CardProps): ReactElement {
  return (
    <Card id="cardModule" className={cn("h-28 w-full", className)} {...props}>
      {link != null ? (
        <Link href={link ?? ""}>
          <CardHeader className="h-full w-full cursor-pointer rounded-[5px] border px-4 hover:border-primary/60 hover:bg-foreground/10">
            <div className="flex h-full w-full flex-col items-center justify-center p-0 xl:flex-row xl:justify-between">
              {/* <span className=" md h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span> */}
              <div>
                <CardTitle className="text-sm">{title}</CardTitle>
                <CardDescription className="hidden flex-col text-sm xl:flex">
                  {subtitle}
                </CardDescription>
              </div>
              <div className="right-2 mt-2 fill-foreground/60 stroke-foreground/60 text-foreground/60 xl:mt-0">
                {icon}
              </div>
            </div>
          </CardHeader>
        </Link>
      ) : (
        <CardHeader className="h-full w-full cursor-pointer rounded-[5px] border p-2 hover:border-primary/60 hover:bg-foreground/10">
          <div className="flex h-full w-full flex-col items-center justify-center p-0 xl:flex-row xl:justify-between">
            {/* <span className=" md h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span> */}
            <div>
              <CardTitle className="text-sm">{title}</CardTitle>
              <CardDescription className="hidden flex-col text-sm lg:flex">
                {subtitle}
              </CardDescription>
            </div>
            <span className="fill-foreground/60 stroke-foreground/60 text-foreground/60 xl:mt-0">
              {icon}
            </span>
          </div>
        </CardHeader>
      )}
    </Card>
  );
}
