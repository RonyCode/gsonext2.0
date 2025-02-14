import { getServerSession } from "next-auth";
import React from "react";
import { LuBuilding } from "react-icons/lu";
import { MdOutlineSupervisorAccount } from "react-icons/md";

import { CardDefault } from "@/components/Cards/CardDefault";
import { authOptions } from "@/lib/auth";
import { getAllOrganizacoes } from "@/lib/GetAllOrganizacoes";
import { IScheduleSchema } from "@/schemas/ScheduleSchema";
import CalendarGsoV1 from "@/components/CalendarGso/CalendarGsoV1";

const EscalasUnidade = async ({
  params,
}: {
  params: { id_company: string };
}) => {
  const session = await getServerSession(authOptions);
  const { data } = await getAllOrganizacoes();
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation;
  });

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === params?.id_company?.split("-")[1]) {
      return comp;
    }
    return null;
  });

  const dayEvent: Partial<IScheduleSchema>[] = [
    {
      team: 1,
      day: 1,
      month: 1,
      year: 2025,
      id: "6753a0d0b8d972b3e6004712",
      id_cmt_sos: "6753a0d0b8d972b3e6004712",
      id_member_comunication: "6753a0d0b8d972b3e6004712",
      hour_start: "07:00",
      situation: 1,
      id_period: 12,
      type: 3,
    }, // Evento do time ALFA em 1º de fevereiro de 2025
    {
      team: 2,
      day: 1,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "19:00",
      id_period: 12,
      type: 1,
    }, // Evento do time ALFA em 1º de fevereiro de 2025
    {
      team: 2,
      day: 5,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time BRAVO em 5 de fevereiro de 2025
    {
      team: 3,
      day: 10,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_cmt_sos: "6753a0d0b8d972b3e6004712",
      id_member_comunication: "6756feba8bc4558f7d0aa763",
      id_period: 8,
      type: 1,
      vehicles: [
        {
          id: "asjdjksdieehdhaksd",
          prefix: "UR_01",
          plate: "ABC-999",
          members: [
            {
              member: { name: "Rony Anderson Alves da Silva", id: "1" },
              position: 1,
            },
            {
              member: { name: "Blabla Alves da Silva", id: "21" },
              position: 2,
            },
            {
              member: { name: "Mocorongo Alves da Silva", id: "212" },
              position: 3,
            },
            {
              member: { name: "Rei Julian Silva", id: "212" },
              position: 4,
            },
            {
              member: { name: "Geralda  da Silva", id: "212" },
              position: 5,
            },
            {
              member: { name: "Denis  Alves da Silva", id: "212" },
              position: 6,
            },
          ],
          type: "",
          excluded: 0,
          chassi: "",
          id_brand: "",
          id_model: "",
          id_year: "",
        },
        {
          id: "asjdjksdieehdhaksd",
          prefix: "ASA-14",
          plate: "ABC-999",
          members: [
            {
              member: { name: "Rony Anderson Alves da Silva", id: "1" },
              position: 1,
            },
            {
              member: { name: "Blabla Alves da Silva", id: "21" },
              position: 2,
            },
            {
              member: { name: "Mocorongo Alves da Silva", id: "212" },
              position: 3,
            },
            {
              member: { name: "Rei Julian Silva", id: "212" },
              position: 4,
            },
            {
              member: { name: "Geralda  da Silva", id: "212" },
              position: 5,
            },
            {
              member: { name: "Denis  Alves da Silva", id: "212" },
              position: 6,
            },
          ],
          type: "",
          excluded: 0,
          chassi: "",
          id_brand: "",
          id_model: "",
          id_year: "",
        },
        {
          id: "asjdjksdieehdhaksd",
          prefix: "ABT-08",
          plate: "ABC-999",
          members: [
            {
              member: { name: "Rony Anderson Alves da Silva", id: "1" },
              position: 1,
            },
            {
              member: { name: "Blabla Alves da Silva", id: "21" },
              position: 2,
            },
            {
              member: { name: "Mocorongo Alves da Silva", id: "212" },
              position: 3,
            },
            {
              member: { name: "Rei Julian Silva", id: "212" },
              position: 4,
            },
            {
              member: { name: "Geralda  da Silva", id: "212" },
              position: 5,
            },
            {
              member: { name: "Denis  Alves da Silva", id: "212" },
              position: 6,
            },
          ],
          type: "",
          excluded: 0,
          chassi: "",
          id_brand: "",
          id_model: "",
          id_year: "",
        },
      ],
    }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    {
      team: 4,
      day: 10,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    {
      team: 5,
      day: 10,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    {
      team: 2,
      day: 10,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time CHARLIE em 10 de fevereiro de 2025
    {
      team: 4,
      day: 15,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time DELTA em 15 de fevereiro de 2025
    {
      team: 5,
      day: 20,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time EXTRA em 20 de fevereiro de 2025
    {
      team: 1,
      day: 25,
      month: 1,
      year: 2025,
      id: "asjdjksdieehdhaksd",
      hour_start: "08:00",
      id_period: 8,
      type: 1,
    }, // Evento do time ALFA em 25 de fevereiro de 2025
  ];
  return (
    <>
      <CardDefault
        title={companyFound?.name + " / " + companyFound?.companyAddress?.city}
        description={
          "CMD : " + companyFound?.director + " - " + companyFound?.director
        }
        image={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO && companyFound?.image
            ? process.env.NEXT_PUBLIC_API_GSO + companyFound?.image
            : process.env.NEXT_PUBLIC_API_GSO + "/public/images/img.png"
        }
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        {companyFound?.schedules != null && (
          <div className="m-0 min-h-screen w-full md:p-6">
            <CalendarGsoV1 company={companyFound} dayEvent={dayEvent} />
          </div>
        )}
      </CardDefault>
    </>
  );
};
export default EscalasUnidade;
