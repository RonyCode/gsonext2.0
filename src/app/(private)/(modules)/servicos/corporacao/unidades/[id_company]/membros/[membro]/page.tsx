import { CardDefault } from "@/components/Cards/CardDefault";
import { ImageExist } from "@/functions/ImageExist";
import { getUnidadeById } from "@/lib/GetCompanyById";

const Members = async ({
  params,
}: {
  params: Promise<{ sigla: string; name_unidade: string; membro: string }>;
}) => {
  const resolvedParams = await params;
  const { sigla, name_unidade, membro } = resolvedParams;
  const { data } = await getUnidadeById(
    sigla?.split("-")[1],
    name_unidade?.split("-")[1],
  );
  const memberFOunded = data?.members?.find(
    (member) =>
      member?.id_user?.toString() === membro?.split("-")[1].toString(),
  );

  const imgValided = await ImageExist(memberFOunded?.image);
  if (imgValided.status !== 200 && memberFOunded?.image != null) {
    memberFOunded.image =
      process.env.NEXT_PUBLIC_API_GSO + "/public/images/avatar.png";
  }

  return (
    <CardDefault
      title={memberFOunded?.competence + " - " + memberFOunded?.name}
      description={memberFOunded?.email ?? ""}
      image={
        memberFOunded?.image ??
        process.env.NEXT_PUBLIC_API_GSO + "/public/images/avatar.png"
      }
      imageMobile={
        memberFOunded?.image ??
        process.env.NEXT_PUBLIC_API_GSO + "/public/images/avatar.png"
      }
    >
      teste
    </CardDefault>
  );
};
export default Members;
