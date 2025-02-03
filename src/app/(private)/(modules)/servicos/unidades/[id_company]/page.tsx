import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import ModuleMinhaUnidade from '@/app/(private)/(modules)/components/module/ModuleMinhaUnidade'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

export const metadata: Metadata = {
  title: 'GSO | unidade',
  description: 'Página de escalas do site GSO.',
}
const MinhaUnidade = async ({
  params,
}: {
  params: { id_company: string }
}) => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)

  const corpFound = data?.find((corp) => {
    if (corp?.id === session?.id_corporation) {
      return corp
    }
    return null
  })

  const companyFounded = corpFound?.companies?.find((company) => {
    if (company?.id === params?.id_company?.split('-')[1]) {
      return company
    }
    return null
  })

  const diretor = corpFound?.members?.find((member) => {
    if (member?.id === companyFounded?.director) {
      return member
    }
    return null
  })
  return (
    <div>
      {
        <CardDefault
          title={
            companyFounded?.name + ' / ' + companyFounded?.companyAddress?.city
          }
          description={'CMD : ' + diretor?.competence + ' - ' + diretor?.name}
          image={
            process.env.NEXT_PUBLIC_API_GSO && companyFounded?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFounded?.image
              : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO && companyFounded?.image
              ? process.env.NEXT_PUBLIC_API_GSO + companyFounded?.image
              : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="p-4">
            <ModuleMinhaUnidade params={params} />
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default MinhaUnidade
