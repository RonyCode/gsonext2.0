'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LuBuilding2, LuLoaderCircle, LuSearch } from 'react-icons/lu'

import { saveMemberIntoCompanyAction } from '@/actions/saveMemberIntoCompanyAction'
import { columnsWithCheckboxMembers } from '@/components/DataTables/DataTableMembers/columnsWithCheckboxMembers'
import { DataTableMembers } from '@/components/DataTables/DataTableMembers/data-table-members'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { searchUsersWithoutCompany } from '@/lib/searchUsersWithoutCompany'
import { cn } from '@/lib/utils'
import { type IMemberSchema } from '@/schemas/MemberSchema'
import {
  type ISaveMemberCompanySchema,
  SaveMemberCompanySchema,
} from '@/schemas/SaveMemberCompanySchema'
import type { AddressProps } from '@/types/index'
import { Button, buttonVariants } from '@/ui/button'
import { Card } from '@/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import {toast} from "@/hooks/use-toast";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  idCorporation?: string
  idCompany?: string
  className?: string
  states?: AddressProps[] | null
}

export const MemberCompanyForm = ({
  idCorporation,
  idCompany,
  className,
}: UserRegisterFormProps)=> {
  const [pending, startTransition] = useTransition()
  const [data, setData] = useState<IMemberSchema[]>([])
  const router = useRouter()

  const form = useForm<ISaveMemberCompanySchema>({
    mode: 'all',
    resolver: zodResolver(SaveMemberCompanySchema),

    defaultValues: {
      id_corporation: idCorporation ?? ' ',
      id_company: idCompany ?? ' ',
      termo_busca: '',
      id_member: '',
    },
  })
  const handleSubmit = (formData: ISaveMemberCompanySchema) => {
    if (formData.id_member !== '' && formData.id_corporation !== '') {
      startTransition(async () => {
        const result = await saveMemberIntoCompanyAction(formData)

        if (result?.code !== 202) {
          toast({
            variant: 'danger',
            title: 'Erro ao salvar membro na unidade! 🤯 ',
            description: result?.message,
          })
        }
        if (result?.code === 202) {
          toast({
            variant: 'success',
            title: 'Ok! Membro salvo com sucesso! 🚀',
            description: 'Tudo certo membro salvo na unidade',
          })
          // redirect(`/servicos/membros`)
        }
      })
    }
  }

  const handleSearchClick = (): void => {
    startTransition(async () => {
      const result = await searchUsersWithoutCompany(
        form.getValues('id_corporation'),
        form.getValues('termo_busca'),
      )
      if (result?.code === 200) {
        setData(result?.data ?? ([] as IMemberSchema[]))
      } else {
        setData([] as IMemberSchema[])
        form.resetField('id_member')
      }
    })
  }

  const handleCheckboxChange = (value: string): void => {
    if (value === '') {
      form.setValue('id_member', '')
      form.setError('id_member', { message: 'Usuário nao selecionado' })
    } else {
      form.setValue('id_member', value)
      form.clearErrors('id_member')
    }
    console.log(form.formState.isValid)
  }

  const debouncedOnChange = debounce(() => {
    handleSearchClick()
  }, 700)

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0"
            className={cn(' p-2 md:p-10', className)}
      >
        <div className="flex items-center pb-10">
          <div className="flex w-full items-center justify-between space-y-2">
            <h1 className=" mr-auto text-xl font-bold">
              Salvar Membro na Unidade
            </h1>
          </div>
        </div>
        <div>
          <Form {...form}>
            <LoadingPage pending={pending} />
            <form
               
              onSubmit={form.handleSubmit((data) => {
                handleSubmit(data)
              })}
              className="w-full space-y-4"
            >
              <div className="my-8 flex w-full flex-col gap-2  md:flex-row md:items-center">
                <div className="form mt-6 flex w-full flex-col gap-3 md:mt-0 md:flex-row md:gap-2 ">
                  <FormField
                    control={form.control}
                    name="termo_busca"
                    render={({ field }) => (
                      <FormItem
                        className="relative w-full"
                        onChange={debouncedOnChange}
                      >
                        <FormLabel
                          htmlFor="termo_busca"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuBuilding2 /> Buscar Usuário
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                              <LuSearch size={20} />
                            </span>
                            <Input
                              className="p-4 ps-10 "
                              {...field}
                              value={field.value}
                              id="termo_busca"
                              placeholder="Buscar por Nome, CPF ou Email"
                              autoCapitalize="none"
                              autoComplete="termo_busca"
                              autoCorrect="off"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={handleSearchClick}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      ' w-full  animate-fadeIn self-end md:w-auto',
                    )}
                  >
                    {pending && (
                      <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}{' '}
                    Buscar
                  </Button>
                </div>
              </div>
              {data !== null && (
                <DataTableMembers
                  columns={columnsWithCheckboxMembers(handleCheckboxChange)}
                  data={data}
                />
              )}

              <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
                <Button
                  onClick={() => {
                    router.back()
                  }}
                  className={cn(
                    buttonVariants({ variant: 'secondary' }),
                    ' w-full animate-fadeIn  md:w-auto ',
                  )}
                  type="button"
                >
                  voltar
                </Button>
                <Button
                  disabled={
                    !form.getValues('id_member') ||
                    !form.getValues('id_corporation')
                  }
                  variant="default"
                  type="submit"
                >
                  {pending && (
                    <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  )
}
export default MemberCompanyForm
