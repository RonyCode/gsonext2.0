import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import CalendarGsoV2 from "@/components/CalendarGso/CalendarGsoV2";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllFunctions } from "@/lib/GetAllFunctions";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import CalendarGsoV3 from "@/components/CalendarGso/CalendarGsoV1";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";

const EscalasUnidade = async ({
  params,
}: {
  params: { id_company: string };
}) => {
  const session = await getServerSession(authOptions);
  const { data } = await getAllOrganizacoes();
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === params?.id_company?.split("-")[1]) {
      return comp;
    }
    return null;
  });

  const dayEvent: Partial<IScheduleSchema>[] = [
    { team: 1, day: 1, month: 1, year: 2025 }, // Evento do time ALFA em 1º de fevereiro de 2025
    { team: 2, day: 1, month: 1, year: 2025 }, // Evento do time ALFA em 1º de fevereiro de 2025
    { team: 2, day: 5, month: 1, year: 2025 }, // Evento do time BRAVO em 5 de fevereiro de 2025
    { team: 3, day: 10, month: 1, year: 2025 }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    { team: 4, day: 10, month: 1, year: 2025 }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    { team: 5, day: 10, month: 1, year: 2025 }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    { team: 2, day: 10, month: 1, year: 2025 }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    { team: 4, day: 15, month: 1, year: 2025 }, // Evento do time DELTA em 15 de fevereiro de 2025
    { team: 5, day: 20, month: 1, year: 2025 }, // Evento do time EXTRA em 20 de fevereiro de 2025
    { team: 1, day: 25, month: 1, year: 2025 }, // Evento do time ALFA em 25 de fevereiro de 2025
  ];
  return (
    <>
      <CardDefault
        title={companyFound?.name + " / " + companyFound?.companyAddress?.city}
        description={
          "CMD : " + companyFound?.director + " - " + companyFound?.director
        }
        image={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        {companyFound?.schedules != null && (
          <div className="m-0 w-full p-0 md:p-6">
            <CalendarGsoV3 dayEvent={dayEvent} />
          </div>
        )}
      </CardDefault>
    </>
  );
};
export default EscalasUnidade;
