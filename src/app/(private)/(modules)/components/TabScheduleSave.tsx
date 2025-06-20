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
import IconCarFrontal from "@/icons/IconCarFrontal";
import { cn } from "@/lib/utils";
import type { IVehicleSchema } from "@/schemas/CarsSchema";
import type { IMemberSchema } from "@/schemas/MemberSchema";
import {
  type IScheduleFormSave,
  ScheduleFormSave,
} from "@/schemas/ScheduleFormSave";
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
import { saveScheduleAction } from "@/actions/schedule/saveScheduleAction";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  subscriptionsUser: string;
  idCompany: string;
  idCorporation: string;
  membersCompany?: IMemberSchema[];
  vehiclesCompany?: IVehicleSchema[];
  scheduleCompany?: IScheduleSchema;
  dateSchedule?: string;
  className?: string;
};

export const TabScheduleSave = ({
  subscriptionsUser,
  idCompany,
  idCorporation,
  membersCompany,
  vehiclesCompany,
  scheduleCompany,
  dateSchedule,
  className,
  ...props
}: UserRegisterFormProps) => {
  const [pending, startTransition] = useTransition();
  const [dayWeekPrint, setDayWeekPrint] = React.useState("");
  const params = useParams();
  const { data: session } = useSession();
  const [dateStart, setDateStart] = React.useState<Date>(
    dateSchedule != null ? new Date(dateSchedule) : new Date(),
  );
  const [dateFinish, setDateFinish] = React.useState<string>();
  const [listVehicles, setListVehicles] = React.useState<IVehicleSchema[]>(
    scheduleCompany?.vehicles ?? [],
  );
  const [listMembersAvailable, setListMembersAvailable] = React.useState<
    IMemberSchema[]
  >(membersCompany ?? []);

  // Dados para selects
  const horarios = React.useMemo(
    () => [
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
    ],
    [],
  );

  const intervaloHorarios = React.useMemo(
    () => [
      { id: 6, period: "06h:00min" },
      { id: 8, period: "08h:00min" },
      { id: 12, period: "12h:00min" },
      { id: 24, period: "24h:00min" },
    ],
    [],
  );

  const tipos = React.useMemo(
    () => [
      { id: 1, name: "NORMAL" },
      { id: 2, name: "EXTRA" },
      { id: 3, name: "ORDEM SERVIÇO" },
    ],
    [],
  );

  const team = React.useMemo(
    () => [
      { id: 1, name: "ALFA" },
      { id: 2, name: "BRAVO" },
      { id: 3, name: "CHARLIE" },
      { id: 4, name: "DELTA" },
      { id: 5, name: "EXTRA" },
    ],
    [],
  );

  const form = useForm<IScheduleFormSave>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ScheduleFormSave),
    defaultValues: {
      day:
        scheduleCompany?.day ??
        (dateSchedule != null ? new Date(dateSchedule).getDate() : undefined),
      month:
        scheduleCompany?.month ??
        (dateSchedule ? new Date(dateSchedule).getMonth() : undefined),
      year:
        scheduleCompany?.year ??
        (dateSchedule ? new Date(dateSchedule).getFullYear() : undefined),
      id: scheduleCompany?.id ?? null,
      id_company: scheduleCompany?.id_company ?? idCompany,
      id_corporation: scheduleCompany?.id_corporation ?? idCorporation,
      id_period: Number(scheduleCompany?.id_period) ?? undefined,
      id_member_creator: scheduleCompany?.id_member_creator ?? session?.id,
      id_cmt_sos: scheduleCompany?.id_cmt_sos ?? undefined,
      id_member_comunication:
        scheduleCompany?.id_member_comunication ?? undefined,
      hour_start: scheduleCompany?.hour_start ?? undefined,
      team: scheduleCompany?.team ?? undefined,
      type: scheduleCompany?.type ?? undefined,
      date_creation:
        scheduleCompany?.date_creation ??
        new Date().toLocaleDateString("pt-BR"),
      date_start:
        scheduleCompany?.date_start ??
        (dateSchedule != null
          ? new Date(dateSchedule).toLocaleDateString("pt-BR")
          : new Date().toLocaleDateString("pt-BR")),
      date_finish: scheduleCompany?.date_finish ?? "",
      obs:
        scheduleCompany?.obs ??
        `escala de serviço do dia ${
          dateSchedule !== undefined
            ? new Date(dateSchedule).toLocaleDateString("pt-BR")
            : new Date().toLocaleDateString("pt-BR")
        } para o dia ${dateFinish}`,
      vehicle: scheduleCompany?.vehicle ?? undefined,
      vehicles: scheduleCompany?.vehicles ?? [],
      excluded: scheduleCompany?.excluded ?? 0,
      subscription: subscriptionsUser ?? "",
    },
  });

  // Atualiza o formato de exibição da data
  useEffect(() => {
    setDayWeekPrint(
      format(new Date(dateStart), "eeeeee", { locale: ptBR }) +
        "  | " +
        format(new Date(dateStart), "dd/MM", { locale: ptBR }),
    );
  }, [dateStart]);

  // Função para calcular data de encerramento baseada no período
  const handleCalculeDateFinal = React.useCallback(
    (value?: string) => {
      if (
        !value ||
        !form.getValues("date_start") ||
        !form.getValues("hour_start")
      )
        return;

      const data = moment(
        `${form.getValues("date_start")} ${form.getValues("hour_start")}00`,
        "DD/MM/YYYY HH:mm:ss",
      ).toDate();

      data.setTime(data.getTime() + Number(value) * 60 * 60 * 1000);
      const dateFinish = data.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      form.setValue("date_finish", dateFinish);
      form.setValue(
        "obs",
        `Escala de serviço do dia ${form.getValues("date_start")} para o dia ${dateFinish}`,
      );

      setDateFinish(dateFinish);
      form.setValue("day", data.getDate());
      form.setValue("month", data.getMonth());
      form.setValue("year", data.getFullYear());
    },
    [form, setDateFinish],
  );

  // Atualiza dados quando o período ou veículos mudam
  useEffect(() => {
    if (scheduleCompany?.id_period) {
      handleCalculeDateFinal(scheduleCompany.id_period.toString());
    }

    if (listVehicles?.length > 0) {
      form.setValue("id_member_creator", session?.id);
      form.setValue("vehicles", listVehicles);
    }
  }, [
    form,
    listVehicles,
    scheduleCompany?.id_period,
    session?.id,
    handleCalculeDateFinal,
  ]);

  // Filtra membros disponíveis para escala
  const handlerCalculateMemberAvailable = React.useCallback(() => {
    const assignedMembers = [
      form.getValues("id_member_comunication"),
      form.getValues("id_cmt_sos"),
    ].filter(Boolean);

    // Filtra membros que não estão como comunicação ou comandante
    const initialMembers =
      membersCompany?.filter(
        (member) =>
          member?.id_user != null && !assignedMembers.includes(member.id_user),
      ) || [];

    // Encontra membros já atribuídos a veículos
    const vehicleAssignedMembers: Set<string> = new Set();
    listVehicles.forEach((vehicle) => {
      vehicle?.members?.forEach((memberVehicle) => {
        if (memberVehicle?.member?.id_user) {
          vehicleAssignedMembers.add(memberVehicle.member.id_user);
        }
      });
    });

    // Filtra membros que não estão em veículos
    const availableMembers = initialMembers.filter(
      (member) =>
        member?.id_user && !vehicleAssignedMembers.has(member.id_user),
    );

    setListMembersAvailable(availableMembers);
  }, [form, listVehicles, membersCompany]);

  // Verifica se um membro está indisponível (já atribuído)
  const disableItem = React.useCallback(
    (member: IMemberSchema) => {
      const assignedRoles = [
        form.getValues("id_member_comunication"),
        form.getValues("id_cmt_sos"),
      ];

      // Verifica se o membro já tem função atribuída
      if (member?.id_user && assignedRoles.includes(member.id_user)) {
        return true;
      }

      // Verifica se o membro já está em algum veículo
      if (listVehicles.length > 0) {
        return listVehicles.some((vehicle) =>
          vehicle?.members?.some(
            (item) => member?.id_user === item?.member?.id_user,
          ),
        );
      }

      return false;
    },
    [form, listVehicles],
  );

  // Submissão do formulário
  const handleSubmit = async (formData: IScheduleFormSave): Promise<void> => {
    startTransition(async () => {
      const result = await saveScheduleAction(formData);

      if (result?.code !== 200) {
        toast({
          variant: "danger",
          title: "Erro ao salvar Escala! 🤯",
          description: result?.message,
        });
        return;
      }

      toast({
        variant: "success",
        title: "Ok! Escala salva com sucesso! 🚀",
        description: "Tudo certo Escala salva",
      });

      redirect(`/servicos/corporacao/unidades/${params.id_company}/escalas`);
    });
  };

  // Adiciona veículo à lista
  const handleAddListVehicle = React.useCallback(() => {
    const vehicle = form.getValues("vehicle");

    if (!vehicle) {
      toast({
        variant: "warning",
        title: "Selecione um veículo para adicionar! 🤯",
        description: "É preciso selecionar um veículo para adicionar",
      });
      return;
    }

    const isVehicleSelected = listVehicles.some((v) => v.id === vehicle.id);

    if (isVehicleSelected) {
      toast({
        variant: "danger",
        title: "Erro ao adicionar veículo! 🤯",
        description: "Veículo já adicionado",
      });
      return;
    }

    setListVehicles((prevState) => [...prevState, vehicle]);
    form.resetField("vehicle");
  }, [form, listVehicles]);

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
                <div className="flex items-center gap-1 py-2">
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
                            captionLayout="dropdown"
                            locale={ptBR}
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
                                ? membersCompany?.find(
                                    (userUnidade) =>
                                      userUnidade?.id_user === field?.value,
                                  )?.name
                                : "Selecione um membro"}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="procurando membro.." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {membersCompany?.map((member, index) => (
                                  <CommandItem
                                    key={index}
                                    value={String(member?.id_user)}
                                    disabled={disableItem(member)}
                                    onSelect={() => {
                                      form?.setValue(
                                        "id_cmt_sos",
                                        member?.id_user ?? undefined,
                                      );
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        member?.id_user === field.value
                                          ? "text-primary opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    <div className="flex w-full items-center justify-between">
                                      {member?.name}
                                      <LuCar
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          member?.id_user === field.value
                                            ? "text-primary"
                                            : "",
                                          disableItem(member)
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </div>
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
                                ? membersCompany?.find(
                                    (itemSeat) =>
                                      itemSeat?.id_user === field?.value,
                                  )?.name
                                : "Selecione um membro"}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="procurando membro.." />
                            <CommandEmpty>Membro não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {membersCompany?.map((member, index) => (
                                  <CommandItem
                                    key={index}
                                    disabled={disableItem(member)}
                                    value={String(member?.id_user)}
                                    onSelect={() => {
                                      form?.setValue(
                                        "id_member_comunication",
                                        member?.id_user ?? undefined,
                                      );
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        member?.id_user === field.value
                                          ? "text-primary opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    <div className="flex w-full items-center justify-between">
                                      {member?.name}
                                      <LuCar
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          member?.id_user === field.value
                                            ? "text-primary"
                                            : "",
                                          disableItem(member)
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </div>
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
            <div className="m-0 w-full rounded-sm border border-foreground/10 p-0">
              <div className="flex flex-col items-center justify-between gap-2 p-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
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
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="procurando veículo ..." />
                            <CommandEmpty>Veículo não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {vehiclesCompany?.map((veihcle, index) => (
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
                                      handleAddListVehicle();
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
              </div>

              <div className="flex w-full flex-row flex-wrap justify-evenly pb-4 pt-2">
                {listVehicles?.map((vehicle, index) => (
                  <div key={index}>
                    <div className="relative flex items-center justify-center">
                      <LuTrash2
                        onClick={() => {
                          setListVehicles((prevState: IVehicleSchema[]) => {
                            return prevState.filter(
                              (item, idx) => idx !== index,
                            );
                          });
                        }}
                        size={20}
                        className="absolute left-1 top-1 z-10 cursor-pointer text-primary hover:text-foreground"
                      />
                      <Popover>
                        <PopoverTrigger>
                          <CardModule
                            className={cn("flex h-20 w-32")}
                            icon={
                              vehicle.image != null ? (
                                <Image
                                  fill
                                  src={
                                    process.env.NEXT_PUBLIC_API_GSO &&
                                    vehicle.image
                                      ? process.env.NEXT_PUBLIC_API_GSO +
                                        vehicle.image
                                      : process.env.NEXT_PUBLIC_API_GSO +
                                        "/public/images/img.svg"
                                  }
                                  className="aspect-square rounded-sm border border-foreground bg-background object-contain"
                                  sizes="100"
                                  alt="image icone"
                                />
                              ) : (
                                <div className="flex items-center justify-center">
                                  <IconCarFrontal
                                    width={50}
                                    className="m-0 flex items-center justify-center p-0"
                                  />
                                </div>
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
