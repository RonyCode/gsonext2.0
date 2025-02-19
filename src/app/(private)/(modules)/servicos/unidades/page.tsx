import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuBuilding2, LuSearchX } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import TabCompaniesDetails from "@/app/(private)/(modules)/components/TabCompaniesDetails";

export const metadata: Metadata = {
  title: "GSO | Unidades",
  description: "Página de escalas do site GSO.",
};

const listaUnidades = async () => {
  const session = await getServerSession(authOptions);
  const dataCorporacao = await getAllOrganizacoes();
  const corporacaoFound = dataCorporacao?.data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  return (
    <CardDefault
      title="Unidades"
      description="Minhas Unidades"
      iconDescription={<LuBuilding size={18} />}
      image={
        (process.env.NEXT_PUBLIC_API_GSO &&
          corporacaoFound?.image &&
          process.env.NEXT_PUBLIC_API_GSO + corporacaoFound?.image) ??
        process.env.NEXT_PUBLIC_API_GSO + "/public/images/modules.png"
      }
      imageMobile={
        (process.env.NEXT_PUBLIC_API_GSO &&
          corporacaoFound?.image &&
          process.env.NEXT_PUBLIC_API_GSO + corporacaoFound?.image) ??
        process.env.NEXT_PUBLIC_API_GSO + "/public/images/modules.png"
      }
      icon={<LuBuilding2 size={28} />}
    >
      <div className="md:overflow-none h-full w-full overflow-scroll">
        {corporacaoFound !== null ? (
          <TabCompaniesDetails companies={corporacaoFound?.companies} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {" "}
            <span className="flex items-center justify-center gap-1">
              <LuSearchX size={28} className="text-primary/60" /> SEM UNIDADE
              CADASTRADA 🤯
            </span>
          </div>
        )}
      </div>
    </CardDefault>
  );
};
export default listaUnidades;
