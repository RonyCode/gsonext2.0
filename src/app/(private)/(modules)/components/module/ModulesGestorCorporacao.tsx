import React from "react";

import { CardModule } from "@/components/Cards/CardModule";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import IconEditSave from "@/icons/IconEditSave";
import IconBuildPlus from "@/icons/IconBuildPlus";

const ModulesGestorCorporacao = ({
  corporation,
}: {
  corporation?: IOrganizacaoSchema;
}) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <CardModule
            title="Editar / Salvar"
            subtitle="Salvar Corporação"
            link={`/servicos/gestor/corporacao/${corporation?.short_name_corp.toLowerCase() + "-" + corporation?.id} /salvar`}
            icon={<IconEditSave width={54} />}
          />
          <CardModule
            title="Adicionar Corporação"
            subtitle="Adicionar nova Corporação"
            link={`/servicos/gestor/corporacao/${corporation?.short_name_corp.toLowerCase() + "-" + corporation?.id} /salvar`}
            icon={<IconBuildPlus width={54} />}
          />
        </div>
      </div>
    </>
  );
};
export default ModulesGestorCorporacao;
