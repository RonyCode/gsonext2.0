import { CardDefault } from "@/components/Cards/CardDefault";
import { getMembersCompanyById } from "@/lib/GetMembersCompanyById";
import { IMemberSchema } from "@/schemas/MemberSchema";

const MemberDetails = async ({
  params,
}: {
  params: Promise<{ id_member: string; id_company: string }>;
}) => {
  const resolvedParams = await params;
  const { id_member, id_company } = resolvedParams;
  const { data: members } = await getMembersCompanyById(
    id_company?.split("-")[1].toString(),
  );
  const memberFOunded = members?.find(
    (member: IMemberSchema) =>
      member?.id_user?.toString() === id_member?.split("-")[1].toString(),
  );

  return (
    <CardDefault
      title={memberFOunded?.competence + " - " + memberFOunded?.name}
      description={memberFOunded?.email ?? ""}
      image={memberFOunded?.image}
      imageMobile={memberFOunded?.image}
    >
      teste
    </CardDefault>
  );
};
export default MemberDetails;
