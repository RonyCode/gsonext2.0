import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { LuBuilding } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { Calendar } from "lucide-react";
import { getAllSchedulesCompany } from "@/lib/getAllSchedulesCompany";
import { getCompanyById } from "@/lib/GetCompanyById";

const EscalasUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  const { id_company } = resolvedParams;
  const idCorporation = session?.id_corporation;
  const idCompany = id_company?.split("-")[1];

  const { data: schedules } = await getAllSchedulesCompany(
    idCorporation ?? "",
    idCompany ?? "",
  );

  const { data: companyFound } = await getCompanyById(
    idCorporation ?? "",
    idCompany ?? "",
  );

  return (
    <>
      <CardDefault
        title={companyFound?.name + " / " + companyFound?.companyAddress?.city}
        description={"Escalas da minha Unidade"}
        image={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        icon={<LuBuilding size={28} />}
        iconDescription={<Calendar size={18} />}
      >
        {schedules != null && (
          <div className="m-0 min-h-screen w-full md:p-6">
            <Suspense fallback={<LoadingPage pending={true} />}>
              <CalendarGsoV1 company={companyFound} schedules={schedules} />
            </Suspense>
          </div>
        )}
      </CardDefault>
    </>
  );
};
export default EscalasUnidade;
