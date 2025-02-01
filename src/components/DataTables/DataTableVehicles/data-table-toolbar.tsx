'use client'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import {
  condition,
  statusVehicle,
  typeFuel,
} from './data/data'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>): React.ReactNode {
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="grid w-full grid-cols-2 grid-rows-2 overflow-x-scroll px-2  pt-2 md:grid-cols-3 lg:overflow-x-hidden">
      <Input
        placeholder="Filtrar veículos..."
        value={(table.getColumn('modelo')?.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          table.getColumn('modelo')?.setFilterValue(event.target.value)
        }}
        className="col-start-1 col-end-4 h-8 w-full lg:w-[250px]"
      />
      <div className=" col-span-4 row-start-2 row-end-3 flex gap-1   pt-1 lg:row-start-2">
        <div>
          {table.getColumn('tipo') != null && (
            <DataTableFacetedFilter
              column={table.getColumn('tipo')}
              title="Combustivel"
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-expect-error
              options={typeFuel}
            />
          )}
        </div>
        <div>
          {table.getColumn('condicao') != null && (
            <DataTableFacetedFilter
              column={table.getColumn('condicao')}
              title="Condição"
              options={condition}
            />
          )}
        </div>
        <div>
          {table.getColumn('status') != null && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={statusVehicle}
            />
          )}
        </div>

        <div className="flex items-center gap-1">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters()
              }}
              className="h-6 text-[.725rem] text-muted-foreground lg:px-3 "
            >
              Reset
              <Cross2Icon className=" h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="ml-4 flex">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
