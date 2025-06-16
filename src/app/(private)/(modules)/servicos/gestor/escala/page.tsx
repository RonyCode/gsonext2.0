import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuSaveAll, LuSearchX } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import TabScheduleSave from "@/app/(private)/(modules)/components/TabScheduleSave";
import { cookies } from "next/headers";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";
import { GetAllVehiclesCompanyAction } from "@/actions/vehicle/GetAllVehiclesCompanyAction";
import { GetAllMembersCompanyAction } from "@/actions/member/GetAllMembersCompanyAction";
import { SearchScheduleAction } from "@/actions/schedule/SearchScheduleAction";

export const metadata: Metadata = {
  title: "GSO | salvar escala",
  description: "Página de escalas do site GSO.",
};

const SalvarEscala = async ({
  searchParams,
}: {
  params: Promise<{ id_company: string }>;
  searchParams: Promise<{
    date_schedule: string;
    id_escala: string;
  }>;
}): Promise<ReactNode> => {
  const resolvedSearchParams = await searchParams;
  const { date_schedule } = resolvedSearchParams;
  const { id_escala } = resolvedSearchParams;

  const idSchedule = id_escala ?? "";
  const dateScheduleParams = date_schedule;

  const { data: schedules } = await SearchScheduleAction(idSchedule);
  const scheduleFound = schedules?.find(
    (schedule) => schedule.id === idSchedule,
  );
  const { data: membersFound } = await GetAllMembersCompanyAction(
    scheduleFound?.id_company ?? "",
  );

  const { data: companyFound } = await GetCompanyByIdAction(
    scheduleFound?.id_corporation ?? "",
    scheduleFound?.id_company ?? "",
  );
  const { data: vehiclesFound } = await GetAllVehiclesCompanyAction(
    scheduleFound?.id_corporation ?? "",
    scheduleFound?.id_company ?? "",
  );

  const subscriptionsUser = (await cookies()).get("subscription")?.value;

  return (
    <>
      <CardDefault
        title={"Salvar Escala em: " + companyFound?.name}
        image={"/public/images/escala.png"}
        imageMobile={"/public/images/escala.png"}
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null && companyFound !== undefined ? (
            <TabScheduleSave
              subscriptionsUser={JSON.stringify(subscriptionsUser)}
              idCompany={scheduleFound?.id_company ?? ""}
              idCorporation={scheduleFound?.id_corporation ?? ""}
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
