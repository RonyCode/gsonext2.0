'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { GrGroup } from 'react-icons/gr'
import {
  LuCalendarDays,
  LuCar,
  LuCheck,
  LuChevronsUpDown,
  LuSpeech,
  LuClock1,
  LuMegaphone,
  LuSave,
  LuTrash2,
  LuLoaderCircle,
  LuClipboardPen,
  LuUsers,
  LuCrown,
} from 'react-icons/lu'

import { saveUnidadeAction } from '@/app/(private)/(modules)/servicos/gestor/actions/saveUnidadeAction'
import { AddVehicleSchedule } from '@/components/Buttoms/AddVehicleSchedule'
import { CardModule } from '@/components/Cards/CardModule'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { checkMobile } from '@/functions/IsMobile'
import AddCar from '@/icons/AddCar'
import IconCarFrontal from '@/icons/IconCarFrontal'
import IconManager from '@/icons/IconManager'
import { cn } from '@/lib/utils'
import type { IVehicleSchema } from '@/schemas/CarsSchema'
import type { IMemberSchema } from '@/schemas/MemberSchema'
import {
  type IScheduleFormSave,
  ScheduleFormSave,
} from '@/schemas/ScheduleFormSave'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import type { AddressProps } from '../../../../../../teste/types/index'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
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
import { Textarea } from '@/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import moment from 'moment'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  unidade: IUnidadeSchema
  dateSchedule?: string
  schedule?: IScheduleFormSave
  className?: string
  states?: AddressProps[] | null
  params?: { sigla: string; name_unidade: string }
  searchParams?: Record<string, string | string[]>
}

