import React from 'react'

import { CardModule } from '../../../../../../../../teste/src/components/Cards/CardModule'
import IconBuild from '../../../../../../../../teste/public/icons/IconBuild'
import IconBuildPlus from '../../../../../../../../teste/public/icons/IconBuildPlus'
import IconCarFrontal from '../../../../../../../../teste/public/icons/IconCarFrontal'
import IconEditSave from '../../../../../../../../teste/public/icons/IconEditSave'
import IconList from '../../../../../../../../teste/public/icons/IconList'
import IconMembers from '../../../../../../../../teste/public/icons/IconMembers'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'

const ModuleUnidades = ({
  params,
}: {
  params?: { sigla: string; name_unidade: string }
  unidadeFound?: IUnidadeSchema
}) => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <CardModule
          title="Add+ / Editar"
          subtitle="Detalhes da minha unidade"
          link={`/servicos/unidades/salvar-unidade`}
          icon={<IconEditSave width={52} className="ml-1" />}
        />
        <CardModule
          title="Unidades"
          subtitle="Lista de unidades"
          link={`/servicos/unidades/lista-unidades`}
          icon={<IconList width={60} className="ml-1" />}
        />
        <CardModule
          title="Carros"
          subtitle="Carros da minha unidade"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/carros`}
          icon={<IconCarFrontal width={64} className="ml-1" />}
        />
        <CardModule
          title="Escalas"
          subtitle="Escalas da minha unidade"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/escalas`}
          icon={<IconList width={60} className="ml-1" />}
        />
      </div>
    </>
  )
}
export default ModuleUnidades
