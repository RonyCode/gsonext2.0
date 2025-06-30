import { type Metadata } from "next";

import { UserRegisterForm } from "@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm";
import { CardWithLogo } from "@/components/Cards/CardWithLogo";
import MaxWidthWrapper from "@/components/Pages/MaxWidthWrapper";
import { TokenVerify } from "@/functions/TokenVerify";
import { getAllStates } from "@/lib/getAllStates";

export const metadata: Metadata = {
  title: "GSO | Cadastro",
  description: "page of signUp users.",
};
interface CadastroUsuarioProps {
  params: Promise<{ token: string }>;
}

const CadastroUsuario = async ({ params }: CadastroUsuarioProps) => {
  const { token } = await params;

  const tokenReplaced = token.replaceAll("%2B", ".").replaceAll("%20", ".");

  const states = await getAllStates();

  const jwtValid = await TokenVerify(tokenReplaced);

  return (
    <>
      <MaxWidthWrapper>
        {jwtValid.code !== 400 ? (
          <UserRegisterForm params={jwtValid.email ?? ""} states={states} />
        ) : (
          <CardWithLogo>
            Token inválido ou expirado por favor tente novamente
          </CardWithLogo>
        )}
      </MaxWidthWrapper>
    </>
  );
};
export default CadastroUsuario;
