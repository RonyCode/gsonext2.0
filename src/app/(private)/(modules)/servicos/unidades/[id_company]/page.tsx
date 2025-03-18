import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import ModuleMinhaUnidade from "@/app/(private)/(modules)/components/module/ModuleMinhaUnidade";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { getCompanyById } from "@/lib/GetUnidadeById";

export const metadata: Metadata = {
  title: "GSO | unidade",
  description: "Página de escalas do site GSO.",
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

  const { data } = await getCompanyById(id_corporation, id_compParams);
  return (
    <div>
      {
        <CardDefault
          title={data?.name + " / " + data?.companyAddress?.city}
          description={"CMD : "}
          image={
            process.env.NEXT_PUBLIC_API_GSO && data?.image
              ? process.env.NEXT_PUBLIC_API_GSO + data?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && data?.image
              ? process.env.NEXT_PUBLIC_API_GSO + data?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
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
