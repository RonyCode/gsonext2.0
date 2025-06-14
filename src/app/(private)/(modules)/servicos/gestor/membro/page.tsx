import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { LuListChecks, LuSearchX, LuUsers } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { authOptions } from "@/lib/auth";
import { Button } from "@/ui/button";
import { IMemberSchema } from "@/schemas/MemberSchema";
import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { GetAllMembersCorporationsAction } from "@/actions/member/GetAllMembersCorporationsAction";

const MembrosCorporacao = async () => {
  const session = await getServerSession(authOptions);
  const { data: corporations } = await GetAllCorporationsAction();
  const { data: membersFound } = await GetAllMembersCorporationsAction(
    session?.id_corporation ?? "",
  );

  const corpFound = corporations?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  return (
    <div>
      {
        <CardDefault
          title={
            corpFound?.name !== undefined && corpFound?.name !== null
              ? corpFound?.short_name_corp + " / " + corpFound?.address?.city
              : "Corporação não encontrada!"
          }
          description="Membros"
          image={"/public/images/members.jpg"}
          imageMobile={"/public/images/members.jpg"}
          icon={<LuUsers size={28} />}
          iconDescription={<LuListChecks size={18} />}
        >
          {membersFound !== undefined ? (
            <div className="overflow-scroll p-4 lg:overflow-hidden">
              {membersFound != null && (
                <DataTableMembers
                  columns={columnsMembers}
                  data={membersFound as unknown as IMemberSchema[]}
                />
              )}
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
export default MembrosCorporacao;
