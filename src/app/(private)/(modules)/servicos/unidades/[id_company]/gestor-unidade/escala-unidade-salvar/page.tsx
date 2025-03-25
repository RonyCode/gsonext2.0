import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuSaveAll, LuSearchX } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import TabScheduleSave from "@/app/(private)/(modules)/components/TabScheduleSave";
import { getCompanyById } from "@/lib/GetCompanyById";
import { getScheduleById } from "@/lib/GetScheduleById";
import { getAllVehiclesCompany } from "@/lib/getAllVehiclesCompany";
import { getMembersCompanyById } from "@/lib/GetMembersCompanyById";

export const metadata: Metadata = {
  title: "GSO | salvar escala",
  description: "Página de escalas do site GSO.",
};

const SalvarEscala = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id_company: string }>;
  searchParams: Promise<{
    cod_unidade: string;
    date_schedule: string;
    id_schedule: string;
  }>;
}): Promise<ReactNode> => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { date_schedule } = resolvedSearchParams;
  const { id_schedule } = resolvedSearchParams;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);

  const idCompany = id_company?.split("-")[1];
  const idCorporation = session?.id_corporation ?? "";
  const idSchedule = id_schedule ?? "";
  const dateScheduleParams = date_schedule;

  const { data: companyFound } = await getCompanyById(idCorporation, idCompany);
  const { data: vehiclesFound } = await getAllVehiclesCompany(
    idCorporation,
    idCompany,
  );
  const { data: membersFound } = await getMembersCompanyById(idCompany);

  const { data: scheduleFound } = await getScheduleById(
    idCorporation,
    idCompany,
    idSchedule,
  );

  return (
    <>
      <CardDefault
        title={"Salvar Escala em: " + companyFound?.name}
        image={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/escala.png"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/escala.png"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null && companyFound !== undefined ? (
            <TabScheduleSave
              idCompany={idCompany}
              idCorporation={idCorporation}
              dateSchedule={dateScheduleParams}
              scheduleCompany={scheduleFound}
              membersCompany={membersFound}
              vehiclesCompany={vehiclesFound}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {" "}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM UNIDADE
                PARA ADICIONAR ESCALA 🤯
              </span>
            </div>
          )}
        </div>
      </CardDefault>
    </>
  );
};
export default SalvarEscala;
