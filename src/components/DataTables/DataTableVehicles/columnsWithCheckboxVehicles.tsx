'use client'

import React from 'react'
import { LuBuilding2, LuCar, LuQrCode } from 'react-icons/lu'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import {
  condition,
  statusVehicle,
} from './data/data'
import { Checkbox } from '../../ui/checkbox'
import { type IVehicleSchema } from '@/schemas/CarsSchema'
import { Badge } from '../../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsWithCheckboxVehicles = (
  onCheckboxChange: (id: string) => void,
) => {
  const columnsCars: Array<ColumnDef<IVehicleSchema>> = [
    {
      id: 'select',
      accessorKey: 'id',
      header: ({ table }) => (
        <Checkbox
          checked={false} // Desativar a seleção global, já que só permitimos um por vez
          aria-label="Select all"
          disabled // Desativar o checkbox do cabeçalho
        />
      ),
      cell: ({ row, table }) => (
        <Checkbox
          checked={row.getIsSelected()}
          name="id_member"
          onCheckedChange={(value: boolean | 'indeterminate') => {
            if (value === 'indeterminate') {
              return
            }

            row.toggleSelected(value) // Marca ou desmarca a linha atual
            if (value) {
              // Desmarca todas as outras linhas antes de marcar a atual
              table.getSelectedRowModel().rows.forEach((selectedRow) => {
                selectedRow.toggleSelected(false)
              })
              onCheckboxChange(row.original?.id ?? '') // Passa o ID selecionado para o formulário exterior
            } else {
              onCheckboxChange('N/A') // Reseta o valor se o checkbox for desmarcado
            }
            row.toggleSelected(value) // Marca ou desmarca a linha atual
          }}
          aria-label="Select row"
          value={row.original?.id ?? ''}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'imagem',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Imagem" />
      ),
      cell: ({ row }) => {
        return (
          <>
            <div className="flex w-full items-center  text-[0.8500rem] text-muted-foreground">
              <Avatar
                className="flex h-14 w-14 items-center justify-center  rounded-full shadow-sm shadow-foreground transition-all
                        duration-300 hover:scale-[140%] md:h-16 md:w-16"
              >
                <AvatarImage
                  className="aspect-square rounded-full object-cover"
                  src={
                    (row.original.image &&
                      process.env.NEXT_PUBLIC_API_GSO &&
                      process.env.NEXT_PUBLIC_API_GSO + row.original.image) ??
                    process.env.NEXT_PUBLIC_API_GSO +
                      '/public/images/avatar.svg'
                  }
                />
                <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
              </Avatar>
            </div>
          </>
        )
      },
    },

    {
      accessorKey: 'modelo',
      accessorFn: (row) => row.model,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Marca/Modelo/Local" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            <div className="flex items-center gap-2">
              <LuQrCode />
              <p className="text-md  w-[90%] truncate">
                {row.original.model}
              </p>{' '}
            </div>
            <div className="flex w-full items-center gap-2">
              <LuCar />
              <span>{row.original.brand}</span>{' '}
            </div>
          </div>
        )
      },
    },

    {
      accessorKey: 'local',

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="local" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-full items-center">
            <div className="mr-2 text-muted-foreground">
              {row?.original?.local != null ? row.original.local : 'N/A'}
            </div>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'tipo',
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
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'placa',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Placa" />
      ),
      cell: ({ row }) => {
        return (
          <Badge
            variant="secondary"
            className="items-centitems-centerer flex w-full justify-center rounded-[5px] py-2 "
          >
            {row.original.plate}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'prefixo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Prefixo" />
      ),
      cell: ({ row }) => {
        return (
          <Badge
            variant="secondary"
            className="items-centitems-centerer flex w-full justify-center rounded-[5px] py-2 "
          >
            {row.original.prefix}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'condicao',
      accessorFn: (row) => row.condition,

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Condição" />
      ),
      cell: ({ row }) => {
        const conditionValue = condition.find(
          (type) => type.value === row.original.condition,
        )
        if (conditionValue == null) {
          return null
        }
        return (
          <div className="flex w-full items-center justify-center">
            {conditionValue.label}
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const statusValue = statusVehicle.find(
          (type) => type.value === row.original.status,
        )
        if (statusValue == null) {
          return null
        }
        return (
          <div className="flex w-full items-center justify-center">
            {statusValue.label}
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
  ]
  return columnsCars
}
