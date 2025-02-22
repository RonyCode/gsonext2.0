'use client'
import Link from 'next/link'
import React, {Suspense} from 'react'
import { LuCirclePlus } from 'react-icons/lu'

import { columnsCars } from '@/components/DataTables/DataTableVehicles/columnsCars'
import { DataTableVehicle } from '@/components/DataTables/DataTableVehicles/data-table-vehicle'
import { cn } from '@/lib/utils'
import { type IVehicleSchema } from '@/schemas/CarsSchema'
import { Button, buttonVariants } from '@/ui/button'
import { Card } from '@/ui/card'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  vehicles?: IVehicleSchema[]
  className?: string
}

export const TabCarsDetails = ({
                                 vehicles,
  className,
  ...props
}: UserRegisterFormProps)=> {
  return (
    <div className={cn('', className)} {...props}>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4  space-y-2 p-6">
            <h1 className="ml-4 mr-auto pt-2 text-xl font-bold">Veículos</h1>
            <Link href="/servicos/gestor/salvar-veiculo">
              <Button
                className={cn(buttonVariants({ variant: 'outline' }), 'group ')}
              >
                <div className="flex items-center gap-1 ">
                  <LuCirclePlus
                    size={16}
                    className="text-foreground group-hover:text-muted-foreground"
                  />
                  Adicionar{' '}
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className=" md:p-6">
          {vehicles !== null && vehicles !== undefined && (
              <Suspense fallback={<div>Loading...</div>}>
            <DataTableVehicle columns={columnsCars} data={vehicles} />
              </Suspense>
          )}
        </div>
      </Card>
    </div>
  )
}
export default TabCarsDetails
