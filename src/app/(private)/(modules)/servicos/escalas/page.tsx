import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuCalendarDays } from "react-icons/lu";

import SelectCompanySchedule from "@/app/(private)/(modules)/components/SelectCompanySchedule";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllCompanies } from "@/lib/getAllCompanies";

export const metadata: Metadata = {
  title: "GSO | Escalas",
  description: "Página de escalas do site GSO.",
};

const Escala = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) return <> </>;
  const idCorporation = session?.id_corporation ?? "";
  const { data: companies } = await getAllCompanies(idCorporation);

  return (
    <div>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        image={process.env.NEXT_PUBLIC_API_GSO + "/public/images/calendar.jpg"}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + "/public/images/calendar.jpg"
        }
        icon={<LuCalendarDays size={28} />}
      >
        {companies !== undefined && (
          <div className="md:p-4">
            <SelectCompanySchedule unidades={companies} />
          </div>
        )}
      </CardDefault>
    </div>
  );
};
export default Escala;
