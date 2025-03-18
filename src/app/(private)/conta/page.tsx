import { getServerSession } from "next-auth";
import React from "react";
import { LuUserCheck } from "react-icons/lu";

import { EditProfileForm } from "@/app/(private)/conta/component/EditProfileForm";
import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { GetUserById } from "@/lib/GetUserById";

const ProfileUser = async () => {
  const session = await getServerSession(authOptions);
  const state = await getAllStates();
  const user = await GetUserById(session?.id);

  return (
    <>
      <CardDefault
        title={user?.account?.name}
        description={user?.userAuth?.email}
        image={
          process.env.NEXT_PUBLIC_API_GSO != null &&
          user?.account?.image != null
            ? process.env.NEXT_PUBLIC_API_GSO + user?.account?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO != null &&
          user?.account?.image != null
            ? process.env.NEXT_PUBLIC_API_GSO + user?.account?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.svg"
        }
        icon={<LuUserCheck size={28} />}
      >
        <EditProfileForm user={user} states={state} />
      </CardDefault>
    </>
  );
};
export default ProfileUser;
