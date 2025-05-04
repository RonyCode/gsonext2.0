import { getAllStates } from "@/lib/getAllStates";
import { GetUserById } from "@/lib/GetUserById";
import React from "react";
import { EditProfileForm } from "../../../conta/component/EditProfileForm";
import { UserType } from "@/types/index";

const page = async ({
  params,
}: {
  params: Promise<{ id_usuario: string }>;
}) => {
  const resolvedParams = await params;
  const { id_usuario } = resolvedParams;
  const idUser = id_usuario?.split("-")[1].toString();

  const { data: user } = await GetUserById(idUser ?? "");
  const state = await getAllStates();
  return (
    <div>
      <EditProfileForm user={user as UserType} states={state} />
    </div>
  );
};
export default page;
