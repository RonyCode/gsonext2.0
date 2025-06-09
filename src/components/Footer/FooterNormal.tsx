import Link from "next/link";
import * as React from "react";
import { type ReactElement } from "react";

import { cn } from "@/lib/utils";
import IconLogoRCode from "@/icons/IconLogoRCode";
import Logo from "@/icons/Logo";

type FooterLayoutProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const FooterHomePage = ({
  className,
  ...props
}: FooterLayoutProps): ReactElement => {
  return (
    <footer
      className={cn(
        "relative bottom-0 z-10 flex h-14 items-center bg-secondary",
        className,
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center md:w-4/12">
            <div className="flex w-full justify-end text-center">
              <div className="flex w-full items-center justify-center gap-2 self-end text-sm font-semibold text-foreground">
                Copyright<span id="get-current-year">©2025</span>
                <Link
                  href="https://github.com/RonyCode/gso-next"
                  className="text-foreground hover:text-primary/60"
                  target="_blank"
                >
                  {" "}
                  <Logo width={50} />{" "}
                </Link>
                created by{" "}
                <Link
                  href="https://github.com/RonyCode"
                  className="text-foreground hover:text-primary/60"
                  target="_blank"
                >
                  <IconLogoRCode
                    width={60}
                    className="rounded-md border border-foreground/30 fill-foreground p-1"
                  />
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default FooterHomePage;
