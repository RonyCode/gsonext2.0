import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuBuilding2, LuSearchX } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { ListCompaniesDetails } from "@/app/(private)/(modules)/components/ListCompaniesDetails";
import { getAllCompanies } from "@/lib/getAllCompanies";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GSO | Unidades",
  description: "Página de escalas do site GSO.",
};

const listaUnidades = async () => {
  const session = await getServerSession(authOptions);
  const { data } = await getAllCompanies(session?.id_corporation);

  return (
    <CardDefault
      title="Unidades"
      description="Minhas Unidades"
      iconDescription={<LuBuilding size={18} />}
      image={"/public/images/modules.jpg"}
      imageMobile={"/public/images/modules.jpg"}
      icon={<LuBuilding2 size={28} />}
    >
      <div className="md:overflow-none h-full w-full overflow-scroll">
        {data !== undefined && data?.length > 0 ? (
          <ListCompaniesDetails companies={data} />
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
export default listaUnidades;
