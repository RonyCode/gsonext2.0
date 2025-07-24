import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/ui/separator";

export default function SkeletonPerfilUnidade() {
  return (
    <Card className="m-0 mx-auto min-h-screen w-full bg-background p-0 md:min-h-[calc(100vh-4rem)] md:p-6">
      {/* ## Cabeçalho da Página ## */}
      {/*<div className="grid h-36 w-full grid-cols-12 rounded-[8px] border border-foreground/15 p-0">*/}
      {/*  /!* Lado Esquerdo: Título e Descrição *!/*/}
      {/*  <div className="text-md col-start-1 col-end-7 flex flex-col justify-center p-3 md:col-start-1 md:col-end-5 md:p-6 md:text-xl">*/}
      {/*    <div className="space-y-3">*/}
      {/*      /!* Skeleton para Ícone e Título *!/*/}
      {/*      <div className="flex items-center gap-2">*/}
      {/*        <Skeleton className="h-6 w-6" />*/}
      {/*        <Skeleton className="h-6 w-40" />*/}
      {/*      </div>*/}
      {/*      /!* Skeleton para Ícone e Descrição *!/*/}
      {/*      <div className="flex items-center gap-2">*/}
      {/*        <Skeleton className="h-4 w-4" />*/}
      {/*        <Skeleton className="h-4 w-52" />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  /!* Lado Direito: Skeleton da Imagem (Desktop) *!/*/}
      {/*  <div className="relative hidden h-full p-0 md:col-start-5 md:col-end-13 md:block">*/}
      {/*    <Skeleton className="h-full w-full rounded-[5px]" />*/}
      {/*  </div>*/}

      {/*  /!* Lado Direito: Skeleton da Imagem (Mobile) *!/*/}
      {/*  <div className="relative col-start-7 col-end-13 h-full p-0 md:hidden">*/}
      {/*    <Skeleton className="h-full w-full rounded-[8px]" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<Separator />*/}
      {/* ## Cabeçalho do Card ## */}
      <div className="flex items-center">
        <div className="flex w-full items-center justify-between gap-4 space-y-2 p-6">
          {/* Skeleton para o Título "Detalhes" */}
          <Skeleton className="h-7 w-32" />

          {/* Skeletons para os botões de ação (Lixeira e Edição) */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>

      {/* ## Corpo do Formulário ## */}
      <div className="p-6">
        <div className="w-full space-y-8">
          {/* Seção Superior do Formulário (Foto + Campos Principais) */}
          <div className="grid h-full w-full grid-cols-12">
            {/* Skeleton para a Foto */}
            <div className="col-start-1 col-end-13 md:col-end-5 md:mr-3">
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-[200px] w-[200px] rounded-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            {/* Skeletons para os Campos à Direita da Foto */}
            <div className="col-start-1 col-end-13 flex h-full flex-col justify-evenly space-y-4 md:col-start-5">
              {/* Campo 1 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Campo 2 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Campo 3 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              {/* Campo 4 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Seções Inferiores do Formulário (Endereço, etc.) */}
          {/* Grupo de Campos 1 (ex: CNPJ e Telefone) */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Grupo de Campos 2 (ex: CEP e Endereço) */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Grupo de Campos 3 (ex: Número e Complemento) */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Grupo de Campos 4 (ex: Estado, Cidade e Bairro) */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Skeleton para o Botão de Salvar */}
          <div className="flex w-full justify-end">
            <Skeleton className="h-10 w-full md:w-1/3" />
          </div>
        </div>
      </div>
    </Card>
  );
}
