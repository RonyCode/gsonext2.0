"use client";

import {
  LuCheck,
  LuChevronsUpDown,
  LuCirclePlus,
  LuLandmark,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import {
  type ISelectCorporationModuleSchema,
  SelectCorporationModuleSchema,
} from "@/schemas/SelectCorpoationModuleSchema";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import ModuloGestorUnidade from "@/app/(private)/(modules)/components/module/ModuloGestorUnidade";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/ui/avatar";
import { CorporationSwitcher } from "@/components/Sidebar/corporation-switcher";
import { CompanySwitcher } from "@/components/Sidebar/company-switcher";
import Link from "next/link";

type SelectCompanyModuleProps = React.HTMLAttributes<HTMLDivElement> & {
  companies?: IUnidadeSchema[];
  className?: string;
};

export const SelectCompanyModule = ({
  companies,
  className,
  ...props
}: SelectCompanyModuleProps) => {
  const [companySelected, setCompanySelected] =
    React.useState<IUnidadeSchema | null>(null);
  const form = useForm<ISelectCorporationModuleSchema>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SelectCorporationModuleSchema),
    defaultValues: {
      company: null,
      id_company: "",
    },
  });

  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn("bg-background p-6", className)}
        {...props}
      >
        <Card>
          <div className="flex flex-col items-center">
            <div className="flex w-full items-center justify-between p-4">
              <h1 className="mr-auto text-xl font-bold">Minhas unidades</h1>
              <Link href="/servicos/corporacao/unidades">
                <Button
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group",
                  )}
                >
                  <div className="flex items-center gap-1">
                    <LuCirclePlus
                      size={16}
                      className="text-foreground group-hover:text-muted-foreground"
                    />
                    Adicionar{" "}
                  </div>
                </Button>
              </Link>
            </div>

            <Form {...form}>
              <form className="w-full p-4">
                <FormField
                  control={form.control}
                  name="id_company"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel
                        htmlFor="id_company"
                        className="flex items-center gap-1 text-muted-foreground"
                      >
                        <LuLandmark /> Unidade
                      </FormLabel>{" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between")}
                            >
                              {field?.value !== ""
                                ? companies?.find(
                                    (company) =>
                                      company.id?.toString() === field.value,
                                  )?.name
                                : "Selecione uma unidade"}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Procurando unidades..." />
                            <CommandEmpty>Unidade não encontrada.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {companies?.map((company, index) => (
                                  <CommandItem
                                    value={company?.name?.toString()}
                                    key={index}
                                    onSelect={() => {
                                      setCompanySelected(company);
                                      form.setValue(
                                        "id_company",
                                        company?.id?.toString() ?? "",
                                      );
                                    }}
                                    className="group"
                                  >
                                    <LuCheck
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        company?.id?.toString() === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />

                                    <div className="flex aspect-square items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-hover:scale-[140%]">
                                      <Avatar className="group h-10 w-10 rounded-lg">
                                        <AvatarImage
                                          src={
                                            process.env.NEXT_PUBLIC_API_GSO !==
                                              null &&
                                            company?.image !== null &&
                                            company?.image !== undefined
                                              ? process.env
                                                  .NEXT_PUBLIC_API_GSO +
                                                company?.image
                                              : process.env
                                                  .NEXT_PUBLIC_API_GSO +
                                                "/images/img.svg"
                                          }
                                          alt={"img user"}
                                        />
                                      </Avatar>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                      <span className="truncate font-semibold">
                                        {company?.name}
                                      </span>
                                      <span className="truncate text-xs">
                                        {company?.companyAddress?.city}
                                      </span>
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
              </form>
            </Form>
          </div>
        </Card>

        {companySelected && (
          <ModuloGestorUnidade company={companySelected as IUnidadeSchema} />
        )}
      </Card>
    </>
  );
};
export default SelectCompanyModule;
