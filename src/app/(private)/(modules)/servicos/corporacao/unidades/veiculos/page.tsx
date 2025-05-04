import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import TabCarsDetails from "@/app/(private)/(modules)/components/TabCarsDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllVehiclesCompany } from "@/lib/getAllVehiclesCompany";
import { getCompanyById } from "@/lib/GetCompanyById";

const CarsUnidade = async ({
  params,
}: {
  params: Promise<{ sigla: string; id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const idCompany = id_company.split("-")[1];
  const { data: companyFound } = await getCompanyById(
    session?.id_corporation ?? "",
    idCompany,
  );

  const { data: vehicles } = await getAllVehiclesCompany(
    session?.id_corporation ?? "",
    idCompany,
  );

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + " / " + companyFound?.companyAddress?.city
          }
          description={"CMD : "}
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
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            {vehicles !== null && vehicles !== undefined ? (
              <TabCarsDetails vehicles={vehicles} />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {" "}
                <span className="flex items-center justify-center gap-1">
                  <LuSearchX size={28} className="text-primary/60" /> SEM
                  VEÍCULOS CADASTRADOS NESTA UNIDADE 🤯
                </span>
              </div>
            )}
          </div>
        </CardDefault>
      }
    </div>
  );
};
export default CarsUnidade;
