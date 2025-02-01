import * as React from 'react'
import { type ReactElement } from 'react'
import { LuBadgeX } from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { type IScheduleSchema } from '@/schemas/ScheduleSchema'
import { Badge } from '@/ui/badge'

type CalendarGsoGridProps = {
  dayEvent?: IScheduleSchema[]
  month?: number
  day?: number
  year?: number
  index?: number
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const CalendarGsoGrid = ({
  dayEvent,
  month,
  day,
  year,
  className,
  ...props
}: CalendarGsoGridProps): ReactElement => {
  const date = new Date()
  return (
    <>
      {day != null && day > 0 && (
        <div
          className={cn(
            `  relative flex h-full w-full cursor-pointer flex-col items-center justify-start  
                              rounded-[3px] 
                              border border-foreground/10 hover:border
                              hover:border-primary/60 md:min-h-full  
                              ${
                                day === date.getDate() &&
                                month === date.getMonth() &&
                                year === date.getFullYear()
                                  ? 'border-primary/60 '
                                  : ''
                              } `,
            className,
          )}
          {...props}
        >
          {year !== undefined &&
          month !== undefined &&
          day !== undefined &&
          new Date(year, month, day).setHours(1, 1, 1, 1) <
            new Date().setHours(0, 0, 0, 0) ? (
            <Badge
              variant="outline"
              className="border-foreground/10 px-[6px] text-[.5rem]  text-muted-foreground md:block md:text-[.625rem]"
            >
              <span className="flex items-center gap-1">
                <LuBadgeX className="text-primary" />
                <p>escala</p>
              </span>
            </Badge>
          ) : (
            dayEvent?.map((itemEvent, indexEvent) => (
              <div key={indexEvent} className="m-0 self-start px-1 pt-1 ">
                <Badge
                  className={`  px-[6px] text-[.5rem] md:block md:text-[.625rem] ${
                    itemEvent.team === 1
                      ? 'border-primary/85 text-primary/85'
                      : itemEvent.team === 2
                        ? 'border-blue-500/85 text-blue-500/85'
                        : itemEvent.team === 3
                          ? 'border-yellow-400/85 text-yellow-400/85'
                          : itemEvent.team === 4
                            ? 'border-green-500/85 text-green-500/85'
                            : itemEvent.team === 5
                              ? 'border-[#9400d3]/85 text-[#9400d3]/85'
                              : ''
                  }`}
                  variant="outline"
                >
                  {itemEvent.team === 1
                    ? 'ALFA'
                    : itemEvent.team === 2
                      ? 'BRAVO'
                      : itemEvent.team === 3
                        ? 'CHARLIE'
                        : itemEvent.team === 4
                          ? 'DELTA'
                          : itemEvent.team === 5
                            ? 'EXTRA'
                            : ''}
                </Badge>
              </div>
            ))
          )}
          <div className="absolute bottom-0 right-0 p-0 text-2xl font-thin text-muted-foreground md:text-4xl ">
            <p className=" m-2">{day}</p>
          </div>
        </div>
      )}
    </>
  )
}
export default CalendarGsoGrid
