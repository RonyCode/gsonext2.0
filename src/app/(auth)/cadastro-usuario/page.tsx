import { type Metadata } from "next";

import { getAllStates } from "@/lib/getAllStates";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserExternalUpdateRegisterForm } from "./[token]/components/UserExternalUpdateRegisterForm";

export const metadata: Metadata = {
  title: "GSO | Cadastro",
  description: "page of signUp users.",
};
interface CadastroUsuarioProps {
  params: Promise<{ token: string }>;
}

const CadastroUsuario = async () => {
  const states = await getAllStates();
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="w-full p-4 md:w-9/12 md:p-0">
        <UserExternalUpdateRegisterForm session={session} states={states} />
      </div>
    </>
  );
};
export default CadastroUsuario;
