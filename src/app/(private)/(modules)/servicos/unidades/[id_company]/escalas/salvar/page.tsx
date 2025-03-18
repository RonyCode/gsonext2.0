import { LuCalendarDays } from "react-icons/lu";

import TabScheduleSave from "@/app/(private)/(modules)/components/TabScheduleSave";
import { CardDefault } from "@/components/Cards/CardDefault";
import { ImageExist } from "@/functions/ImageExist";
import { getUnidadeById } from "@/lib/GetUnidadeById";

const SalvarEscala = async ({
  params,
  searchParams,
}: {
  params: Promise<{ sigla: string; name_unidade: string }>;
  searchParams: Promise<{ id_schedule: string }>;
}) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { id_schedule } = resolvedSearchParams;
  const { sigla, name_unidade } = resolvedParams;
  const { data } = await getUnidadeById(
    sigla?.split("-")[1],
    name_unidade?.split("-")[1],
  );
  const scheduleFound = data?.schedules?.find(
    (schedule: { id?: string | null | undefined }) =>
      schedule?.id === id_schedule,
  );

  const imgValided = await ImageExist(data?.image);
  if (imgValided.status !== 200 && data?.image != null) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg";
  }
  return (
    <>
      <CardDefault
        title={`Escala ${data?.name}`}
        description="Editar/Salvar"
        icon={<LuCalendarDays size={28} />}
        image={
          data?.image ??
          process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        imageMobile={
          data?.image ??
          process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
      >
        {scheduleFound !== null && true && (
          <TabScheduleSave unidade={data} schedule={scheduleFound} />
        )}
      </CardDefault>
    </>
  );
};
export default SalvarEscala;
