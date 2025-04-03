import "../globals.css";
import React from "react";

import FooterNormal from "@/components/Footer/FooterNormal";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { Separator } from "@/ui/separator";
import BreadcrumbGso from "@/components/BreadCrumbGso/BreadcrumbGso";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { getAllCompanies } from "@/lib/getAllCompanies";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const { data } = await getAllOrganizacoes();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  const companyFound = await getAllCompanies(session?.id_corporation);

  return (
    <div className="w-full">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar corp={corpFound} companies={companyFound.data} />
        <SidebarInset>
          <header className="fixed z-10 flex h-14 w-full shrink-0 items-center bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbGso />
            </div>
          </header>

          <div className="min-h-screen w-full pt-16">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <FooterNormal />
    </div>
  );
}
