"use client";

import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import CalendarGsoGridV1 from "./CalendarGsoGridV1";
import { useState } from "react";
import { Button } from "@/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  LuArrowBigLeft,
  LuArrowBigRight,
  LuCalendarPlus,
} from "react-icons/lu";
import Link from "next/link";
import { useParams } from "next/navigation";

type CalendarGsoV1Props = {
  dayEvent?: Partial<IScheduleSchema>[];
};

const CalendarGsoV1 = ({ dayEvent }: CalendarGsoV1Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{
    day: number;
    month: number;
    year: number;
    isMuted: boolean;
  } | null>(null);
  const params = useParams();
  const isMobile = useIsMobile();

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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className="calendar-container mx-auto max-w-3xl rounded-lg shadow-lg">
      <div className="calendar-header mb-4 flex items-center justify-between">
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
            className="rounded-[3px] border border-foreground/30 text-center"
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
              dayEvent={dayEvent?.filter(
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
            dayEvent?.some((item) => selectedDay.day === item.day) &&
            dayEvent?.some((item) => selectedDay.month === item.month) &&
            dayEvent?.some((item) => selectedDay.year === item.year))) && (
          <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content h-1/3 w-full rounded-lg border border-foreground/15 bg-background p-4 md:w-1/3">
              {dayEvent?.some(
                (event) =>
                  event?.day === selectedDay.day &&
                  event?.month === selectedDay.month &&
                  event?.year === selectedDay.year,
              ) ? (
                <div className="flex h-full w-full flex-col">
                  <h2 className="mb-4 border-b border-foreground/15 p-1 text-xl font-semibold">
                    Detalhes escala do dia{" "}
                    {new Date(
                      selectedDay.year,
                      selectedDay.month,
                      selectedDay.day,
                    ).toLocaleDateString("pt-BR")}
                  </h2>
                  <div className="relative flex h-full w-full flex-col justify-evenly">
                    {dayEvent.map((event, index) =>
                      event?.day === selectedDay.day &&
                      event?.month === selectedDay.month &&
                      event?.year === selectedDay.year ? (
                        <div key={index} className="mb-2">
                          <h3 className="font-medium">{event.team}</h3>
                          <p>{event?.description}</p>
                        </div>
                      ) : null,
                    )}
                  </div>
                  <Button className="self-end" onClick={closeModal}>
                    Fechar
                  </Button>
                </div>
              ) : (
                <div className="flex h-full w-full flex-col justify-evenly">
                  <h2 className="mb-4 border-b border-foreground/15 p-1 text-xl font-semibold">
                    Nova escala
                  </h2>
                  <Link
                    className="flex h-full w-full flex-col justify-evenly text-center"
                    href={`/servicos/unidades/${params.id_company}/gestor-unidade/escala-unidade-salvar?date_schedule=${selectedDay.year}-${selectedDay.month + 1}-${selectedDay.day}`}
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
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default CalendarGsoV1;
