import Link from "next/link";
import React, { type ReactNode, Suspense } from "react";
import { LuCar } from "react-icons/lu";

import VehicleCorporationForm from "@/app/(private)/(modules)/components/VehicleCorporationForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { Button } from "@/ui/button";
import { GetAllVehiclesCorporationsAction } from "@/actions/vehicle/GetAllVehiclesCorporationsAction";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

const SalvarUnidade = async ({
  params,
}: {
  params: Promise<{ id_veiculo: string }>;
}): Promise<ReactNode> => {
  const resolvedSearchParams = await params;
  const { id_veiculo } = resolvedSearchParams;
  const idVeiculo = id_veiculo?.split("-")[1];
  const session = await getServerSession(authOptions);
  const { data: corporations } = await GetAllCorporationsAction();

  const { data: vehicles } = await GetAllVehiclesCorporationsAction(
    session?.id_corporation ?? "",
  );
  const { data: companies } = await GetAllCompaniesAction(
    session?.id_corporation ?? "",
  );

  const myVehicle = vehicles?.find((vehicle) => vehicle?.id === idVeiculo);

  return (
    <>
      <CardDefault
        title="Veículos"
        description="Gerenciar Veículos"
        image={myVehicle?.image}
        imageMobile={myVehicle?.image}
        icon={<LuCar size={28} />}
      >
        <div>
          {corporations !== null && corporations !== undefined ? (
            <Suspense fallback={<LoadingPage pending={true} />}>
              <VehicleCorporationForm
                corporations={corporations}
                companies={companies}
                myVehicle={myVehicle ?? null}
                idCorporation={session?.id_corporation ?? ""}
              />
            </Suspense>
          ) : (
            <CardWithLogo
              title="Usuário sem corporacao"
              description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
            >
              <Link href="/contact">
                <Button>Solicitar inclusão</Button>
              </Link>
            </CardWithLogo>
          )}
        </div>
      </CardDefault>
    </>
  );
};
export default SalvarUnidade;
