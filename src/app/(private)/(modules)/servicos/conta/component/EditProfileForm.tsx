"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  LuCalendar,
  LuCamera,
  LuCheck,
  LuChevronsUpDown,
  LuHash,
  LuLoaderCircle,
  LuMapPin,
  LuPhone,
  LuSquare,
  LuUser,
} from "react-icons/lu";

import { saveUserAction } from "@/actions/saveUserAction";
import { MyInputMask } from "@/components/Form/Input/myInputMask";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { maskCpfCnpj } from "@/functions/masks/maskCpfCnpj";
import { maskPhone } from "@/functions/masks/maskphone";
import { maskZipcode } from "@/functions/masks/maskZipcode";
import { getAllCitiesByState } from "@/lib/getAllCitiesByState";
import { getCep } from "@/lib/getCep";
import { cn } from "@/lib/utils";
import { EditUserSchema, type IEditUserSchema } from "@/schemas/EditUserSchema";
import { cityStore } from "@/stores/Address/CityByStateStore";
import { type AddressProps, type UserType } from "@/types/index";
import { Button, buttonVariants } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { toast } from "@/hooks/use-toast";
enum Fields {
  cep = "cep",
  endereco = "endereco",
  sigla = "sigla",
  bairro = "bairro",
  cidade = "cidade",
  estado = "estado",
  id = "id",
  nome = "nome",
  image = "image",
  email = "email",
  cpf = "cpf",
}

