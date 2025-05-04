import type { Metadata } from "next";
import React from "react";

import { CardModule } from "@/components/Cards/CardModule";
import IconBuild from "@/icons/IconBuild";
import IconCalendar from "@/icons/IconCalendar";
import IconCarFrontal from "@/icons/IconCarFrontal";
import IconCelular from "@/icons/IconCelular";
import IconCog from "@/icons/IconCog";
import IconGrafico from "@/icons/IconGrafico";
import IconMembers from "@/icons/IconMembers";
import IconSirene from "@/icons/IconSirene";

export const metadata: Metadata = {
  title: "GSO | Gestor unidade",
  description: "Página de escalas do site GSO.",
};
const Modules = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <div className="group">
            <CardModule
              title="Escalas"
              subtitle="Serviço de escala"
              link={`/servicos/escalas`}
              icon={<IconCalendar width={54} />}
            />{" "}
          </div>
          <CardModule
            title="Ocorrências"
            subtitle="Ocorrências"
            link={`/servicos/ocorrencias`}
            icon={<IconSirene width={58} />}
          />{" "}
          <CardModule
            title="Unidades"
            subtitle="Gerenciar unidades"
            link={`/servicos/corporacao/unidades`}
            icon={<IconBuild width={58} />}
          />{" "}
          <CardModule
            title="Corporação"
            subtitle="Serviço de sua Corporação"
            link={`/servicos/corporacao`}
            icon={<IconBuild width={54} />}
          />{" "}
          <CardModule
            title="Dashboard"
            subtitle="Estatítiscas gerais"
            link={`/servicos/dashboard`}
            icon={<IconGrafico width={58} />}
          />{" "}
          <CardModule
            title="Aplicativo"
            subtitle="Novidades do nosso App"
            link={`/servicos/app`}
            icon={<IconCelular width={60} />}
          />{" "}
          <CardModule
            title="Área do Gestor"
            subtitle="Serviço de gestão"
            link={`/servicos/corporacao/gestor`}
            icon={<IconCog width={58} />}
          />{" "}
          <CardModule
            title="Efetivo"
            subtitle="Gerenciar membros"
            link={`/servicos/corporacao/membros`}
            icon={<IconMembers width={58} />}
          />{" "}
          <CardModule
            title="Veículos"
            subtitle="Gerenciar veículos"
            link={`/servicos/corporacao/veiculos`}
            icon={<IconCarFrontal width={58} />}
          />{" "}
        </div>
      </div>
    </>
  );
};
export default Modules;
