'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LuArrowBigLeft, LuArrowBigRight, LuCalendarPlus } from 'react-icons/lu'

import TabScheduleSave from '@/app/(private)/(modules)/components/TabScheduleSave'
import CalendarGsoGrid from './CalendarGsoGrid'
import { columnsEscala } from '../DataTables/DataTableEscala/columnsEscala'
import { DataTableEscala } from '../DataTables/DataTableEscala/data-table-escala'
import { ModalGso } from '../Modal/ModalGso/ModalGso'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type FunctionsMembers } from '@/types/index'
import { Button } from '@/ui/button'

interface DaysMonthProps {
  dias: number
  diference: number
}

const CalendarGso = ({
  unidade,
  functions,
}: {
  unidade: IUnidadeSchema
  functions?: FunctionsMembers[]
}) => {
  const date = new Date()
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [dayWeek, setDayWeek] = useState(date.getDay())

  const monthName = [
    { monthName: 'Janeiro', number: 0 },
    { monthName: 'Fevereiro', number: 1 },
    { monthName: 'Março', number: 2 },
    { monthName: 'Abril', number: 3 },
    { monthName: 'Maio', number: 4 },
    { monthName: 'Junho', number: 5 },
    { monthName: 'Julho', number: 6 },
    { monthName: 'Agosto', number: 7 },
    { monthName: 'Setembro', number: 8 },
    { monthName: 'Outubro', number: 9 },
    { monthName: 'Novembro', number: 10 },
    { monthName: 'Dezembro', number: 11 },
  ]

  const diasSemana = [
    { nameDay: 'Domingo', shortNameDay: 'Dom' },
    { nameDay: 'Segunda', shortNameDay: 'Seg' },
    { nameDay: 'Terça', shortNameDay: 'Ter' },
    { nameDay: 'Quarta', shortNameDay: 'Qua' },
    { nameDay: 'Quinta', shortNameDay: 'Qui' },
    { nameDay: 'Sexta', shortNameDay: 'Sex' },
    { nameDay: 'Sábado', shortNameDay: 'Sáb' },
  ]

  const escalaObj = [
    {
      day: 0,
      dayWeek: 0,
      dayShortName: '',
      year,
      month,
      dayName: '',
      dayEvent: [] as IScheduleSchema[],
    },
  ]
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleCountDaysInMonth = (numberMonth: number) => {
    const lastDigiteYear = year.toString().slice(-2)

    if (numberMonth === -1) numberMonth = 11
    // Dias do mês com ano bissexto

    switch (numberMonth) {
      case 0: {
        return { dias: 31, diference: 0 } satisfies DaysMonthProps
      }

      case 1: {
        if (year % 4 === 0 && lastDigiteYear !== '00') {
          return { dias: 29, diference: 3 } satisfies DaysMonthProps
        } else {
          return { dias: 28, diference: 4 } satisfies DaysMonthProps
        }
      }
      case 2:
        return { dias: 31, diference: 2 } satisfies DaysMonthProps
      case 3:
        return { dias: 30, diference: 0 } satisfies DaysMonthProps
      case 4:
        return { dias: 31, diference: 2 } satisfies DaysMonthProps
      case 5:
        return { dias: 30, diference: 5 } satisfies DaysMonthProps
      case 6:
        return { dias: 31, diference: 0 } satisfies DaysMonthProps
      case 7:
        return { dias: 31, diference: 3 } satisfies DaysMonthProps
      case 8:
        return { dias: 30, diference: 6 } satisfies DaysMonthProps
      case 9:
        return { dias: 31, diference: 1 } satisfies DaysMonthProps
      case 10:
        return { dias: 30, diference: 3 } satisfies DaysMonthProps
      case 11:
        return { dias: 31, diference: 6 } satisfies DaysMonthProps
    }
  }

  const daysInMonth = handleCountDaysInMonth(month)

  const handleEventDay = (
    day: number,
    month: number,
    year: number,
    event?: IUnidadeSchema,
  ): IScheduleSchema[] => {
    if (event == null) return []
    const result: IScheduleSchema[] = []
    event?.schedules?.forEach((itemEvento) => {
      if (
        itemEvento?.date_creation !== null &&
        itemEvento?.date_creation !== undefined
      ) {
        if (
          new Date(itemEvento?.date_creation).getDate() === day &&
          new Date(itemEvento?.date_creation).getMonth() === month &&
          new Date(itemEvento?.date_creation).getFullYear() === year
        ) {
          result.push(itemEvento)
        }
      }
    })
    return result
  }

  let daysCalculate = 0

  if (daysInMonth?.dias != null) {
    daysCalculate =
      dayWeek === date.getDay()
        ? daysInMonth.dias + daysInMonth.diference
        : daysInMonth.dias + Math.abs(dayWeek)

    for (let i = 0; i <= daysCalculate; i++) {
      if (i % 7 !== 0) {
        escalaObj.push({
          day:
            dayWeek === date.getDay()
              ? i - daysInMonth?.diference
              : dayWeek + i,
          dayWeek: i % 7,
          dayShortName:
            i % 7 === 1
              ? 'Seg'
              : i % 7 === 2
                ? 'Ter'
                : i % 7 === 3
                  ? 'Qua'
                  : i % 7 === 4
                    ? 'Qui'
                    : i % 7 === 5
                      ? 'Sex'
                      : i % 7 === 6
                        ? 'Sab'
                        : '',
          dayName:
            i % 7 === 1
              ? 'Segunda'
              : i % 7 === 2
                ? 'Terça'
                : i % 7 === 3
                  ? 'Quarta'
                  : i % 7 === 4
                    ? 'Quinta'
                    : i % 7 === 5
                      ? 'Sexta'
                      : i % 7 === 6
                        ? 'Sábado'
                        : '',
          dayEvent: handleEventDay(
            dayWeek === date.getDay() ? i - daysInMonth.diference : dayWeek + i,
            month,
            year,
            unidade,
          ),
          year,
          month,
        })
      } else {
        escalaObj.push({
          day:
            dayWeek === date.getDay() ? i - daysInMonth.diference : i + dayWeek,
          dayWeek: 0,
          dayShortName: 'Dom',
          dayName: 'Domingo',
          dayEvent: handleEventDay(
            dayWeek === date.getDay() ? i - daysInMonth.diference : dayWeek + i,
            month,
            year,
            unidade,
          ),
          year,
          month,
        })
      }
    }
  }

  const handlePrevious = (): void => {
    const lastDayWeek = escalaObj[escalaObj.length - 1].dayWeek
    const monthChanged = handleCountDaysInMonth(month - 1)
    let diffDayInMounts = 0
    if (daysInMonth?.dias != null && monthChanged?.dias != null) {
      diffDayInMounts = daysInMonth.dias - monthChanged?.dias
    }

    const newDayWeek = Math.abs(diffDayInMounts) + lastDayWeek
    setDayWeek(newDayWeek * -1 - 1)
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNext = (): void => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setDayWeek(escalaObj[escalaObj.length - 1].dayWeek * -1)
  }
  escalaObj.shift()
  const eventsList: IScheduleSchema[] = []
  escalaObj.forEach((item) => {
    item?.dayEvent?.forEach((event) => {
      event.short_name_comp = unidade.short_name_comp
      event.short_name_corp = unidade.short_name_corp
      eventsList.push(event)
    })
  })

  return (
    <>
      <div className="grid h-full w-full grid-cols-12 md:mt-0">
        {/* TABLE ESCALA */}
        <div
          className={`col-start-1  col-end-13 mt-8  h-full w-full rounded-[5px] bg-background p-2`}
        >
          <div className="h-full w-full overflow-scroll">
            <DataTableEscala data={eventsList} columns={columnsEscala} />
          </div>
        </div>

        {/* HEADER GRID WEEK */}
        <div
          className={`col-start-1 col-end-13 row-end-2  w-full place-content-start rounded-[5px] px-2 md:col-start-2 md:col-end-12 md:row-start-1`}
        >
          <div className="border-b-none flex justify-between border border-foreground/10 p-1">
            <Button variant="default" onClick={handlePrevious}>
              <span className="hidden   md:block">Anterior</span>
              <span>
                <LuArrowBigLeft className="md:hidden" />
              </span>
            </Button>
            <span className="text-lg font-bold">
              {monthName[month]?.monthName} / {year}
            </span>
            <div>
              <Button variant="default" onClick={handleNext}>
                <span className="hidden md:block">Próximo</span>
                <span>
                  <LuArrowBigRight className="md:hidden" />
                </span>
              </Button>
            </div>
          </div>

          <div
            className="
            grid h-10 w-full grid-cols-7 place-content-center rounded-[3px]"
          >
            {diasSemana.map((day, index) => (
              <div
                key={index}
                className="  w-full cursor-pointer flex-col items-center
                justify-center rounded-[3px] border border-foreground/10
                p-2 text-center hover:border
                hover:border-primary/60  md:flex lg:h-full"
              >
                <span className="hidden xl:block">{day.nameDay}</span>
                <span className="block text-center sm:block md:block lg:block xl:hidden">
                  {day.shortNameDay}
                </span>
              </div>
            ))}
          </div>

          <div
            className="
             grid grid-cols-7  overflow-scroll rounded-[3px] md:h-[90%] md:overflow-hidden"
          >
            {escalaObj.map((day, index) => (
              // MODAL TRIGGER
              <div key={index} className=" relative h-full w-full ">
                {day?.day > 0 && (
                  <ModalGso
                    disabled={
                      new Date(day.year, day.month, day.day).setHours(
                        1,
                        1,
                        1,
                        1,
                      ) < new Date().setHours(0, 0, 0, 0) &&
                      day?.dayEvent?.length === 0
                    }
                    className={` overflow-auto  ${day?.dayEvent?.length > 0 ? 'h-[85vh] w-[80vw]' : 'md:h-[35vh] md:w-[30vw]'} xl:px-4 `}
                    title="Detalhes Escala"
                    childrenButton={
                      <div className=" relative h-full w-full ">
                        <CalendarGsoGrid
                          index={
                            daysInMonth?.dias != null
                              ? index - daysInMonth.dias
                              : index
                          }
                          day={day.day}
                          dayEvent={day?.dayEvent}
                          month={day.month}
                          year={day.year}
                          className="  h-24 w-14 sm:h-24 sm:w-[94px] md:h-24 md:w-20 lg:h-28 lg:w-24 xl:h-32 xl:w-[122px]"
                        />
                      </div>
                    }
                  >
                    {day?.dayEvent?.length > 0 ? (
                      <div className="flex h-full w-full flex-col ">
                        {day?.dayEvent?.map((itemEvent, indexEvent) => (
                          <TabScheduleSave
                            key={indexEvent}
                            unidades={unidade}
                            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                            // @ts-expect-error
                            schedule={unidade?.schedules?.find(
                              (schedule) =>
                                schedule?.id?.toString() ===
                                itemEvent?.id?.toString(),
                            )}
                          />
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Link
                          className="flex h-full w-full flex-col items-center justify-between gap-2 p-2 "
                          href={`/servicos/unidades/${unidade?.name?.toLowerCase() + '-' + unidade.id}/gestor-unidade/escala-unidade-salvar?date_schedule=${day.year}-${day.month + 1}-${day.day}`}
                        >
                          <p>
                            Não existe escala para esta data. Deseja criar
                            escala?
                          </p>
                          <Button className="flex items-center gap-1">
                            <LuCalendarPlus />
                            Criar nova escala
                          </Button>
                        </Link>
                      </div>
                    )}
                  </ModalGso>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default CalendarGso
