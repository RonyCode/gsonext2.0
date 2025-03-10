"use client";
import Link from "next/link";
import React, { type ReactElement } from "react";
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
import NotificationsChecker from "@/components/Notification/NotificationsChecker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { isArray } from "node:util";

const BreadcrumbGso = (): ReactElement => {
  const pathname = usePathname();
  const arrayPathname = pathname?.split("/");
  arrayPathname?.shift();
  let link = "";
  const linkColpse: string[] = [];
  const arrayLink: string[] = [];
  const arrayLinkCollapse: string[] = [];

  if (arrayPathname?.length > 3) {
    arrayLinkCollapse.push(
      ...arrayPathname?.slice(1, arrayPathname?.length - 1),
    );
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hover:text-foreground">
            <Link href="/">
              {" "}
              <LuHouse />
            </Link>
          </BreadcrumbItem>

          {arrayPathname?.map((path, index) => {
            if (index === 0) {
              arrayLink.push("/" + path);
            }
            link = arrayLink.join("/");

            return (
              <div
                key={index}
                className={`flex items-center ${index === 1 ? "hidden" : ""} `}
              >
                {arrayPathname?.length > 3 && (
                  <BreadcrumbItem
                    className={`hover:text-foreground ${
                      arrayPathname?.length === index ? "text-foreground" : ""
                    }`}
                  >
                    {index === 0 && (
                      <>
                        <ol>
                          <BreadcrumbSeparator>
                            <LiaChevronRightSolid />
                          </BreadcrumbSeparator>
                        </ol>
                        <Link
                          href={link}
                          className="m-0 p-0 text-[.825rem] font-light md:font-medium"
                        >
                          {path.charAt(0).toUpperCase() +
                            decodeURI(
                              path
                                .slice(1)
                                .toLowerCase()
                                .replace(/#.*$/, "")
                                .replace(/\/&.*$/, "")
                                .replace(/\?.*$/, "")
                                .replace(/-.*$/, "")
                                .split("/")[0],
                            )}
                        </Link>
                      </>
                    )}
                    {index == 1 && <div className="hidden"></div>}
                    {index == 2 && (
                      <>
                        <ol>
                          <BreadcrumbSeparator>
                            <LiaChevronRightSolid className="m-0 gap-0 p-0" />
                          </BreadcrumbSeparator>
                        </ol>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="m-0 flex items-center gap-0 p-0 text-[.825rem] font-light md:font-medium">
                            <BreadcrumbEllipsis className="m-0 w-auto gap-0 p-0" />
                            <span className="sr-only">
                              <ol>
                                <BreadcrumbSeparator>
                                  <LiaChevronRightSolid />
                                </BreadcrumbSeparator>
                              </ol>
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="z-100 text-[.825rem] font-light md:font-medium"
                          >
                            {arrayLinkCollapse?.length > 0 &&
                              arrayLinkCollapse?.map((itemPath, index) => {
                                linkColpse.push(itemPath);
                                return (
                                  <DropdownMenuItem key={index}>
                                    <ol>
                                      <BreadcrumbSeparator>
                                        <LiaChevronRightSolid />
                                      </BreadcrumbSeparator>
                                    </ol>
                                    <Link
                                      href={"/servicos/" + linkColpse.join("/")}
                                      className="m-0 p-0 text-[.825rem] font-light text-muted-foreground hover:text-foreground md:font-medium"
                                    >
                                      {itemPath.charAt(0).toUpperCase() +
                                        decodeURI(
                                          itemPath
                                            .slice(1)
                                            .toLowerCase()
                                            .replace(/#.*$/, "")
                                            .replace(/\/&.*$/, "")
                                            .replace(/\?.*$/, "")
                                            .replace(/-.*$/, "")
                                            .split("/")[0],
                                        )}
                                    </Link>
                                  </DropdownMenuItem>
                                );
                              })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                    {index === arrayPathname?.length - 1 && (
                      <>
                        <ol>
                          <BreadcrumbSeparator
                            className={`${
                              arrayPathname[arrayPathname.length - 1] ===
                                path && "text-primary"
                            }`}
                          >
                            <LiaChevronRightSolid />
                          </BreadcrumbSeparator>
                        </ol>
                        <Link
                          href={link}
                          className="m-0 p-0 text-[.825rem] font-light text-foreground md:font-medium"
                        >
                          {path.charAt(0).toUpperCase() +
                            decodeURI(
                              path
                                .slice(1)
                                .toLowerCase()
                                .replace(/#.*$/, "")
                                .replace(/\/&.*$/, "")
                                .replace(/\?.*$/, "")
                                .replace(/-.*$/, "")
                                .split("/")[0],
                            )}
                        </Link>
                      </>
                    )}
                  </BreadcrumbItem>
                )}

                {arrayPathname?.length < 4 && (
                  <>
                    <BreadcrumbItem
                      className={`hover:text-foreground ${
                        arrayPathname[arrayPathname.length - 1] === path
                          ? "text-foreground"
                          : ""
                      }`}
                    >
                      <ol>
                        <BreadcrumbSeparator
                          className={`${
                            arrayPathname[arrayPathname.length - 1] === path &&
                            "text-primary"
                          }`}
                        >
                          <LiaChevronRightSolid />
                        </BreadcrumbSeparator>
                      </ol>
                      <Link
                        href={link}
                        className="m-0 p-0 text-[.825rem] font-light md:font-medium"
                      >
                        {path.charAt(0).toUpperCase() +
                          decodeURI(
                            path
                              .slice(1)
                              .toLowerCase()
                              .replace(/#.*$/, "")
                              .replace(/\/&.*$/, "")
                              .replace(/\?.*$/, "")
                              .replace(/-.*$/, "")
                              .split("/")[0],
                          )}
                      </Link>
                    </BreadcrumbItem>
                  </>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="fixed right-1">
        <NotificationsChecker />
      </div>
    </>
  );
};
export default BreadcrumbGso;
