import { VehicleSchema } from './CarsSchema'
import { MemberSchema } from './MemberSchema'
import { ScheduleSchema } from './ScheduleSchema'
import { z } from 'zod'

export const ScheduleSchemas = z.object({
  schedule: z.array(z.object({ ScheduleSchema }).optional()).optional(),
  cars: z
    .array(
      z.object({
        car: VehicleSchema,
        members: z.array(MemberSchema).optional(),
      }),
    )
    .optional(),
  excluded: z.number().optional(),
})

export type IScheduleSchemas = z.infer<typeof ScheduleSchemas>
