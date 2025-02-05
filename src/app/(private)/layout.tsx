import '../globals.css'
import React from 'react'

import FooterNormal from '@/components/Footer/FooterNormal'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/ui/sidebar";
import {AppSidebar} from "@/components/Sidebar/app-sidebar";
import {Separator} from "@/ui/separator";
import BreadcrumbGso from "@/components/BreadCrumbGso/BreadcrumbGso";
import {getAllOrganizacoes} from "@/lib/GetAllOrganizacoes";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {cookies} from "next/headers";

export default async  function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
const {data} = await getAllOrganizacoes()
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
const corpFound = data?.find((corp) => {
  return corp?.id === session?.id_corporation
})
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar corp={corpFound}/>
        <main>
          <SidebarInset>
            <header className="w-full z-10 bg-background fixed flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <BreadcrumbGso />
              </div>
            </header>

            <div className="flex  flex-col gap-4 p-4 pt-16">
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
