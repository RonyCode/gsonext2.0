import React from "react";
import { LuFolderCog } from "react-icons/lu";

import Modules from "@/app/(private)/(modules)/components/module/Modules";
import { CardDefault } from "@/components/Cards/CardDefault";

const Page = async () => {
  return (
    <>
      <CardDefault
        title="Serviços"
        description="Serviços disponíveis por modules"
        image={"/public/images/modules.png"}
        imageMobile={"/public/images/modules.png"}
        icon={<LuFolderCog size={28} />}
      >
        <Modules />
      </CardDefault>
    </>
  );
};
export default Page;
