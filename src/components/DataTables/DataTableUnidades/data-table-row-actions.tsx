import Link from "next/link";
import { type ReactElement } from "react";
import { LuEye } from "react-icons/lu";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { UnidadeSchema } from "@/schemas/UnidadeSchema";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
import { LucideEdit3 } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>): ReactElement {
  const task = UnidadeSchema.parse(row.original);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/servicos/corporacao/unidades/${task.name}-${task.id}`}>
          <DropdownMenuItem>
            {" "}
            <LuEye size={18} className="mr-1" />
            Visualizar
          </DropdownMenuItem>
        </Link>
        <Link href={`/servicos/gestor/unidade/${task.name}-${task.id}`}>
          <DropdownMenuItem>
            {" "}
            <LucideEdit3 size={18} className="mr-1" />
            Editar
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