export const TabScheduleSave = ({
  unidade,
  dateSchedule,
  schedule,
  className,
  params,
  searchParams,
  ...props
}: UserRegisterFormProps) => {
  const [pending, startTransition] = useTransition()
  const [dayWeekPrint, setDayWeekPrint] = React.useState('')
  const [disabled, setDisabled] = React.useState(true)
  const [dateStart, setDateStart] = React.useState<Date>(
    dateSchedule != null ? new Date(dateSchedule) : new Date(),
  )
  const [dateFinish, setDateFinish] = React.useState<string>()
  const [listVehicles, setListVehicles] = React.useState([] as IVehicleSchema[])
  const [listMembersAvailable, setListMembersAvailable] = React.useState(
    unidade.members ?? ([] as IMemberSchema[]),
  )

  const router = useRouter()
  const form = useForm<IScheduleFormSave>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(ScheduleFormSave),
    defaultValues: {
      id: schedule?.id ?? null,
      id_company: unidade?.id ?? undefined,
      id_period: '',
      id_member_creator: schedule?.id_member_creator ?? undefined,
      id_cmt_sos: schedule?.id_cmt_sos ?? undefined,
      id_member_comunication: schedule?.id_member_creator ?? undefined,
      hour_start: schedule?.hour_start ?? '',
      team: schedule?.team ?? undefined,
      situation: schedule?.situation ?? null,
      type: schedule?.type ?? undefined,
      status: schedule?.status ?? null,
      date_creation:
        schedule?.date_creation ?? new Date().toLocaleDateString('pt-BR'),
      date_start:
        schedule?.date_start ??
        (dateSchedule != null
          ? new Date(dateSchedule).toLocaleDateString('pt-BR')
          : new Date().toLocaleDateString('pt-BR')),
      date_finish: schedule?.date_finish ?? '',
      obs:
        schedule?.obs ??
        'escala de serviço do dia ' +
          (dateSchedule !== undefined
            ? new Date(dateSchedule).toLocaleDateString('pt-BR')
            : new Date().toLocaleDateString('pt-BR')) +
          ' para o dia ' +
          dateFinish,
      short_name_corp: schedule?.short_name_corp ?? params?.sigla ?? '',
      short_name_comp: schedule?.short_name_comp ?? params?.name_unidade ?? '',
      vehicle: undefined,
      vehicles: schedule?.vehicles ?? [],
      excluded: schedule?.excluded ?? 0,
    },
  })

  useEffect(() => {
    searchParams?.id_schedule !== null && setDisabled(false)
    setDayWeekPrint(
      format(new Date(dateStart), 'eeeeee', {
        locale: ptBR,
      }) +
        '  | ' +
        format(new Date(dateStart), 'dd/MM', {
          locale: ptBR,
        }),
    )
  }, [dateStart, searchParams?.id_schedule])

  const handleSubmit = async (formData: IScheduleFormSave): Promise<void> => {
    startTransition(async () => {
      // const result = await saveUnidadeAction(formData)
      // if (result?.code !== 202) {
      //   toast({
      //     variant: 'danger',
      //     title: 'Erro ao salvar Escala! 🤯 ',
      //     description: result?.message,
      //   })
      // }
      // if (result?.code === 202) {
      //   toast({
      //     variant: 'success',
      //     title: 'Ok! Escala salva com sucesso! 🚀',
      //     description: 'Tudo certo Escala salva',
      //   })
      //   redirect(
      //     `/${params?.sigla.toLowerCase()}/unidades/${params?.name_unidade.toLowerCase()}`,
      //   )
      // }
    })
  }

  const handleDeleteAction = async (
    formData: IScheduleFormSave,
  ): Promise<void> => {
    formData.excluded = 1
    startTransition(async () => {
      const result = await saveUnidadeAction(formData)
      if (result?.code !== 202) {
        toast({
          variant: 'danger',
          title: 'Erro ao excluir escala! 🤯 ',
          description: result?.message,
        })
      }
      if (result?.code === 202) {
        toast({
          variant: 'success',
          title: 'Ok! Escala excluída com sucesso! 🚀',
          description: 'Tudo certo escala excluída',
        })
        router.push(
          `/${params?.sigla.toLowerCase()}/unidades/${params?.name_unidade.toLowerCase()}`,
        )
      }
    })
  }

  const horarios = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
  ]

  const intervaloHorarios = [
    { id: 6, period: '06h:00min' },
    { id: 8, period: '08h:00min' },
    { id: 12, period: '12h:00min' },
    { id: 24, period: '24h:00min' },
  ]

  const tipos = [
    { id: 1, name: 'NORMAL' },
    { id: 2, name: 'EXTRA' },
    { id: 3, name: 'ORDEM SERVIÇO' },
  ]

  const team = [
    { id: 1, name: 'ALFA' },
    { id: 2, name: 'BRAVO' },
    { id: 3, name: 'CHARLIE' },
    { id: 4, name: 'DELTA' },
    { id: 5, name: 'EXTRA' },
  ]

  const handleAddListVehicle = () => {
    const isVehicleSelected =
      form.getValues('vehicle')?.id ===
      listVehicles?.find(
        (vehiclelist: IVehicleSchema) =>
          vehiclelist.id === form?.getValues('vehicle')?.id,
      )?.id
    form.getValues('vehicle') === undefined &&
      toast({
        variant: 'warning',
        title: 'Selecione um veículo para adicionar! 🤯 ',
        description: 'É preciso selecionar um veículo para adicionar',
      })
    isVehicleSelected &&
      form.getValues('vehicle') !== undefined &&
      toast({
        variant: 'danger',
        title: 'Erro ao adicionar veículo! 🤯 ',
        description: 'Veículo já adicionado',
      })

    if (form.getValues('vehicle') !== undefined && !isVehicleSelected) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setListVehicles((prevState: IVehicleSchema[]) => {
        return [...prevState, form.getValues('vehicle')]
      })
      form.resetField('vehicle')
    }
  }

  useEffect(() => {
    if (listVehicles) {
      form.setValue('vehicles', listVehicles)
    }
  }, [form, listVehicles])

  const handleCalculeDateFinal = (value: string) => {
    const data = moment(
      form?.getValues('date_start') +
        ' ' +
        form?.getValues('hour_start') +
        '00',
      'DD/MM/YYYY HH:mm:ss',
    ).toDate()

    data.setTime(data.getTime() + Number(value) * 60 * 60 * 1000)
    const dateFinish = data.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })
    form?.setValue('date_finish', dateFinish)
    form?.setValue(
      'obs',
      'Escala de serviço do dia ' +
        form?.getValues('date_start') +
        ' para o dia ' +
        dateFinish,
    )

    setDateFinish(dateFinish)
  }

  const handlerCalculateMemberAvailable = (member: IMemberSchema) => {
    return form?.getValues('id_member_comunication') !== null ||
      form?.getValues('id_cmt_sos') !== null
      ? listVehicles?.some((vehicle) =>
          vehicle?.members?.some(
            (itemForm) =>
              member?.id === itemForm?.member?.id ||
              member?.id === form?.getValues('id_member_comunication') ||
              member?.id === form?.getValues('id_cmt_sos'),
          ),
        )
      : listVehicles?.some((vehicle) =>
          vehicle?.members?.some(
            (itemForm) => member?.id === itemForm?.member?.id,
          ),
        )
  }

  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn(' mb-4 p-2  md:p-6', className)}
        {...props}
      >
        <div className="flex items-center ">
          <div className="flex w-full items-center">
            <div className="mb-6 flex w-full items-center justify-between  border-b border-foreground/10">
              <div className="mx-4 flex w-full items-center justify-between">
                <h1 className=" text-xl font-bold">Salvar nova escala</h1>
                <div className="flex items-center gap-1">
                  <LuCalendarDays size={24} />
                  <h1 className="text-xl font-bold">{dayWeekPrint}</h1>
                </div>
              </div>
              {schedule?.id != null && (
                <div className="flex  items-center gap-2">
                  <div className="text-md font-bold">
                    <Badge
                      className={` block ${
                        schedule?.team === 1
                          ? 'border-primary/85 text-primary/85'
                          : schedule?.team === 2
                            ? 'border-blue-500/85 text-blue-500/85'
                            : schedule?.team === 3
                              ? 'border-yellow-400/85 text-yellow-400/85'
                              : schedule?.team === 4
                                ? 'border-green-500/85 text-green-500/85'
                                : schedule?.team === 5
                                  ? 'border-[#9400d3]/85 text-[#9400d3]/85'
                                  : ''
                      }`}
                      variant="outline"
                    >
                      <span className="flex items-center gap-1 ">
                        {' '}
                        <GrGroup />
                        <p>
                          {schedule?.team === 1
                            ? 'ALFA'
                            : schedule?.team === 2
                              ? 'BRAVO'
                              : schedule?.team === 3
                                ? 'CHARLIE'
                                : schedule?.team === 4
                                  ? 'DELTA'
                                  : schedule?.team === 5
                                    ? 'EXTRA'
                                    : ''}
                        </p>
                      </span>
                    </Badge>{' '}
                  </div>
                  <span className="flex items-center gap-1">
                    <i>
                      <LuCalendarDays />
                    </i>
                    {schedule?.date_start !== undefined && (
                      <div className="font-bold text-muted-foreground">
                        {' '}
                        {format(new Date(schedule?.date_start), 'eeeeee', {
                          locale: ptBR,
                        }) +
                          '  | ' +
                          format(new Date(schedule?.date_start), 'dd/MM', {
                            locale: ptBR,
                          })}
                      </div>
                    )}
                  </span>
                </div>
              )}
              <div>
                {schedule?.id != null && (
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button disabled={pending} variant="secondary">
                          <LuTrash2
                            className="text-foreground group-hover:text-muted-foreground"
                            size={24}
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Excluir Escala</DialogTitle>
                          <DialogDescription>
                            Está ação precisa ser confirmada
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p>
                            {' '}
                            ATENÇÃO!!! Tem certeza que deseja excluir esta
                            escala de sua unidade?
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
                                 
                                onClick={form.handleSubmit(async (data) => {
                                  data?.id != null &&
                                    true &&
                                    (await handleDeleteAction(data))
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
                      className="ml-2"
                      variant="secondary"
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
          </div>
        </div>
        <Form {...form}>
          <LoadingPage pending={pending} />
          <form
             
            onSubmit={form.handleSubmit(async (data) => {
              await handleSubmit(data)
            })}
            className="w-full md:space-y-4  "
          >
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-full w-full flex-col gap-4 md:flex-row ">
                <FormField
                  control={form.control}
                  name="date_start"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3 ">
                      <FormLabel className="flex items-center gap-1 text-muted-foreground">
                        <LuCalendarDays />
                        Data de Ínicio
                      </FormLabel>
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
                              {field?.value !== undefined
                                ? field?.value
                                : 'Selecione uma data'}
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
                            selected={dateStart}
                            onSelect={(date) => {
                              if (date == null) return
                              setDateStart(date)
                              form.setValue(
                                'date_start',
                                new Date(date)?.toLocaleDateString('pt-BR'),
                              )
                            }}
                            disabled={(date) =>
                              dateSchedule != null ||
                              date.setHours(0, 1, 1, 1) <
                                new Date().setHours(0, 0, 0, 0) ||
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

                <FormField
                  control={form.control}
                  name="hour_start"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3">
                      <FormLabel
                        htmlFor="hour_start"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuClock1 /> Hora Início
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
                                ? form.getValues('date_start') +
                                  ', ' +
                                  field.value
                                : 'Selecione um horário'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>Horário não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {horarios?.map((horaInicio, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(horaInicio)}
                                    key={index}
                                    onSelect={() => {
                                      form.resetField('id_period')
                                      form.resetField('date_finish')
                                      horaInicio != null &&
                                        form.setValue('hour_start', horaInicio)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        horaInicio === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {horaInicio}
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
                  name="id_period"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3">
                      <FormLabel
                        htmlFor="id_period"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuClock1 /> Período
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
                                ? field.value
                                : 'Selecione um período'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando período ..." />
                            <CommandEmpty>Período não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {intervaloHorarios?.map((period, index) => (
                                  <CommandItem
                                    value={String(period?.id)}
                                    key={index}
                                    onSelect={() => {
                                      handleCalculeDateFinal(String(period?.id))
                                      form.setValue(
                                        'id_period',
                                        String(period?.period),
                                      )
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        period?.id?.toString() ===
                                          field?.value?.toString()
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {period?.period}
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
              </div>
              <div className="flex h-full w-full flex-col gap-4 md:flex-row ">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3">
                      <FormLabel
                        htmlFor="type"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuClock1 /> Tipo
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
                              {tipos?.find((tipo) => tipo?.id === field?.value)
                                ?.name ?? 'Selecione um horário'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>Tipo não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {tipos?.map((tipo, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(tipo.id)}
                                    key={index}
                                    onSelect={() => {
                                      tipo != null &&
                                        form.setValue('type', tipo.id)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        tipo?.id === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {tipo?.name}
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
                  name="team"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3">
                      <FormLabel
                        htmlFor="team"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuUsers /> Equipe
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
                              {team?.find((tipo) => tipo?.id === field?.value)
                                ?.name ?? 'Selecione uma equipe'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando horário ..." />
                            <CommandEmpty>Tipo não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {team?.map((tipo, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    value={String(tipo.id)}
                                    key={index}
                                    onSelect={() => {
                                      tipo != null &&
                                        form.setValue('team', tipo.id)
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        tipo?.id === field?.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {tipo?.name}
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
                  name="date_finish"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3 ">
                      <FormLabel className="flex items-center gap-1 text-muted-foreground">
                        <LuCalendarDays />
                        Encerramento
                      </FormLabel>
                      <Input
                        type="text"
                        readOnly={true}
                        {...field}
                        disabled={disabled}
                        placeholder="Data de Encerramento"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="  w-full  gap-4 md:flex-row">
              <FormField
                disabled={disabled}
                control={form.control}
                name="obs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1 text-muted-foreground">
                      <LuClipboardPen />
                      Observação
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Obrigatório relatar detalhes"
                        className="resize-none bg-transparent "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex  items-center gap-1 text-muted-foreground">
              <LuCrown className="cursor-pointer " />
              CMT Socorro
            </div>
            <div
              className="w-full rounded-sm border border-foreground/10"
              style={{ marginTop: '4px' }}
            >
              <div className="m-0 flex flex-col items-center justify-between gap-2 p-2  md:flex-row">
                <FormField
                  control={form.control}
                  name="id_cmt_sos"
                  render={({ field }) => (
                    <FormItem className="m-0 flex w-full flex-col md:w-11/12 ">
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
                              {field?.value != null
                                ? listMembersAvailable?.find(
                                    (itemSeat) => itemSeat?.id === field?.value,
                                  )?.name
                                : 'Selecione um membro'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando membro.." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {listMembersAvailable?.map((member, index) => (
                                  <CommandItem
                                    key={index}
                                    value={String(member?.id)}
                                    disabled={handlerCalculateMemberAvailable(
                                      member,
                                    )}
                                    onSelect={() => {
                                      form?.setValue(
                                        'id_cmt_sos',
                                        member?.id ?? undefined,
                                      )
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        member?.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />

                                    {member?.name}
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
                <Button
                  asChild
                  className=" w-full p-1 md:w-1/12"
                  type="button"
                  variant="secondary"
                >
                  <IconManager
                    width={50}
                    className="fill-foreground hover:fill-foreground/60"
                  />
                </Button>
              </div>
            </div>

            <div className="flex  items-center gap-1 text-muted-foreground">
              <LuMegaphone className="cursor-pointer " />
              Comunicação
            </div>
            <div
              className="w-full rounded-sm border border-foreground/10"
              style={{ marginTop: '4px' }}
            >
              <div className="m-0 flex flex-col items-center justify-between gap-2 p-2  md:flex-row">
                <FormField
                  control={form.control}
                  name="id_member_comunication"
                  render={({ field }) => (
                    <FormItem className="m-0 flex w-full flex-col md:w-11/12 ">
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
                              {field?.value != null
                                ? listMembersAvailable?.find(
                                    (itemSeat) => itemSeat?.id === field?.value,
                                  )?.name
                                : 'Selecione um membro'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando membro.." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {listMembersAvailable?.map((member, index) => (
                                  <CommandItem
                                    key={index}
                                    value={String(member?.id)}
                                    disabled={handlerCalculateMemberAvailable(
                                      member,
                                    )}
                                    onSelect={() => {
                                      form?.setValue(
                                        'id_member_comunication',
                                        member?.id ?? undefined,
                                      )
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        member?.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />

                                    {member?.name}
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
                <Button
                  asChild
                  className=" w-full p-1 md:w-1/12"
                  type="button"
                  onClick={handleAddListVehicle}
                  variant="secondary"
                >
                  <LuSpeech size={28} className="hover:text-foreground/60" />
                </Button>
              </div>
            </div>

            <div className=" flex  items-center  gap-1 text-muted-foreground">
              <LuCar className=" m-0 cursor-pointer " />
              Veículos
            </div>
            <div
              style={{ marginTop: '4px' }}
              className="m-0 w-full rounded-sm border border-foreground/10 p-0"
            >
              <div className="flex flex-col items-center justify-between gap-2  p-2  md:flex-row">
                <FormField
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-11/12 ">
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
                              {field.value !== undefined
                                ? field.value?.prefix
                                : 'Selecione um veículo'}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="procurando veículo ..." />
                            <CommandEmpty>Veículo não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {unidade?.vehicles?.map((veihcle, index) => (
                                  <CommandItem
                                    disabled={disabled}
                                    key={index}
                                    onSelect={() => {
                                      form?.setValue(
                                        'vehicle',
                                        listVehicles?.find(
                                          (vehiclelist: IVehicleSchema) =>
                                            vehiclelist?.id === veihcle.id,
                                        ) ?? veihcle,
                                      )
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        veihcle?.id ===
                                          listVehicles?.find(
                                            (vehiclelist: IVehicleSchema) =>
                                              vehiclelist?.id === veihcle?.id,
                                          )?.id
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {veihcle?.prefix}
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
                <Button
                  asChild
                  className="w-full p-1 md:w-1/12"
                  type="button"
                  onClick={handleAddListVehicle}
                  variant="secondary"
                >
                  <AddCar
                    width={70}
                    className="fill-foreground hover:fill-foreground/60"
                  />
                </Button>
              </div>
              <div className="flex w-full flex-row flex-wrap justify-evenly ">
                {listVehicles?.map((vehicle, index) => (
                  <div key={index} className="pb-2">
                    <div className="relative ">
                      <LuTrash2
                        onClick={() => {
                          setListVehicles((prevState: IVehicleSchema[]) => {
                            return prevState.filter(
                              (item, idx) => idx !== index,
                            )
                          })
                        }}
                        size={20}
                        className="absolute right-0 top-2 mr-2  cursor-pointer hover:text-primary/60"
                      />
                      <Popover>
                        <PopoverTrigger>
                          <CardModule
                            title={vehicle.prefix}
                            subtitle={vehicle?.model?.split(' ')[0] ?? ''}
                            className={
                              checkMobile() ? 'h-24 w-32' : 'h-28 w-36'
                            }
                            icon={
                              <IconCarFrontal
                                className="fill-foreground stroke-foreground"
                                width={checkMobile() ? 30 : 40}
                              />
                            }
                          />
                        </PopoverTrigger>
                        <PopoverContent className="m-0 h-full w-full border border-foreground  md:p-0">
                          <Card className={cn('', className)} {...props}>
                            <AddVehicleSchedule
                              vehicle={vehicle}
                              vehicles={listVehicles}
                              setListVehiclesAction={setListVehicles}
                              membersCompany={unidade.members}
                              form={form}
                            />
                          </Card>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col  justify-end md:flex-row">
              {!disabled && (
                <Button
                  onClick={() => {
                    console.log(form.getValues())
                    console.log(JSON.stringify(form.formState.errors, null, 2))
                  }}
                  size="sm"
                  variant="default"
                  disabled={pending}
                  className={cn(' animate-fadeIn gap-1 md:mr-4')}
                  type="submit"
                >
                  {pending && (
                    <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <LuSave size={20} />
                  Salvar
                </Button>
              )}{' '}
            </div>
          </form>
        </Form>
      </Card>
    </>
  )
}
export default TabScheduleSave
