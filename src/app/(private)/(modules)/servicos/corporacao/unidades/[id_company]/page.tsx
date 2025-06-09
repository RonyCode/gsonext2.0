import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuTextSearch } from "react-icons/lu";

import ModuleMinhaUnidade from "@/app/(private)/(modules)/components/module/ModuleMinhaUnidade";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";

export const metadata: Metadata = {
  title: "GSO | Unidades",
  description: "Módulo de unidades do site GSO.",
};
const MinhaUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);

  const id_compParams = id_company.split("-")[1] ?? "";
  const id_corporation = session?.id_corporation ?? "";
  const { data: corporations } = await GetAllCorporationsAction();
  const corporationFound = corporations?.find(
    (corporation) => corporation.id === id_corporation,
  );

  const { data: companyFound } = await GetCompanyByIdAction(
    id_corporation,
    id_compParams,
  );
  return (
    <div>
      {
        <CardDefault
          title={companyFound?.name + " / " + corporationFound?.short_name_corp}
          description={"Serviços da Unidade"}
          image={companyFound?.image}
          imageMobile={companyFound?.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<LuTextSearch size={18} />}
        >
          <div className="p-4">
            <ModuleMinhaUnidade params={resolvedParams} />
          </div>
        </CardDefault>
      }
    </div>
  );
};
export default MinhaUnidade;