type UserRegisterFormProps = {
  user: UserType;
  states: AddressProps[] | null;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const EditProfileForm = ({
  user,
  states,
  className,
  ...props
}: UserRegisterFormProps): React.ReactElement => {
  const [pending, startTransition] = useTransition();
  const [date, setDate] = React.useState<Date>();
  const { update } = useSession();
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    user?.account?.image ?? null,
  );

  const router = useRouter();
  let defaultValues = {};

  useEffect(() => {
    startTransition(async () => {
      if (user?.address?.short_name != null) {
        await getAllCitiesByState(user?.address?.short_name);
      }
    });
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(
        process.env.NEXT_PUBLIC_API_GSO != undefined
          ? process.env.NEXT_PUBLIC_API_GSO + user?.account?.image
          : null,
      );
    }
  }, [
    file,
    user?.account?.image,
    user?.address?.short_name,
    user?.address?.state,
  ]);

  if (user?.account?.name !== "user-external") {
    defaultValues = {
      id: user?.id?.toString(),
      nome: user?.account?.name,
      image: user?.account?.image ?? "",
      email: user?.userAuth?.email,
      cpf: maskCpfCnpj(user?.account?.cpf),
      data_nascimento: user?.account?.birthday,
      telefone: maskPhone(user?.account?.phone),
      cep: maskZipcode(user?.address?.zipcode ?? ""),
      endereco: user?.address?.address,
      complemento: user?.address?.complement,
      sigla: user?.address?.short_name,
      numero: user?.address?.number,
      bairro: user?.address?.district,
      estado: user?.address?.short_name,
      role: user?.profile?.role,
      cidade: user?.address?.city,
    };
  }

  const form = useForm<IEditUserSchema>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(EditUserSchema),
    defaultValues,
  });

  const handleSubmit = (dataForm: IEditUserSchema): void => {
    startTransition(async () => {
      const { data, message } = await saveUserAction(dataForm);
      if (data?.id == null) {
        toast({
          variant: "danger",
          title: "Erro ao cadastrar usuário! 🤯 ",
          description: message,
        });
      }
      if (data?.id != null) {
        toast({
          variant: "success",
          title: "Ok! Usuário Atualizado! 🤯 ",
          description: "Tudo certo usuário atualizado",
        });

        await update({
          ...user,
          name: dataForm?.nome,
          image: dataForm?.image,
        });
        router.refresh();

        redirect("/conta");
      }
    });
  };

  async function handleCity(value: string): Promise<AddressProps[]> {
    return await getAllCitiesByState(value);
  }

  const chageValueInput = async (
    field: Fields,
    newValue: string,
  ): Promise<void> => {
    form.setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    });
    if (field === Fields.estado) await handleCity(newValue);
    form.clearErrors(field);
  };

  let arrayCitiesByState: AddressProps[] = [];
  arrayCitiesByState = cityStore().cities;

  const handleCep = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e?.target?.value.length >= 9) {
      startTransition(async () => {
        const { logradouro, localidade, uf, bairro } = await getCep(
          e.target?.value,
        );
        await chageValueInput(Fields.endereco, logradouro);
        await chageValueInput(Fields.sigla, uf);
        await chageValueInput(Fields.cidade, localidade);
        await chageValueInput(Fields.bairro, bairro);
        await chageValueInput(Fields.estado, uf);
        if (localidade === "") {
          states = [];
          arrayCitiesByState = [];
          toast({
            variant: "danger",
            title: "Cep Incorreto! 🤯 ",
            description: "Cep não encontrado",
          });
        }
      });
    }
  };
  return (
    <>
      <div className="px-4 2xl:px-20">
        <div className={cn("grid w-full p-4 lg:pt-12", className)} {...props}>
          <LoadingPage pending={pending} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                handleSubmit(data);
              })}
              className="w-full space-y-4"
            >
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <div className="relative mr-4 h-60 w-full justify-center md:flex md:w-6/12">
                  <div className="absolute -left-3 -top-3 z-100">
                    <FormField
                      control={form.control}
                      name="image"
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="image"
                            className="flex items-center gap-1 hover:text-primary/60"
                          >
                            <LuCamera className="z-100 h-9 w-9 rounded-full border-2 border-foreground/50 bg-accent/50 p-1 text-foreground/50 backdrop-blur hover:border-foreground hover:text-foreground" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setFile(file);
                                if (file != null) {
                                  const url = URL.createObjectURL(file);
                                  setPreviewUrl(url);
                                  form?.setValue("image", url);
                                }
                              }}
                              accept={"image/*"}
                              className="hidden"
                              id="image"
                              type="file"
                              placeholder="Digite seu nome"
                              autoCapitalize="none"
                              autoComplete="nome"
                              autoCorrect="off"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                      previewUrl !== null
                        ? previewUrl
                        : process.env.NEXT_PUBLIC_API_GSO +
                          "/public/images/img.svg"
                    }
                    fill
                    quality={100}
                    alt="imagem director"
                    className="aspect-square rounded-[5px] object-contain object-center"
                  />
                </div>
                <div className="w-full">
                  <div className="flex w-full flex-col gap-2 pb-2 md:flex-row">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="nome"
                            className="flex items-center gap-1"
                          >
                            <LuUser /> Nome
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="nome"
                              placeholder="Digite seu nome"
                              autoCapitalize="none"
                              autoComplete="nome"
                              autoCorrect="off"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2 md:flex-row">
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="cpf"
                            className="flex items-center gap-1"
                          >
                            <LuHash /> CPF
                          </FormLabel>
                          <FormControl>
                            <MyInputMask
                              className={cn(
                                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                className,
                              )}
                              {...field}
                              id="cpf"
                              placeholder="000.000.000-00"
                              mask="___.___.___-__"
                              autoCapitalize="none"
                              autoCorrect="on"
                              autoComplete="one-time-code"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="data_nascimento"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="data_nascimento"
                            className="flex items-center gap-1"
                          >
                            <LuCalendar /> Data Nascimento
                          </FormLabel>{" "}
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "min-w-[240px] pl-3 text-left font-normal",
                                    field.value?.toString() === "" &&
                                      "text-muted-foreground",
                                  )}
                                >
                                  {field.value?.toString() !== "" ? (
                                    field.value
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                locale={ptBR}
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                  if (date == null) return;
                                  setDate(date);
                                  field.onChange(format(date, "dd/MM/yyyy"));
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
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
                      name="telefone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="telefone"
                            className="flex items-center gap-1"
                          >
                            <LuPhone /> Telefone
                          </FormLabel>
                          <FormControl>
                            <MyInputMask
                              {...field}
                              id="telefone"
                              placeholder="(00) 00000-0000"
                              mask="(__) _____-____"
                              autoCapitalize="none"
                              autoComplete="telefone"
                              autoCorrect="off"
                              disabled={pending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="role"
                          className="flex items-center gap-1"
                        >
                          <LuMapPin /> Perfil
                        </FormLabel>{" "}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  field.value === "" && "text-muted-foreground",
                                )}
                              >
                                {field.value !== ""
                                  ? states?.find(
                                      (state) => state.sigla === field.value,
                                    )?.nome
                                  : "Selecione um Estado"}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandList>
                                <CommandInput placeholder="Buscar Estado..." />
                                <CommandEmpty>
                                  Estado não encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {states?.map((state, index) => (
                                    <CommandItem
                                      value={state.sigla}
                                      key={index + 1}
                                      onSelect={async () => {
                                        await handleCity(state.sigla);
                                        form.setValue("estado", state.sigla);
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          state?.sigla === field?.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {state?.nome}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem onChange={handleCep}>
                      <FormLabel
                        htmlFor="cep"
                        className="flex items-center gap-1"
                      >
                        <LuMapPin /> Cep
                      </FormLabel>
                      <FormControl>
                        <MyInputMask
                          {...field}
                          id="cep"
                          placeholder="00000-000"
                          mask="_____-___"
                          autoCapitalize="none"
                          autoComplete="cep"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="endereco"
                        className="flex items-center gap-1"
                      >
                        <LuMapPin width={16} /> Endereco
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="endereco"
                          placeholder="Digite seu endereço"
                          autoCapitalize="none"
                          autoComplete="endereco"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="estado"
                        className="flex items-center gap-1"
                      >
                        <LuMapPin /> Estado
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                field.value === "" && "text-muted-foreground",
                              )}
                            >
                              {field.value !== ""
                                ? states?.find(
                                    (state) => state.sigla === field.value,
                                  )?.nome
                                : "Selecione um Estado"}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandList>
                              <CommandInput placeholder="Buscar Estado..." />
                              <CommandEmpty>
                                Estado não encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    value={state.sigla}
                                    key={index + 1}
                                    onSelect={async () => {
                                      await handleCity(state.sigla);
                                      form.setValue("estado", state.sigla);
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        state?.sigla === field?.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {state?.nome}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="cidade"
                        className="flex items-center gap-1"
                      >
                        <LuMapPin /> Cidade
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                field.value === "" && "text-muted-foreground",
                              )}
                            >
                              {field.value !== "" &&
                              Array.isArray(arrayCitiesByState)
                                ? arrayCitiesByState?.find(
                                    (city) => city.nome === field.value,
                                  )?.nome
                                : "Selecione uma Cidade"}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandList>
                              <CommandInput placeholder="Procurando cidade..." />
                              <CommandEmpty>
                                Cidade não encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                {Array.isArray(arrayCitiesByState) &&
                                  arrayCitiesByState?.map((city, index) => (
                                    <CommandItem
                                      value={city.nome}
                                      key={index + 1}
                                      onSelect={() => {
                                        form.setValue("cidade", city.nome);
                                      }}
                                    >
                                      <LuCheck
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          city.nome === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {city.nome}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bairro"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="bairro"
                        className="flex items-center gap-1"
                      >
                        <LuMapPin /> Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="bairro"
                          placeholder="Bairro"
                          autoCapitalize="none"
                          autoComplete="bairro"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-5/12">
                      <FormLabel
                        htmlFor="numero"
                        className="flex items-center gap-1"
                      >
                        <LuSquare /> Número
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="numero"
                          placeholder="Digite o numero da casa"
                          autoCapitalize="none"
                          autoComplete="numero"
                          autoCorrect="off"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complemento"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        htmlFor="complemento"
                        className="flex items-center gap-1"
                      >
                        <LuMapPin /> Complemento
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="complemento"
                          placeholder="Digite ponto de referência"
                          autoComplete="complemento"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mb-4 mt-2 w-full lg:mt-[1.380rem] lg:w-3/12 lg:gap-1">
                  <Button
                    disabled={pending || !form.formState.isValid}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full",
                    )}
                    type="submit"
                  >
                    {pending && (
                      <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Salvar
                  </Button>{" "}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
