import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import OrganizacaoForm from '@/app/(private)/(modules)/components/OrganizacaoForm'
import { CardDefault } from '../../../../../../../teste/src/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'

const Organizacao = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const dataStates = await getAllStates()
  const session = await getServerSession(authOptions)
  const organizacaoFound = data?.find((organizacao) => {
    return organizacao?.id === session?.id_corporation
  })
  return (
    <>
      <CardDefault
        title="Minha Corporação"
        description="Gerenciar Corporação"
        image={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/bannerCorp.jpg'
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/bannerCorp.jpg'
        }
        icon={<LuBuilding2 size={28} />}
      >
        <OrganizacaoForm organizacao={organizacaoFound} states={dataStates} />
      </CardDefault>
    </>
  )
}

export default Organizacao
