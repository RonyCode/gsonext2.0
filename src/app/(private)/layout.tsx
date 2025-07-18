import "../globals.css";
import React from "react";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { Separator } from "@/ui/separator";
import BreadcrumbGso from "@/components/BreadCrumbGso/BreadcrumbGso";
import { cookies } from "next/headers";
import FooterLayout from "@/components/Footer/FooterLayout";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <div className="w-full">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
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
