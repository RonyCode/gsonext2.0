"use client";

import {
  Building,
  Building2Icon,
  ChevronRight,
  Settings,
  UserCog2,
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
import IconBuildPlus from "@/icons/IconBuildPlus";
import IconMembers from "@/icons/IconMembers";
import IconCarFrontal from "@/icons/IconCarFrontal";
import IconCalendar from "@/icons/IconCalendar";
import IconManager from "@/icons/IconManager";
import IconPrivileges from "@/icons/IconPrivileges";
import IconPuzzle from "@/icons/IconPuzzle";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

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

export function NavAdmin({ compSelected }: { compSelected: IUnidadeSchema }) {
  const data: NavMainProps["items"] = [
    {
      title: "Gestão Corporação",
      url: "#",
      icon: Building2Icon,
      items: [
        {
          title: "Add Corporação",
          icon: <IconBuildPlus width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-organizacao",
        },
        {
          title: "Add Unidade Corporação",
          icon: <IconBuildPlus width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-unidade",
        },
        {
          title: "Add Membro Corporação",
          icon: <IconMembers width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-membro",
        },
        {
          title: "Add Veículos Corporação",
          icon: <IconCarFrontal width={32} className="stroke-foreground/60" />,
          url: "/servicos/gestor/salvar-veiculo",
        },
      ],
    },
    {
      title: "Gestão Unidade",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Adicionar Membro Unidade",
          icon: <IconMembers width={32} className="fill-foreground/60" />,
          url: `/servicos/unidades/${compSelected?.name}-${compSelected?.id}/gestor-unidade/membro-unidade-salvar`,
        },
        {
          title: "Adicionar Veículos Unidade",
          icon: <IconCarFrontal width={32} className="stroke-foreground/60" />,
          url: `/servicos/unidades/${compSelected?.name}-${compSelected?.id}/gestor-unidade/veiculo-unidade-salvar`,
        },
        {
          title: "Adicionar Escala Unidade",
          icon: <IconCalendar width={32} className="fill-foreground/60" />,
          url: `/servicos/unidades/${compSelected?.name}-${compSelected?.id}/gestor-unidade/escala-unidade-salvar`,
        },
      ],
    },
    {
      title: "Gestão Usuários",
      url: "#",
      icon: UserCog2,
      items: [
        {
          title: "Usuários",
          icon: <IconManager width={32} className="fill-foreground/60" />,
          url: "/servicos/usuarios",
        },
        {
          title: "Privilégios",
          icon: <IconPrivileges width={32} className="fill-foreground/60" />,
          url: "/servicos/gestor/salvar-organizacao",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Módulos",
          icon: <IconPuzzle width={32} className="stroke-foreground/60" />,
          url: "/servicos/gestor/salvar-organizacao",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administrativo</SidebarGroupLabel>
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
                        <div className="m-0 h-full w-full p-0" id="cardModule">
                          <Link
                            href={subItem.url}
                            className="flex items-center gap-2 text-[.7rem]"
                          >
                            <span> {subItem.icon}</span>
                            <span>{subItem.title}</span>
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
