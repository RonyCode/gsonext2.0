import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { LuListChecks, LuUsers } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { authOptions } from "@/lib/auth";
import { Button } from "@/ui/button";
import { getMembersCorporation } from "@/lib/getMembersCorporation";
import { IMemberSchema } from "@/schemas/MemberSchema";
import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";

const MembrosUnidade = async () => {
  const session = await getServerSession(authOptions);
  const { data: membersFound } = await getMembersCorporation(
    session?.id_corporation ?? "",
  );
  return (
    <div>
      {
        <CardDefault
          title={"Efetivo de minha corporação"}
          description="Membros"
          image={process.env.NEXT_PUBLIC_API_GSO + "/public/images/members.jpg"}
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO + "/public/images/members.jpg"
          }
          icon={<LuUsers size={28} />}
          iconDescription={<LuListChecks size={18} />}
        >
          {membersFound !== undefined ? (
            <div className="overflow-scroll p-4 lg:overflow-hidden">
              {membersFound != null && (
                <DataTableMembers
                  columns={columnsMembers}
                  data={membersFound as IMemberSchema[]}
                />
              )}
            </div>
          ) : (
            <CardWithLogo
              title="Usuário sem Corporação"
              description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
            >
              <Link href="/contact">
                <Button>Solicitar inclusão</Button>
              </Link>
            </CardWithLogo>
          )}
        </CardDefault>
      }
    </div>
  );
};
export default MembrosUnidade;
