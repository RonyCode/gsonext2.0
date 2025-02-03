import '../globals.css'
import React from 'react'

import FooterNormal from '@/components/Footer/FooterNormal'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/ui/sidebar";
import {AppSidebar} from "@/components/Sidebar/app-sidebar";
import {Separator} from "@/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/ui/breadcrumb";
import BreadcrumbGso from "@/components/BreadCrumbGso/BreadcrumbGso";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarInset>
            <header className=" flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/*<Breadcrumb>*/}
                {/*  <BreadcrumbList>*/}
                {/*    <BreadcrumbItem className="hidden md:block">*/}
                {/*      <BreadcrumbLink href="#">*/}
                {/*        Building Your Application*/}
                {/*      </BreadcrumbLink>*/}
                {/*    </BreadcrumbItem>*/}
                {/*    <BreadcrumbSeparator className="hidden md:block" />*/}
                {/*    <BreadcrumbItem>*/}
                {/*      <BreadcrumbPage>Data Fetching</BreadcrumbPage>*/}
                {/*    </BreadcrumbItem>*/}
                {/*  </BreadcrumbList>*/}
                {/*</Breadcrumb>*/}
                <BreadcrumbGso className="border-0 bg-transparent"/>
              </div>
            </header>

            <div className="flex  flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 grid-cols-1 ">
                {children}
              </div>
            </div>

          </SidebarInset>
        </main>
      </SidebarProvider>
      <FooterNormal />
    </>
  )
}
