import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuBuilding, LuCalendarCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import { GetCompanyByIdAction } from "@/actions/company/GetCompanyByIdAction";
import { getAllSchedulesCompany } from "@/lib/getAllSchedulesCompany";

const MinhaEscala = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions);

  const { data } = await GetAllCorporationsAction();
  const idCorporation = session?.id_corporation ?? "";
  const idCompany = session?.id_company ?? "";

  const { data: unidadeFound } = await GetCompanyByIdAction(
    session?.id_corporation ?? "",
    session?.id_company ?? "",
  );

  const { data: corporations } = await GetAllCorporationsAction();
  const corporationFound = corporations?.find(
    (corporation) => corporation.id === idCorporation,
  );

  const { data: schedules } = await getAllSchedulesCompany(
    idCorporation,
    idCompany,
  );

  return (
    <>
      <CardDefault
        title="Minhas Escalas"
        description={
          unidadeFound?.name + " / " + corporationFound?.short_name_corp
        }
        image="/images/calender.jpg"
        imageMobile="/images/calender.jpg"
        icon={<LuCalendarCheck size={28} />}
        iconDescription={<LuBuilding size={18} />}
      >
        <div>
          {schedules !== null && schedules !== undefined && data !== null && (
            <CalendarGsoV1 company={unidadeFound} schedules={schedules} />
          )}
        </div>{" "}
      </CardDefault>
    </>
  );
};
export default MinhaEscala;
