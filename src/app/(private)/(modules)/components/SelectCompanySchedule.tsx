"use client";
import React, { useState, useTransition } from "react";
import { LuCheck, LuChevronsUpDown, LuSearchX } from "react-icons/lu";

import LoadingPage from "@/components/Loadings/LoadingPage";
import { cn } from "@/lib/utils";
import { type IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import { getAllSchedulesCompany } from "@/lib/getAllSchedulesCompany";

type SelectCompanyModuleProps = React.HTMLAttributes<HTMLDivElement> & {
  unidades: IUnidadeSchema[];
  schedules: IScheduleSchema[];
};

export const SelectCompanySchedule = ({
  unidades,
}: SelectCompanyModuleProps) => {
  const disabled = false;
  const [dataUnidade, setDataUnidade] = useState<IUnidadeSchema | null>(null);
  const [schedules, setSchedules] = useState<IScheduleSchema[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSelectUnidade = (unidadeOnSelect: IUnidadeSchema): void => {
    startTransition(async () => {
      if (unidadeOnSelect !== null && unidadeOnSelect !== undefined) {
        const unidadeSelected = unidades?.find(
          (uniItem) => uniItem.id === unidadeOnSelect.id,
        );

        setDataUnidade(unidadeSelected ?? null);
      }

      const { data: schedules } = await getAllSchedulesCompany(
        unidadeOnSelect?.id_corporation ?? "",
        unidadeOnSelect?.id ?? "",
      );
      setSchedules(schedules ?? []);
    });
  };
  console.log(schedules);

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
        <LoadingPage pending={isPending} />
        <div className="flex items-center">
          <Card className="flex w-full flex-col items-center justify-between gap-2 p-2">
            <h1 className="mr-auto text-xl font-bold">Minha unidade</h1>

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
                  {dataUnidade !== null
                    ? unidades?.find(
                        (state) =>
                          dataUnidade?.id?.toString() === state?.id?.toString(),
                      )?.name
                    : "Selecione uma unidade"}
                  <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Procurando unidades..." />
                  <CommandEmpty>Unidade não encontrada.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {unidades?.map((state, indexUnidade) => (
                        <CommandItem
                          disabled={disabled}
                          value={state?.id?.toString()}
                          key={indexUnidade}
                          onSelect={handleSelectUnidade.bind(null, state)}
                        >
                          <LuCheck
                            className={cn(
                              "mr-2 h-4 w-4",
                              state?.id?.toString() ===
                                dataUnidade?.id?.toString()
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {state.name}
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
      {schedules != null && schedules?.length > 0 ? (
        <div>
          <CalendarGsoV1 company={dataUnidade ?? {}} schedules={schedules} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {" "}
          <span className="flex items-center justify-center gap-1">
            <LuSearchX size={28} className="text-primary/60" /> SEM ESCALAS
            CADASTRADAS PARA ESTA UNIDADE 🤯
          </span>
        </div>
      )}
    </>
  );
};
export default SelectCompanySchedule;
