"use client";

import {
  Building,
  Building2Icon,
  ChevronRight,
  UserCog2,
  type LucideIcon,
  CarIcon,
  Calendar,
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

export function NavAdmin({ compSelected }: { compSelected: IUnidadeSchema }) {
  const data: NavMainProps["items"] = [
    {
      title: "Corporação",
      url: "#",
      icon: Building2Icon,
      items: [
        {
          title: "Editar Corporação",
          icon: <IconBuildPlus width={32} className="fill-foreground/60" />,
          url: "/servicos/corporacao",
        },
      ],
    },
    {
      title: "Unidade",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Editar Unidade",
          icon: <IconEditSave width={32} className="fill-foreground/60" />,
          url: `/servicos/gestor/unidade`,
        },
      ],
    },
    {
      title: "Veículos",
      url: "#",
      icon: CarIcon,
      items: [
        {
          title: "Editar Veículo",
          icon: <IconCarFrontal width={32} className="stroke-foreground/60" />,
          url: "/servicos/gestor/veiculo",
        },
      ],
    },
    {
      title: "Escalas",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Editar Escala Unidade",
          icon: <IconCalendar width={32} className="fill-foreground/60" />,
          url: `/servicos/gestor/escala`,
        },
      ],
    },

    {
      title: "Membros",
      url: "#",
      icon: UserCog2,
      items: [
        {
          title: "Editar Membro",
          icon: <IconEditSave width={28} className="fill-foreground/60" />,
          url: "/servicos/gestor/membro",
        },
      ],
    },

    {
      title: "Usuários",
      url: "#",
      icon: UserCog2,
      items: [
        {
          title: "Usuários",
          icon: <IconManager width={32} className="fill-foreground/60" />,
          url: "/servicos/corporacao/usuarios",
        },
        {
          title: "Privilégios",
          icon: <IconPrivileges width={32} className="fill-foreground/60" />,
          url: "/servicos/corporacao/gestor/salvar-organizacao",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Gestão Administrativa</SidebarGroupLabel>
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
