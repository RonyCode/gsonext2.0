"use client";
import Link from "next/link";
import React, { type ReactElement, useEffect } from "react";
import { LiaChevronRightSolid } from "react-icons/lia";
import { LuHouse } from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { NotificationsShow } from "@/components/Notification/NotiicationsShow";
import { useIsMobile } from "@/hooks/use-mobile";

interface BreadcrumbSegment {
  label: string;
  path: string;
}

const formatPathSegment = (segment: string): string => {
  return (
    segment.charAt(0).toUpperCase() +
    decodeURI(
      segment
        .slice(1)
        .toLowerCase()
        .replace(/#.*$/, "")
        .replace(/\/&.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/-.*$/, "")
        .split("/")[0],
    )
  );
};

const BreadcrumbGso = (): ReactElement => {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];
  const [isMobile, setIsMobile] = React.useState(false);

  const buildBreadcrumbSegments = (): BreadcrumbSegment[] => {
    return segments.map((segment, index) => ({
      label: formatPathSegment(segment),
      path: "/" + segments.slice(0, index + 1).join("/"),
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const breadcrumbSegments = buildBreadcrumbSegments();
  const middleSegments = breadcrumbSegments.slice(1, -1);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hover:text-foreground">
            <Link href="/">
              <LuHouse />
            </Link>
          </BreadcrumbItem>

          {breadcrumbSegments.length > 0 && (
            <>
              <BreadcrumbSeparator>
                <LiaChevronRightSolid />
              </BreadcrumbSeparator>
              <BreadcrumbItem className="hover:text-foreground">
                <Link
                  href={breadcrumbSegments[0].path}
                  className="text-[.825rem] font-light md:font-medium"
                >
                  {breadcrumbSegments[0].label}
                </Link>
              </BreadcrumbItem>
            </>
          )}

          {breadcrumbSegments.length > 2 && (
            <>
              {!isMobile ? (
                middleSegments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <BreadcrumbSeparator>
                      <LiaChevronRightSolid />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem key={index}>
                      <Link
                        href={segment.path}
                        className="text-[.825rem] font-light md:font-medium"
                      >
                        {segment.label}
                      </Link>
                    </BreadcrumbItem>
                  </div>
                ))
              ) : (
                <>
                  <BreadcrumbSeparator>
                    <LiaChevronRightSolid />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center text-[.825rem] font-light md:font-medium">
                        <BreadcrumbEllipsis className="w-auto" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="z-100 text-[.825rem]"
                      >
                        {middleSegments.map((segment, index) => (
                          <DropdownMenuItem
                            key={index}
                            className="text-[.825rem] font-light text-muted-foreground hover:text-foreground md:font-medium"
                          >
                            <LiaChevronRightSolid
                              style={{ width: "5px!important" }}
                            />
                            <Link href={segment.path}>{segment.label}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                </>
              )}
            </>
          )}

          {breadcrumbSegments.length > 1 && (
            <>
              <BreadcrumbSeparator className="text-primary">
                <LiaChevronRightSolid />
              </BreadcrumbSeparator>
              <BreadcrumbItem className="text-foreground">
                <Link
                  href={breadcrumbSegments[breadcrumbSegments.length - 1].path}
                  className="text-[.825rem] font-light md:font-medium"
                >
                  {breadcrumbSegments[breadcrumbSegments.length - 1].label}
                </Link>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <NotificationsShow className="fixed right-3" />
    </>
  );
};

export default BreadcrumbGso;
