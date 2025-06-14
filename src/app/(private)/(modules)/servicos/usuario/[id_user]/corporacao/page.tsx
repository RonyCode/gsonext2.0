export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuBuilding2 } from "react-icons/lu";

import OrganizacaoForm from "@/app/(private)/(modules)/components/OrganizacaoForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";

const MinhaOrganizacao = async ({
  params,
}: {
  params: Promise<{ id_usuario: string }>;
}): Promise<ReactNode> => {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  const { id_usuario } = resolvedParams;
  const idUsuario = id_usuario?.split("-")[1];

  const state = await getAllStates();
  const { data } = await GetAllCorporationsAction();
  const idCorporation = session?.id_corporation;
  const organizacaoFound = data?.find((item) => {
    if (item?.id !== undefined && item?.id !== null) {
      return item?.id === idCorporation;
    }
  });
  return (
    <>
      {organizacaoFound !== undefined && organizacaoFound !== null && (
        <CardDefault
          title={
            organizacaoFound?.short_name_corp + " / " + organizacaoFound?.phone
          }
          description="Minha Corporação"
          image={organizacaoFound?.image}
          imageMobile={organizacaoFound?.image}
          icon={<LuBuilding2 />}
          iconDescription={<LuBuilding2 />}
        >
          <OrganizacaoForm organizacao={organizacaoFound} states={state} />
        </CardDefault>
      )}
    </>
  );
};
export default MinhaOrganizacao;
