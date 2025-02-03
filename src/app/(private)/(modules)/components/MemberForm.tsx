'use client'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuBuilding2,
  LuCheck,
  LuChevronsUpDown,
  LuLandmark,
  LuLoaderCircle,
  LuSearch,
} from 'react-icons/lu'

import { saveMemberIntoCorporationAction } from '@/actions/saveMemberIntoCorporationAction'
import { columnsUsersArray } from '@/components/DataTables/DataTableUsers/columnsUsers'
import { DataTableUsers } from '@/components/DataTables/DataTableUsers/data-table-users'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { searchUsersWithoutCorporation } from '@/lib/searchUsersWithoutCorporation'
import { cn } from '@/lib/utils'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import {
  type ISaveMemberSchema,
  SaveMemberSchema,
} from '@/schemas/SaveMemberSchema'
import { type IUserSchema } from '@/schemas/UsersSchema'
import { Button, buttonVariants } from '@/ui/button'
import { Card } from '@/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { toast } from '@/hooks/use-toast'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema[] | null
  className?: string
}

export const MemberForm = ({
  corporations,
  className,
}: UserRegisterFormProps)=> {
  const [pending, startTransition] = useTransition()
  const [data, setData] = useState<IUserSchema[]>([])
  const { data: session, update } = useSession()
  const router = useRouter()

  const form = useForm<ISaveMemberSchema>({
    mode: 'all',
    resolver: zodResolver(SaveMemberSchema),

    defaultValues: {
      id_corporation: '',
      termo_busca: '',
      id_user: '',
    },
  })
  const handleSubmit = (formData: ISaveMemberSchema) => {
    if (formData.id_user !== '' && formData.id_corporation !== '') {
      startTransition(async () => {
        const result = await saveMemberIntoCorporationAction(formData)
        if (result?.code !== 202) {
          toast({
            variant: 'danger',
            title: 'Erro ao salvar membro na corporação! 🤯 ',
            description: result?.message,
          })
        }
        if (result?.code === 202) {
          await update({
            ...session,
            id_corporation: formData?.id_corporation,
          })

          toast({
            variant: 'success',
            title: 'Ok! Membro salvo com sucesso! 🚀',
            description: 'Tudo certo membro salvo na corporação',
          })
          redirect(`/servicos/membros`)
        }
      })
    }
  }

  const handleSearchClick = (): void => {
    form.resetField('id_user')
    if (
      form.getValues('termo_busca') != null &&
      form.getValues('id_corporation') === ''
    ) {
      form.setError('termo_busca', {
        type: 'manual',
        message: 'Selecione corporação para buscar usuários! 🤯 ',
      })
      form.setError('id_corporation', {
        type: 'manual',
        message: 'Corporação não selecionada! 🤯 ',
      })
    } else {
      form.clearErrors()
    }

    startTransition(async () => {
      const result = await searchUsersWithoutCorporation(
        form.getValues('id_corporation'),
        form.getValues('termo_busca'),
      )
      console.log(result)
      if (result?.code === 200) {
        setData(result?.data ?? ([] as IUserSchema[]))
      } else {
        setData([] as IUserSchema[])
        form.resetField('id_user')
      }
    })
  }

  const handleCheckboxChange = (value: string): void => {
    console.log(value)
    if (value === '') {
      form.setError('id_user', { message: 'Usuário nao selecionado' })
    } else {
      form.setValue('id_user', value)
      form.clearErrors('id_user')
    }
  }

  const handleCheckvalidForm = () => {
    if (form.formState?.errors?.id_user != null) {
      toast({
        variant: 'danger',
        title: 'Erro ao salvar membro na corporação! 🤯 ',
        description: form.formState?.errors?.id_user?.message,
      })
    }
  }
  const debouncedOnChange = debounce(() => {
    handleSearchClick()
  }, 700)

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0"
            className={cn('p-2 md:p-10', className)}

      >
        <div className="flex items-center pb-10">
          <div className="flex w-full items-center justify-between space-y-2">
            <h1 className=" mr-auto text-xl font-bold">
              Salvar Membro Corporação
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
                <FormField
                  control={form.control}
                  name="id_corporation"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-3/5">
                      <FormLabel
                        htmlFor="id_corporation"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuLandmark /> Corporação
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between text-muted-foreground',
                              )}
                            >
                              {field.value !== ''
                                ? corporations?.find((corp) => {
                                    return corp?.id === field.value
                                  })?.short_name_corp
                                : 'Selecione uma corporação'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput placeholder="Procurando Estados..." />
                            <CommandEmpty>
                              Corporação não encontrada.
                            </CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {corporations?.map((corp, index) => (
                                  <CommandItem
                                    value={corp?.id ?? ''}
                                    key={index}
                                     
                                    onSelect={() => {
                                      form.setValue(
                                        'id_corporation',
                                        corp?.id ?? '',
                                      )
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        corp?.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {corp.short_name_corp}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                <DataTableUsers
                  columns={columnsUsersArray(handleCheckboxChange)}
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
                  variant="default"
                  onClick={handleCheckvalidForm}
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
export default MemberForm
