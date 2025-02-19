import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuCalendarCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getMyUnidade } from "@/lib/GetMyUnidade";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";

const MinhaEscala = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions);

  const { data } = await getMyUnidade(
    session?.id_corporation,
    session?.id_company,
    session?.id,
  );
  return (
    <>
      <CardDefault
        title="Minha Escala"
        description={data?.name}
        image="https://apexpublicschool.com/assets/images/calender.jpg"
        imageMobile="https://apexpublicschool.com/assets/images/calender.jpg"
        icon={<LuCalendarCheck size={28} />}
      >
        <div>
          {data?.schedules !== null &&
            data?.schedules !== undefined &&
            data !== null && (
              <CalendarGsoV1 company={data} dayEvent={data.schedules} />
            )}
        </div>{" "}
      </CardDefault>
    </>
  );
};
export default MinhaEscala;
