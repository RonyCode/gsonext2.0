import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuCarFront, LuSearchX } from "react-icons/lu";

import TabCarsDetails from "@/app/(private)/(modules)/components/TabCarsDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllVehiclesCompany } from "@/lib/getAllVehiclesCompany";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";

const CarsUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const idCompany = id_company.split("-")[1];
  const { data: companyFound } = await GetCompanyByIdAction(
    session?.id_corporation ?? "",
    idCompany,
  );
  const { data: corporations } = await GetAllCorporationsAction();
  const corporationFound = corporations?.find(
    (corporation) => corporation.id === session?.id_corporation,
  );

  const { data: vehicles } = await getAllVehiclesCompany(
    session?.id_corporation ?? "",
    idCompany,
  );

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name !== undefined && companyFound?.name !== null
              ? companyFound?.name + " / " + corporationFound?.short_name_corp
              : "Unidade não encontrada!"
          }
          description="Veículos da Unidade"
          image={companyFound?.image}
          imageMobile={companyFound?.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<LuCarFront size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            {vehicles !== null && vehicles !== undefined ? (
              <TabCarsDetails vehicles={vehicles} />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {session?.id_corporation === undefined ||
                session?.id_corporation == null ? (
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
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="flex items-center justify-center gap-1">
                      <LuSearchX size={28} className="text-primary/60" />
                      SEM VEÍCULOS CADASTRADOS NA UNIDADE 🤯. SOLICITAR INCLUSÃO
                      ?
                    </span>
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center"
                    >
                      <Button>Solicitar inclusão</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardDefault>
      }
    </div>
  );
};
export default CarsUnidade;
