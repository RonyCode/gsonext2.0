import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";

const MembrosUnidade = async ({
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

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === id_company?.split("-")[1]) {
      return comp;
    }
    return null;
  });

  const diretor = companyFound?.members?.find((member) => {
    if (member?.id === companyFound?.director) {
      return member;
    }
  });

  console.log(companyFound);
  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + " / " + companyFound?.companyAddress?.city
          }
          description={"CMD : " + diretor?.competence + " - " + diretor?.name}
          image={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          {companyFound?.members != null ? (
            <DataTableMembers
              columns={columnsMembers}
              data={companyFound.members}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {" "}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM EFETIVO
                CADASTRADOS 🤯
              </span>
            </div>
          )}
        </CardDefault>
      }
    </div>
  );
};
export default MembrosUnidade;
