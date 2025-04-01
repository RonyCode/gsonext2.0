import Link from "next/link";
import React, { type ReactNode, Suspense } from "react";
import { LuCar } from "react-icons/lu";

import VehicleCorporationForm from "@/app/(private)/(modules)/components/VehicleCorporationForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { Button } from "@/ui/button";
import { getAllVehiclesCorporation } from "@/lib/getAllVehiclesCorporation";

const SalvarUnidade = async ({
  searchParams,
}: {
  searchParams: Promise<{ id_corporation: string; id_vehicle: string }>;
}): Promise<ReactNode> => {
  const resolvedSearchParams = await searchParams;
  const { id_vehicle } = resolvedSearchParams;

  const { data } = await getAllOrganizacoes();

  const corpFound = data?.find((corp) =>
    corp.vehicles?.find((vehicle) => vehicle?.id === id_vehicle),
  );

  const { data: vehicles } = await getAllVehiclesCorporation(
    corpFound?.id ?? "",
  );

  const myVehicle = vehicles?.find((vehicle) => vehicle?.id === id_vehicle);

  return (
    <>
      <CardDefault
        title="Veículos"
        description="Gerenciar Veículos"
        image={
          process.env.NEXT_PUBLIC_API_GSO != null
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/frota-cars.jpg"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO != null
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/frota-cars.jpg"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        icon={<LuCar size={28} />}
      >
        <div>
          {data !== null && data !== undefined ? (
            <Suspense fallback={<LoadingPage pending={true} />}>
              <VehicleCorporationForm
                corporations={data}
                myVehicle={myVehicle ?? null}
                idCorporation={corpFound?.id}
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
