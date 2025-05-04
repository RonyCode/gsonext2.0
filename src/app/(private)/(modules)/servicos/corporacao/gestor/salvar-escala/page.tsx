import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { LuSaveAll } from "react-icons/lu";

import TabScheduleSave from "@/app/(private)/(modules)/components/TabScheduleSave";
import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { Button } from "@/ui/button";
import type { IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";

export const metadata: Metadata = {
  title: "GSO | unidades",
  description: "Página de unidades do site GSO.",
};
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}
const SalvarEscala = async ({
  searchParams,
}: PageProps): Promise<ReactNode> => {
  const { cod_unidade, date_schedule } = await searchParams;

  const { data } = await getAllOrganizacoes();
  const session = await getServerSession(authOptions);
  const corpFound = data?.find((corp: IOrganizacaoSchema) => {
    return corp?.id === session?.id_corporation;
  });
  const companyFound = corpFound?.companies?.find(
    (comp) => cod_unidade === comp.id,
  );
  return (
    <>
      <CardDefault
        title="Salvar Escala Corporação"
        description="Gerenciar Escalas"
        image={"/public/images/escala.png"}
        imageMobile={"/public/images/escala.png"}
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null && date_schedule !== undefined ? (
            <TabScheduleSave
              dateSchedule={date_schedule as string}
              unidade={companyFound}
            />
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
export default SalvarEscala;
