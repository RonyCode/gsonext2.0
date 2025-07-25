"use client";

import { ChevronRight, type LucideIcon, CogIcon, Palette } from "lucide-react";

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

import IconManager from "@/icons/IconManager";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import IconEditSave from "@/icons/IconEditSave";

type NavMainProps = {
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

export function NavDev({ compSelected }: { compSelected: IUnidadeSchema }) {
  const data: NavMainProps["items"] = [
    {
      title: "Logs",
      url: "#",
      icon: CogIcon,
      items: [
        {
          title: "Logs",
          icon: <IconManager width={32} className="fill-foreground/60" />,
          url: "/log",
        },
      ],
    },
    {
      title: "Temas",
      url: "#",
      icon: Palette,
      items: [
        {
          title: "Temas",
          icon: <IconEditSave width={32} className="fill-foreground/60" />,
          url: `/servicos/corporacao/unidades/${compSelected?.name}-${compSelected?.id}/detalhes`,
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configurações Gerais</SidebarGroupLabel>
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
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
                        <Link href={subItem.url}>
                          <div
                            className="m-0 flex h-full w-full items-center gap-2 p-0 text-[.7rem]"
                            id="cardModule"
                          >
                            <span> {subItem.icon}</span>
                            <span>{subItem.title}</span>
                          </div>
                        </Link>
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
