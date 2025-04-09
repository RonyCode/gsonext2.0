import type { Metadata } from "next";

import ModuloGestorUnidade from "@/app/(private)/(modules)/components/module/ModuloGestorUnidade";
import { CardDefault } from "@/components/Cards/CardDefault";
import IconBuildPlus from "@/icons/IconBuildPlus";

export const metadata: Metadata = {
  title: "GSO | Gestor Unidade",
  description: "Página de escalas do site GSO.",
};
const NovaUnidade = async ({
  params,
}: {
  params: Promise<{ sigla: string; id_company: string }>;
}) => {
  const resolvedParams = await params;
  return (
    <>
      <CardDefault
        title={"Gestão Unidade"}
        description={"Gestão de membros, veículos e escalas"}
        image={process.env.NEXT_PUBLIC_API_GSO + "/public/images/manager1.jpg"}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + "/public/images/manager1.jpg"
        }
        icon={
          <IconBuildPlus
            width={58}
            className="ml-1 fill-foreground/60 text-foreground/60"
          />
        }
      >
        <ModuloGestorUnidade params={resolvedParams} />
      </CardDefault>
    </>
  );
};

export default NovaUnidade;
