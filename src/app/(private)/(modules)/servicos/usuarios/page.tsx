import { getAllUsers } from "@/lib/GetAllUsers";
import React from "react";
import UsersDetails from "../../components/usersDetails";

export default async function UsuariosPage() {
  const { data: users } = await getAllUsers();
  console.log(users);

  return (
    <div>
      <h1>Usuários</h1>
      <UsersDetails users={users} />
    </div>
  );
}
