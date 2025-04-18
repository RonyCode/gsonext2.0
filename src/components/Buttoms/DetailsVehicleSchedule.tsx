"use client";
import React from "react";
import { maskPhone } from "@/functions/masks/maskphone";
import IconSeat from "../../../public/icons/IconSeat";
import { type IVehicleSchema } from "@/schemas/CarsSchema";
import { Avatar, AvatarImage } from "@/ui/avatar";

import { Label } from "@/ui/label";
import { IMemberSchema } from "@/schemas/MemberSchema";

type DetailsVehicleScheduleProps = {
  vehicle?: IVehicleSchema;
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>;
export const DetailsVehicleSchedule = ({
  vehicle,
}: DetailsVehicleScheduleProps) => {
  function rearrangeMembers(
    members: [{ position: number; member?: IMemberSchema }],
  ) {
    const rearranged = [...members];
    const driverIndex = rearranged.findIndex((member) => member.position === 1);
    const frontPassengerIndex = rearranged.findIndex(
      (member) => member.position === 2,
    );

    const driver =
      driverIndex !== -1 ? rearranged.splice(driverIndex, 1)[0] : null;

    const frontPassenger =
      frontPassengerIndex !== -1
        ? rearranged.splice(
            frontPassengerIndex > driverIndex
              ? frontPassengerIndex - 1
              : frontPassengerIndex,
            1,
          )[0]
        : null;

    if (driver) {
      rearranged.splice(2, 0, driver);
    }
    if (frontPassenger) {
      rearranged.splice(5, 0, frontPassenger);
    }
    return rearranged;
  }
  let rearrangedSeats: { position: number; member?: IMemberSchema }[] = [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  rearrangedSeats = vehicle?.members ? rearrangeMembers(vehicle.members) : [];
  return (
    <div
      className={`z-100 grid h-full w-full grid-cols-1 rounded-sm p-2 hover:z-0 hover:cursor-pointer md:w-[400px]`}
    >
      <div className={`m-auto my-2 rounded-sm border border-foreground px-2`}>
        {vehicle?.prefix}
      </div>
      <div className="col-start-1 grid h-[160px] w-full grid-cols-12 place-items-center bg-[url(/icons/carVoid2.svg)] bg-center bg-no-repeat md:h-[200px]">
        <div className="col-span-5 col-start-4 -ml-2 grid grid-cols-3 gap-1 p-5 md:mr-4 md:p-1">
          {" "}
          {rearrangedSeats?.map((item, index) => (
            <div key={index} className="relative col-span-1 h-full w-full">
              <IconSeat className="h-full w-full rotate-90 fill-foreground hover:fill-primary" />
              {item?.member?.image !== undefined && (
                <Avatar className="absolute top-0 h-full w-full border hover:border-primary">
                  <AvatarImage
                    src={
                      process.env.NEXT_PUBLIC_API_GSO != null &&
                      item?.member?.image != null
                        ? process.env.NEXT_PUBLIC_API_GSO + item?.member?.image
                        : "/images/user1.jpg"
                    }
                    alt="@shadcn"
                    style={{ objectFit: "cover" }}
                  />
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      {vehicle?.members && (
        <div
          className={`z-0 grid w-full grid-cols-2 border-l border-foreground/10`}
        >
          {vehicle?.members?.map(
            (item, index) =>
              item?.member !== null && (
                <div
                  key={index}
                  className="col-span-1 flex w-full min-w-[100px] flex-col gap-2 rounded-sm border border-foreground/10 p-2"
                >
                  <Label>
                    {item?.position === 1
                      ? "Motorista"
                      : item?.position === 2
                        ? "CMT GU"
                        : "Componente"}
                  </Label>

                  <div className="relative flex items-center gap-2 text-sm">
                    <Avatar className="space-0 m-0 border border-foreground p-0 text-muted-foreground">
                      <AvatarImage
                        src={
                          process.env.NEXT_PUBLIC_API_GSO != null &&
                          item?.member?.image != null
                            ? process.env.NEXT_PUBLIC_API_GSO +
                              item?.member?.image
                            : "/images/user1.jpg"
                        }
                        alt="@shadcn"
                        style={{ objectFit: "cover" }}
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{item?.member?.name}</span>
                      <span>{maskPhone(item?.member?.phone)}</span>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
};
