'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuBuilding2,
  LuCalendar,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardPen,
  LuFlag,
  LuGlobe,
  LuHash,
  LuLandmark,
  LuLoaderCircle,
  LuMapPin,
  LuMousePointerClick,
  LuPhone,
  LuScrollText,
  LuTrash2,
} from 'react-icons/lu'

import { saveUnidadeAction } from '@/app/(private)/(modules)/servicos/gestor/actions/saveUnidadeAction'
import { EditPhoto } from '../../../../../../teste/src/components/EditPhoto/EditPhoto'
import { MyInputMask } from '../../../../../../teste/src/components/Form/Input/myInputMask'
import LoadingPage from '../../../../../../teste/src/components/Loadings/LoadingPage'
import { maskCpfCnpj } from '../../../../../../teste/src/functions/masks/maskCpfCnpj'
import { maskPhone } from '../../../../../../teste/src/functions/masks/maskphone'
import { maskZipcode } from '../../../../../../teste/src/functions/masks/maskZipcode'
import { getAllCitiesByState } from '@/lib/getAllCitiesByState'
import { getCep } from '@/lib/getCep'
import { cn } from '@/lib/utils'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { type IUnidadeSchema, UnidadeSchema } from '@/schemas/UnidadeSchema'
import { cityStore } from '@/stores/Address/CityByStateStore'
import type { AddressProps } from '../../../../../../teste/types/index'
import { Button, buttonVariants } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
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
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

enum Fields {
  address = 'address',
  district = 'district',
  city = 'city',
  shortName = 'short_name',
}

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  unidade?: IUnidadeSchema | null
  corporations?: IOrganizacaoSchema[] | null
  className?: string
  states?: AddressProps[] | null
}

