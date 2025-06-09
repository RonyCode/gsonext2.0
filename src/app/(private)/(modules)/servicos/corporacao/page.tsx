import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuBuilding2 } from "react-icons/lu";
import OrganizacaoForm from "@/app/(private)/(modules)/components/OrganizacaoForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";

const Organizacao = async (): Promise<ReactNode> => {
  const { data } = await GetAllCorporationsAction();
  const dataStates = await getAllStates();
  const session = await getServerSession(authOptions);
  const organizacaoFound = data?.find((organizacao) => {
    return organizacao?.id === session?.id_corporation;
  });

  return (
    <CardDefault
      title="Minha Corporação"
      description="Gerenciar Corporação"
      image={organizacaoFound?.image}
      imageMobile={organizacaoFound?.image}
      icon={<LuBuilding2 size={28} />}
    >
      {organizacaoFound !== undefined && dataStates !== undefined ? (
        <OrganizacaoForm organizacao={organizacaoFound} states={dataStates} />
      ) : (
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
      )}
    </CardDefault>
  );
};

export default Organizacao;
