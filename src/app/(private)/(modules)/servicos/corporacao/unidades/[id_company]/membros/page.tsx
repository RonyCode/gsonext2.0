import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { getMembersCompanyById } from "@/lib/GetMembersCompanyById";
import { getCompanyById } from "@/lib/GetCompanyById";
import { authOptions } from "@/lib/auth";
import { IMemberSchema } from "@/schemas/MemberSchema";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MembrosUnidade = async ({
  params,
}: {
  params: Promise<{ id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_company } = resolvedParams;
  const session = await getServerSession(authOptions);
  const idCompanyParams = id_company.split("-")[1];
  const idCorp = session?.id_corporation ?? "";

  const { data: companyFound } = await getCompanyById(idCorp, idCompanyParams);

  const { data: companyMembersFound } =
    await getMembersCompanyById(idCompanyParams);

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name !== undefined && companyFound?.name !== null
              ? companyFound?.name + " / " + companyFound?.companyAddress?.city
              : "Unidade não encontrada!"
          }
          description="Membros da Unidade"
          image={companyFound?.image}
          imageMobile={companyFound?.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          {companyMembersFound != null && true ? (
            <DataTableMembers
              columns={columnsMembers}
              data={companyMembersFound as IMemberSchema[]}
            />
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
                  <LuSearchX size={28} className="text-primary/60" /> SEM
                  UNIDADE CADASTRADA 🤯
                </span>
              )}
            </div>
          )}
        </CardDefault>
      }
    </div>
  );
};
export default MembrosUnidade;
