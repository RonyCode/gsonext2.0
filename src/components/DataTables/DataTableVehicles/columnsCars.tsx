"use client";

import React from "react";
import { LuBuilding2, LuCar, LuQrCode } from "react-icons/lu";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { condition, statusVehicle } from "./data/data";
import { Checkbox } from "@/ui/checkbox";
import { type IVehicleSchema } from "@/schemas/CarsSchema";
import { Badge } from "@/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { type ColumnDef } from "@tanstack/react-table";
import DataCompanyColumns from "@/lib/DataCompanyColumns";

export const columnsCars: Array<ColumnDef<IVehicleSchema>> = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "imagem",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Imagem" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex w-full items-center text-[0.8500rem] text-muted-foreground">
            <Avatar className="flex h-14 w-14 items-center justify-center rounded-lg shadow-sm shadow-foreground transition-all duration-300 hover:scale-[140%] md:h-16 md:w-16">
              <AvatarImage
                className="aspect-square rounded-full object-cover"
                src={
                  process.env.NEXT_PUBLIC_API_GSO &&
                  process.env.NEXT_PUBLIC_API_GSO + row.original.image
                }
              />
              <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
            </Avatar>
          </div>
        </>
      );
    },
  },

  {
    accessorKey: "modelo",
    accessorFn: (row) => row.model,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca/Modelo/Local" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex items-center gap-2">
            <LuQrCode />
            <p className="text-md w-[90%] truncate">
              {row.original.model}
            </p>{" "}
          </div>
          <div className="flex w-full items-center gap-2">
            <LuCar />
            <span>{row.original.brand}</span>{" "}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "local",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="local" />
    ),
    cell: ({ row }) => {
      return (
        <DataCompanyColumns
          idCompany={row?.original?.id_company ?? ""}
          idCorporation={row?.original?.id_corporation ?? ""}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "tipo",
    accessorFn: (row) => row.fuel_type,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Combustível" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center">
          <div className="mr-2 text-muted-foreground">
            {row.original.fuel_type}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "placa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placa" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="items-centitems-centerer flex w-full justify-center rounded-[5px] py-2"
        >
          {row.original.plate}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "prefixo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prefixo" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="items-centitems-centerer flex w-full justify-center rounded-[5px] py-2"
        >
          {row.original.prefix}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "condicao",
    accessorFn: (row) => row.condition,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condição" />
    ),
    cell: ({ row }) => {
      const conditionValue = condition.find(
        (type) => type.value === row.original.condition,
      );
      if (conditionValue == null) {
        return null;
      }
      return (
        <div className="flex w-full items-center justify-center">
          {conditionValue.label}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusValue = statusVehicle.find(
        (type) => type.value === row.original.status,
      );
      if (statusValue == null) {
        return null;
      }
      return (
        <div className="flex w-full items-center justify-center">
          {statusValue.label}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
