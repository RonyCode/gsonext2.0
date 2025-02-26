import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuCar, LuSearchX, LuUsers } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import VehicleCompanyForm from "@/app/(private)/(modules)/components/VehicleCompanyForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { searchVehicleWithoutCompany } from "@/lib/searchVehicleWithoutCompany";
import { Building } from "lucide-react";

const MembrosUnidade = async ({
  params,
}: {
  params: Promise<{ sigla: string; id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const { data } = await getAllOrganizacoes();
  const session = await getServerSession(authOptions);
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  const idPramas = id_company?.split("-")[1];

  const result = await searchVehicleWithoutCompany(session?.id_corporation);

  const companyFound = corpFound?.companies?.find((comp) => {
    return comp?.id === idPramas;
  });

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name && companyFound?.companyAddress?.city
              ? companyFound?.name + " / " + companyFound?.companyAddress?.city
              : "Veículos Unidade"
          }
          description={"Salvar Veículos Unidade"}
          image={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO +
                "/public/images/frota-cars.jpg"
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO +
                "/public/images/frota-cars.jpg"
          }
          icon={<Building size={28} />}
          iconDescription={<LuCar />}
        >
          {companyFound?.id_corporation != null &&
          result?.data != null &&
          id_company != null ? (
            <div className="overflow-scroll">
              <VehicleCompanyForm
                vehicles={result?.data}
                idCorporation={session?.id_corporation}
                idCompany={id_company}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {" "}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM VEÍCULOS
                CADASTRADOS OU VEÍCULOS JÁ ALOCADOS EM UNIDADES 🤯
              </span>
            </div>
          )}
        </CardDefault>
      }
    </div>
  );
};
export default MembrosUnidade;
