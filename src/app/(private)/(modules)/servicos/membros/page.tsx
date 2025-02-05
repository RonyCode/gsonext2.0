import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React from 'react'
import { LuListChecks, LuUsers } from 'react-icons/lu'

import SelectMembersCorporation from '@/app/(private)/(modules)/components/SelectMembersCorporation'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { columnsMembers } from '@/components/DataTables/DataTableMembers/columnsMembers'
import { DataTableMembers } from '@/components/DataTables/DataTableMembers/data-table-members'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { Button } from '@/ui/button'

const MembrosUnidade = async ()=> {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const organizacaoFound = data?.find((organizacao) => {
    return organizacao?.id === session?.id_corporation
  })
  return (
    <div>
      {
        <CardDefault
          title={'Efetivo de minha corporação'}
          description="Membros"
          image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/members.jpg'}
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/members.jpg'
          }
          icon={<LuUsers size={28} />}
          iconDescription={<LuListChecks size={18} />}
        >
          {organizacaoFound !== undefined ? (
            <div className="overflow-scroll p-4 lg:overflow-hidden">
              {organizacaoFound?.members != null && (
                <DataTableMembers
                  columns={columnsMembers}
                  data={organizacaoFound?.members}
                />
              )}
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
      }
    </div>
  )
}
export default MembrosUnidade
