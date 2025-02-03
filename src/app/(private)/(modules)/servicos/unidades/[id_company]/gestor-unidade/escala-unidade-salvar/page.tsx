import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuSaveAll } from 'react-icons/lu'

import TabScheduleSave from '@/app/(private)/(modules)/components/TabScheduleSave'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

export const metadata: Metadata = {
  title: 'GSO | salvar escala',
  description: 'Página de escalas do site GSO.',
}

const SalvarEscala = async ({
  params,
  searchParams,
}: {
  params: { id_company: string }
  searchParams: { cod_unidade: string; date_schedule: string }
}): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })
  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === params?.id_company?.split('-')[1]) {
      return comp
    }
  })

  console.log(searchParams?.date_schedule)
  return (
    <>
      <CardDefault
        title={'Salvar Escala em: ' + companyFound?.name}
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/escala.png'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/escala.png'
        }
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null && companyFound !== undefined && (
            <TabScheduleSave
              dateSchedule={searchParams?.date_schedule}
              unidade={companyFound}
            />
          )}
        </div>
      </CardDefault>
    </>
  )
}
export default SalvarEscala
