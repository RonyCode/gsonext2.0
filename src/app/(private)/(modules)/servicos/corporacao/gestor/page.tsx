import { getServerSession } from "next-auth";
import React from "react";
import { LuCrown } from "react-icons/lu";

import ModuloGestor from "../../../../components/module/ModuloGestor";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.id_corporation == null) {
    toast({
      variant: "warning",
      title:
        "Usuário ainda não pertence a uma corporação, por favor solicite sua inclusão  ! 🤯 ",
      description: "Usuário sem corporação",
    });
    // redirect('/')
  }
  return (
    <>
      <CardDefault
        title="Gestor de Organizações"
        description="Área de Gestão"
        image={process.env.NEXT_PUBLIC_API_GSO + "/public/images/manager.jpg"}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + "/public/images/manager.jpg"
        }
        icon={<LuCrown size={28} />}
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
