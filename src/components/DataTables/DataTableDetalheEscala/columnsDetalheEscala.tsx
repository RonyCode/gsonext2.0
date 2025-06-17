"use client";

import { Badge } from "@/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import {
  teamSchedule,
  periodSchedule,
} from "@/components/DataTables/DataTableDetalheEscala/data/data";
import { DataTableColumnHeader } from "@/components/DataTables/DataTableMembers/data-table-column-header";
import React from "react";
import moment from "moment/moment";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CardModule } from "@/components/Cards/CardModule";
import IconCarFrontal from "@/icons/IconCarFrontal";
import { Card } from "@/ui/card";

import { DataTableRowActions } from "./data-table-row-actions";
import { DetailsVehicleSchedule } from "@/components/Buttoms/DetailsVehicleSchedule";
import { useIsMobile } from "@/hooks/use-mobile";

export const columnsDetalheEscala: Array<ColumnDef<IScheduleSchema>> = [
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
            {moment(date + " " + row?.original.hour_start)
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
        (label) => label?.value?.toString() === row.original?.team?.toString(),
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
                    className={"m-0 h-12 w-16 space-x-0 space-y-0 p-0"}
                    icon={
                      <IconCarFrontal className="m-0 space-x-0 space-y-0 fill-foreground stroke-foreground p-0" />
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
    accessorKey: "id_member_comunication",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CMT SOS" />
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
            {moment(date + " " + row?.original.hour_start)
              .add({ hours: period?.value })
              .format("HH:mm")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "id_cmt_sos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CCOM" />
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
            {moment(date + " " + row?.original.hour_start)
              .add({ hours: period?.value })
              .format("HH:mm")}
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
