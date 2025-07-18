import { getServerSession } from "next-auth";
import React from "react";
import { LuMail, LuUserCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { UserType } from "@/types/index";
import { EditUserForm } from "@/app/(private)/(modules)/components/EditUserForm";
import { GetUserByIdAction } from "@/actions/user/GetUserByIdAction";

const ProfileUser = async ({
  params,
}: {
  params: Promise<{ id_user: string }>;
}) => {
  const resolvedParams = await params;
  const { id_user } = resolvedParams;
  const IdUser = id_user.split("-").pop() ?? "";

  const session = await getServerSession(authOptions);
  const state = await getAllStates();
  const { data: user } = await GetUserByIdAction(IdUser ?? "");
  const image =
    user?.account?.image ||
    process?.env?.NEXT_PUBLIC_API_GSO + "/public/images/img.svg";

  return (
    <>
      <CardDefault
        title={user?.account?.name || session?.user?.name || ""}
        description={user?.auth?.email || session?.user?.email || ""}
        image={image}
        imageMobile={image}
        icon={<LuUserCheck size={28} />}
        iconDescription={<LuMail />}
      >
        <EditUserForm user={user as UserType} image={image} states={state} />
      </CardDefault>
    </>
  );
};
export default ProfileUser;
