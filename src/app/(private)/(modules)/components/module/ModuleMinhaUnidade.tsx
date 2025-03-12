import React from "react";

import { CardModule } from "@/components/Cards/CardModule";
import IconBuild from "@/icons/IconBuild";
import IconCarFrontal from "@/icons/IconCarFrontal";
import IconCog from "@/icons/IconCog";
import IconList from "@/icons/IconList";
import IconMembers from "@/icons/IconMembers";

const ModuleMinhaUnidade = ({
  params,
}: {
  params?: { id_company: string };
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <CardModule
          title="Minha unidade"
          subtitle="Detalhes da minha unidade"
          link={`/servicos/unidades/${params?.id_company?.toLowerCase()}/detalhes`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Efetivo"
          subtitle="Membros da minha unidade"
          link={`/servicos/unidades/${params?.id_company?.toLowerCase()}/membros`}
          icon={<IconMembers width={50} className="ml-1" />}
        />
        <CardModule
          title="Veículos"
          subtitle="Carros da minha unidade"
          link={`/servicos/unidades/${params?.id_company?.toLowerCase()}/veiculos`}
          icon={<IconCarFrontal width={64} className="ml-1" />}
        />
        <CardModule
          title="Escalas"
          subtitle="Escalas da minha unidade"
          link={`/servicos/unidades/${params?.id_company?.toLowerCase()}/escalas`}
          icon={<IconList width={64} className="ml-1" />}
        />
      </div>
    </>
  );
};
export default ModuleMinhaUnidade;
