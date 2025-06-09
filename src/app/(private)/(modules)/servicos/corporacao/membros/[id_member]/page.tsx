import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { authOptions } from "@/lib/auth";
import { IMemberSchema } from "@/schemas/MemberSchema";
import { getMembersCorporation } from "@/lib/getMembersCorporation";
import MemberDetail from "@/app/(private)/(modules)/components/MemberDetail";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

import { IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";

const MembrosUnidade = async ({
  params,
}: {
  params: Promise<{ id_member: string }>;
}) => {
  const resolvedParams = await params;
  const { id_member } = resolvedParams;
  const session = await getServerSession(authOptions);
  const idMemberParams = id_member.split("-")[1];
  const idCorp = session?.id_corporation ?? "";

  const { data: corporationMembersFound } = await getMembersCorporation(idCorp);
  const { data: corporations } = await GetAllCorporationsAction();
  const { data: companies } = await GetAllCompaniesAction(idCorp);

  const corporationsFounded = corporations?.find(
    (corporation: IOrganizacaoSchema) =>
      corporation?.id?.toString() === idCorp?.toString(),
  );
  const memberFound = corporationMembersFound?.find(
    (member: IMemberSchema) =>
      member?.id_user?.toString() === idMemberParams?.toString(),
  );

  return (
    <div>
      {
        <CardDefault
          title={memberFound?.name ?? ""}
          description={memberFound?.competence ?? ""}
          image={memberFound?.image}
          imageMobile={memberFound?.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          {memberFound != null && true ? (
            <div className="p-4">
              <MemberDetail
                member={memberFound}
                corporation={corporationsFounded}
                companies={companies}
              />
            </div>
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
