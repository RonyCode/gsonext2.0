import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { LuSaveAll } from 'react-icons/lu'

import TabScheduleSave from '@/app/(private)/(modules)/components/TabScheduleSave'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { Button } from '@/ui/button'
import type {IOrganizacaoSchema} from "@/schemas/OrganizacaoSchema";

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const SalvarEscala = async ({
  searchParams,
}: {
  searchParams: { cod_unidade: string; date_schedule: string }
}): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)
  const corpFound = data?.find((corp:IOrganizacaoSchema) => {
    return corp?.id === session?.id_corporation
  })
  const companyFound = corpFound?.companies?.find(
    (comp) => searchParams?.cod_unidade === comp.id,
  )
  return (
    <>
      <CardDefault
        title="Salvar Escala Corporação"
        description="Gerenciar Escalas"
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/escala.png'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/escala.png'
        }
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {companyFound !== null && companyFound !== undefined ? (
            <TabScheduleSave
              dateSchedule={searchParams?.date_schedule}
              unidade={companyFound}
            />
          ) : (
            <CardWithLogo
              title="Usuário sem corporacao"
              description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
            >
              <Link href="/contact">
                <Button>Solicitar inclusão</Button>
              </Link>
            </CardWithLogo>
          )}
        </div>
      </CardDefault>
    </>
  )
}
export default SalvarEscala
