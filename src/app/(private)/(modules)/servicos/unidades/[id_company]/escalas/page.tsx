import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import CalendarGsoV2 from '../../../../../../../../../teste/src/components/CalendarGso/CalendarGsoV2'
import { CardDefault } from '../../../../../../../../../teste/src/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const EscalasUnidade = async ({
  params,
}: {
  params: { id_company: string }
}) => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === params?.id_company?.split('-')[1]) {
      return comp
    }
    return null
  })

  const functions = await getAllFunctions()

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + ' / ' + companyFound?.companyAddress?.city
          }
          description={
            'CMD : ' + companyFound?.director + ' - ' + companyFound?.director
          }
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
          <div>
            {companyFound?.schedules != null && (
              <div className="p-6">
                <CalendarGsoV2
                  unidade={companyFound}
                  functions={functions?.data}
                />
              </div>
            )}
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default EscalasUnidade
