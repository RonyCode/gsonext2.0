import { CardModule } from "@/components/Cards/CardModule";
import IconBuildPlus from "@/icons/IconBuildPlus";
import IconCarFrontal from "@/icons/IconCarFrontal";
import IconMembers from "@/icons/IconMembers";
import IconOpenBook from "@/icons/IconOpenBook";
import IconPrivileges from "@/icons/IconPrivileges";
import IconPuzzle from "@/icons/IconPuzzle";
import IconCalendar from "@/icons/IconCalendar";
import IconSirene from "@/icons/IconSirene";
import IconManager from "@/icons/IconManager";

const ModuloGestor = async () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Gestão Unidade"
            subtitle="Gerenciar Unidades"
            link={`/servicos/gestor/unidade`}
            icon={<IconBuildPlus width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Gestão Corporacão"
          subtitle="Gerenciar Corporacão"
          link={`/servicos/gestor/corporacao`}
          icon={<IconBuildPlus width={58} className="ml-1" />}
        />
        <CardModule
          title="Gestão Membros"
          subtitle="Gerenciar Membros"
          link={`/servicos/gestor/membro`}
          icon={<IconMembers width={58} className="ml-1" />}
        />{" "}
        <CardModule
          title="Gestão Veículos"
          subtitle="Gerenciar Veiculo"
          link={`/servicos/gestor/veiculo`}
          icon={<IconCarFrontal width={58} className="ml-1" />}
        />
        <CardModule
          title="Gestão Escalas"
          subtitle="Gerenciar Escala"
          link={`/servicos/gestor/escala`}
          icon={<IconCalendar width={58} className="ml-1" />}
        />
        <CardModule
          title="Gestão Ocorrências"
          subtitle="Gerenciar Ocorrência"
          link={`/servicos/gestor/ocorrencia`}
          icon={<IconSirene width={58} className="ml-1" />}
        />
        <CardModule
          title="Gestão Usuários"
          subtitle="Gerenciar Usuários"
          link={`/servicos/usuario`}
          icon={<IconManager width={58} className="ml-1" />}
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
        />{" "}
        <CardModule
          title="Modulos"
          subtitle="Salvar Modulos"
          link={`/servicos/gestor/modulos`}
          icon={<IconPuzzle width={60} />}
        />{" "}
      </div>
    </>
  );
};
export default ModuloGestor;
