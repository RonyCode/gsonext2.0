import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuCalendarCheck } from 'react-icons/lu'

import TabUnidadeDetails from '@/app/(private)/(modules)/components/TabUnidadeDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllStates } from '@/lib/getAllStates'
import { getMyUnidade } from '@/lib/GetMyUnidade'

const Page = async (): Promise<ReactNode> => {
  const sesssion = await getServerSession(authOptions)
  const { data } = await getMyUnidade(
    sesssion?.id_corporation,
    sesssion?.id_company,
    sesssion?.id,
  )

  const states = await getAllStates()
  return (
    <>
      <CardDefault
        title={data?.name}
        image={
          process.env.NEXT_PUBLIC_API_GSO != null && data?.image != null
            ? process.env.NEXT_PUBLIC_API_GSO + data?.image
            : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO != null && data?.image != null
            ? process.env.NEXT_PUBLIC_API_GSO + data.image
            : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        description={data?.companyAddress?.city}
        icon={<LuCalendarCheck size={28} />}
      >
        <div>
          <TabUnidadeDetails unidade={data} states={states} />
        </div>{' '}
      </CardDefault>{' '}
    </>
  )
}
export default Page
