"use client";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { LuCheck, LuChevronsUpDown, LuTrash2 } from "react-icons/lu";

import { ModalGso } from "../Modal/ModalGso/ModalGso";
import { maskPhone } from "@/functions/masks/maskphone";
import IconCarVoid from "../../../public/icons/IconCarVoid";
import IconSeat from "../../../public/icons/IconSeat";
import { cn } from "@/lib/utils";
import { type IVehicleSchema } from "@/schemas/CarsSchema";
import { type IMemberSchema } from "@/schemas/MemberSchema";
import type { IScheduleFormSave } from "@/schemas/ScheduleFormSave";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Label } from "@/ui/label";
import { Popover, PopoverTrigger } from "@/ui/popover";

type AddVehicleScheduleProps = {
  vehicle?: IVehicleSchema;
  setListVehiclesAction?: React.Dispatch<
    React.SetStateAction<IVehicleSchema[]>
  >;
  form?: UseFormReturn<IScheduleFormSave>;
  membersCompany?: IMemberSchema[];
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>;
export const AddVehicleSchedule = ({
  vehicle,
  setListVehiclesAction,
  form,
  membersCompany,
}: AddVehicleScheduleProps) => {
  const [memberAvailable, setMemberAvailable] = React.useState(
    [] as IMemberSchema[],
  );
  const [memberVehicleSelect, setMemberVehicleSelect] = React.useState(
    vehicle?.members?.some((item) => item?.member !== null) == true,
  );

  const handleClick = (seatForm: {
    position: number;
    member: IMemberSchema;
  }) => {
    // Atualiza a posição desejada
    if (setListVehiclesAction) {
      setListVehiclesAction((prevState) => {
        return prevState.map((item) => {
          if (item.id === vehicle?.id) {
            return {
              ...item,
              members: item.members?.map((member) => {
                if (member?.position === seatForm.position) {
                  return {
                    ...member,
                    member: seatForm.member,
                  };
                }
                return member;
              }),
            };
          }
          return item;
        });
      });
    }

    vehicle?.members?.map((itemVehicleSingle) =>
      itemVehicleSingle?.position === seatForm.position
        ? {
            ...itemVehicleSingle,
            member: seatForm.member,
          }
        : itemVehicleSingle,
    );

    setMemberVehicleSelect(true);
  };

  const removeMemberFromSeat = (position: number) => {
    if (setListVehiclesAction) {
      setListVehiclesAction((prevState) => {
        return prevState.map((item) => {
          if (item.id === vehicle?.id) {
            return {
              ...item,
              members: item.members?.map((member) => {
                if (member?.position === position) {
                  return {
                    ...member,
                    member: null,
                  };
                }
                return member;
              }),
            };
          }
          return item;
        });
      });
    }

    setMemberVehicleSelect(true);
  };

  const handlerCalculateMemberAvailable = () => {
    let arrayMember = membersCompany?.filter(
      (memberUnidade) =>
        memberUnidade?.id_user !== form?.getValues("id_member_comunication"),
    );
    arrayMember = arrayMember?.filter(
      (memberUnidade) =>
        memberUnidade?.id_user !== form?.getValues("id_cmt_sos"),
    );

    const arrayMembersVeicles: IMemberSchema[] = [];
    form?.getValues("vehicles")?.forEach((vehicle) => {
      arrayMember?.forEach((memberUnidade) => {
        if (
          vehicle?.members?.some(
            (memberVehicle) =>
              memberUnidade?.id_user === memberVehicle?.member?.id_user,
          )
        ) {
          arrayMembersVeicles.push(memberUnidade);
        }
      });
    });

    const membersAvailable = arrayMember?.filter(
      (memberUnidade) =>
        !arrayMembersVeicles?.some(
          (memberVehicle) => memberUnidade?.id_user === memberVehicle?.id_user,
        ),
    );

    setMemberAvailable(membersAvailable ? membersAvailable : []);
  };

  return (
    <div
      className={`relative flex h-auto w-[calc(100vw_-_40px)] flex-col md:flex-row md:p-0 ${!memberVehicleSelect ? "md:h-[350px] md:w-[270px]" : "md:h-[520px] md:w-[550px]"}`}
    >
      <div className={`relative h-full w-full`}>
        <div className="grid place-content-center hover:z-0 md:h-full">
          <div
            className={`absolute top-[15%] place-self-center rounded-sm px-2 ${memberVehicleSelect ? "md:top-[23%]" : "text-center md:top-[9%]"} border border-foreground`}
          >
            {vehicle?.prefix}
          </div>
          <IconCarVoid className="absolute h-full w-full stroke-foreground hover:z-0 hover:cursor-pointer" />
          <div
            className={`mt-32 grid h-[400px] w-[200px] grid-cols-2 place-content-center gap-x-2 overflow-hidden rounded-xl p-0 md:ml-[2px] md:mt-20 md:h-[210px] md:w-[140px]`}
          >
            {" "}
            {vehicle?.members?.map((item, index) => (
              <div key={index} className="z-50 h-full md:w-[97%]">
                <ModalGso
                  childrenButton={
                    <div
                      className="z-50 m-0 w-[85%] p-0 md:w-[97%]"
                      onClick={handlerCalculateMemberAvailable}
                    >
                      <div className="hover:stroker-primary relative">
                        <IconSeat className="w-full fill-foreground hover:fill-primary" />
                        {item?.member?.image !== undefined && (
                          <Avatar className="absolute top-0 h-full w-full border-[3px] p-[2px] hover:border-primary">
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
                        )}
                      </div>
                    </div>
                  }
                  classNameButton="flex items-center justify-center"
                  className="md:h-1/3 md:w-1/2"
                >
                  <div className="flex items-center gap-1">
                    <FormField
                      control={form?.control}
                      name="vehicle"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel
                            htmlFor="vehicle"
                            className="flex items-center gap-1 text-muted-foreground"
                          >
                            {item?.position === 1
                              ? "Motorista"
                              : item?.position === 2
                                ? "CMT GU"
                                : "Componente"}
                          </FormLabel>{" "}
                          <Popover>
                            <PopoverTrigger
                              asChild
                              onClick={handlerCalculateMemberAvailable}
                            >
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    "text-muted-foreground",
                                  )}
                                >
                                  {memberAvailable?.find(
                                    (itemMember: IMemberSchema) =>
                                      itemMember?.id_user ===
                                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                      // @ts-expect-error
                                      field.value?.id_user,
                                  )?.name ?? "Selecione um membro"}
                                  <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            {/*<PopoverContent className="w-[200px] p-0">*/}
                            <Command>
                              <CommandInput placeholder="procurando membro ..." />
                              <CommandEmpty>
                                Membro não encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {memberAvailable?.map(
                                    (member: IMemberSchema, index) => (
                                      <CommandItem
                                        key={index}
                                        onSelect={() => {
                                          handleClick({
                                            position: item?.position ?? 0,
                                            member,
                                          });
                                        }}
                                      >
                                        <LuCheck
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            member?.id_user ===
                                              vehicle?.members?.find(
                                                (itemSeat) =>
                                                  itemSeat?.member?.id_user ===
                                                  member?.id_user,
                                              )?.member?.id_user
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {member?.name}
                                      </CommandItem>
                                    ),
                                  )}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                            {/*</PopoverContent>*/}
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ModalGso>
              </div>
            ))}
          </div>
        </div>
      </div>
      {memberVehicleSelect && (
        <div className={`z-0 w-full border-l border-foreground/10 p-2`}>
          <div className="flex flex-col items-center gap-1">
            {vehicle?.members?.map(
              (item, index) =>
                item?.member !== null && (
                  <div
                    key={index}
                    className="flex w-full flex-col gap-2 rounded-sm border border-foreground/10 p-2"
                  >
                    <Label>
                      {item?.position === 1
                        ? "Motorista"
                        : item?.position === 2
                          ? "CMT GU"
                          : "Componente"}
                    </Label>

                    <div className="relative flex items-center gap-2 text-sm">
                      <div
                        className="absolute right-0 top-0 hover:text-primary/60"
                        onClick={() => {
                          removeMemberFromSeat(item?.position ?? 0);
                        }}
                      >
                        <LuTrash2 size={20} />
                      </div>

                      <Avatar className="border border-foreground text-muted-foreground">
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
        </div>
      )}
    </div>
  );
};
