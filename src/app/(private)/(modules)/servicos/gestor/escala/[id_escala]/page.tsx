import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { LuBuilding, LuCalendar1, LuSearchX } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { getAllSchedulesCompany } from "@/lib/getAllSchedulesCompany";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";
import { SearchScheduleAction } from "@/actions/schedule/SearchScheduleAction";

const EscalasUnidade = async ({
  searchParams,
}: {
  searchParams: Promise<{
    id_escala: string;
  }>;
}) => {
  const session = await getServerSession(authOptions);
  const resolvedSearchParams = await searchParams;
  const { id_escala } = resolvedSearchParams;
  const idSchedule = id_escala?.split("-")[1];

  const { data: schedules } = await SearchScheduleAction(idSchedule?.id ?? "");

  const { data: companyFound } = await GetCompanyByIdAction(
    session?.id_corporation ?? "",
    schedules?.find((schedule) => schedule.id === idSchedule)?.id_company ?? "",
  );

  const { data: corporations } = await GetAllCorporationsAction();
  const corporationFound = corporations?.find(
    (corporation) => corporation.id === session?.id_corporation,
  );

  return (
    <>
      <CardDefault
        title={
          companyFound?.name !== undefined && companyFound?.name !== null
            ? companyFound?.name + " / " + corporationFound?.short_name_corp
            : "Unidade não encontrada!"
        }
        description={"Escalas da minha Unidade"}
        image={companyFound?.image}
        imageMobile={companyFound?.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<LuCalendar1 size={18} />}
      >
        {schedules != null ? (
          <div className="m-0 min-h-screen w-full md:p-6">
            <Suspense fallback={<LoadingPage pending={true} />}>
              <CalendarGsoV1 company={companyFound} schedules={schedules} />
            </Suspense>
          </div>
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
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM UNIDADE
                CADASTRADA 🤯
              </span>
            )}
          </div>
        )}
      </CardDefault>
    </>
  );
};
export default EscalasUnidade;
