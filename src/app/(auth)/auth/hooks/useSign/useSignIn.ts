import { toast } from "@/hooks/use-toast";
import {ResultSignIn} from "@/types/index";
import {signIn} from "next-auth/react";
import {ISignInSchema} from "@/app/(auth)/auth/schemas/SignInSchema";

export const useSignIn = (): {
  signInWithCredentials: (data: ISignInSchema) => Promise<ResultSignIn>
  signInWithGoogle: () => Promise<void>
} => {
  async function signInWithGoogle(): Promise<void> {
    try {
      const result = await signIn('google', {
        redirect: false, // Evita redirecionamento automático
        callbackUrl: '/', // URL final após login bem-sucedido
      })

      if (result?.ok) {
        toast({
          variant: 'success',
          title: 'Sucesso!',
          description: 'Logado com sucesso! 🚀',
        })

        // Redirecionamento manual para a URL de callback
        if (result.url) {
          window.location.href = result.url
        }
      } else {
        toast({
          variant: 'danger',
          title: 'Erro no Login',
          description: result?.error || 'Não foi possível fazer login. Tente novamente.',
        })
      }
    } catch (error) {
      console.error('Erro no login com Google:', error)
      toast({
        variant: 'danger',
        title: 'Error',
        description: 'Falha ao logar no Google. Tente novamente mais tarde.',
      })
    }
  }

  const signInWithCredentials = async (
      data: ISignInSchema,
  ): Promise<ResultSignIn> => {
    if (!data) {
      return {} as ResultSignIn
    }

    const { email, senha } = data
    try {
      const result = await signIn('credentials', {
        email,
        senha,
        is_user_external: 0,
        redirect: false, // Impede o redirecionamento imediato
      })

      if (result?.ok) {
        toast({
          variant: 'success',
          title: 'Sucesso!',
          description: 'Logado com sucesso via credenciais! 🚀',
        })

        // Redireciona manualmente após o login
        if (result.url) {
          window.location.href = result.url
        }
      } else {
        toast({
          variant: 'danger',
          title: 'Erro no Login',
          description: result?.error || 'Não foi possível fazer login. Verifique suas credenciais.',
        })
      }

      return result as ResultSignIn
    } catch (error) {
      console.error('Erro no login com credenciais:', error)
      toast({
        variant: 'danger',
        title: 'Error',
        description: 'Falha ao logar com credenciais. Tente novamente mais tarde.',
      })
      return {} as ResultSignIn
    }
  }

  return {
    signInWithCredentials,
    signInWithGoogle,
  }
}
