"use client";

import { columnsMembers } from "@/components/DataTables/DataTableMembers/columnsMembers";
import { DataTableMembers } from "@/components/DataTables/DataTableMembers/data-table-members";
import { type IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { Card } from "@/ui/card";
import { cn } from "@/lib/utils";

type SelectCompanyModuleProps = React.HTMLAttributes<HTMLDivElement> & {
  organizacao?: IOrganizacaoSchema;
  className?: string;
};

export const SelectMembersCorporation = ({
  organizacao,
  className,
  ...props
}: SelectCompanyModuleProps): React.ReactElement => {
  return (
    <>
      <Card
        x-chunk="dashboard-06-chunk-0"
        className={cn("bg-background p-6", className)}
        {...props}
      >
        {organizacao?.members != null && (
          <DataTableMembers
            columns={columnsMembers}
            data={organizacao?.members}
          />
        )}
      </Card>
    </>
  );
};
export default SelectMembersCorporation;
