'use client'

import React from 'react'
import { LuBuilding2, LuMail, LuPhone, LuUser } from 'react-icons/lu'

import { types } from '../DataTableUnidades/data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { maskPhone } from '@/functions/masks/maskphone'
import { type IUserSchema } from '@/schemas/UsersSchema'
import { type Unidade } from '@/types/index'
import { Badge } from '@/ui/badge'
import { Checkbox } from '@/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type ColumnDef } from '@tanstack/react-table'

export const columnsUsersArray = (onCheckboxChange: (id: string) => void) => {
  const columnsUsers: Array<ColumnDef<IUserSchema>> = [
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
          name="id_user"
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
              onCheckboxChange(row.original.id ?? '') // Passa o ID selecionado para o formulário exterior
            } else {
              onCheckboxChange('') // Reseta o valor se o checkbox for desmarcado
            }
            row.toggleSelected(value) // Marca ou desmarca a linha atual
          }}
          aria-label="Select row"
          value={row.original.id ?? ''}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'nome',
      accessorFn: (row) => row.account?.name, // Acessa o valor diretamente
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dados Usuário" />
      ),
      cell: ({ row }) => {
        const accountName = row.original.account?.name
        const accountEmail = row.original.auth?.email
        const accountPhone = row.original.account?.phone
        const path = process?.env?.NEXT_PUBLIC_API_GSO ?? ''
        return (
          <>
            <div className="flex min-w-64 items-center space-x-2 text-[0.8500rem] text-muted-foreground">
              <Avatar className="flex h-14 w-14 items-center justify-center  rounded-full">
                <AvatarImage
                  className="aspect-square rounded-full object-cover"
                  src={
                    path + row?.original?.account?.image ??
                    path + '/public/images/avatar.svg'
                  }
                />
                <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center ">
                <div>
                  <div className="flex items-center  py-0.5">
                    <LuUser size={16} className="mr-2" /> {accountName}
                  </div>
                </div>
                <div>
                  {' '}
                  <div className="flex items-center py-0.5 ">
                    <LuMail size={16} className="mr-2" /> {accountEmail}
                  </div>
                </div>
                <div>
                  {' '}
                  <div className="flex items-center py-0.5">
                    <LuPhone size={16} className="mr-2" />{' '}
                    {maskPhone(accountPhone)}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      },
    },

    {
      accessorKey: 'account.director',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gestores" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-full items-center">
            <div className="mr-2 flex flex-col space-y-1 text-muted-foreground">
              <span>
                {row.original?.account?.name} - {row.original?.id} -{' '}
                <Badge variant="secondary">CMD</Badge>
              </span>
            </div>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'manager_company',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unidade Gestora" />
      ),
      cell: ({ row }) => {
        const $unidadeGerente: Unidade = row.getValue('manager_company')

        return (
          <div className="flex w-full items-center">
            <div className="mr-2 text-muted-foreground">
              {$unidadeGerente?.name ?? 'N/A'}
            </div>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },

    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => {
        const type = types.find((type) => type.value === row.getValue('type'))
        if (type == null) {
          return null
        }
        return (
          <Badge
            variant="secondary"
            className="flex w-full items-center justify-center"
          >
            {type.label}
          </Badge>
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
  return columnsUsers
}
