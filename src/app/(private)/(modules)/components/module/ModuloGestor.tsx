import { CardModule } from '../../../../../../../teste/src/components/Cards/CardModule'
import IconBuildPlus from '../../../../../../../teste/public/icons/IconBuildPlus'
import IconCarFrontal from '../../../../../../../teste/public/icons/IconCarFrontal'
import IconMembers from '../../../../../../../teste/public/icons/IconMembers'
import IconOpenBook from '../../../../../../../teste/public/icons/IconOpenBook'
import IconPrivileges from '../../../../../../../teste/public/icons/IconPrivileges'
import IconPuzzle from '../../../../../../../teste/public/icons/IconPuzzle'

const ModuloGestor = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
})=> {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Adicionar Unidade"
            subtitle="Add Unidade"
            link={`/servicos/gestor/salvar-unidade`}
            icon={<IconBuildPlus width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Adicionar Organização"
          subtitle="Add Organização"
          link={`/servicos/gestor/salvar-organizacao`}
          icon={<IconBuildPlus width={58} className="ml-1" />}
        />
        <CardModule
          title="Adicionar Membro"
          subtitle="Add Membro Corporação"
          link={`/servicos/gestor/salvar-membro`}
          icon={<IconMembers width={58} className="ml-1" />}
        />{' '}
        <CardModule
          title="Adicionar Veículo"
          subtitle="Add Veiculo Corporação"
          link={`/servicos/gestor/salvar-veiculo`}
          icon={<IconCarFrontal width={58} className="ml-1" />}
        />
        <CardModule
          title="Privilégios"
          subtitle="Gerenciar privilégios"
          link={`/servicos/gestor/privilegios`}
          icon={<IconPrivileges width={80} className="ml-1" />}
        />
        <CardModule
          title="Leis"
          subtitle="Acervo de leis "
          link={`/servicos/gestor/leis`}
          icon={<IconOpenBook width={80} />}
        />{' '}
        <CardModule
          title="Modulos"
          subtitle="Salvar Modulos"
          link={`/servicos/gestor/modulos`}
          icon={<IconPuzzle width={60} />}
        />{' '}
      </div>
    </>
  )
}
export default ModuloGestor
