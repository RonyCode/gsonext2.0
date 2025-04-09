import { getAllUsers } from "@/lib/GetAllUsers";
import React from "react";
import UsersDetails from "../../../components/usersDetails";
import { LuSearchX } from "react-icons/lu";

export default async function UsuariosPage() {
  const { data: users, message: message } = await getAllUsers();
  return (
    <div className="md:overflow-none h-full w-full overflow-scroll">
      {users !== undefined && users?.length > 0 ? (
        <UsersDetails users={users} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {" "}
          <span className="flex items-center justify-center gap-1">
            <LuSearchX size={28} className="text-primary/60" />{" "}
            {message ?? "SEM USUÁRIOS CADASTRADOS  🤯"}
          </span>
        </div>
      )}
    </div>
  );
}
