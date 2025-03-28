import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/TabUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { getAllStates } from "@/lib/getAllStates";

const MinhaUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const { data } = await getAllOrganizacoes();
  const session = await getServerSession(authOptions);
  const states = await getAllStates();

  const corpFound = data?.find((corp) => {
    if (corp?.id === session?.id_corporation) {
      return corp;
    }
    return null;
  });

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === id_company?.split("-")[1]) {
      return comp;
    }
    return null;
  });

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + " / " + companyFound?.companyAddress?.city
          }
          description={"Minha unidade"}
          image={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            <TabUnidadeDetails
              unidade={companyFound}
              corporations={data}
              states={states}
            />
          </div>
        </CardDefault>
      }
    </div>
  );
};
export default MinhaUnidade;
