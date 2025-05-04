import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/ListaUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { getAllStates } from "@/lib/getAllStates";
import { getCompanyById } from "@/lib/GetCompanyById";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <CardDefault
        title={
          companyFound?.name !== undefined && companyFound?.name !== null
            ? companyFound?.name + " / " + companyFound?.companyAddress?.city
            : "Unidade não encontrada!"
        }
        description={"Minha unidade"}
        image={companyFound?.image}
        imageMobile={companyFound?.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        {companyFound !== undefined ? (
          <div className="md:overflow-none overflow-scroll">
            <TabUnidadeDetails
              unidade={companyFound}
              corporations={corporations}
              states={states}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CardWithLogo
              title="Usuário sem Corporação"
              description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
            >
              <Link
                href="/contact"
                className="flex w-full items-center justify-center"
              >
                <Button>Solicitar inclusão</Button>
              </Link>
            </CardWithLogo>
          </div>
        )}
      </CardDefault>
    </div>
  );
};
export default MinhaUnidade;
