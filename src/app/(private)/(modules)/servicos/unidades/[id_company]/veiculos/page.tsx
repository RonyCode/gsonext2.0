import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabCarsDetails from '@/app/(private)/(modules)/components/TabCarsDetails'
import { CardDefault } from '../../../../../../../../../teste/src/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'

const CarsUnidade = async ({
  params,
}: {
  params: { sigla: string; id_company: string }
}) => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const companyFound: IUnidadeSchema | undefined = corpFound?.companies?.find(
    (comp) => {
      if (comp?.id === params?.id_company?.split('-')[1]) {
        return comp
      }
      return null
    },
  )

  revalidatePath('/')
  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + ' / ' + companyFound?.companyAddress?.city
          }
          description={'CMD : '}
          image={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            {companyFound?.vehicles !== null ? (
              <TabCarsDetails cars={companyFound?.vehicles} />
            ) : (
              <div className="flex h-full w-full  items-center justify-center">
                {' '}
                <span className="flex items-center justify-center gap-1">
                  <LuSearchX size={28} className="text-primary/60" /> SEM
                  VEÍCULOS CADASTRADOS 🤯
                </span>
              </div>
            )}
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default CarsUnidade
