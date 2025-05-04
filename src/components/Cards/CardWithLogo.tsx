import * as React from "react";
import { type ReactElement } from "react";

import Logo from "../../../public/images/Logo";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type CardProps = React.ComponentProps<typeof Card> & {
  title?: string;
  className?: string;
  description?: string;
};
export const CardWithLogo = ({
  className,
  title,
  description,
  children,
  ...props
}: CardProps): ReactElement => {
  return (
    <>
      <Card
        className={cn(
          "flex h-full w-full flex-col items-center space-y-8 px-4 py-8 text-white md:h-auto",
          className,
        )}
        {...props}
      >
        <CardHeader className="flex w-full flex-col items-center justify-around space-y-4">
          <Logo width={120} />
          <CardTitle>
            <span className="text-center text-2xl font-bold">{title}</span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid w-full gap-4 text-foreground">
          <div>{children}</div>
        </CardContent>
        <CardFooter>
          <div className="text-center text-xs text-gray-500">
            &copy;2025 RCode All rights reserved.
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
