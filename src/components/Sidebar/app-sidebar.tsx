"use client";

import * as React from "react";

import {
  Building,
  Building2Icon,
  Calendar1Icon,
  CogIcon,
  Siren,
  UserCog,
  UserCog2,
  UserCog2Icon,
  UserCogIcon,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import IconCalendar from "@/icons/IconCalendar";
import IconBuild from "@/icons/IconBuild";
import IconMembers from "@/icons/IconMembers";
import IconCarFrontal from "@/icons/IconCarFrontal";
import IconSirene from "@/icons/IconSirene";
import IconEditSave from "@/icons/IconEditSave";
import { CompanySwitcher } from "@/components/Sidebar/company-switcher";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { NavAdmin } from "@/components/Sidebar/nav-admin";
import IconBuildPlus from "@/icons/IconBuildPlus";
import { LuUserCog } from "react-icons/lu";
import IconPrivileges from "@/icons/IconPrivileges";

interface AppSidebarProps {
  corp?: IOrganizacaoSchema;
}

export function AppSidebar({
  corp,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const [compSelected, setCompSelected] = React.useState(
    corp?.companies
      ? (corp?.companies[0] as IUnidadeSchema)
      : ({} as IUnidadeSchema),
  );
  const data = {
    navMain: [
      {
        title: "Ocorrências",
        url: "#",
        icon: Siren,
        items: [
          {
            title: "Minhas Ocorrências",
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
        items: [
          {
            title: "Minha Corporação",
            icon: <IconBuild width={32} className="fill-foreground/60" />,
            url: "/servicos/corporacao",
          },
          {
            title: "Membros Corporação",
            icon: <IconMembers width={32} className="fill-foreground/60" />,
            url: "/servicos/membros",
          },
          {
            title: "Veículos Corporação",
            icon: (
              <IconCarFrontal width={32} className="stroke-foreground/60" />
            ),
            url: "/servicos/veiculos",
          },
          {
            title: "Unidades Corporação",
            icon: <IconBuild width={32} className="fill-foreground/60" />,
            url: "/servicos/unidades",
          },
        ],
      },
      {
        title: "Unidade",
        url: "#",
        icon: Building,
        items: [
          {
            title: "Minha Unidade",
            icon: <IconBuild width={32} className="fill-foreground/60" />,
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}`,
          },
          {
            title: "Membros Unidade",
            icon: <IconMembers width={32} className="fill-foreground/60" />,
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}/membros`,
          },
          {
            title: "Veículos Unidade",
            icon: (
              <IconCarFrontal width={32} className="stroke-foreground/60" />
            ),
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}/veiculos`,
          },
          {
            title: "Escalas Unidades",
            icon: <IconCalendar width={32} className="fill-foreground/60" />,
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}/escalas`,
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
    ],
    admin: [
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
            icon: (
              <IconCarFrontal width={32} className="stroke-foreground/60" />
            ),
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
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}/gestor-unidade/membro-unidade-salvar`,
          },
          {
            title: "Adicionar Veículos Unidade",
            icon: <IconBuildPlus width={32} className="fill-foreground/60" />,
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}/gestor-unidade/veiculo-unidade-salvar`,
          },
          {
            title: "Adicionar Escala Unidade",
            icon: <IconCalendar width={32} className="fill-foreground/60" />,
            url: `/servicos/unidades/${compSelected.name}-${compSelected.id}/gestor-unidade/escala-unidade-salvar`,
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
            icon: <IconBuildPlus width={32} className="fill-foreground/60" />,
            url: "/servicos/gestor/salvar-organizacao",
          },
          {
            title: "Privilégios",
            icon: <IconPrivileges width={32} className="fill-foreground/60" />,
            url: "/servicos/gestor/salvar-organizacao",
          },
          {
            title: "Adicionar Corporação",
            icon: <IconBuildPlus width={32} className="fill-foreground/60" />,
            url: "/servicos/gestor/salvar-organizacao",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {corp && <TeamSwitcher corp={corp} />}
        {corp?.companies && (
          <CompanySwitcher
            companies={corp?.companies}
            setCompSelectedAction={setCompSelected}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAdmin items={data.admin} />

        {/*<NavProjects projects={data.admin} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            ...session?.user,
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
            image: session?.user?.image ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
