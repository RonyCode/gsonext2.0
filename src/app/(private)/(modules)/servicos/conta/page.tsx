import { getServerSession } from "next-auth";
import React from "react";
import { LuMail, LuUserCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { UserType } from "@/types/index";
import { EditMyAccount } from "@/app/(private)/(modules)/components/EditMyAccount";
import { GetUserByIdAction } from "@/actions/user/GetUserByIdAction";

const ProfileUser = async () => {
  const session = await getServerSession(authOptions);
  const state = await getAllStates();
  const { data: user } = await GetUserByIdAction(session?.id ?? "");
  const image =
    user?.account?.image ||
    session?.image ||
    session?.user?.image ||
    session?.picture ||
    process?.env?.NEXT_PUBLIC_API_GSO + "/public/images/img.svg";
  console.log(user);

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
        <EditMyAccount user={user as UserType} image={image} states={state} />
      </CardDefault>
    </>
  );
};
export default ProfileUser;
