"use client";
import Link from "next/link";
import React from "react";
import { LuCirclePlus } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import { Card } from "@/ui/card";
import { DataTableUnidades } from "@/components/DataTables/DataTableUnidades/data-table-unidades";
import { columnsUnidades } from "@/components/DataTables/DataTableUnidades/columnsUnidades";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";

type TabUnidadesProps = React.HTMLAttributes<HTMLDivElement> & {
  companies?: IUnidadeSchema[];
  className?: string;
};

export const ListCompaniesDetails = ({
  companies,
  className,
  ...props
}: TabUnidadesProps) => {
  return (
    <div className={cn("", className)} {...props}>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4 space-y-2 p-6">
            <h1 className="ml-4 mr-auto pt-2 text-xl font-bold">Unidades</h1>
            <Link href="/servicos/gestor/salvar-unidade">
              <Button
                className={cn(buttonVariants({ variant: "outline" }), "group")}
              >
                <div className="flex items-center gap-1">
                  <LuCirclePlus
                    size={16}
                    className="text-foreground group-hover:text-muted-foreground"
                  />
                  Adicionar{" "}
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:p-6">
          {companies !== null && companies !== undefined && (
            <DataTableUnidades columns={columnsUnidades} data={companies} />
          )}
        </div>
      </Card>
    </div>
  );
};
export default ListCompaniesDetails;
