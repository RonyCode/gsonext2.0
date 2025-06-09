import { getServerSession } from "next-auth";
import React from "react";
import { LuCog, LuCrown } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
import ModulesGestorCorporacao from "@/app/(private)/(modules)/components/module/ModulesGestorCorporacao";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.id_corporation == null) {
    toast({
      variant: "warning",
      title:
        "Usuário ainda não pertence a uma corporação, por favor solicite sua inclusão  ! 🤯 ",
      description: "Usuário sem corporação",
    });
  }

  const { data: corporations } = await GetAllCorporationsAction();
  const corpFound = corporations?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  return (
    <>
      <CardDefault
        title={corpFound?.short_name_corp + " / " + corpFound?.address?.city}
        description="Área do Gestor Corporação"
        image={corpFound?.image}
        imageMobile={corpFound?.image}
        icon={<LuCrown size={28} />}
        iconDescription={<LuCog size={18} />}
      >
        <div className="w-full">
          {" "}
          <ModulesGestorCorporacao corporation={corpFound} />
        </div>
      </CardDefault>
    </>
  );
};
export default Page;
