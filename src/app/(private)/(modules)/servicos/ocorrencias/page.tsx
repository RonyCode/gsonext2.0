import React, { type ReactNode } from "react";
import { LuCalendarDays } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import ModuloOcorrencia from "../../../components/module/ModuloOcorrencia";

const Ocorrencias = (): ReactNode => {
  return (
    <>
      <div>
        <CardDefault
          title="Escalas"
          description="Serviço de escala"
          image={
            process.env.NEXT_PUBLIC_API_GSO + "/public/images/calendar.jpg"
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO + "/public/images/calendar.jpg"
          }
          icon={<LuCalendarDays size={28} />}
        >
          <div>
            <ModuloOcorrencia />
            {/*<SelectCompanySchedule*/}
            {/*  unidades={unidades?.data}*/}
            {/*  functions={functions?.data}*/}
            {/*/>*/}
          </div>
        </CardDefault>
      </div>
    </>
  );
};
export default Ocorrencias;
