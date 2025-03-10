"use client";

import React from "react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import {
  periodSchedule,
  teamSchedule,
} from "@/components/DataTables/DataTableDetalheEscala/data/data";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CardModule } from "@/components/Cards/CardModule";
import IconCarFrontal from "@/icons/IconCarFrontal";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/ui/card";
import { DetailsVehicleSchedule } from "@/components/Buttoms/DetailsVehicleSchedule";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import Image from "next/image";
import { useCheckMobile } from "@/functions/IsMobile";

export function columnsDetailsSchedule(
  company: Partial<IUnidadeSchema> | undefined,
): ColumnDef<{ id?: string | null | undefined } | undefined, unknown>[] {
  const columnsDetalheEscala: Array<ColumnDef<Partial<IScheduleSchema>>> = [
    {
      accessorKey: "id_period",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Período" />
      ),
      cell: ({ row }) => {
        const period = periodSchedule.find(({ value }) => {
          return value == row?.getValue("id_period");
        });
        if (period?.period == null) {
          return null;
        }
        const date = `${row?.original?.year}-${row?.original?.month}-${row?.original?.day}`;
        return (
          <div className="flex w-full text-[.8rem]">
            <span className="flex items-center truncate font-medium">
              <period.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {row?.original.hour_start} as{" "}
              {moment(new Date(date + " " + row?.original.hour_start))
                .add({ hours: period?.value })
                .format("HH:mm")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "team",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Equipe" />
      ),
      cell: ({ row }) => {
        const group = teamSchedule.find(
          (label) =>
            label?.value?.toString() === row.original?.team?.toString(),
        );

        return (
          <div className="flex w-full items-center">
            <Badge
              variant="outline"
              className={`scale-[90%] ${
                group?.value === 1
                  ? "border-primary/85 text-primary/85"
                  : group?.value === 2
                    ? "border-blue-500/85 text-blue-500/85"
                    : group?.value === 3
                      ? "border-yellow-400/85 text-yellow-400/85"
                      : group?.value === 4
                        ? "border-green-500/85 text-green-500/85"
                        : group?.value === 5
                          ? "border-[#9400d3]/85 text-[#9400d3]/85"
                          : ""
              }`}
            >
              {group?.name}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "vehicles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Veiculos" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-1">
            {row?.original?.vehicles?.map((vehicle, index) => (
              <div key={index} className="m-0 flex p-0">
                <Popover>
                  <PopoverTrigger className="m-0 p-0">
                    <CardModule
                      // title={vehicle.prefix}
                      className={"m-0 h-full w-full space-x-0 space-y-0 p-0"}
                      icon={
                        vehicle.image ? (
                          <Image
                            width={50}
                            height={50}
                            src={
                              process.env.NEXT_PUBLIC_API_GSO + vehicle.image
                            }
                            className="aspect-square rounded-sm border border-foreground bg-background object-contain transition-all duration-300 ease-in-out hover:z-100 hover:scale-[250%]"
                            sizes="100"
                            alt="image icone"
                          />
                        ) : (
                          <IconCarFrontal
                            className="fill-foreground stroke-foreground"
                            width={useCheckMobile() ? 30 : 40}
                          />
                        )
                      }
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    side={useIsMobile() ? "bottom" : "right"}
                    className="m-0 h-full w-screen border border-foreground md:w-full md:p-0"
                  >
                    <Card className="m-0 p-0">
                      <DetailsVehicleSchedule vehicle={vehicle} />
                    </Card>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "id_cmt_sos",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CMT SOS" />
      ),
      cell: ({ row }) => {
        const memberCmtSos = company?.members?.find((member) => {
          return member?.id == row?.getValue("id_cmt_sos");
        });
        if (memberCmtSos == null) {
          return null;
        }
        return (
          <div className="flex w-full text-[.8rem]">
            <span className="flex items-center truncate font-medium">
              {memberCmtSos?.name}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "id_member_comunication",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CCOM" />
      ),
      cell: ({ row }) => {
        const memberComunication = company?.members?.find((member) => {
          return member?.id == row?.getValue("id_member_comunication");
        });
        if (memberComunication == null) {
          return null;
        }
        return (
          <div className="flex w-full text-[.8rem]">
            <span className="flex items-center truncate font-medium">
              {memberComunication?.name}
            </span>
          </div>
        );
      },
    },

    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
  return columnsDetalheEscala as Array<
    ColumnDef<{ id?: string | null | undefined } | undefined, unknown>
  >;
}
