import { getServerSession } from "next-auth";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getMembersCorporation } from "@/lib/getMembersCorporation";

const Members = async ({ params }: { params: Promise<{ membro: string }> }) => {
  const resolvedParams = await params;
  const { membro } = resolvedParams;
  const session = await getServerSession(authOptions);
  const { data: membersFound } = await getMembersCorporation(
    session?.id_corporation ?? "",
  );
  const memberFOunded = membersFound?.find(
    (member) =>
      member?.id_user?.toString() === membro?.split("-")[1].toString(),
  );

  return (
    <CardDefault
      title={memberFOunded?.name ?? ""}
      description={memberFOunded?.email ?? ""}
      image={memberFOunded?.image}
      imageMobile={memberFOunded?.image}
    >
      teste
    </CardDefault>
  );
};
export default Members;
