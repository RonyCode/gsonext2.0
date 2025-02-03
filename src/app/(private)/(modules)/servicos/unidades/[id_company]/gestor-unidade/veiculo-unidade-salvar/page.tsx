import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import VehicleCompanyForm from '@/app/(private)/(modules)/components/VehicleCompanyForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { searchVehicleWithoutCompany } from '@/lib/searchVehicleWithoutCompany'

const MembrosUnidade = async ({
  params,
}: {
  params: { sigla: string; id_company: string }
}) => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const result = await searchVehicleWithoutCompany(session?.id_corporation)

  const companyFound = corpFound?.companies?.find((comp) => {
    return comp?.id === params?.id_company?.split('-')[1]
  })
  console.log(result)

  revalidatePath('/')

  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + ' / ' + companyFound?.companyAddress?.city
          }
          description="Veículos minha unidade"
          image={
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/frota-cars.jpg'
          }
          imageMobile={
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/frota-cars.jpg'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          {companyFound?.id_corporation != null &&
          result?.data != null &&
          params?.id_company != null ? (
            <div className="overflow-scroll">
              <VehicleCompanyForm
                vehicles={result?.data}
                idCorporation={session?.id_corporation}
                idCompany={params?.id_company}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {' '}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM VEÍCULOS
                CADASTRADOS 🤯
              </span>
            </div>
          )}
        </CardDefault>
      }
    </div>
  )
}
export default MembrosUnidade
