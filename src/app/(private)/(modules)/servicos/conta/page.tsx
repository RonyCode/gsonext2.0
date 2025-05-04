import { getServerSession } from "next-auth";
import React from "react";
import { LuUserCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { GetUserById } from "@/lib/GetUserById";
import { EditProfileForm } from "./component/EditProfileForm";
import { UserType } from "@/types/index";

const ProfileUser = async () => {
  const session = await getServerSession(authOptions);
  const state = await getAllStates();
  const { data: user } = await GetUserById(session?.id);
  const image = user?.account?.image ?? null;

  return (
    <>
      <CardDefault
        title={user?.account?.name}
        description={user?.userAuth?.email}
        image={image}
        imageMobile={image}
        icon={<LuUserCheck size={28} />}
      >
        <EditProfileForm user={user as UserType} states={state} />
      </CardDefault>
    </>
  );
};
export default ProfileUser;
