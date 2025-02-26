"use client";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  LuCalendarDays,
  LuCar,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardPen,
  LuClock1,
  LuCrown,
  LuLoaderCircle,
  LuMegaphone,
  LuSave,
  LuTrash2,
  LuUsers,
} from "react-icons/lu";

import { AddVehicleSchedule } from "@/components/Buttoms/AddVehicleSchedule";
import { CardModule } from "@/components/Cards/CardModule";
import LoadingPage from "@/components/Loadings/LoadingPage";
import AddCar from "@/icons/AddCar";
import IconCarFrontal from "@/icons/IconCarFrontal";
import { cn } from "@/lib/utils";
import type { IVehicleSchema } from "@/schemas/CarsSchema";
import type { IMemberSchema } from "@/schemas/MemberSchema";
import {
  type IScheduleFormSave,
  ScheduleFormSave,
} from "@/schemas/ScheduleFormSave";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Card } from "@/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Textarea } from "@/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import moment from "moment";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { saveScheduleAction } from "@/actions/saveScheduleAction";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  unidade?: IUnidadeSchema;
  schedule?: IScheduleSchema;
  dateSchedule?: string;
  className?: string;
};

export const TabScheduleSave = ({
  unidade,
  schedule,
  dateSchedule,
  className,
  ...props
}: UserRegisterFormProps) => {
  const [pending, startTransition] = useTransition();
  const [dayWeekPrint, setDayWeekPrint] = React.useState("");
  const params = useParams();
  const { data: session } = useSession();
  const isMobile = useIsMobile();
  const [dateStart, setDateStart] = React.useState<Date>(
    dateSchedule != null ? new Date(dateSchedule) : new Date(),
  );
  const [dateFinish, setDateFinish] = React.useState<string>();
  const [listVehicles, setListVehicles] = React.useState(
    schedule?.vehicles ?? ([] as IVehicleSchema[]),
  );
  const [listMembersAvailable, setListMembersAvailable] = React.useState(
    unidade?.members ?? ([] as IMemberSchema[]),
  );

  const form = useForm<IScheduleFormSave>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ScheduleFormSave),
    defaultValues: {
      day:
        schedule?.day ??
        (dateSchedule != null ? new Date(dateSchedule).getDate() : undefined),
      month:
        schedule?.month ??
        (dateSchedule ? new Date(dateSchedule).getMonth() : undefined),
      year:
        schedule?.year ??
        (dateSchedule ? new Date(dateSchedule).getFullYear() : undefined),
      id: schedule?.id ?? null,
      id_company: schedule?.id_company ?? unidade?.id,
      id_corporation: schedule?.id_corporation ?? unidade?.id_corporation,
      id_period: schedule?.id_period ?? undefined,
      id_member_creator: schedule?.id_member_creator ?? session?.id,
      id_cmt_sos: schedule?.id_cmt_sos ?? undefined,
      id_member_comunication: schedule?.id_member_comunication ?? undefined,
      hour_start: schedule?.hour_start ?? undefined,
      team: schedule?.team ?? undefined,
      date_creation:
        schedule?.date_creation ?? new Date().toLocaleDateString("pt-BR"),
      date_start:
        schedule?.date_start ??
        (dateSchedule != null
          ? new Date(dateSchedule).toLocaleDateString("pt-BR")
          : new Date().toLocaleDateString("pt-BR")),
      date_finish: schedule?.date_finish ?? "",
      obs:
        schedule?.obs ??
        "escala de serviço do dia " +
          (dateSchedule !== undefined
            ? new Date(dateSchedule).toLocaleDateString("pt-BR")
            : new Date().toLocaleDateString("pt-BR")) +
          " para o dia " +
          dateFinish,
      vehicle: schedule?.vehicle ?? undefined,
      vehicles: schedule?.vehicles ?? [],
      excluded: schedule?.excluded ?? 0,
    },
  });

  useEffect(() => {
    setDayWeekPrint(
      format(new Date(dateStart), "eeeeee", {
        locale: ptBR,
      }) +
        "  | " +
        format(new Date(dateStart), "dd/MM", {
          locale: ptBR,
        }),
    );
  }, [dateStart]);

  const handleSubmit = async (formData: IScheduleFormSave): Promise<void> => {
    console.log(JSON.stringify(form.getValues()));
    console.log(form.formState.errors);

    startTransition(async () => {
      const result = await saveScheduleAction(formData);
      if (result?.code !== 202) {
        toast({
          variant: "danger",
          title: "Erro ao salvar Escala! 🤯 ",
          description: result?.message,
        });
      }
      if (result?.code === 202) {
        toast({
          variant: "success",
          title: "Ok! Escala salva com sucesso! 🚀",
          description: "Tudo certo Escala salva",
        });
        redirect(`/servicos/unidades/${(await params)?.id_company}/escalas`);
      }
    });
  };

  const horarios = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
  ];

  const intervaloHorarios = [
    { id: 6, period: "06h:00min" },
    { id: 8, period: "08h:00min" },
    { id: 12, period: "12h:00min" },
    { id: 24, period: "24h:00min" },
  ];

  const tipos = [
    { id: 1, name: "NORMAL" },
    { id: 2, name: "EXTRA" },
    { id: 3, name: "ORDEM SERVIÇO" },
  ];

  const team = [
    { id: 1, name: "ALFA" },
    { id: 2, name: "BRAVO" },
    { id: 3, name: "CHARLIE" },
    { id: 4, name: "DELTA" },
    { id: 5, name: "EXTRA" },
  ];

  const handleAddListVehicle = () => {
    const isVehicleSelected =
      form.getValues("vehicle")?.id ===
      listVehicles?.find(
        (vehiclelist: IVehicleSchema) =>
          vehiclelist.id === form?.getValues("vehicle")?.id,
      )?.id;

    if (form?.getValues("vehicle") === undefined) {
      toast({
        variant: "warning",
        title: "Selecione um veículo para adicionar! 🤯 ",
        description: "É preciso selecionar um veículo para adicionar",
      });
    }

    if (isVehicleSelected && form?.getValues("vehicle") !== undefined) {
      toast({
        variant: "danger",
        title: "Erro ao adicionar veículo! 🤯 ",
        description: "Veículo já adicionado",
      });
    }

    if (form?.getValues("vehicle") !== undefined && !isVehicleSelected) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setListVehicles((prevState: IVehicleSchema[]) => {
        return [...prevState, form.getValues("vehicle")];
      });
      form.resetField("vehicle");
    }
  };

  useEffect(() => {
    if (schedule?.id_period) {
      handleCalculeDateFinal(schedule?.id_period?.toString() ?? undefined);
    }
    if (listVehicles) {
      form.setValue("id_member_creator", session?.id);
      form.setValue("vehicles", listVehicles);
    }
  }, [form, listVehicles]);

  const handleCalculeDateFinal = (value?: string) => {
    const data = moment(
      form?.getValues("date_start") +
        " " +
        form?.getValues("hour_start") +
        "00",
      "DD/MM/YYYY HH:mm:ss",
    ).toDate();

    data.setTime(data.getTime() + Number(value) * 60 * 60 * 1000);
    const dateFinish = data.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    form?.setValue("date_finish", dateFinish);
    form?.setValue(
      "obs",
      "Escala de serviço do dia " +
        form?.getValues("date_start") +
        " para o dia " +
        dateFinish,
    );

    setDateFinish(dateFinish);
  };

  const handlerCalculateMemberAvailable = () => {
    const arrayMember = unidade?.members?.filter(
      (memberUnidade) =>
        memberUnidade?.id !== form?.getValues("id_member_comunication") ||
        memberUnidade?.id !== form?.getValues("id_cmt_sos"),
    );

    const arrayMembersVeicles: IMemberSchema[] = [];
    form?.getValues("vehicles")?.forEach((vehicle) => {
      arrayMember?.forEach((memberUnidade) => {
        if (
          vehicle?.members?.some(
            (memberVehicle) => memberUnidade?.id === memberVehicle?.member?.id,
          )
        ) {
          arrayMembersVeicles.push(memberUnidade);
        }
      });
    });

    const membersAvailable = arrayMember?.filter(
      (memberUnidade) =>
        !arrayMembersVeicles?.some(
          (memberVehicle) => memberUnidade?.id === memberVehicle?.id,
        ),
    );

    setListMembersAvailable(membersAvailable ?? []);
  };

  const disableItem = (member: IMemberSchema) => {
    if (listVehicles.length) {
      return listVehicles?.some((vehicle) =>
        vehicle?.members?.some(
          (itemForm) =>
            member?.id === itemForm?.member?.id ||
            member?.id === form?.getValues("id_member_comunication") ||
            member?.id === form?.getValues("id_cmt_sos"),
        ),
      );
    }

    return (
      member?.id === form?.getValues("id_member_comunication") ||
      member?.id === form?.getValues("id_cmt_sos")
    );
  };

  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn("mb-4 p-2 md:p-6", className)}
        {...props}
      >
        <div className="flex items-center">
          <div className="flex w-full items-center">
            <div className="mb-6 flex w-full items-center justify-between border-b border-foreground/10">
              <div className="mx-4 flex w-full items-center justify-between">
                <h1 className="text-xl font-bold">Salvar nova escala</h1>
                <div className="flex items-center gap-1">
                  <LuCalendarDays size={24} />
                  <h1 className="text-xl font-bold">{dayWeekPrint}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <LoadingPage pending={pending} />

          <form
            onSubmit={form.handleSubmit(async (data) => {
              await handleSubmit(data);
            })}
            className="w-full md:space-y-4"
          >
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-full w-full flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="date_start"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-1/3">
                      <FormLabel className="flex items-center gap-1 text-muted-foreground">
                        <LuCalendarDays />
                        Data de Ínicio
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "min-w-[240px] pl-3 text-left font-normal",
                                field?.value?.toString() === "" &&
                                  "text-muted-foreground",
                              )}
                            >
                              {field?.value !== undefined
                                ? field?.value
                                : "Selecione uma data"}
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
                              if (date == null) return;
                              setDateStart(date);
                              form.setValue("day", new Date(date)?.getDate());
                              form.setValue(
                                "month",
                                new Date(date)?.getMonth(),
                              );
                              form.setValue(
                                "year",
                                new Date(date)?.getFullYear(),
                              );
                              form.setValue(
                                "date_start",
                                new Date(date)?.toLocaleDateString("pt-BR"),
                              );
                            }}
                            disabled={(date) =>
                              dateSchedule != null ||
                              date.setHours(0, 1, 1, 1) <
                                new Date().setHours(0, 0, 0, 0) ||
                              date < new Date("1900-01-01")
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
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {field.value !== undefined
                                ? form.getValues("date_start") +
                                  ", " +
                                  field.value
                                : "Selecione um horário"}
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
                                    value={String(horaInicio)}
                                    key={index}
                                    onSelect={() => {
                                      form.resetField("id_period");
                                      form.resetField("date_finish");
                                      if (horaInicio != null) {
                                        form.setValue("hour_start", horaInicio);
                                      }
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        horaInicio === field?.value
                                          ? "opacity-100"
                                          : "opacity-0",
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
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {intervaloHorarios.find(
                                (horarioItem) =>
                                  horarioItem?.id?.toString() ===
                                  field?.value?.toString(),
                              )?.period ?? "Selecione um período"}
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
                                      handleCalculeDateFinal(
                                        String(period?.id),
                                      );
                                      form.setValue("id_period", period?.id);
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        period?.id?.toString() ===
                                          field?.value?.toString()
                                          ? "opacity-100"
                                          : "opacity-0",
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
              <div className="flex h-full w-full flex-col gap-4 md:flex-row">
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
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {tipos?.find((tipo) => tipo?.id === field?.value)
                                ?.name ?? "Selecione um horário"}
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
                                    value={String(tipo.id)}
                                    key={index}
                                    onSelect={() => {
                                      if (tipo != null) {
                                        form.setValue("type", tipo.id);
                                      }
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        tipo?.id === field?.value
                                          ? "opacity-100"
                                          : "opacity-0",
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
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {team?.find((tipo) => tipo?.id === field?.value)
                                ?.name ?? "Selecione uma equipe"}
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
                                    value={String(tipo.id)}
                                    key={index}
                                    onSelect={() => {
                                      if (tipo != null) {
                                        form.setValue("team", tipo.id);
                                      }
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        tipo?.id === field?.value
                                          ? "opacity-100"
                                          : "opacity-0",
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
                    <FormItem className="flex w-full flex-col md:w-1/3">
                      <FormLabel className="flex items-center gap-1 text-muted-foreground">
                        <LuCalendarDays />
                        Encerramento
                      </FormLabel>
                      <Input
                        type="text"
                        readOnly={true}
                        {...field}
                        placeholder="Data de Encerramento"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full gap-4 md:flex-row">
              <FormField
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
                        className="resize-none bg-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full flex-col text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <LuCrown className="cursor-pointer" />
                CMT Socorro
              </div>

              <div className="m-0 flex flex-col items-center justify-between md:flex-row">
                <FormField
                  control={form.control}
                  name="id_cmt_sos"
                  render={({ field }) => (
                    <FormItem className="m-0 flex w-full flex-col">
                      <Popover>
                        <PopoverTrigger
                          asChild
                          onClick={handlerCalculateMemberAvailable}
                        >
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {field?.value != null
                                ? unidade?.members?.find(
                                    (itemSeat) => itemSeat?.id === field?.value,
                                  )?.name
                                : "Selecione um membro"}
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
                                {unidade?.members?.map((member, index) => (
                                  <CommandItem
                                    key={index}
                                    value={String(member?.id)}
                                    disabled={disableItem(member)}
                                    onSelect={() => {
                                      form?.setValue(
                                        "id_cmt_sos",
                                        member?.id ?? undefined,
                                      );
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        member?.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />

                                    {member?.name}
                                    <LuCar
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        disableItem(member)
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
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
            </div>
            <div className="flex w-full flex-col text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <LuMegaphone className="cursor-pointer" />
                Comunicação
              </div>

              <div className="m-0 flex flex-col items-center justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="id_member_comunication"
                  render={({ field }) => (
                    <FormItem className="m-0 flex w-full flex-col">
                      <Popover>
                        <PopoverTrigger
                          asChild
                          onClick={handlerCalculateMemberAvailable}
                        >
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {field?.value != null
                                ? unidade?.members?.find(
                                    (itemSeat) => itemSeat?.id === field?.value,
                                  )?.name
                                : "Selecione um membro"}
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
                                {unidade?.members?.map((member, index) => (
                                  <CommandItem
                                    key={index}
                                    disabled={disableItem(member)}
                                    value={String(member?.id)}
                                    onSelect={() => {
                                      form?.setValue(
                                        "id_member_comunication",
                                        member?.id ?? undefined,
                                      );
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        member?.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />

                                    {member?.name}
                                    <LuCar
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        disableItem(member)
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
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
            </div>

            {/*VEÍCULOS TITULO*/}

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <LuCar className="m-0 cursor-pointer" />
              Veículos
            </div>

            {/*VEÍCULOS*/}
            <div
              style={{ marginTop: "4px" }}
              className="m-0 w-full rounded-sm border border-foreground/10 p-0"
            >
              <div className="flex flex-col items-center justify-between gap-2 p-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-11/12">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {field.value !== undefined
                                ? field.value?.prefix
                                : "Selecione um veículo"}
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
                                    key={index}
                                    onSelect={() => {
                                      form?.setValue(
                                        "vehicle",
                                        listVehicles?.find(
                                          (vehiclelist: IVehicleSchema) =>
                                            vehiclelist?.id === veihcle.id,
                                        ) ?? veihcle,
                                      );
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        veihcle?.id ===
                                          listVehicles?.find(
                                            (vehiclelist: IVehicleSchema) =>
                                              vehiclelist?.id === veihcle?.id,
                                          )?.id
                                          ? "opacity-100"
                                          : "opacity-0",
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

              <div className="flex w-full flex-row flex-wrap justify-evenly">
                {listVehicles?.map((vehicle, index) => (
                  <div key={index}>
                    <div className="relative pb-2">
                      <LuTrash2
                        onClick={() => {
                          setListVehicles((prevState: IVehicleSchema[]) => {
                            return prevState.filter(
                              (item, idx) => idx !== index,
                            );
                          });
                        }}
                        size={20}
                        className="absolute left-2 top-2 cursor-pointer hover:text-primary/60"
                      />
                      <Popover>
                        <PopoverTrigger>
                          <CardModule
                            title={vehicle.prefix}
                            className={
                              isMobile
                                ? "flex h-28 w-32 flex-col"
                                : "flex h-32 w-44 flex-col"
                            }
                            icon={
                              vehicle.image ? (
                                <Image
                                  width={isMobile ? 70 : 80}
                                  height={isMobile ? 70 : 80}
                                  src={
                                    process.env.NEXT_PUBLIC_API_GSO &&
                                    vehicle.image
                                      ? process.env.NEXT_PUBLIC_API_GSO +
                                        vehicle.image
                                      : process.env.NEXT_PUBLIC_API_GSO +
                                        "/public/images/img.png"
                                  }
                                  className="m-2 aspect-square rounded-sm border border-foreground bg-background object-contain transition-all duration-300 ease-in-out hover:scale-[250%] xl:mt-4"
                                  sizes="100"
                                  alt="image icone"
                                />
                              ) : (
                                <IconCarFrontal
                                  className="fill-foreground stroke-foreground"
                                  width={isMobile ? 30 : 40}
                                />
                              )
                            }
                          />
                        </PopoverTrigger>
                        <PopoverContent className="m-0 h-full w-full md:p-0">
                          <Card className={cn("", className)} {...props}>
                            <AddVehicleSchedule
                              vehicle={vehicle}
                              setListVehiclesAction={setListVehicles}
                              membersCompany={listMembersAvailable}
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

            <div className="flex w-full flex-col justify-end md:flex-row">
              <Button
                size="sm"
                variant="default"
                disabled={pending}
                className={cn("animate-fadeIn gap-1 md:mr-4")}
                type="submit"
              >
                {pending && (
                  <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                <LuSave size={20} />
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};
export default TabScheduleSave;
