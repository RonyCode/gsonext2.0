import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { LuBuilding, LuBuilding2 } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { Button } from '@/ui/button'

export const metadata: Metadata = {
  title: 'GSO | Unidades',
  description: 'Página de escalas do site GSO.',
}

const listaUnidades = async () => {
  const session = await getServerSession(authOptions)
  const dataCorporacao = await getAllOrganizacoes()
  const corporacaoFound = dataCorporacao?.data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })


  return (
    <>
      <CardDefault
        title="Unidades"
        description="Minhas Unidades"
        iconDescription={<LuBuilding size={18} />}
        image={
          (process.env.NEXT_PUBLIC_API_GSO &&
            corporacaoFound?.image &&
            process.env.NEXT_PUBLIC_API_GSO + corporacaoFound?.image) ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/modules.png'
        }
        imageMobile={
          (process.env.NEXT_PUBLIC_API_GSO &&
            corporacaoFound?.image &&
            process.env.NEXT_PUBLIC_API_GSO + corporacaoFound?.image) ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/modules.png'
        }
        icon={<LuBuilding2 size={28} />}
      >
        {corporacaoFound?.companies !== undefined ? (
          <div className="overflow-scroll p-4 lg:overflow-hidden">
            <DataTableUnidades
              data={corporacaoFound.companies}
              columns={columnsUnidades}
            />
          </div>
        ) : (
          <CardWithLogo
            title="Usuário sem Corporação"
            description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
          >
            <Link href="/contact">
              <Button>Solicitar inclusão</Button>
            </Link>
          </CardWithLogo>
        )}
      </CardDefault>
    </>
  )
}
export default listaUnidades
