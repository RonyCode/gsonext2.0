import { CardModule } from "@/components/Cards/CardModule";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import IconEditSave from "@/icons/IconEditSave";
import IconBuildPlus from "@/icons/IconBuildPlus";

const ModuloGestorUnidade = ({ company }: { company: IUnidadeSchema }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Editar / Salvar"
            subtitle="Salvar Unidade"
            link={`/servicos/gestor/unidade/${company?.name?.toLowerCase() + "-" + company?.id?.toLowerCase()}`}
            icon={<IconEditSave width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Adicionar Unidade"
          subtitle="Nova Unidade"
          link={`/servicos/gestor/unidade/nova-unidade`}
          icon={<IconBuildPlus width={58} className="ml-1" />}
        />
      </div>
    </>
  );
};
export default ModuloGestorUnidade;
