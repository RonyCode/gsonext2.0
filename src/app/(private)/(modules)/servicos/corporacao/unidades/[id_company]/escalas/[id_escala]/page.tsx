import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuSaveAll, LuSearchX } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";
import { GetAllVehiclesCompanyAction } from "@/actions/vehicle/GetAllVehiclesCompanyAction";
import { GetAllMembersCompanyAction } from "@/actions/member/GetAllMembersCompanyAction";
import { SearchScheduleAction } from "@/actions/schedule/SearchScheduleAction";
import DetalhesEscalaForm from "@/app/(private)/(modules)/components/DetalesEscalaForm";

export const metadata: Metadata = {
  title: "GSO | salvar escala",
  description: "Página de escalas do site GSO.",
};

const DetalhesEscala = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id_escala: string; id_company: string }>;
  searchParams: Promise<{
    date_schedule: string;
  }>;
}): Promise<ReactNode> => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const session = await getServerSession(authOptions);
  const { date_schedule } = resolvedSearchParams;
  const { id_escala, id_company } = resolvedParams;
  const idCorporation = session?.id_corporation ?? "";

  const idSchedule = id_escala.split("-")[1] ?? "";
  const idCompany = id_company.split("-")[1] ?? "";
  const dateScheduleParams = date_schedule;

  const { data: schedules } = await SearchScheduleAction(
    idSchedule,
    "id_schedule",
  );

  const scheduleFound = schedules?.find(
    (schedule) => schedule.id === idSchedule,
  );
  const { data: membersFound } = await GetAllMembersCompanyAction(
    idCompany ?? "",
  );

  const { data: companyFound } = await GetCompanyByIdAction(
    idCorporation,
    idCompany,
  );
  const { data: vehiclesFound } = await GetAllVehiclesCompanyAction(
    idCorporation,
    idCompany,
  );

  const subscriptionsUser = (await cookies()).get("subscription")?.value;

  return (
    <>
      <CardDefault
        title={"Escala da unidade: " + companyFound?.name}
        image={companyFound?.image}
        imageMobile={companyFound?.image}
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null && companyFound !== undefined ? (
            <DetalhesEscalaForm
              subscriptionsUser={JSON.stringify(subscriptionsUser)}
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
export default DetalhesEscala;
