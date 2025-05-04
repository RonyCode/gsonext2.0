import { getServerSession } from "next-auth";
import React from "react";
import { LuCar, LuSearchX } from "react-icons/lu";

import VehicleCompanyForm from "@/app/(private)/(modules)/components/VehicleCompanyForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { searchVehicleWithoutCompany } from "@/lib/searchVehicleWithoutCompany";
import { Building } from "lucide-react";
import { getCompanyById } from "@/lib/GetCompanyById";

const MembrosUnidade = async ({
  params,
}: {
  params: Promise<{ sigla: string; id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const idCompany = id_company?.split("-")[1];
  const idCorporation = session?.id_corporation ?? "";

  const { data: vehicles } = await searchVehicleWithoutCompany(
    session?.id_corporation,
  );

  const { data: companyFound } = await getCompanyById(idCorporation, idCompany);

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name && companyFound?.companyAddress?.city
              ? companyFound?.name + " / " + companyFound?.companyAddress?.city
              : "Veículos Unidade"
          }
          description={"Salvar Veículos Unidade"}
          image={companyFound?.image}
          imageMobile={companyFound?.image}
          icon={<Building size={28} />}
          iconDescription={<LuCar />}
        >
          {companyFound?.id_corporation != null &&
          vehicles != null &&
          id_company != null ? (
            <div className="overflow-scroll">
              <VehicleCompanyForm
                vehicles={vehicles}
                idCorporation={session?.id_corporation}
                idCompany={id_company}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {" "}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM VEÍCULOS
                CADASTRADOS OU VEÍCULOS JÁ ALOCADOS EM UNIDADES 🤯
              </span>
            </div>
          )}
        </CardDefault>
      }
    </div>
  );
};
export default MembrosUnidade;
