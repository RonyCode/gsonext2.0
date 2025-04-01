"use client";

import React from "react";
import { LuPhone, LuUser } from "react-icons/lu";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { maskOcultaCpfCnpj } from "@/functions/masks/maskOcultaCpfCnpj";
import { maskPhone } from "@/functions/masks/maskphone";
import { Checkbox } from "@/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { type ColumnDef } from "@tanstack/react-table";
import { IUserSchema } from "@/schemas/UsersSchema";

const apiUrl = process.env.NEXT_PUBLIC_API_GSO;
export const columnsUsers: Array<ColumnDef<IUserSchema>> = [
  {
    id: "select",
    accessorKey: "id",
    header: () => <Checkbox checked={false} aria-label="Select all" disabled />,
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        name="id"
        onCheckedChange={(value: boolean | "indeterminate") => {
          if (value === "indeterminate") {
            return;
          }

          row.toggleSelected(value);
          if (value) {
            table.getSelectedRowModel().rows.forEach((selectedRow) => {
              selectedRow.toggleSelected(false);
            });
          } else {
          }
          row.toggleSelected(value);
        }}
        aria-label="Select row"
        value={row.original?.id ?? ""}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    accessorFn: (row) => row?.account?.name,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dados Usuário" />
    ),
    cell: ({ row }) => {
      const accountPhone = row.original?.account?.phone;
      return (
        <>
          <div className="flex min-w-64 items-center space-x-2 text-[0.8500rem] text-muted-foreground">
            <Avatar className="flex h-12 w-12 items-center justify-center rounded-lg shadow-sm shadow-foreground transition-all duration-300 hover:scale-[200%] md:h-14 md:w-14">
              {" "}
              <AvatarImage
                className="aspect-square rounded-lg object-cover"
                src={
                  apiUrl != null && row?.original?.account?.image != null
                    ? apiUrl + row?.original?.account?.image
                    : "/images/avatar.svg"
                }
              />
              <AvatarFallback>{<LuUser size={36} />}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <div>
                <div className="flex items-center py-0.5">
                  <LuUser size={16} className="mr-2" /> {row.getValue("name")}
                </div>
              </div>

              <div>
                {" "}
                <div className="flex items-center py-0.5">
                  <LuPhone size={16} className="mr-2" />{" "}
                  {maskPhone(accountPhone)}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    },
  },

  {
    accessorKey: "cpf",
    accessorFn: (row) => row?.account?.cpf,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CPF" />
    ),
    cell: ({ row }) => {
      return (
        <p className="min-w-32">{maskOcultaCpfCnpj(row.getValue("cpf"))}</p>
      );
    },
  },

  {
    accessorKey: "email",
    accessorFn: (row) => row?.auth?.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <p>{row.getValue("email")}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
