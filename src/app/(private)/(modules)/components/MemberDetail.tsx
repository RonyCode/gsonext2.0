"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { IMemberSchema, MemberSchema } from "@/schemas/MemberSchema";
import {
  LuBuilding,
  LuBuilding2,
  LuCheck,
  LuChevronsUpDown,
  LuUserCheck,
} from "react-icons/lu";
import { IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command"; // Corrigindo a importação

type MemberType = React.HTMLAttributes<HTMLDivElement> & {
  corporation?: IOrganizacaoSchema | null;
  companies?: IUnidadeSchema[] | null;
  member?: IMemberSchema | null;
  className?: string;
};

const functions = [
  { value: "comandante", label: "Comandante" },
  { value: "subcomandante", label: "Sub-Comandante" },
  { value: "chefe", label: "Chefe" },
  { value: "funcionario", label: "Funcionário" },
  { value: "gerente", label: "Gerente" },
  { value: "supervisor", label: "Supervisorv" },
  { value: "motorista", label: "Motorista" },
  { value: "cmt_sos", label: "Comandante de SOS" },
  { value: "cmt_gu", label: "Comandante de guarnição" },
  { value: "escalante", label: "Escalante" },
  { value: "comunicacao", label: "Comunicação" },
];

const competencias = [
  { value: "coronel", label: "Coronel" },
  { value: "ten-coronel", label: "Ten-Coronel" },
  { value: "capitao", label: "Capitão" },
  { value: "major", label: "Major" },
  { value: "tenente", label: "Tenente" },
  { value: "sub-tenente", label: "Sub Tenente" },
  { value: "1_sargento", label: "1º Sargento" },
  { value: "2_sargento", label: "2º Sargento" },
  { value: "cabo", label: "Cabo" },
  { value: "soldado", label: "Soldado" },
];

const MemberDetail = ({
  corporation,
  companies,
  className,
  member,
}: MemberType) => {
  const form = useForm({
    mode: "all",
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: member?.name ?? "",
      role: member?.short_name_function ?? "",
      function: "",
      lotacao: member?.id_company ?? "",
      id_company: member?.id_company ?? "",
      id_corporation: member?.id_corporation ?? "",
    },
  });

  const onSubmit = (data: Partial<IMemberSchema>) => {
    console.log(data);
    // Aqui você implementa a lógica de submissão
  };

  return (
    <div className={cn("px-4 2xl:px-20", className)}>
      <h2 className="mb-6 text-2xl font-bold">Detalhes do Membro</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            onSubmit(data);
          })}
        >
          <div className="flex w-full flex-col gap-2 py-2 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    htmlFor="name"
                    className="flex items-center gap-1 text-muted-foreground"
                  >
                    <LuUserCheck /> Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      disabled
                      placeholder="Digite nome da Corporação"
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

          <div className="flex w-full flex-col gap-2 py-2 md:flex-row">
            <FormField
              control={form.control}
              name="id_company"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    htmlFor="type"
                    className="flex w-full items-center gap-1"
                  >
                    <LuBuilding /> Unidade
                  </FormLabel>
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
                          {field.value
                            ? companies?.find(
                                (comp) => comp?.id === field.value,
                              )?.name
                            : "Selecione uma unidade"}
                          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Procurar unidade..." />
                        <CommandEmpty>Unidade não encontrada.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {companies?.map((comp) => (
                              <CommandItem
                                key={comp.id}
                                value={comp.name ?? ""}
                                onSelect={() => {
                                  form.setValue("id_company", comp.id ?? "");
                                }}
                              >
                                <LuCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    comp.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {comp.name}
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
              name="id_corporation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    htmlFor="id_corporation"
                    className="flex items-center gap-1 text-muted-foreground"
                  >
                    <LuBuilding2 /> Corporação
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="id_corporation"
                      value={corporation?.name ?? ""}
                      readOnly={true}
                      disabled={true}
                      placeholder="Digite nome da Corporação"
                      autoCapitalize="none"
                      autoComplete="id_corporation"
                      autoCorrect="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-2 py-2 md:flex-row">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Competência</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma Competência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {competencias.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Função</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {functions.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-2 py-2 md:flex-row">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Função</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {functions.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="function"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Competencia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma atribuição" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {functions.map((func) => (
                        <SelectItem key={func.value} value={func.value}>
                          {func.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="float-right mt-2" variant="default" type="submit">
            Salvar Alterações
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MemberDetail;
