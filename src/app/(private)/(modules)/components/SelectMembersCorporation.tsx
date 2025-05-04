"use client";

import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { Card } from "@/ui/card";
import { cn } from "@/lib/utils";
import { IMemberSchema } from "@/schemas/MemberSchema";
import LoadingPage from "@/components/Loadings/LoadingPage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { Command } from "lucide-react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import React from "react";

type SelectCompanyModuleProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema[];
  members?: IMemberSchema[];
  className?: string;
};

export const SelectMembersCorporation = ({
  corporations,
  members,
  className,
  ...props
}: SelectCompanyModuleProps): React.ReactElement => {
  const [idCorp, setIdCorp] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const corpFound = corporations?.find((corp) => {
    return corp?.id === idCorp;
  });
  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn("bg-background p-6", className)}
        {...props}
      ></Card>

      <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
        {/* <LoadingPage pending={isPending} /> */}
        <div className="flex items-center">
          <Card className="flex w-full flex-col items-center justify-between gap-2 p-2">
            <h1 className="mr-auto text-xl font-bold">Selecione corporação</h1>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    disabled && "text-muted-foreground",
                  )}
                >
                  {idCorp !== ""
                    ? corporations?.find(
                        (corp) => idCorp?.toString() === corp?.id?.toString(),
                      )?.name
                    : "Selecione uma corporacao"}
                  <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Procurando unidades..." />
                  <CommandEmpty>Unidade não encontrada.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {corporations?.map((corp, index) => (
                        <CommandItem
                          disabled={disabled}
                          value={corp?.id?.toString()}
                          key={index}
                          onSelect={() => setIdCorp(corp?.id?.toString() ?? "")}
                        >
                          <LuCheck
                            className={cn(
                              "mr-2 h-4 w-4",
                              corp?.id?.toString() === idCorp?.toString()
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {corp?.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </Card>
        </div>
      </Card>
    </>
  );
};
export default SelectMembersCorporation;
