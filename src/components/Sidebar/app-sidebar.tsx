"use client";

import React, { ComponentProps, useEffect, useState } from "react";

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
import { CompanySwitcher } from "@/components/Sidebar/company-switcher";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { NavAdmin } from "@/components/Sidebar/nav-admin";
import { useParams } from "next/navigation";
import { NavTicket } from "./nav-ticket";
import { getValidImageUrl } from "@/functions/checkImageUrl";

interface AppSidebarProps {
  corp?: IOrganizacaoSchema;
  companies?: IUnidadeSchema[];
}

export function AppSidebar({
  corp,
  companies,
  ...props
}: AppSidebarProps & ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const params = useParams();
  const [compSelected, setCompSelected] = useState(
    companies ? companies[0] : {},
  );
  const idCompanyParam = params.id_company;
  const idCompany =
    (idCompanyParam?.slice(-24) as string) ?? (session?.id_company as string);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (idCompany) {
      const comp = companies?.find((comp) => comp?.id === idCompany);
      setCompSelected(comp as IUnidadeSchema);
    }
  }, [idCompany, session?.id_company, companies]);

  useEffect(() => {
    // Ensure userImage is null if session?.user?.image is undefined or null
    const userImage = session?.user?.image || null;
    const imageUrlPromisse = getValidImageUrl(userImage);
    imageUrlPromisse.then((item) => {
      setImageUrl(item);
    });
    // Use the same expression for the dependency
  }, [session?.user?.image]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {corp && <TeamSwitcher corp={corp} />}
        {companies && (
          <CompanySwitcher
            companies={companies}
            setCompSelectedAction={setCompSelected}
            idCompany={idCompany}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain compSelected={compSelected} session={session} />
        {session?.role === "admin" && <NavAdmin compSelected={compSelected} />}
        <NavTicket compSelected={compSelected} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            ...session,
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
            image: imageUrl ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
