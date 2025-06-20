"use client";

import { redirect } from "next/navigation";
import * as React from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  LuCalendarDays,
  LuCamera,
  LuCheck,
  LuChevronsUpDown,
  LuHash,
  LuLoaderCircle,
  LuLocate,
  LuMail,
  LuMap,
  LuMapPin,
  LuPhone,
  LuUser,
} from "react-icons/lu";

import { saveUserAction } from "@/actions/user/saveUserAction";
import { MyInputMask } from "@/components/Form/Input/myInputMask";
import LoadingPage from "@/components/Loadings/LoadingPage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllCitiesByState } from "@/lib/getAllCitiesByState";
import { getCep } from "@/lib/getCep";
import { cn } from "@/lib/utils";
import {
  type IRegisterUserSchema,
  RegisterUserSchema,
} from "@/schemas/RegisterUserSchema";
import { cityStore } from "@/stores/Address/CityByStateStore";
import { type AddressProps, type ResultUserRegistered } from "@/types/index";
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
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Image from "next/image";
import Link from "next/link";
import { DeleteTokenCookies } from "@/functions/TokenManager";

enum Fields {
  email = "email",
  cep = "cep",
  endereco = "endereco",
  sigla = "sigla",
  bairro = "bairro",
  cidade = "cidade",
  estado = "estado",
}

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  user: {
    email: string;
    picture: string;
    name: string;
    sub: string;
  } | null;
  states: AddressProps[] | null;
};

