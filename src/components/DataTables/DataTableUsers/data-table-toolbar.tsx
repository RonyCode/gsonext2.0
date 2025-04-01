"use client";

import { DataTableViewOptions } from "../DataTableUnidades/data-table-view-options";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>): React.ReactNode {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
      <Input
        placeholder="Filtrar usuários..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="h-8 w-full lg:w-[250px]"
      />
      <div className="col-span-2 flex w-full justify-between gap-1 pt-2">
        <div>
          {/*  {table.getColumn('type') != null && ( */}
          {/*    <DataTableFacetedFilter */}
          {/*      column={table.getColumn('type')} */}
          {/*      title="Tipo" */}
          {/*      options={types} */}
          {/*    /> */}
          {/*  )} */}
        </div>
        <div>
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
