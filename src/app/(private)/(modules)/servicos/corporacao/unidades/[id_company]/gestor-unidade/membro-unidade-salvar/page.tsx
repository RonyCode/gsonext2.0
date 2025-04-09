import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuUsers } from "react-icons/lu";

import { MemberCompanyForm } from "@/app/(private)/(modules)/components/MemberCompanyForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { Building } from "lucide-react";
import { getCompanyById } from "@/lib/GetCompanyById";

export const metadata: Metadata = {
  title: "GSO | salvar membro unidade",
  description: "Página de unidades do site GSO.",
};

const SalvarMembro = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const idCompParam = id_company?.split("-")[1] ?? "";
  const idCorpParam = session?.id_corporation ?? "";

  const { data: companyFound } = await getCompanyById(idCorpParam, idCompParam);

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
            idCompany={id_company}
            idCorporation={idCorpParam}
          />
        </div>
      </CardDefault>
    </>
  );
};
export default SalvarMembro;
