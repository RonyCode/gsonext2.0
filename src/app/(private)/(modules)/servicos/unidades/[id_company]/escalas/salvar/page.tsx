import { LuCalendarDays } from 'react-icons/lu'

import TabScheduleSave from '@/app/(private)/(modules)/components/TabScheduleSave'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const SalvarEscala = async ({
  params,
  searchParams,
}: {
  params: { sigla: string; name_unidade: string }
  searchParams: Record<string, string | string[]>
}) => {
  const { data } = await getUnidadeById(
    params.sigla?.split('-')[1],
    params.name_unidade?.split('-')[1],
  )
  const scheduleFound = data?.schedules?.find(
    (schedule: { id: { toString: () => string | string[] } }) =>
      schedule?.id?.toString() === searchParams?.id_schedule,
  )
  const imgValided = await ImageExist(data?.image)
  if (imgValided.status !== 200 && data?.image != null) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  return (
    <>
      <CardDefault
        title={`Escala ${data?.name}`}
        description="Editar/Salvar"
        icon={<LuCalendarDays size={28} />}
        image={
          data?.image ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        imageMobile={
          data?.image ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
      >
        {scheduleFound !== null && true && (
          <TabScheduleSave unidade={data} schedule={scheduleFound} />
        )}
      </CardDefault>
    </>
  )
}
export default SalvarEscala
