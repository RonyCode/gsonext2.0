import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";

const EscalasUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const { data } = await getAllOrganizacoes();
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === id_company?.split("-")[1]) {
      return comp.schedules;
    }
    return null;
  });

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
          <div className="m-0 min-h-screen w-full md:p-6">
            <CalendarGsoV1
              company={companyFound}
              dayEvent={companyFound.schedules}
            />
          </div>
        )}
      </CardDefault>
    </>
  );
};
export default EscalasUnidade;
