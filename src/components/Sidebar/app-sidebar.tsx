"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { CorporationSwitcher } from "./corporation-switcher";
import { CompanySwitcher } from "./company-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { NavAdmin } from "@/components/Sidebar/nav-admin";
import { NavTicket } from "./nav-ticket";
import { getValidImageUrl } from "@/functions/checkImageUrl";
import { NavDev } from "@/components/Sidebar/nav-dev";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";
import { IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const params = useParams();

  const [corp, setCorp] = useState<IOrganizacaoSchema>(
    {} as IOrganizacaoSchema,
  );
  const [companies, setCompanies] = useState<IUnidadeSchema[]>([]);
  const [compSelected, setCompSelected] = useState<IUnidadeSchema>(
    {} as IUnidadeSchema,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const idCompany =
    (params.id_company as string)?.slice(-24) ??
    (session?.id_company as string);

  useEffect(() => {
    if (session?.id_corporation) {
      const fetchData = async () => {
        const [corporationResponse, companiesResponse] = await Promise.all([
          GetAllCorporationsAction(),
          GetAllCompaniesAction(session.id_corporation),
        ]);

        setCorp(
          corporationResponse.data?.find(
            (c) => c.id === session.id_corporation,
          ) ?? ({} as IOrganizacaoSchema),
        );
        setCompanies(companiesResponse.data ?? []);
      };

      fetchData();
    }
  }, [session?.id_corporation]);

  useEffect(() => {
    if (idCompany && companies.length > 0) {
      const companyFound = companies.find((c) => c.id === idCompany);
      setCompSelected(companyFound ?? {});
    }
  }, [idCompany, companies]);

  useEffect(() => {
    console.log(session);
    const userImage =
      session?.image || session?.picture || session?.user?.image;
    if (userImage) {
      getValidImageUrl(userImage).then(setImageUrl);
    } else {
      setImageUrl(null);
    }
  }, [session?.image, session?.picture, session?.user?.image]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {corp?.id && <CorporationSwitcher corp={corp} />}
        {companies.length > 0 && (
          <CompanySwitcher
            companies={companies}
            setCompSelectedAction={setCompSelected}
            idCompany={idCompany}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* ...seu conteúdo ... */}
        <NavMain compSelected={compSelected} session={session} />
        {(session?.role === "admin" || session?.role === "dev") && (
          <NavAdmin compSelected={compSelected} />
        )}
        {session?.role === "dev" && <NavDev compSelected={compSelected} />}
        {(session?.role === "dev" ||
          session?.role === "admin" ||
          session?.role === "manager") && (
          <NavTicket compSelected={compSelected} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            id: session?.id ?? "",
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
            is_profile_complete: session?.is_profile_complete ?? null,
            image: imageUrl ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
