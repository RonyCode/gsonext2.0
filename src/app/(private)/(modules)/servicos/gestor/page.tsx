import React from "react";
import { LuCog, LuCrown } from "react-icons/lu";

import ModuloGestor from "../../components/module/ModuloGestor";

import { CardDefault } from "@/components/Cards/CardDefault";

const Page = async () => {
  return (
    <>
      <CardDefault
        title="Gestão Geral"
        description="Área do Gestor "
        image={"/public/images/manager.jpg"}
        imageMobile={"/public/images/manager.jpg"}
        icon={<LuCrown size={28} />}
        iconDescription={<LuCog size={18} />}
      >
        <div className="w-full">
          {" "}
          <ModuloGestor />
        </div>
      </CardDefault>
    </>
  );
};
export default Page;
