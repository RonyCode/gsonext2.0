"use client";

import { ChevronRight, Megaphone, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Link from "next/link";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import IconList from "@/icons/IconList";
import { Badge } from "../ui/badge";

type NavConfigProps = {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      icon?: ReactNode;
      url: string;
    }[];
  }[];
};

export function NavTicket({ tickets }: { compSelected: IUnidadeSchema }) {
  const data: NavConfigProps["items"] = [
    {
      title: "Chamados",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Abertos",
          icon: <IconList width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-organizacao",
        },
        {
          title: "Em Andamento",
          icon: <IconList width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-organizacao",
        },
        {
          title: "Finalizados",
          icon: <IconList width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-organizacao",
        },
      ],
    },
  ];

  console.log(tickets);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chamados</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <div className="ml-auto flex items-center">
                    <Badge className="m-0 flex h-4 w-4 items-center justify-center p-0 text-[.7rem]">
                      4
                    </Badge>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />{" "}
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className="h-full w-full border border-foreground/15 py-1"
                      >
                        <div className="m-0 h-full w-full p-0" id="cardModule">
                          <Link
                            href={subItem.url}
                            className="flex w-full items-center gap-2 text-[.7rem]"
                          >
                            <span> {subItem.icon}</span>
                            <div className="flex w-full items-center justify-between">
                              <span>{subItem.title}</span>
                              <Badge
                                variant="secondary"
                                className="m-0 flex h-4 w-4 items-center justify-center p-0 text-[.7rem]"
                              >
                                2
                              </Badge>
                            </div>
                          </Link>
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
