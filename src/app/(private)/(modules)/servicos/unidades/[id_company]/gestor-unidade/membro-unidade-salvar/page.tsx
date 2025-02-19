import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { LuSaveAll } from "react-icons/lu";

import { MemberCompanyForm } from "@/app/(private)/(modules)/components/MemberCompanyForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";

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
  const session = await getServerSession(authOptions);

  return (
    <>
      <CardDefault
        title="Salvar Membro Unidade"
        description="Gerenciar Membros"
        image={
          process.env.NEXT_PUBLIC_API_GSO
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/members.jpg"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO
            ? process.env.NEXT_PUBLIC_API_GSO + "/public/images/members.jpg"
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        icon={<LuSaveAll size={28} />}
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
