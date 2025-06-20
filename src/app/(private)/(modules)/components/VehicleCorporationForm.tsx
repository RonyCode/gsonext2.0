"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  LuBuilding2,
  LuCalendarCheck2,
  LuCar,
  LuCaseUpper,
  LuCheck,
  LuChevronsUpDown,
  LuClipboardList,
  LuHash,
  LuListChecks,
  LuLoaderCircle,
  LuSpellCheck2,
} from "react-icons/lu";

import { saveVehicleIntoCorporationAction } from "@/actions/corporation/SaveVehicleIntoCorporationAction";
import { EditPhoto } from "@/components/EditPhoto/EditPhoto";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { getAllVehicles } from "@/lib/GetAllVehicles";
import { cn } from "@/lib/utils";
import { VehicleSchema, type IVehicleSchema } from "@/schemas/CarsSchema";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { Button, buttonVariants } from "@/ui/button";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { getValidImageUrl } from "@/functions/checkImageUrl";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { Input } from "@/ui/input";

type VehicleCorporationFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema[] | null;
  companies?: IUnidadeSchema[] | null;
  myVehicle?: IVehicleSchema | null;
  idCorporation?: string | undefined | null;
};

export const VehicleCorporationForm = ({
  corporations,
  companies,
  myVehicle,
  idCorporation,
}: VehicleCorporationFormProps) => {
  const [pending, startTransition] = useTransition();
  const [detailVehicle, setDetailVehicle] = useState<IVehicleSchema[]>([]);
  const [modeloVehicle, setModeloVehicle] = useState<IVehicleSchema[]>([]);
  const [modeloAno, setModeloAno] = useState<IVehicleSchema[]>([]);
  const [directory, setDirectory] = useState<string | null>(null);

  const form = useForm<IVehicleSchema>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(VehicleSchema),
    shouldFocusError: true,
    defaultValues: {
      id: myVehicle?.id ?? null,
      id_corporation: idCorporation ?? undefined,
      id_company: myVehicle?.id_company ?? "",
      id_brand: myVehicle?.id_brand ?? "",
      id_model: myVehicle?.id_model ?? "",
      id_year: myVehicle?.id_year ?? "",
      model: myVehicle?.model ?? undefined,
      members: myVehicle?.members ?? [
        { position: 1, member: null },
        { position: 2, member: null },
        { position: 3, member: null },
        { position: 4, member: null },
        { position: 5, member: null },
        { position: 6, member: null },
      ],
      brand: myVehicle?.brand ?? undefined,
      chassi: myVehicle?.chassi ?? undefined,
      year: myVehicle?.year ?? undefined,
      condition: myVehicle?.condition ?? undefined,
      status: myVehicle?.status ?? undefined,
      fuel_type: myVehicle?.fuel_type ?? undefined,
      type: myVehicle?.type ?? undefined,
      image: myVehicle?.image ?? null,
      plate: myVehicle?.plate ?? undefined,
      prefix: myVehicle?.prefix ?? undefined,
      subscription: null,
      excluded: myVehicle?.excluded ?? 0,
    },
  });
  const typeVehicle = [
    { type: "carros" },
    { type: "motos" },
    { type: "caminhoes" },
  ];

  const status = [
    { id_status: "1", status: "Operante" },
    { id_status: "2", status: "Inoperante" },
  ];

  const conditions = [
    { id_condition: "1", condition: "Novo" },
    { id_condition: "2", condition: "Usado" },
    { id_condition: "3", condition: "Em manutenção" },
    { id_condition: "4", condition: "Avariado" },
  ];

  const handleSubmit = (formData: IVehicleSchema): void => {
    startTransition(async () => {
      if (!form.formState.isValid) {
        return;
      }
      const result = await saveVehicleIntoCorporationAction(formData);

      if (result?.code !== 200) {
        toast({
          variant: "danger",
          title: "Erro ao salvar veículo na corporação! 🤯 ",
          description: result?.message,
        });
      }
      if (result?.code === 200) {
        toast({
          variant: "success",
          title: `Ok! Veiculo salvo na corporação com sucesso! 🚀`,
          description: "Tudo certo veículo salvo",
        });
        redirect(`/servicos/corporacao/veiculos`);
      }
    });
  };
  useEffect(() => {
    handleSelectTypeVehicle(myVehicle?.type ?? "");
    handleSelectBrandVehicle(myVehicle?.id_brand ?? "");
    handleSelectModel(myVehicle?.id_model ?? "");
    handleSelectYearVehicle(myVehicle?.id_year?.toString() ?? "");
  }, []);

  const handleSelectTypeVehicle = (type: string | undefined): void => {
    startTransition(async () => {
      if (type) {
        form.setValue("type", type);
        form.setValue("id_brand", "");
        form.setValue("id_model", "");
        form.setValue("id_year", "");
        form.setValue("model", "");
        form.setValue("year", "");

        const result1 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${type}/marcas`,
        );
        if (result1 !== undefined && result1 !== null) {
          setDetailVehicle(result1 as unknown as IVehicleSchema[]);
          setModeloVehicle([]);
          setModeloAno([]);
        }
      }
    });
  };

  const handleSelectBrandVehicle = (id_brand: string | undefined): void => {
    startTransition(async () => {
      if (id_brand !== undefined) {
        form.setValue("id_brand", id_brand);
        form.setValue("id_model", "");
        form.setValue("id_year", "");
        form.setValue("model", "");
        form.setValue("year", "");

        const result2 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.watch("type")}/marcas/${id_brand}/modelos`,
        );
        if (result2?.modelos !== undefined) {
          setModeloVehicle(result2?.modelos as unknown as IVehicleSchema[]);
          setModeloAno([]);
        }
      }
    });
  };

  const handleSelectModel = (id_model: string | undefined): void => {
    startTransition(async () => {
      if (
        form?.watch("type") !== "" &&
        form?.watch("id_brand") !== "" &&
        id_model !== undefined
      ) {
        form.setValue("id_model", id_model);
        form.setValue("id_year", "");
        form.setValue("model", "");
        form.setValue("year", "");
        const result3 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.watch("type")}/marcas/${form?.watch("id_brand")}/modelos/${id_model}/anos`,
        );
        if (result3 !== undefined && result3 !== null) {
          setModeloAno(result3 as unknown as IVehicleSchema[]);
        }
      }
    });
  };

  const handleSelectYearVehicle = (id_year: string | undefined): void => {
    startTransition(async () => {
      if (
        form?.watch("type") !== "" &&
        form?.watch("id_brand") !== "" &&
        form?.watch("id_model") !== "" &&
        id_year !== undefined
      ) {
        form.setValue("id_year", id_year);
        const result4 = await getAllVehicles(
          `https://parallelum.com.br/fipe/api/v1/${form?.watch("type")}/marcas/${form?.watch("id_brand")}/modelos/${form?.watch("id_model")}/anos/${form?.watch("id_year")}`,
        );

        if (result4 !== undefined && result4 !== null) {
          form.setValue("model", result4?.Modelo ?? "");
          form.setValue("brand", result4?.Marca ?? "");
          form.setValue("year", result4?.AnoModelo?.toString() ?? "");
          form.setValue("fuel_type", result4?.Combustivel ?? "");
        }
      }
    });
  };

  const userImage = form.getValues("image");

  useEffect(() => {
    const imageUrlPromisse = getValidImageUrl(userImage);
    imageUrlPromisse.then((item) => {
      setDirectory(item);
    });
  }, [userImage]);

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="p-4 md:p-6">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between space-y-2 p-4">
            <h1 className="mr-auto text-xl font-bold">
              Salvar Veículo na Corporação
            </h1>
          </div>
        </div>
        <div className="my-2">
          <Form {...form}>
            <LoadingPage pending={pending} />
            <form
              onSubmit={form.handleSubmit(async (data) => {
                handleSubmit(data);
              })}
              className="w-full space-y-4"
            >
              <div className="grid h-full w-full grid-cols-12">
                <div className="col-span-12 flex w-full md:col-start-1 md:col-end-5 md:mt-4">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-[8px]">
                    <div className="relative aspect-square h-48 w-full items-center justify-center rounded-[8px] border border-foreground/10 md:flex md:h-56">
                      <div className="w-full">
                        <EditPhoto
                          directoryFile={directory ?? ""}
                          updateFormExternal={form as unknown as UseFormReturn}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-start-1 col-end-13 mb-8 flex h-full w-full md:my-4 md:ml-3 lg:col-start-5">
                  <div className="flex w-full grid-cols-1 flex-col md:grid md:grid-cols-2 md:gap-4">
                    <div className="flex w-full flex-col justify-evenly">
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="type"
                                className="flex w-full items-center gap-1"
                              >
                                <LuClipboardList /> Categoria
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      typeVehicle?.length > 0
                                        ? typeVehicle?.find(
                                            (vehicleItem) =>
                                              vehicleItem?.type === field.value,
                                          )?.type
                                        : "Selecione uma categoria"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando tipo de veículo..." />
                                    <CommandEmpty>
                                      Categoria não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {typeVehicle?.map(
                                          (vehicleItem, index) => (
                                            <CommandItem
                                              value={
                                                vehicleItem?.type ?? undefined
                                              }
                                              key={index}
                                              onSelect={() => {
                                                handleSelectTypeVehicle(
                                                  vehicleItem?.type,
                                                );
                                              }}
                                            >
                                              <LuCheck
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  vehicleItem?.type ===
                                                    field.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />
                                              {vehicleItem?.type}
                                            </CommandItem>
                                          ),
                                        )}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_model"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCar /> Modelo Veículo
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== "" &&
                                      modeloVehicle?.length > 0
                                        ? modeloVehicle?.find((corp) => {
                                            return (
                                              corp?.codigo?.toString() ===
                                              field?.value?.toString()
                                            );
                                          })?.nome
                                        : "Selecione um modelo de veículo"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando modelo Veículo..." />
                                    <CommandEmpty>
                                      Modelo não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {modeloVehicle?.map((car, index) => (
                                          <CommandItem
                                            value={car?.codigo ?? undefined}
                                            key={index}
                                            onSelect={() => {
                                              handleSelectModel(
                                                car?.codigo?.toString() ?? "",
                                              );
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                car?.codigo?.toString() ===
                                                  field.value?.toString()
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {car?.nome}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_corporation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_corporation"
                                className="flex w-full items-center gap-1"
                              >
                                <LuBuilding2 /> Corporação
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      disabled
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      corporations !== undefined &&
                                      corporations?.length
                                        ? corporations?.find((corp) => {
                                            return corp?.id === field.value;
                                          })?.short_name_corp
                                        : "Selecione a corporação"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando corporação..." />
                                    <CommandEmpty>
                                      Corporação não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {corporations?.map((corp, index) => (
                                          <CommandItem
                                            disabled
                                            value={corp?.id ?? undefined}
                                            key={index}
                                            onSelect={() => {
                                              form.setValue(
                                                "id_corporation",
                                                corp?.id ?? "",
                                              );
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                corp?.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {corp?.short_name_corp}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="chassi"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="chassi"
                                className="flex items-center gap-1"
                              >
                                <LuHash /> Chassis
                              </FormLabel>
                              <FormControl>
                                <InputMask
                                  {...field}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  id="chassi"
                                  placeholder="ABCDE12A34F012345"
                                  mask="_________________"
                                  replacement={{
                                    _: /[A-z0-9]/,
                                  }}
                                  autoCapitalize="none"
                                  autoComplete="chassi"
                                  autoCorrect="off"
                                  onChange={(event) => {
                                    field.onChange(
                                      event.target.value.toUpperCase(),
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="condition"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCalendarCheck2 /> Condição
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== undefined
                                        ? conditions?.find((corp) => {
                                            return (
                                              +corp?.id_condition ===
                                              field.value
                                            );
                                          })?.condition
                                        : "Selecione a condição do veículo"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando condição do Veículo..." />
                                    <CommandEmpty>
                                      Ano não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {conditions?.map((car, index) => (
                                          <CommandItem
                                            value={car?.id_condition}
                                            key={index}
                                            onSelect={() => {
                                              form.setValue(
                                                "condition",
                                                +car?.id_condition,
                                              );
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                +car?.id_condition ===
                                                  field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {car?.condition}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="fuel_type"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="fuel_type"
                                className="flex items-center gap-1"
                              >
                                <LuHash /> Combustível
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value ?? ""}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  id="fuel_type"
                                  placeholder="Diesel/Gasolina/Alcool"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex w-full flex-col justify-evenly">
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_brand"
                                className="flex w-full items-center gap-1"
                              >
                                <LuListChecks /> Marca Veículo
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== "" &&
                                      detailVehicle?.length > 0
                                        ? detailVehicle?.find((corp) => {
                                            return corp?.codigo === field.value;
                                          })?.nome
                                        : "Selecione uma marca de veículo"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando marca Veículo..." />
                                    <CommandEmpty>
                                      Marca não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {detailVehicle?.map((car, index) => (
                                          <CommandItem
                                            value={car?.nome ?? undefined}
                                            key={index}
                                            onSelect={() => {
                                              handleSelectBrandVehicle(
                                                car?.codigo ?? "",
                                              );
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                car?.codigo === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {car?.nome}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_year"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCalendarCheck2 /> Ano Veículo
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== "" &&
                                      modeloAno?.length > 0
                                        ? modeloAno?.find((ano) => {
                                            return ano?.codigo === field.value;
                                          })?.nome
                                        : "Selecione o ano do veículo"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando modelo Veículo..." />
                                    <CommandEmpty>
                                      Ano não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {modeloAno?.length > 0 &&
                                          modeloAno?.map((ano, index) => (
                                            <CommandItem
                                              value={ano?.codigo ?? ""}
                                              key={index}
                                              onSelect={() => {
                                                handleSelectYearVehicle(
                                                  ano?.codigo ?? "",
                                                );
                                              }}
                                            >
                                              <LuCheck
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  ano?.codigo === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />

                                              {ano?.nome}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="id_company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="id_company"
                                className="flex w-full items-center gap-1"
                              >
                                <LuBuilding2 /> Unidade
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== undefined &&
                                      companies !== undefined
                                        ? companies?.find((comp) => {
                                            return comp?.id === field.value;
                                          })?.name
                                        : "Selecione a unidade"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando unidade..." />
                                    <CommandEmpty>
                                      Unidade não encontrada.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {companies?.map((company, index) => (
                                          <CommandItem
                                            value={company?.id ?? undefined}
                                            key={index}
                                            onSelect={() => {
                                              form.setValue(
                                                "id_company",
                                                company?.id ?? "",
                                              );
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                company?.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {company?.name}
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
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="plate"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="plate"
                                className="flex items-center gap-1"
                              >
                                <LuSpellCheck2 /> Placa
                              </FormLabel>
                              <FormControl>
                                <InputMask
                                  {...field}
                                  id="plate"
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="ABC9A99"
                                  mask="_______"
                                  replacement={{
                                    _: /[A-z0-9]/,
                                  }}
                                  onChange={(event) => {
                                    field.onChange(
                                      event.target.value.toUpperCase(),
                                    );
                                  }}
                                  autoCapitalize="none"
                                  autoComplete="name"
                                  autoCorrect="off"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="prefix"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                htmlFor="prefix"
                                className="flex items-center gap-1"
                              >
                                <LuCaseUpper /> Prefixo
                              </FormLabel>
                              <FormControl>
                                <InputMask
                                  {...field}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  id="prefix"
                                  placeholder="UR-99, ABT-01"
                                  mask="_________"
                                  replacement={{
                                    _: /^[A-Za-z0-9-]+$/,
                                  }}
                                  autoCapitalize="none"
                                  autoComplete="name"
                                  autoCorrect="off"
                                  onChange={(event) => {
                                    field.onChange(
                                      event.target.value.toUpperCase(),
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="status"
                                className="flex w-full items-center gap-1"
                              >
                                <LuCalendarCheck2 /> Status
                              </FormLabel>{" "}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-full justify-between text-muted-foreground",
                                      )}
                                    >
                                      {field.value !== undefined
                                        ? status?.find((corp) => {
                                            return (
                                              +corp?.id_status === field.value
                                            );
                                          })?.status
                                        : "Selecione o status do veículo"}
                                      <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Procurando status Veículo..." />
                                    <CommandEmpty>
                                      Ano não encontrado.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {status?.map((car, index) => (
                                          <CommandItem
                                            value={car?.id_status ?? undefined}
                                            key={index}
                                            onSelect={() => {
                                              form.setValue(
                                                "status",
                                                Number(car?.id_status) ?? 0,
                                              );
                                            }}
                                          >
                                            <LuCheck
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                +car?.id_status === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {car?.status}
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
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col justify-end md:flex-row">
                <Button
                  disabled={!form.formState.isValid}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full animate-fadeIn md:w-1/3",
                  )}
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
  );
};
export default VehicleCorporationForm;