export const UserExternalUpdateRegisterForm = ({
  user,
  states,
  className,
  ...props
}: UserRegisterFormProps): React.ReactElement => {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    user?.picture ?? null,
  );

  const form = useForm<IRegisterUserSchema>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nome: user?.name,
      email: user?.email,
      cpf: "",
      data_nascimento: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      estado: "",
      cidade: "",
      bairro: "",
      senha: user?.sub + "a",
      confirmaSenha: user?.sub + "a",
      provider: user?.sub,
      provider_user_id: user?.sub,
    },
  });

  const [pending, startTransition] = useTransition();

  const [date, setDate] = React.useState<Date>();

  const handleSubmit = (formData: IRegisterUserSchema): void => {
    startTransition(async () => {
      const result: ResultUserRegistered = await saveUserAction(formData);
      if (result?.data?.id == null) {
        toast({
          variant: "danger",
          title: "Erro ao confirmar cadastro de usuário! 🤯 ",
          description: result?.message,
        });
      }
      if (result?.data?.id != null) {
        toast({
          variant: "success",
          title: "Ok! Usuário Cadastrado! 🤯 ",
          description: "Tudo certo usuário cadastrado",
        });
        redirect("/auth");
      }
    });
  };

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

  async function handleCity(value: string): Promise<void> {
    await getAllCitiesByState(value);
  }

  // let states = stateStore().states
  let arrayCitiesByState = cityStore().cities;

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

  const handleCheckUserExists = async (cpf: string) => {
    const cpfLimpo = cpf.replace(/[^0-9]/g, "");
    if (cpfLimpo.length === 11) {
      await form.trigger("cpf"); //ATUALIZA O FORM COM OS ERROS OU NAO
      const cpfState = form.getFieldState("cpf");

      if (!cpfState.invalid) {
        console.log("fazer submit");
      } else {
        toast({
          variant: "danger",
          title: "CPF Incorreto! 🤯",
          description: "CPF inválido, verifique se digitou corretamente",
        });
      }
    }
  };

  const handleCancel = () => {
    try {
      startTransition(async () => {
        await DeleteTokenCookies("user_external_to_confirm");
        await DeleteTokenCookies("user_external_to_confirm");
        redirect("/auth");
      });
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex flex-col space-y-2 text-center">
          <span className="text-2xl font-semibold tracking-tight">
            Complete seu cadastro
          </span>
          <p className="text-sm text-muted-foreground">
            Complete o cadastro fornecendo os dados abaixo
          </p>
        </div>

        <div
          className={cn("grid place-items-center pt-4 lg:pt-12", className)}
          {...props}
        >
          <LoadingPage pending={pending} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                handleSubmit(data);
              })}
              className="flex w-full flex-col space-y-4"
            >
              <div className="flex h-full w-full flex-col gap-2 md:flex-row">
                <div className="relative flex w-full justify-center rounded-2xl md:w-5/12">
                  <div>
                    <FormField
                      control={form.control}
                      name="image"
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="image"
                            className="absolute -left-3 -top-3 z-10 flex items-center gap-1 hover:text-primary/60"
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
                  <div className="border_primary h-52 w-full border-2 md:h-72">
                    <Image
                      alt="Imagem de perfil"
                      src={previewUrl ?? "/images/user1.jpg"}
                      fill
                      sizes="100%"
                      className="rounded-lg object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <div className="flex w-full gap-2">
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
                                "flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                className,
                              )}
                              {...field}
                              id="cpf"
                              placeholder="000.000.000-00"
                              mask="___.___.___-__"
                              autoCapitalize="none"
                              autoComplete="cpf"
                              autoCorrect="off"
                              disabled={pending}
                              onChange={async (e) => {
                                field.onChange(e);
                                await handleCheckUserExists(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full gap-2">
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
                  <div className="flex w-full gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="email"
                            className="flex items-center gap-1"
                          >
                            <LuMail /> Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="email"
                              placeholder="email@exemplo.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full gap-2">
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
                    <FormField
                      control={form.control}
                      name="data_nascimento"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel
                            htmlFor="data_nascimento"
                            className="flex items-center gap-1"
                          >
                            <LuCalendarDays /> Data de nascimento
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full min-w-[240px] pl-3 text-left font-normal",
                                    field.value.toString() === "" &&
                                      "text-muted-foreground",
                                  )}
                                >
                                  {field.value.toString() !== "" ? (
                                    field.value
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <LuCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                showOutsideDays={false}
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
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem onChange={handleCep} className="w-full md:w-5/12">
                      <FormLabel
                        htmlFor="cep"
                        className="flex items-center gap-1"
                      >
                        <LuHash /> Cep
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
                        <LuMap /> Endereco
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
                  name="numero"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-5/12">
                      <FormLabel
                        htmlFor="numero"
                        className="flex items-center gap-1"
                      >
                        <LuHash /> Numero
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
                        <LuHash /> Complemento
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
              </div>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col md:w-5/12">
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
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>Estado não encontrado.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {states?.map((state, index) => (
                                  <CommandItem
                                    value={state.sigla}
                                    key={index}
                                    onSelect={async () => {
                                      await handleCity(state.sigla);
                                      form.setValue("estado", state.sigla);
                                    }}
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        state.sigla === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
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
                <div className="flex w-full flex-col gap-2 md:flex-row">
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel
                          htmlFor="cidade"
                          className="flex items-center gap-1"
                        >
                          <LuLocate /> Cidade
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
                                  ? arrayCitiesByState?.find(
                                      (city) => city.nome === field.value,
                                    )?.nome
                                  : "Selecione uma Cidade"}
                                <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procurando cidade..." />
                              <CommandEmpty>
                                Cidade não encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {arrayCitiesByState?.map((city, index) => (
                                    <CommandItem
                                      value={city.nome}
                                      key={index}
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
                            placeholder="bairro"
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
              </div>
              <div className="mb-4 mt-2 flex w-5/12 items-center gap-2 self-end">
                <Link href="/" className="w-full hover:text-muted-foreground">
                  <Button
                    onClick={handleCancel}
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "w-full hover:text-muted-foreground",
                    )}
                    type="button"
                  >
                    Cancelar
                  </Button>{" "}
                </Link>
                <Button
                  disabled={!form.formState.isValid}
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
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
