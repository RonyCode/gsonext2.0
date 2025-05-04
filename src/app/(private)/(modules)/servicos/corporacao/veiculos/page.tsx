export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuCarFront, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import TabCarsDetails from "@/app/(private)/(modules)/components/TabCarsDetails";
import { getAllVehiclesCorporation } from "@/lib/getAllVehiclesCorporation";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const VehicleCompany = async () => {
  const session = await getServerSession(authOptions);
  const { data: vehicles } = await getAllVehiclesCorporation(
    session?.id_corporation ?? "",
  );
  const { data } = await getAllOrganizacoes();

  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  return (
    <CardDefault
      title={
        corpFound?.name !== undefined && corpFound?.name !== null
          ? corpFound?.short_name_corp + " / " + corpFound?.address?.city
          : "Corporação não encontrada!"
      }
      description={"Veículos Corporação"}
      image={corpFound?.image}
      imageMobile={corpFound?.image}
      icon={<LuBuilding size={28} />}
      iconDescription={<LuCarFront size={18} />}
    >
      <div className="md:overflow-none overflow-scroll">
        {vehicles !== null || true ? (
          <TabCarsDetails vehicles={vehicles} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {session?.id_corporation === undefined ||
            session?.id_corporation == null ? (
              <CardWithLogo
                title="Usuário sem Corporação"
                description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
              >
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center"
                >
                  <Button>Solicitar inclusão</Button>
                </Link>
              </CardWithLogo>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM UNIDADE
                CADASTRADA 🤯
              </span>
            )}
          </div>
        )}
      </div>
    </CardDefault>
  );
};
export default VehicleCompany;
