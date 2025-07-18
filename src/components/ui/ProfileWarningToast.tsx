// components/toasts/ProfileWarningToast.tsx

"use client";

import { toast } from "sonner";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";

// O componente recebe o ID do toast para que possamos fechá-lo de dentro dele mesmo.
interface ProfileWarningToastProps {
  toastId: number | string;
}

export function ProfileWarningToast({ toastId }: ProfileWarningToastProps) {
  return (
    // O card principal da notificação
    <div className="flex w-full max-w-sm items-start gap-4 rounded-lg border border-foreground/15 bg-secondary p-4 shadow-lg">
      {/* Ícone com fundo colorido para destaque */}
      <div className="bg-sec mt-1 flex-shrink-0 rounded-full p-1">
        <AlertTriangle className="h-6 w-6 text-yellow-500 hover:text-yellow-400" />
      </div>

      {/* Conteúdo principal: Título, descrição e botão de fechar */}
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground">Complete Seu Cadastro</h3>

        {/* Linha separadora, como solicitado */}
        <hr className="my-2 border-foreground/15" />

        <p className="text-foreground-muted text-sm">
          Para ter acesso a todos os recursos da plataforma, por favor,{" "}
          <Link
            href="/completar-cadastro"
            onClick={() => toast.dismiss(toastId)} // Fecha o toast ao clicar no link
            className="font-medium text-primary/70 underline hover:text-primary"
          >
            complete seu perfil
          </Link>
          .
        </p>
      </div>

      {/* Botão para fechar o toast */}
      <button
        onClick={() => toast.dismiss(toastId)}
        aria-label="Fechar"
        className="-m-1 flex-shrink-0 rounded-full p-1 text-gray-400 opacity-80 transition hover:opacity-100"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
