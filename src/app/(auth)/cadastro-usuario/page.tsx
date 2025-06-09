import { type Metadata } from "next";

import { getAllStates } from "@/lib/getAllStates";
import { UserExternalUpdateRegisterForm } from "./[token]/components/UserExternalUpdateRegisterForm";
import { GetTokenCookie } from "@/functions/TokenManager";

export const metadata: Metadata = {
  title: "GSO | Cadastro",
  description: "page of signUp users.",
};

const CadastroUsuario = async () => {
  const states = await getAllStates();
  const userExternal = await GetTokenCookie("user_external_to_confirm");

  const user = JSON.parse(userExternal ?? "{}");

  return (
    <>
      <div className="w-full p-4 md:w-9/12 md:p-0">
        <UserExternalUpdateRegisterForm user={user} states={states} />
      </div>
    </>
  );
};
export default CadastroUsuario;
