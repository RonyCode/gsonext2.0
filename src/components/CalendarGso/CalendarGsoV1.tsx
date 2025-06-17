"use client";

import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import CalendarGsoGridV1 from "./CalendarGsoGridV1";
import { useState } from "react";
import { Button } from "@/ui/button";
import {
  LuArrowBigLeft,
  LuArrowBigRight,
  LuCalendarPlus,
  LuCirclePlus,
} from "react-icons/lu";
import Link from "next/link";
import { DataTableDetalheEscala } from "@/components/DataTables/DataTableDetalheEscala/data-table-detalhe-escala";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { IUnidadeSchema } from "@/schemas/UnidadeSchema";
import { columnsDetailsSchedule } from "@/components/DataTables/DataTableDetalheEscala/columnsDetailsSchedule";
import { useCheckMobile } from "@/functions/IsMobile";

type CalendarGsoV1Props = {
  schedules?: Partial<IScheduleSchema>[];
  company?: Partial<IUnidadeSchema>;
};

const CalendarGsoV1 = ({ schedules, company }: CalendarGsoV1Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventsOnDay, setEventsOnDay] = useState<Partial<IScheduleSchema[]>>(
    [] as Partial<IScheduleSchema[]>,
  );
  const [selectedDay, setSelectedDay] = useState<{
    day: number;
    month: number;
    year: number;
    isMuted: boolean;
  } | null>(null);
  const isMobile = useCheckMobile();

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

    return Array.from({ length: 42 }, (_, i) => {
      let day, monthOffset, isMuted;
      if (i < firstDayOfMonth) {
        day = lastDayOfPreviousMonth - (firstDayOfMonth - i - 1);
        monthOffset = -1;
        isMuted = true;
      } else if (i < firstDayOfMonth + totalDaysInMonth) {
        day = i - firstDayOfMonth + 1;
        monthOffset = 0;
        isMuted = false;
      } else {
        day = i - (firstDayOfMonth + totalDaysInMonth) + 1;
        monthOffset = 1;
        isMuted = true;
      }
      return { day, month: month + monthOffset, year, isMuted };
    });
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };

  const openModal = (
    day: number,
    month: number,
    year: number,
    isMuted: boolean,
  ) => {
    if (!isMuted) {
      setSelectedDay({ day, month, year, isMuted });
      setIsModalOpen(true);
    }

    const eventSeted = schedules?.filter(
      (event) =>
        event?.day === day && event?.month === month && event?.year === year,
    );

    setEventsOnDay(eventSeted ?? []);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className="calendar-container m-auto h-full w-full rounded-lg border-foreground/15 shadow-lg md:max-w-4xl md:border md:p-4">
      <div className="calendar-header mb-2 flex items-center justify-between">
        <Button variant="default" onClick={() => changeMonth(-1)}>
          {isMobile ? <LuArrowBigLeft /> : "Anterior"}
        </Button>
        <h2 className="text-md font-semibold md:text-lg">
          {currentDate.toLocaleString("pt-BR", { month: "long" })} /{" "}
          {currentDate.getFullYear()}
        </h2>
        <Button variant="default" onClick={() => changeMonth(1)}>
          {isMobile ? <LuArrowBigRight /> : "Próximo"}
        </Button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-1">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div
            key={day}
            className="rounded-[3px] border border-foreground/15 text-center"
          >
            {day}
          </div>
        ))}
        {calendarDays.map(({ day, month, year, isMuted }, index) => (
          <div
            key={index}
            className="h-full min-h-28 w-full"
            onClick={() => openModal(day, month, year, isMuted)}
          >
            <CalendarGsoGridV1
              day={day}
              month={month}
              year={year}
              isMuted={isMuted}
              schedules={schedules?.filter(
                (event) =>
                  event?.day === day &&
                  event?.month === month &&
                  event?.year === year,
              )}
            />
          </div>
        ))}
      </div>
      {isModalOpen &&
        selectedDay &&
        !selectedDay.isMuted &&
        (new Date(
          selectedDay.year,
          selectedDay.month,
          selectedDay.day,
        ).setHours(1, 1, 1, 1) > new Date().setHours(0, 0, 0, 0) ||
          (new Date(
            selectedDay.year,
            selectedDay.month,
            selectedDay.day,
          ).setHours(1, 1, 1, 1) < new Date().setHours(0, 0, 0, 0) &&
            schedules?.some((item) => selectedDay.day === item.day) &&
            schedules?.some((item) => selectedDay.month === item.month) &&
            schedules?.some((item) => selectedDay.year === item.year))) && (
          <div className="flex items-center justify-center">
            {schedules?.some(
              (event) =>
                event?.day === selectedDay.day &&
                event?.month === selectedDay.month &&
                event?.year === selectedDay.year,
            ) ? (
              <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="modal-content flex h-full w-full flex-col rounded-lg border border-foreground/15 bg-background p-4 md:h-[70vh] md:max-w-4xl">
                  <h2 className="mb-4 border-b border-foreground/15 p-1 text-xl font-semibold">
                    Detalhes escala do dia{" "}
                    {format(
                      new Date(
                        selectedDay.year,
                        selectedDay.month,
                        selectedDay.day,
                      ),
                      "dd/MM",
                      {
                        locale: ptBR,
                      },
                    ) +
                      " - " +
                      format(
                        new Date(
                          selectedDay.year,
                          selectedDay.month,
                          selectedDay.day,
                        ),
                        "eee",
                        {
                          locale: ptBR,
                        },
                      ).toUpperCase()}{" "}
                    | {company?.name}
                  </h2>
                  <Link
                    className="mb-2 self-end"
                    href={
                      "/servicos/gestor/escala/detalhes-escala?id_company=" +
                      company?.id +
                      "&date_schedule=" +
                      selectedDay.year +
                      "-" +
                      selectedDay.month +
                      "-" +
                      selectedDay.day
                    }
                  >
                    <Button variant="default">
                      <LuCirclePlus />
                      Nova Escala
                    </Button>
                  </Link>

                  <div className="flex h-full w-full overflow-scroll">
                    <DataTableDetalheEscala
                      columns={columnsDetailsSchedule(company)}
                      data={eventsOnDay}
                    />
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-2 self-end"
                    onClick={closeModal}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="modal-content m-auto flex h-full w-full flex-col rounded-lg border border-foreground/15 bg-background p-4 md:h-1/3 md:w-1/3">
                  <h2 className="border-b border-foreground/15 p-1 text-xl font-semibold">
                    Nova escala
                  </h2>
                  <Link
                    href={
                      "/servicos/gestor/escala/detalhes-escala?id_company=" +
                      company?.id +
                      "&date_schedule=" +
                      selectedDay.year +
                      "-" +
                      selectedDay.month +
                      "-" +
                      selectedDay.day
                    }
                    className="flex h-full w-full flex-col justify-evenly text-center"
                  >
                    <p>
                      Não existe escala para esta data. Deseja criar escala?
                    </p>
                    <Button className="flex items-center gap-1 self-center">
                      <LuCalendarPlus /> Criar nova escala
                    </Button>
                  </Link>
                  <Button className="self-end" onClick={closeModal}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};
export default CalendarGsoV1;
