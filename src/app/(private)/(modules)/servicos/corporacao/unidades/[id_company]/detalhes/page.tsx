import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/ListaUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { getAllStates } from "@/lib/getAllStates";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";

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

  const { data: corporations } = await GetAllCorporationsAction();
  const { data: companyFound } = await GetCompanyByIdAction(
    idCorporation,
    idCompany,
  );
  const corporationFound = corporations?.find(
    (corporation) => corporation.id === idCorporation,
  );

  return (
    <div>
      <CardDefault
        title={
          companyFound?.name !== undefined && companyFound?.name !== null
            ? companyFound?.name + " / " + corporationFound?.short_name_corp
            : "Unidade não encontrada!"
        }
        description={"Minha unidade"}
        image={companyFound?.image}
        imageMobile={companyFound?.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        {companyFound !== undefined ? (
          <div>
            <TabUnidadeDetails
              company={companyFound}
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
