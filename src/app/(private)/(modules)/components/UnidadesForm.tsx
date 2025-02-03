import React, { use } from 'react'

import TabUnidadeDetails from './TabUnidadeDetails'

import { ImageExist } from '@/functions/ImageExist'
import { getAllStates } from '@/lib/getAllStates'
import { getUnidadeById } from '@/lib/GetUnidadeById'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  params: { id: string; id_corporation: string }
}

export const UnidadesForm = ({
  params,
}: UserRegisterFormProps) => {
  const { data } = use(getUnidadeById(params.id_corporation, params.id))
  const states = use(getAllStates())

  const result = use(ImageExist(data?.image))
  if (result.status !== 200 && data?.image) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  return (
    <main className="grid flex-1 items-start md:p-4 ">
      <Tabs defaultValue="dadosGerais">
        <div className="absolute flex items-center justify-between md:relative ">
          <TabsList>
            <TabsTrigger value="dadosGerais">Dados gerais</TabsTrigger>
            <TabsTrigger value="efetivo">Efetivo</TabsTrigger>
            <TabsTrigger value="viaturas">Viaturas</TabsTrigger>
            <TabsTrigger value="listaEscala">Escalas</TabsTrigger>
          </TabsList>
        </div>{' '}
        <div className="mt-14 md:mt-0">
          <TabsContent value="dadosGerais">
            <TabUnidadeDetails unidade={data} states={states} />
          </TabsContent>
          <TabsContent value="efetivo">
            {/* <TabMembersDetails members={data?.members} /> */}
          </TabsContent>
          <TabsContent value="viaturas"></TabsContent>
          <TabsContent value="listaEscala"></TabsContent>
        </div>
      </Tabs>
    </main>
  )
}
export default UnidadesForm
