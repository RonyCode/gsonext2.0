import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuCalendarDays, LuSearchX } from "react-icons/lu";

import SelectCompanySchedule from "@/app/(private)/(modules)/components/SelectCompanySchedule";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import Link from "next/link";
import { Button } from "@/ui/button";

export const metadata: Metadata = {
  title: "GSO | Escalas",
  description: "Página de escalas do site GSO.",
};

const Escala = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) return <> </>;
  const idCorporation = session?.id_corporation ?? "";
  const { data: companies } = await GetAllCompaniesAction(idCorporation);

  return (
    <div>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        image={"/public/images/calendar.jpg"}
        imageMobile={"/public/images/calendar.jpg"}
        icon={<LuCalendarDays size={28} />}
      >
        {companies !== undefined ? (
          <div className="md:p-4">
            <SelectCompanySchedule unidades={companies} />
          </div>
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
      </CardDefault>
    </div>
  );
};
export default Escala;
