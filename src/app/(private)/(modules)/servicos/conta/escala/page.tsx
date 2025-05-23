import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuCalendarCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";

const MinhaEscala = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions);

  const { data } = await getAllOrganizacoes();

  const corporacaoFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  const unidadeFound = corporacaoFound?.companies?.find((unidade) => {
    return unidade?.members?.some((member) => member?.id === session?.id);
  });
  return (
    <>
      <CardDefault
        title="Minha Escala"
        description={unidadeFound?.name}
        image="/images/calender.jpg"
        imageMobile="/images/calender.jpg"
        icon={<LuCalendarCheck size={28} />}
      >
        <div>
          {unidadeFound?.schedules !== null &&
            unidadeFound?.schedules !== undefined &&
            data !== null && (
              <CalendarGsoV1
                company={unidadeFound}
                schedules={unidadeFound?.schedules as IScheduleSchema[]}
              />
            )}
        </div>{" "}
      </CardDefault>
    </>
  );
};
export default MinhaEscala;
