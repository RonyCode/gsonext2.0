"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import moment from "moment";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const params: { id_company: string } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        <Link // @ts-expect-error
          href={`/servicos/unidades/${params.id_company}/gestor-unidade/escala-unidade-salvar?id_schedule=${row.original?.id}&date_schedule=${moment(row.original?.date_start, "DD/MM/YYYY").format("YYYY/MM/DD")}`}
        >
          <DropdownMenuItem>Editar</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
