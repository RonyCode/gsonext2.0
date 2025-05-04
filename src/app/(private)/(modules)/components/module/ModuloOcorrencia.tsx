import { CardModule } from "@/components/Cards/CardModule";

import IconList from "@/icons/IconList";

import IconEditSave from "@/icons/IconEditSave";

const ModuloOcorrencia = async () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Editar / Salvar"
            subtitle="Salvar  Ocorrência"
            link={`/servicos/ocorrencias/salvar`}
            icon={<IconEditSave width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Ocorrências"
          subtitle="Lista de Ocorrências"
          link={`/servicos/ocorrencias/lista`}
          icon={<IconList width={58} className="ml-1" />}
        />
      </div>
    </>
  );
};
export default ModuloOcorrencia;
