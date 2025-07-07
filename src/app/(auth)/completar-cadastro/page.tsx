import { type Metadata } from "next";

import { getAllStates } from "@/lib/getAllStates";
import { UserExternalUpdateRegisterForm } from "../cadastro-usuario/[token]/components/UserExternalUpdateRegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "GSO | Cadastro",
  description: "page of signUp users.",
};

const CadastroUsuario = async () => {
  const states = await getAllStates();
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="w-full p-4 md:w-9/12 md:p-0">
        <UserExternalUpdateRegisterForm
          user={
            session?.user
              ? {
                  email: session.user.email || "",
                  picture: session.user.image || "",
                  name: session.user.name || "",
                  provider_user_id: session.provider_user_id || "",
                  provider: session.provider || "",
                  image: session.user.image || "",
                }
              : null
          }
          states={states}
        />
      </div>
    </>
  );
};
export default CadastroUsuario;
