import { type Metadata } from "next";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { LuSaveAll } from "react-icons/lu";

import MemberForm from "@/app/(private)/(modules)/components/ListMemberCorporation";
import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { Button } from "@/ui/button";

export const metadata: Metadata = {
  title: "GSO | Membros",
  description: "Página de unidades do site GSO.",
};

const SalvarMembro = async (): Promise<ReactNode> => {
  const { data } = await GetAllCorporationsAction();
  return (
    <>
      <CardDefault
        title="Salvar Membro Corporação"
        description="Gerenciar Membros"
        image={"/public/images/members.jpg"}
        imageMobile={"/public/images/members.jpg"}
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {data !== null && data !== undefined ? (
            <MemberForm corporations={data} />
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
export default SalvarMembro;
