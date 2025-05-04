import { PieChartOcorrencia } from "@/app/(private)/(modules)/servicos/(geral)/dashboard/components/PieChart/pie-chart-ocorrencia";
import { PieChartMembros } from "@/app/(private)/(modules)/servicos/(geral)/dashboard/components/PieChart/pie-chart-membros";
import { PieChartVeiculos } from "@/app/(private)/(modules)/servicos/(geral)/dashboard/components/PieChart/pie-chart-veiculos";

export function SectionPierCharts() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      <PieChartOcorrencia />
      <PieChartMembros />
      <PieChartVeiculos />
      <PieChartVeiculos />
    </div>
  );
}
