"use client";

import React from "react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>): React.ReactNode {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedTypes, setSelectedTypes] = React.useState<string>("name");

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
      <Input
        placeholder={`Filtrar membros por ${selectedTypes === "name" ? "nome" : selectedTypes}`}
        value={
          (table.getColumn(selectedTypes)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) => {
          table.getColumn(selectedTypes)?.setFilterValue(event.target.value);
        }}
        className="col-span-1 h-8 w-full"
      />
      <div className="row-start-2 flex justify-around gap-2 rounded-md border border-accent-foreground/10 p-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Checkbox
            id="checkCpf"
            checked={selectedTypes === "cpf"}
            onCheckedChange={(value: boolean | "indeterminate") => {
              if (value === "indeterminate") {
                return;
              }

              if (value) {
                table.resetColumnFilters();
                setSelectedTypes("cpf");
              }
            }}
            aria-label="Select row"
          />
          <Label htmlFor="checkCpf">CPF</Label>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Checkbox
              checked={selectedTypes === "email"}
              id="checkEmail"
              onCheckedChange={(value: boolean | "indeterminate") => {
                if (value === "indeterminate") {
                  return;
                }

                if (value) {
                  table.resetColumnFilters();
                  setSelectedTypes("email");
                }
              }}
              aria-label="Select row"
            />
            <Label htmlFor="checkEmail">Email</Label>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox
            checked={selectedTypes === "name"}
            id="checkname"
            onCheckedChange={(value: boolean | "indeterminate") => {
              if (value === "indeterminate") {
                return;
              }

              if (value) {
                table.resetColumnFilters();
                setSelectedTypes("name");
              }
            }}
            aria-label="Select row"
          />
          <Label htmlFor="checkname">Nome</Label>
        </div>
      </div>
      <div className="flex justify-between gap-1 pt-2">
        {/* <div> */}
        {/*  {table.getColumn('type') != null && ( */}
        {/*    <DataTableFacetedFilter */}
        {/*      column={table.getColumn('type')} */}
        {/*      title="Tipo" */}
        {/*      options={types} */}
        {/*    /> */}
        {/*  )} */}
        {/* </div> */}
        {/* <DataTableViewOptions table={table} /> */}
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
