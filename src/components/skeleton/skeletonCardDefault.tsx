import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardDefault() {
  return (
    <Card className="m-0 mx-auto min-h-screen w-full bg-background p-0 md:min-h-[calc(100vh-4rem)] md:p-6">
      {/* ## Cabeçalho da Página ## */}
      <div className="grid h-36 w-full grid-cols-12 rounded-[8px] border border-foreground/15 p-0">
        {/* Lado Esquerdo: Título e Descrição */}
        <div className="text-md col-start-1 col-end-7 flex flex-col justify-center p-3 md:col-start-1 md:col-end-5 md:p-6 md:text-xl">
          <div className="space-y-3">
            {/* Skeleton para Ícone e Título */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-40" />
            </div>
            {/* Skeleton para Ícone e Descrição */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-52" />
            </div>
          </div>
        </div>

        {/* Lado Direito: Skeleton da Imagem (Desktop) */}
        <div className="relative hidden h-full p-0 md:col-start-5 md:col-end-13 md:block">
          <Skeleton className="h-full w-full rounded-[5px]" />
        </div>

        {/* Lado Direito: Skeleton da Imagem (Mobile) */}
        <div className="relative col-start-7 col-end-13 h-full p-0 md:hidden">
          <Skeleton className="h-full w-full rounded-[8px]" />
        </div>
      </div>

      <Separator />
    </Card>
  );
}
