import { type Metadata } from "next";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { LuSquareMenu } from "react-icons/lu";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/ListaUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { getAllStates } from "@/lib/getAllStates";
import { Button } from "@/ui/button";

export const metadata: Metadata = {
  title: "GSO | unidades",
  description: "Página de unidades do site GSO.",
};

const SalvarUnidade = async (): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes();
  const dataStates = await getAllStates();

  return (
    <>
      <CardDefault
        title="Unidades"
        description="Gerenciar unidades"
        image={"/public/images/manager1.jpg"}
        imageMobile={"/public/images/manager1.jpg"}
        icon={<LuSquareMenu size={28} />}
      >
        <div className="overflow-scroll p-6 lg:overflow-hidden">
          {data !== undefined &&
          data?.length > 0 &&
          dataStates !== undefined ? (
            <div>
              <TabUnidadeDetails states={dataStates} corporations={data} />
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
