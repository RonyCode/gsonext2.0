export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import React  from "react";
import { LuBuilding, LuSearchX } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import TabCarsDetails from "@/app/(private)/(modules)/components/TabCarsDetails";



const VehicleCompany = async () => {
  const { data } = await getAllOrganizacoes();
  const session = await getServerSession(authOptions);

  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });
  return (
    <CardDefault
      title={corpFound?.name + " / " + corpFound?.address?.city}
      description={"CMD "}
      image={
        process.env.NEXT_PUBLIC_API_GSO !== null &&
        corpFound?.image != null
          ? process.env.NEXT_PUBLIC_API_GSO + corpFound?.image
          : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
      }
      imageMobile={
        process.env.NEXT_PUBLIC_API_GSO !== null &&
        corpFound?.image != null
          ? process.env.NEXT_PUBLIC_API_GSO + corpFound?.image
          : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
      }
      icon={<LuBuilding size={28} />}
      iconDescription={<MdOutlineSupervisorAccount size={18} />}
    >
      <div className="md:overflow-none overflow-scroll">
        {corpFound?.vehicles !== null || true ? (
              <TabCarsDetails vehicles={corpFound?.vehicles} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {" "}
            <span className="flex items-center justify-center gap-1">
              <LuSearchX size={28} className="text-primary/60" /> SEM VEÍCULOS
              CADASTRADOS 🤯
            </span>
          </div>
        )}
      </div>
    </CardDefault>
  );
};
export default VehicleCompany;
