"use client";

import {
  Building,
  Building2Icon,
  Calendar1Icon,
  ChevronRight,
  Siren,
  type LucideIcon,
} from "lucide-react";

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
import IconSirene from "@/icons/IconSirene";
import IconEditSave from "@/icons/IconEditSave";
import IconBuild from "@/icons/IconBuild";
import IconMembers from "@/icons/IconMembers";
import IconCarFrontal from "@/icons/IconCarFrontal";
import IconCalendar from "@/icons/IconCalendar";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { Session } from "next-auth";

interface MenuItem {
  title: string;
  icon: ReactNode;
  url: string;
}

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items: MenuItem[];
  isActive?: boolean;
}

type NavMainProps = {
  compSelected: IUnidadeSchema;
  session: Session | null;
};

export function NavMain({ compSelected, session }: NavMainProps) {
  const itemsGeral: NavItem[] = [
    {
      title: "Ocorrências",
      url: "#",
      icon: Siren,
      items: [
        {
          title: "Ocorrências",
          icon: (
            <IconSirene
              width={32}
              className="fill-foreground/60 stroke-foreground/60 text-foreground/60"
            />
          ),
          url: "/servicos/corporacao",
        },
        {
          title: "Novas Ocorrências",
          icon: <IconEditSave width={32} className="fill-foreground/60" />,
          url: "/servicos/membros",
        },
      ],
    },
    {
      title: "Corporação",
      url: "#",
      icon: Building2Icon,
      items:
        session?.role === "admin"
          ? [
              {
                title: "Corporação",
                icon: <IconBuild width={32} className="fill-foreground/60" />,
                url: "/servicos/corporacao",
              },
              {
                title: "Membros Corporação",
                icon: <IconMembers width={32} className="fill-foreground/60" />,
                url: "/servicos/corporacao/membros",
              },
              {
                title: "Veículos Corporação",
                icon: (
                  <IconCarFrontal width={32} className="stroke-foreground/60" />
                ),
                url: "/servicos/corporacao/veiculos",
              },
              {
                title: "Unidades Corporação",
                icon: <IconBuild width={32} className="fill-foreground/60" />,
                url: "/servicos/corporacao/unidades",
              },
            ]
          : [
              {
                title: "Corporação",
                icon: <IconBuild width={32} className="fill-foreground/60" />,
                url: "/servicos/corporacao",
              },
              {
                title: "Unidades Corporação",
                icon: <IconBuild width={32} className="fill-foreground/60" />,
                url: "/servicos/corporacao/unidades",
              },
            ],
    },
    {
      title: "Unidade",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Unidade",
          icon: <IconBuild width={32} className="fill-foreground/60" />,
          url: `/servicos/corporacao/unidades/${compSelected?.name}-${compSelected?.id}/detalhes`,
        },
        {
          title: "Membros Unidade",
          icon: <IconMembers width={32} className="fill-foreground/60" />,
          url: `/servicos/corporacao/unidades/${compSelected?.name}-${compSelected?.id}/membros`,
        },
        {
          title: "Veículos Unidade",
          icon: <IconCarFrontal width={32} className="stroke-foreground/60" />,
          url: `/servicos/corporacao/unidades/${compSelected?.name}-${compSelected?.id}/veiculos`,
        },
        {
          title: "Escalas Unidades",
          icon: <IconCalendar width={32} className="fill-foreground/60" />,
          url: `/servicos/corporacao/unidades/${compSelected?.name}-${compSelected?.id}/escalas`,
        },
      ],
    },
    {
      title: "Escalas",
      url: "#",
      icon: Calendar1Icon,
      items: [
        {
          title: "Escalas Unidades",
          icon: <IconCalendar width={32} className="fill-foreground/60" />,
          url: "/servicos/escalas",
        },
      ],
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Geral</SidebarGroupLabel>
      <SidebarMenu>
        {itemsGeral.map((item) => (
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
                        <Link href={subItem.url} className="">
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
