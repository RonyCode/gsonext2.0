"use client";
import Link from "next/link";
import React from "react";
import { LuListPlus } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import { Card } from "@/ui/card";
import { DataTableUsers } from "@/components/DataTables/DataTableUsers/data-table-users";
import { columnsUsers } from "@/components/DataTables/DataTableUsers/columnsUser";
import { IUserSchema } from "@/schemas/UsersSchema";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  users?: IUserSchema[];
  className?: string;
};

export const UsersDetails = ({
  users,
  className,
  ...props
}: UserRegisterFormProps) => {
  return (
    <div className={cn("", className)} {...props}>
      <Card x-chunk="dashboard-06-chunk-0 ">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4 space-y-2 p-6">
            <h1 className="ml-4 mr-auto pt-2 text-xl font-bold">Usuários</h1>
            <Link href="#">
              <Button
                className={cn(buttonVariants({ variant: "outline" }), "group")}
              >
                <LuListPlus
                  className="text-foreground group-hover:text-muted-foreground"
                  size={24}
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:p-4">
          <DataTableUsers columns={columnsUsers} data={users ?? []} />
        </div>
      </Card>
    </div>
  );
};
export default UsersDetails;
