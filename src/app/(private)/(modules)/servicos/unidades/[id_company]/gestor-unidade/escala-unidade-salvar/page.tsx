import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuSaveAll } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import TabScheduleSave from "@/app/(private)/(modules)/components/TabScheduleSave";

export const metadata: Metadata = {
  title: "GSO | salvar escala",
  description: "Página de escalas do site GSO.",
};

const SalvarEscala = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id_company: string }>;
  searchParams: Promise<{ cod_unidade: string; date_schedule: string }>;
}): Promise<ReactNode> => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { date_schedule } = resolvedSearchParams;
  const { id_company } = resolvedParams;
  const { data } = await getAllOrganizacoes();
  const session = await getServerSession(authOptions);
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  const idPramas = id_company?.split("-")[1];
  const dateParams = date_schedule;

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === idPramas && idPramas !== undefined) {
      return comp;
    }
    return (
      <>
        <h1>Company no found!</h1>
      </>
    );
  });

  return (
    <>
      <CardDefault
        title={"Salvar Escala em: " + companyFound?.name}
        image={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/escala.png"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/escala.png"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null &&
            dateParams !== null &&
            companyFound !== undefined &&
            dateParams !== undefined && (
              <TabScheduleSave
                dateSchedule={dateParams}
                unidade={companyFound}
              />
            )}
        </div>
      </CardDefault>
    </>
  );
};
export default SalvarEscala;
