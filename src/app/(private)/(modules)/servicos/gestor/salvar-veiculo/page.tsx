import Link from 'next/link'
import React, { type ReactNode, Suspense } from 'react'
import { LuCar } from 'react-icons/lu'

import VehicleCorporationForm from '@/app/(private)/(modules)/components/VehicleCorporationForm'
import { CardDefault } from '../../../../../../../../teste/src/components/Cards/CardDefault'
import { CardWithLogo } from '../../../../../../../../teste/src/components/Cards/CardWithLogo'
import LoadingPage from '../../../../../../../../teste/src/components/Loadings/LoadingPage'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { Button } from '@/ui/button'

const SalvarUnidade = async ({
  searchParams,
}: {
  searchParams: { id_corporation: string; id_vehicle: string }
}): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const corpFound = data?.find((corp) =>
    corp.vehicles?.find((vehicle) => vehicle?.id === searchParams?.id_vehicle),
  )

  const myVehicle = corpFound?.vehicles?.find(
    (vehicle) => vehicle?.id === searchParams?.id_vehicle,
  )
  return (
    <>
      <CardDefault
        title="Veículos"
        description="Gerenciar Veículos"
        image={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/frota-cars.jpg'
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/frota-cars.jpg'
        }
        icon={<LuCar size={28} />}
      >
        <div>
          {data !== null && data !== undefined ? (
            <Suspense fallback={<LoadingPage pending={true} />}>
              <VehicleCorporationForm
                corporations={data}
                myVehicle={myVehicle ?? null}
                idCorporation={corpFound?.id}
              />
            </Suspense>
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
export default SalvarUnidade
