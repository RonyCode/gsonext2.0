import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { LuBuilding } from "react-icons/lu";

import TabUnidadeDetails from "@/app/(private)/(modules)/components/ListaUnidadeDetails";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { GetAllCorporationsAction } from "@/actions/corporation/GetAllCorporationsAction";
const Page = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions);
  const { data } = await GetAllCorporationsAction();

  const corporacaoFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  const unidadeFound = corporacaoFound?.companies?.find((unidade) => {
    return unidade?.members?.some((member) => member?.id_user === session?.id);
  });
  const states = await getAllStates();
  return (
    <>
      <CardDefault
        title={unidadeFound?.name}
        image={unidadeFound?.image}
        imageMobile={unidadeFound?.image}
        description={unidadeFound?.companyAddress?.city}
        icon={<LuBuilding size={28} />}
      >
        <div className="w-full">
          <TabUnidadeDetails
            corporations={data}
            company={unidadeFound}
            states={states}
          />
        </div>{" "}
      </CardDefault>{" "}
    </>
  );
};
export default Page;
