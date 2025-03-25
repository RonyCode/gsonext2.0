import * as React from "react";
import { type ReactElement } from "react";
import { LuBadgeX } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { type IScheduleSchema } from "@/schemas/ScheduleSchema";
import { Badge } from "@/ui/badge";

type CalendarGsoGridProps = {
  schedules?: Partial<IScheduleSchema>[];
  month?: number;
  day?: number;
  year?: number;
  isMuted?: boolean; // Adicionando o estado isMuted para os dias do mês anterior ou posterior
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CalendarGsoGridV1 = ({
  schedules,
  month,
  day,
  year,
  isMuted, // Recebendo o valor de isMuted
  className,
  ...props
}: CalendarGsoGridProps): ReactElement => {
  const date = new Date();

  return (
    <>
      {day != null && day > 0 && (
        <div
          className={cn(
            `relative flex h-full w-full cursor-pointer flex-col items-start justify-start rounded-[3px] border border-foreground/10 pt-1 hover:border hover:border-primary/60 md:min-h-full md:px-1`,
            {
              "hidden text-gray-400": isMuted, // Aplica a classe "muted" para os dias anteriores e posteriores
              "border-primary/60":
                day === date.getDate() &&
                month === date.getMonth() &&
                year === date.getFullYear(),
            },
            className,
          )}
          {...props}
        >
          {year !== undefined &&
          month !== undefined &&
          schedules?.length === 0 &&
          new Date(year, month, day).setHours(1, 1, 1, 1) <
            new Date().setHours(0, 0, 0, 0) ? (
            <Badge
              variant="outline"
              className="border-foreground/30 p-1 px-[6px] text-[.4rem] text-muted-foreground md:block md:py-0 md:text-[.6rem]"
            >
              <span className="flex items-center md:gap-2">
                <LuBadgeX className="text-primary" />
                <p>ESCALA</p>
              </span>
            </Badge>
          ) : (
            schedules?.map((itemEvent, indexEvent) => (
              <div key={indexEvent} className="m-0 self-start pb-1">
                <Badge
                  variant="outline"
                  className={`block p-0 px-[5px] text-[.5rem] text-muted-foreground md:py-0 md:text-[.6rem] ${
                    itemEvent.team === 1
                      ? "border-primary"
                      : itemEvent.team === 2
                        ? "border-blue-500"
                        : itemEvent.team === 3
                          ? "border-yellow-400"
                          : itemEvent.team === 4
                            ? "border-green-500"
                            : itemEvent.team === 5
                              ? "border-[#9400d3]"
                              : ""
                  }`}
                >
                  {itemEvent.team === 1
                    ? "ALFA"
                    : itemEvent.team === 2
                      ? "BRAVO"
                      : itemEvent.team === 3
                        ? "CHARLIE"
                        : itemEvent.team === 4
                          ? "DELTA"
                          : itemEvent.team === 5
                            ? "EXTRA"
                            : ""}
                </Badge>
              </div>
            ))
          )}
          <div className="absolute bottom-0 right-0 p-0 text-2xl font-thin text-muted-foreground md:text-4xl">
            <p className="m-2">{day}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default CalendarGsoGridV1;
