import { IMemberSchema } from "@/schemas/MemberSchema";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTables/DataTableMembers/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LuBuilding2, LuPhone, LuUser } from "react-icons/lu";
import { maskPhone } from "@/functions/masks/maskphone";
import { Badge } from "@/ui/badge";
import { GetAllCompaniesAction } from "@/actions/company/GetAllCompaniesAction";

import { maskOcultaCpfCnpj } from "@/functions/masks/maskOcultaCpfCnpj";
import { DataTableRowActions } from "@/components/DataTables/DataTableUsers/data-table-row-actions";

export const path = process.env.NEXT_PUBLIC_API_GSO;

export const columnsWithMembersCompany = () => {
  const columnsWithMembersCompany: Array<ColumnDef<IMemberSchema>> = [
    {
      accessorKey: "name",
      accessorFn: (row) => row?.name, // Acessa o valor diretamente
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dados Usuário" />
      ),
      cell: ({ row }) => {
        const accountName = row.original?.name;
        const imageAccount = row?.original?.image;
        const accountPhone = row.original?.phone;
        return (
          <>
            <div className="flex min-w-64 items-center space-x-2 text-[0.8500rem] text-muted-foreground">
              <Avatar className="flex h-14 w-14 items-center justify-center rounded-full">
                <AvatarImage
                  className="aspect-square rounded-full object-cover"
                  src={
                    imageAccount !== null && imageAccount !== undefined
                      ? path + imageAccount
                      : path + "/public/images/avatar.svg"
                  }
                />

                <AvatarFallback>{<LuBuilding2 size={36} />}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <div>
                  <div className="flex items-center py-0.5">
                    <LuUser size={16} className="mr-2" /> {accountName}
                  </div>
                </div>

                <div>
                  {" "}
                  <div className="flex items-center py-0.5">
                    <LuPhone size={16} className="mr-2" />{" "}
                    {maskPhone(accountPhone)}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    {
      accessorKey: "email",
      accessorFn: (row) => row?.email,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return (
          <Badge
            variant="secondary"
            className="flex w-full items-center justify-center"
          >
            {row.getValue("email")}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "unidade",
      accessorFn: (row) => row?.id_company,

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unidade" />
      ),
      cell: ({ row }) => {
        const test = GetAllCompaniesAction("FEFRF").then((response) => {
          console.log(response);
        });
        // const type = types.find((type) => type.value === row.getValue("type"));
        // if (type == null) {
        //   return null;
        // }
        return <p>{row.original?.id_company}</p>;
      },
    },

    {
      accessorKey: "cpf",
      accessorFn: (row) => row?.cpf, // Acessa o valor diretamente
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CPF" />
      ),
      cell: ({ row }) => {
        return (
          <Badge
            variant="secondary"
            className="flex w-full items-center justify-center"
          >
            {maskOcultaCpfCnpj(row.getValue("cpf"))}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
  return columnsWithMembersCompany;
};
