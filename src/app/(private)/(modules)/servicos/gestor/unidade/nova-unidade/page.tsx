import { type Metadata } from "next";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { LuBuilding, LuSquareMenu } from "react-icons/lu";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/ListaUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { getAllStates } from "@/lib/getAllStates";
import { Button } from "@/ui/button";
import { LucideEdit3 } from "lucide-react";

export const metadata: Metadata = {
  title: "GSO | unidades",
  description: "Página de unidades do site GSO.",
};

const SalvarUnidade = async () => {
  const states = await getAllStates();

  const { data: corporations } = await GetAllCorporationsAction();

  return (
    <>
      <CardDefault
        title="Salvar Nova Unidade"
        description={"Salvar nova unidade"}
        image={"/public/images/img.svg"}
        imageMobile={"/public/images/img.svg"}
        icon={<LucideEdit3 size={28} />}
        iconDescription={<LuBuilding />}
      >
        <div className="overflow-scroll p-6 lg:overflow-hidden">
          {corporations !== undefined &&
          corporations?.length > 0 &&
          states !== undefined ? (
            <div>
              <TabUnidadeDetails states={states} corporations={corporations} />
            </div>
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
