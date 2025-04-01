import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/TabUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { getAllStates } from "@/lib/getAllStates";
import { getCompanyById } from "@/lib/GetCompanyById";

const MinhaUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const states = await getAllStates();
  const idCorporation = session?.id_corporation ?? "";
  const idCompany = id_company.split("-")[1] ?? "";

  const { data: corporations } = await getAllOrganizacoes();
  const { data: companyFound } = await getCompanyById(idCorporation, idCompany);

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + " / " + companyFound?.companyAddress?.city
          }
          description={"Minha unidade"}
          image={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            <TabUnidadeDetails
              unidade={companyFound}
              corporations={corporations}
              states={states}
            />
          </div>
        </CardDefault>
      }
    </div>
  );
};
export default MinhaUnidade;
