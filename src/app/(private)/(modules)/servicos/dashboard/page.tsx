import React from "react";
import { SectionCards } from "@/app/(private)/(modules)/servicos/dashboard/components/sectionCards/section-cards";
import { ChartAreaInteractive } from "@/app/(private)/(modules)/servicos/dashboard/components/charts/chart-area-interactive";
import { SectionPierCharts } from "@/app/(private)/(modules)/servicos/dashboard/components/sectionPierCharts/section-pier-charts";
import { DataTableEscala } from "@/components/DataTables/DataTableEscala/data-table-escala";
import { columnsEscala } from "@/components/DataTables/DataTableEscala/columnsEscala";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="@container/main flex w-full flex-1 flex-col">
        <div className="m-4 flex flex-col gap-3">
          <div className="rounded-lg border border-primary/60 p-3 shadow-lg">
            <h2 className="text-2xl font-bold">Minha Unidade</h2>
            <SectionPierCharts />
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-primary/60 p-3 shadow-lg">
            <h2 className="text-2xl font-bold">Ocorrências Gerais</h2>
            <SectionCards />
            <ChartAreaInteractive />
          </div>
          <DataTableEscala columns={columnsEscala} data={[]} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
