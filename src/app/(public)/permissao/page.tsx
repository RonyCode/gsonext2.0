import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function PermissionDenied() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6 rounded-lg border border-border/40 bg-card p-8 shadow-sm">
        <div className="flex items-center justify-center space-x-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h1 className="text-3xl font-semibold text-foreground">
            Acesso Restrito
          </h1>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-lg text-muted-foreground">
            Você não tem permissão para acessar esta página. Entre em contato
            com o administrador do sistema para solicitar acesso.
          </p>

          <div className="pt-4">
            <Link
              href="/servicos/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
