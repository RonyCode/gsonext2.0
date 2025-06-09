import "../globals.css";
import React from "react";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { Separator } from "@/ui/separator";
import BreadcrumbGso from "@/components/BreadCrumbGso/BreadcrumbGso";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

import FooterLayout from "@/components/Footer/FooterLayout";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const { data } = await GetAllCorporationsAction();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  const { data: companies } = await GetAllCompaniesAction(
    session?.id_corporation ?? "",
  );

  return (
    <div className="w-full">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar corp={corpFound} companies={companies} />
        <SidebarInset>
          <header className="fixed z-10 flex h-14 w-full shrink-0 items-center bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbGso />
            </div>
          </header>

          <div className="min-h-screen w-full pt-16 md:pr-3">
            {children}
            <FooterLayout />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
