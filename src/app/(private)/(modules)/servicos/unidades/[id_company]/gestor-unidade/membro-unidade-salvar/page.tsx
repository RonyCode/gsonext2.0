import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuSaveAll, LuUsers } from "react-icons/lu";

import { MemberCompanyForm } from "@/app/(private)/(modules)/components/MemberCompanyForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { Building } from "lucide-react";

export const metadata: Metadata = {
  title: "GSO | unidades",
  description: "Página de unidades do site GSO.",
};

const SalvarMembro = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const { data } = await getAllOrganizacoes();

  const session = await getServerSession(authOptions);
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  const idPramas = id_company?.split("-")[1];

  const companyFound = corpFound?.companies?.find(
    (comp) => comp?.id === idPramas,
  );

  return (
    <>
      <CardDefault
        title={
          companyFound?.name && companyFound?.companyAddress?.city
            ? companyFound?.name + " / " + companyFound?.companyAddress?.city
            : "Salvar Membro Unidade"
        }
        description={"Salvar Membro Unidade"}
        image={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/escala.png"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/escala.png"
        }
        icon={<Building size={28} />}
        iconDescription={<LuUsers />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          <MemberCompanyForm
            idCompany={id_company?.split("-")[1]}
            idCorporation={session?.id_corporation}
          />
        </div>
      </CardDefault>
    </>
  );
};
export default SalvarMembro;
