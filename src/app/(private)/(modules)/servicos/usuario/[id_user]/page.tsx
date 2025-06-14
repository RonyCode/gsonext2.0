import { getServerSession } from "next-auth";
import React from "react";
import { LuMail, LuUserCheck } from "react-icons/lu";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllStates } from "@/lib/getAllStates";
import { GetUserById } from "@/lib/GetUserById";
import { EditProfileForm } from "../../../components/EditProfileForm";
import { UserType } from "@/types/index";

const ProfileUser = async ({
  params,
}: {
  params: Promise<{ id_user: string }>;
}) => {
  const resolvedParams = await params;
  const { id_user } = resolvedParams;
  const IdUser = id_user.split("-")[1] ?? "";

  const session = await getServerSession(authOptions);
  const state = await getAllStates();
  const { data: user } = await GetUserById(IdUser);
  const image =
    user?.account?.image ||
    process?.env?.NEXT_PUBLIC_API_GSO + "/public/images/img.svg";

  return (
    <>
      <CardDefault
        title={user?.account?.name || session?.user?.name || ""}
        description={user?.userAuth?.email || session?.user?.email || ""}
        image={image}
        imageMobile={image}
        icon={<LuUserCheck size={28} />}
        iconDescription={<LuMail />}
      >
        <EditProfileForm user={user as UserType} image={image} states={state} />
      </CardDefault>
    </>
  );
};
export default ProfileUser;