export const TabUnidadeDetails = ({
  unidade,
  corporations,
  className,
  states,
}: UserRegisterFormProps)=> {
  const [pending, startTransition] = useTransition()
  const [disabled, setDisabled] = React.useState(true)
  const [date, setDate] = React.useState<Date>()
  const { data: session } = useSession()

  const router = useRouter()
  useEffect(() => {
    startTransition(async () => {
      if (unidade?.companyAddress?.short_name != null) {
        await getAllCitiesByState(unidade?.companyAddress?.short_name)
      }
    })
    if (unidade?.companyAddress?.short_name == null) setDisabled(false)
  }, [unidade?.companyAddress?.short_name, disabled])

  const form = useForm<IUnidadeSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(UnidadeSchema),

    defaultValues: {
      id: unidade?._id?.$oid ?? null,
      id_corporation: unidade?.id_corporation ?? null,
      name: unidade?.name ?? '',
      short_name_corp: unidade?.short_name_corp ?? '',
      cnpj: maskCpfCnpj(unidade?.cnpj) ?? '',
      phone: maskPhone(unidade?.phone) ?? '',
      image: unidade?.image ?? null,
      address: unidade?.companyAddress?.address ?? '',
      number: unidade?.companyAddress?.number ?? '',
      zipcode: maskZipcode(unidade?.companyAddress?.zipcode) ?? '',
      complement: unidade?.companyAddress?.complement ?? '',
      district: unidade?.companyAddress?.district ?? '',
      city: unidade?.companyAddress?.city ?? '',
      short_name: unidade?.companyAddress?.short_name ?? '',
      date_creation: unidade?.date_creation ?? '',
      type: unidade?.type ?? null,
      manager: unidade?.manager ?? null,
      director: unidade?.director ?? null,
      director_company: unidade?.director_company ?? null,
      excluded: 0,
    },
  })
  const handleSubmit = (formData: Partial<IUnidadeSchema>): void => {
    startTransition(async () => {
      const result = await saveUnidadeAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao salvar unidade! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! Unidade salva com sucesso! 🚀',
          description: 'Tudo certo unidade salva',
        })
        redirect(`/servico/unidades`)
      }
    })
  }
  const handleDeleteAction = async (
    formData: IUnidadeSchema,
  ): Promise<void> => {
    formData.excluded = 1
    startTransition(async () => {
      const result = await saveUnidadeAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao deletar unidade! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! Unidade deletada com sucesso! 🚀',
          description: 'Tudo certo unidade deletada',
        })
        router.push(`/servicos/unidades`)
      }
    })
  }

  const chageValueInput = async (
    field: Partial<Fields>,
    newValue: string,
  ): Promise<void> => {
    form.setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    if (field === Fields.shortName) await handleCity(newValue)
    form.clearErrors(field)
  }

  async function handleCity(value: string): Promise<void> {
    await getAllCitiesByState(value)
  }

  const arrayCitiesByState = cityStore().cities

  const handleCep = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e?.target?.value.length >= 9) {
      startTransition(async () => {
        const { logradouro, localidade, uf, bairro } = await getCep(
          e.target?.value,
        )

        if (localidade === '' || localidade === undefined) {
          states = []
          toast({
            variant: 'danger',
            title: 'Cep Incorreto! 🤯 ',
            description: 'Cep não encontrado',
          })
          return
        }
        await chageValueInput(Fields.address, logradouro)
        await chageValueInput(Fields.shortName, uf)
        await chageValueInput(Fields.city, localidade)
        await chageValueInput(Fields.district, bairro)
      })
    }
  }
  const types = [
    {
      id: 1,
      type: 'UNIDADE',
    },
    {
      id: 2,
      type: 'BATALHÃO',
    },
    {
      id: 3,
      type: 'COMANDO',
    },
    {
      id: 4,
      type: 'INDEPEDENTE',
    },
  ]

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4  space-y-2 p-6">
            <h1 className="ml-4 mr-auto text-xl font-bold">Detalhes</h1>
            {session?.role === 'admin' && (
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      disabled={pending}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'group',
                      )}
                    >
                      <LuTrash2
                        className="text-foreground group-hover:text-muted-foreground"
                        size={24}
                      />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Excluir Unidade</DialogTitle>
                      <DialogDescription>
                        Está ação precisa ser confirmada
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p>
                        ATENÇÂO!!! Tem certeza que deseja excluir esta unidade
                        de sua corporação?
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <div>
                          <Button variant="secondary" type="button">
                            Cancelar
                          </Button>

                          <Button
                            className="ml-2"
                            type="button"
                            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                            onClick={form.handleSubmit(async (data) => {
                              await handleDeleteAction(data)
                            })}
                          >
                            Confirmar
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => {
                    setDisabled(!disabled)
                  }}
                  disabled={pending}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'group ',
                  )}
                >
                  <LuClipboardPen
                    className="text-foreground group-hover:text-muted-foreground"
                    size={24}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="my-8 p-6 md:px-28 md:py-10">
          <Form {...form}>
            <LoadingPage pending={pending} />
            <form
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onSubmit={form.handleSubmit(async (data) => {
                handleSubmit(data)
              })}
              className="w-full space-y-4"
            >
              <div className="grid h-full w-full grid-cols-12 ">
                <div className=" relative col-start-1 col-end-6   mr-4 hidden h-60 justify-center rounded-[8px] border border-muted-foreground/10 md:flex">
                  <div className="absolute -left-3 -top-3">
                    <EditPhoto
                      disabled={disabled}
                      directoryFile={
                        process.env.NEXT_PUBLIC_API_GSO &&
                        form?.getValues('image')
                          ? process.env.NEXT_PUBLIC_API_GSO +
                            form?.getValues('image')
                          : process.env.NEXT_PUBLIC_API_GSO +
                            '/public/images/img.png'
                      }
                      updateFormExternal={form}
                    />
                  </div>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_GSO != null &&
                      form?.getValues('image') != null
                        ? process.env.NEXT_PUBLIC_API_GSO +
                          form?.getValues('image')
                        : process.env.NEXT_PUBLIC_API_GSO +
                          '/public/images/img.png'
                    }
                    width={500}
                    height={500}
                    quality={100}
                    alt="imagem unidade"
                    className="rounded-[5px] object-contain"
                  />
                </div>

                <div className="col-start-1 col-end-13 flex h-full flex-col justify-evenly  md:col-start-6  ">
                  <FormField
                    control={form.control}
                    name="id_corporation"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
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
                                  'w-full justify-between',
                                  disabled && 'text-muted-foreground',
                                )}
                              >
                                {field.value !== null
                                  ? corporations?.find(
                                      (corp) => corp.id === field.value,
                                    )?.short_name_corp
                                  : 'Selecione uma corporacao'}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procurando Estados..." />
                              <CommandEmpty>
                                Corporação não encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {corporations?.map((corp, index) => (
                                    <CommandItem
                                      disabled={disabled}
                                      value={corp?.id?.toString()}
                                      key={index}
                                      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                      onSelect={async () => {
                                        form.setValue(
                                          'id_corporation',
                                          corp?.id,
                                        )
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          corp.id === field.value
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

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel
                          htmlFor="name"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuBuilding2 /> Unidade
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Digite nome da unidade"
                            autoCapitalize="none"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="director"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuMousePointerClick /> Tipo
                        </FormLabel>{' '}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-full justify-between',
                                  disabled && 'text-muted-foreground',
                                )}
                              >
                                {field.value !== null
                                  ? types?.find(
                                      (typeItem) => typeItem.id === field.value,
                                    )?.type
                                  : 'Selecione um membro'}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="procurando tipo ..." />
                              <CommandEmpty>Tipo não encontrado.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {types?.map((typeItem, index) => (
                                    <CommandItem
                                      disabled={disabled}
                                      value={String(typeItem.id)}
                                      key={index}
                                      onSelect={() => {
                                        form.setValue('type', typeItem.id)
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          typeItem.id === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {typeItem.type}
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

                  <FormField
                    control={form.control}
                    name="date_creation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel
                          htmlFor="date_creation"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <LuCalendar /> Data criação
                        </FormLabel>{' '}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={disabled}
                                variant={'outline'}
                                className={cn(
                                  'min-w-[240px] pl-3 text-left font-normal',
                                  field?.value?.toString() === '' &&
                                    'text-muted-foreground',
                                )}
                              >
                                {field?.value?.toString() !== '' ? (
                                  field?.value
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              captionLayout="dropdown-buttons"
                              locale={ptBR}
                              toYear={2100}
                              fromYear={1900}
                              mode="single"
                              selected={date}
                              onSelect={(date) => {
                                if (date == null) return
                                setDate(date)
                                field.onChange(format(date, 'dd/MM/yyyy'))
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="cnpj"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> CNPJ
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                            className,
                          )}
                          {...field}
                          id="cnpj"
                          placeholder="00.000.000/0000-00"
                          mask="__.___.___/____-__"
                          autoCapitalize="none"
                          autoComplete="cnpj"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="phone"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuPhone /> Telefone
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="phone"
                          placeholder="(00) 00000-0000"
                          mask="(__) _____-____"
                          autoCapitalize="none"
                          autoComplete="phone"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <FormItem onChange={handleCep}>
                      <FormLabel
                        htmlFor="zipcode"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> Cep
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="zipcode"
                          placeholder="00000-000"
                          mask="_____-___"
                          autoCapitalize="none"
                          autoComplete="zipcode"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="address"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuMapPin /> Endereco
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="address"
                          placeholder="Digite seu endereço"
                          autoCapitalize="none"
                          autoComplete="address"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="number"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuHash /> Numero
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="number"
                          placeholder="Digite o numero da casa"
                          autoCapitalize="none"
                          autoComplete="number"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="complement"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuScrollText /> Complemento
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="complement"
                          placeholder="Digite ponto de referência"
                          autoComplete="complement"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="short_name"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="short_name"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuLandmark /> Estado
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                disabled && 'text-muted-foreground',
                              )}
                            >
                              {field.value !== null
                                ? states?.find(
                                    (state) => state.sigla === field.value,
                                  )?.nome
                                : 'Selecione um Estado'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando Estados..." />
                            <CommandEmpty>Estado não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={state.sigla}
                                    key={index}
                                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                                    onSelect={async () => {
                                      await handleCity(state?.sigla)
                                      form.setValue('short_name', state?.sigla)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        state.sigla === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {state.nome}
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

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="companyAddress.city"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuGlobe /> Cidade
                      </FormLabel>{' '}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',

                                disabled && 'text-muted-foreground',
                              )}
                            >
                              {field.value !== ''
                                ? arrayCitiesByState?.find(
                                    (city) => city.nome === field.value,
                                  )?.nome
                                : 'Selecione uma Cidade'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando cidade..." />
                            <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {arrayCitiesByState?.map((city, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={city.nome}
                                    key={index}
                                    onSelect={() => {
                                      form.setValue('city', city.nome)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        city.nome === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {city.nome}
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

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="district"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuFlag /> Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="district"
                          placeholder="district"
                          autoCapitalize="none"
                          autoComplete="district"
                          autoCorrect="off"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col  justify-end gap-2 md:flex-row">
                {!disabled && (
                  <Button
                    disabled={pending && !form.formState.isValid}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      ' w-full animate-fadeIn  md:w-1/3 ',
                    )}
                    type="submit"
                  >
                    {pending && (
                      <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Salvar
                  </Button>
                )}{' '}
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  )
}
export default TabUnidadeDetails
