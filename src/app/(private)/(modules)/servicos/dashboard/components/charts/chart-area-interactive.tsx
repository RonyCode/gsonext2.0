"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { PieChartOcorrencia } from "@/app/(private)/(modules)/servicos/(geral)/dashboard/components/PieChart/pie-chart-ocorrencia";
const chartData = [
  { date: "2024-04-01", clinica: 222, acidente_veicular: 150, incendio: 100 },
  { date: "2024-04-02", clinica: 97, acidente_veicular: 180, incendio: 150 },
  { date: "2024-04-03", clinica: 167, acidente_veicular: 120, incendio: 132 },
  { date: "2024-04-04", clinica: 242, acidente_veicular: 260, incendio: 120 },
  { date: "2024-04-05", clinica: 373, acidente_veicular: 290, incendio: 180 },
  { date: "2024-04-06", clinica: 301, acidente_veicular: 340, incendio: 34 },
  { date: "2024-04-07", clinica: 245, acidente_veicular: 180, incendio: 65 },
  { date: "2024-04-08", clinica: 409, acidente_veicular: 320, incendio: 113 },
  { date: "2024-04-09", clinica: 59, acidente_veicular: 110, incendio: 53 },
  { date: "2024-04-10", clinica: 261, acidente_veicular: 190, incendio: 67 },
  { date: "2024-04-11", clinica: 327, acidente_veicular: 350, incendio: 88 },
  { date: "2024-04-12", clinica: 292, acidente_veicular: 210, incendio: 232 },
  { date: "2024-04-13", clinica: 342, acidente_veicular: 380, incendio: 343 },
  { date: "2024-04-14", clinica: 137, acidente_veicular: 220, incendio: 176 },
  { date: "2024-04-15", clinica: 120, acidente_veicular: 170, incendio: 100 },
  { date: "2024-04-16", clinica: 138, acidente_veicular: 190, incendio: 21 },
  { date: "2024-04-17", clinica: 446, acidente_veicular: 360, incendio: 54 },
  { date: "2024-04-18", clinica: 364, acidente_veicular: 410, incendio: 32 },
  { date: "2024-04-19", clinica: 243, acidente_veicular: 180, incendio: 65 },
  { date: "2024-04-20", clinica: 89, acidente_veicular: 150, incendio: 76 },
  { date: "2024-04-21", clinica: 137, acidente_veicular: 200, incendio: 98 },
  { date: "2024-04-22", clinica: 224, acidente_veicular: 170, incendio: 9 },
  { date: "2024-04-23", clinica: 138, acidente_veicular: 230, incendio: 122 },
  { date: "2024-04-24", clinica: 387, acidente_veicular: 290, incendio: 133 },
  { date: "2024-04-25", clinica: 215, acidente_veicular: 250, incendio: 144 },
  { date: "2024-04-26", clinica: 75, acidente_veicular: 130, incendio: 155 },
  { date: "2024-04-27", clinica: 383, acidente_veicular: 420, incendio: 166 },
  { date: "2024-04-28", clinica: 122, acidente_veicular: 180, incendio: 177 },
  { date: "2024-04-29", clinica: 315, acidente_veicular: 240, incendio: 188 },
  { date: "2024-04-30", clinica: 454, acidente_veicular: 380, incendio: 199 },
  { date: "2024-05-01", clinica: 165, acidente_veicular: 220, incendio: 21 },
  { date: "2024-05-02", clinica: 293, acidente_veicular: 310, incendio: 31 },
  { date: "2024-05-03", clinica: 247, acidente_veicular: 190, incendio: 14 },
  { date: "2024-05-04", clinica: 385, acidente_veicular: 420, incendio: 41 },
  { date: "2024-05-05", clinica: 481, acidente_veicular: 390, incendio: 51 },
  { date: "2024-05-06", clinica: 498, acidente_veicular: 520, incendio: 662 },
  { date: "2024-05-07", clinica: 388, acidente_veicular: 300, incendio: 61 },
  { date: "2024-05-08", clinica: 149, acidente_veicular: 210, incendio: 200 },
  { date: "2024-05-09", clinica: 227, acidente_veicular: 180, incendio: 221 },
  { date: "2024-05-10", clinica: 293, acidente_veicular: 330, incendio: 222 },
  { date: "2024-05-11", clinica: 335, acidente_veicular: 270, incendio: 223 },
  { date: "2024-05-12", clinica: 197, acidente_veicular: 240, incendio: 40 },
  { date: "2024-05-13", clinica: 197, acidente_veicular: 160, incendio: 240 },
  { date: "2024-05-14", clinica: 448, acidente_veicular: 490, incendio: 260 },
  { date: "2024-05-15", clinica: 473, acidente_veicular: 380, incendio: 290 },
  { date: "2024-05-16", clinica: 338, acidente_veicular: 400, incendio: 42 },
  { date: "2024-05-17", clinica: 499, acidente_veicular: 420, incendio: 52 },
  { date: "2024-05-18", clinica: 315, acidente_veicular: 350, incendio: 27 },
  { date: "2024-05-19", clinica: 235, acidente_veicular: 180, incendio: 75 },
  { date: "2024-05-20", clinica: 177, acidente_veicular: 230, incendio: 90 },
  { date: "2024-05-21", clinica: 82, acidente_veicular: 140, incendio: 80 },
  { date: "2024-05-22", clinica: 81, acidente_veicular: 120, incendio: 70 },
  { date: "2024-05-23", clinica: 252, acidente_veicular: 290, incendio: 60 },
  { date: "2024-05-24", clinica: 294, acidente_veicular: 220, incendio: 50 },
  { date: "2024-05-25", clinica: 201, acidente_veicular: 250, incendio: 40 },
  { date: "2024-05-26", clinica: 213, acidente_veicular: 170, incendio: 30 },
  { date: "2024-05-27", clinica: 420, acidente_veicular: 460, incendio: 32 },
  { date: "2024-05-28", clinica: 233, acidente_veicular: 190, incendio: 100 },
  { date: "2024-05-29", clinica: 78, acidente_veicular: 130, incendio: 100 },
  { date: "2024-05-30", clinica: 340, acidente_veicular: 280, incendio: 100 },
  { date: "2024-05-31", clinica: 178, acidente_veicular: 230, incendio: 24 },
  { date: "2024-06-01", clinica: 178, acidente_veicular: 200, incendio: 25 },
  { date: "2024-06-02", clinica: 470, acidente_veicular: 410, incendio: 100 },
  { date: "2024-06-03", clinica: 103, acidente_veicular: 160, incendio: 66 },
  { date: "2024-06-04", clinica: 439, acidente_veicular: 380, incendio: 100 },
  { date: "2024-06-05", clinica: 88, acidente_veicular: 140, incendio: 76 },
  { date: "2024-06-06", clinica: 294, acidente_veicular: 250, incendio: 100 },
  { date: "2024-06-07", clinica: 323, acidente_veicular: 370, incendio: 22 },
  { date: "2024-06-08", clinica: 385, acidente_veicular: 320, incendio: 100 },
  { date: "2024-06-09", clinica: 438, acidente_veicular: 480, incendio: 141 },
  { date: "2024-06-10", clinica: 155, acidente_veicular: 200, incendio: 15 },
  { date: "2024-06-11", clinica: 92, acidente_veicular: 150, incendio: 100 },
  { date: "2024-06-12", clinica: 492, acidente_veicular: 420, incendio: 145 },
  { date: "2024-06-13", clinica: 81, acidente_veicular: 130, incendio: 100 },
  { date: "2024-06-14", clinica: 426, acidente_veicular: 380, incendio: 66 },
  { date: "2024-06-15", clinica: 307, acidente_veicular: 350, incendio: 100 },
  { date: "2024-06-16", clinica: 371, acidente_veicular: 310, incendio: 100 },
  { date: "2024-06-17", clinica: 475, acidente_veicular: 520, incendio: 100 },
  { date: "2024-06-18", clinica: 107, acidente_veicular: 170, incendio: 100 },
  { date: "2024-06-19", clinica: 341, acidente_veicular: 290, incendio: 100 },
  { date: "2024-06-20", clinica: 408, acidente_veicular: 450, incendio: 100 },
  { date: "2024-06-21", clinica: 169, acidente_veicular: 210, incendio: 100 },
  { date: "2024-06-22", clinica: 317, acidente_veicular: 270, incendio: 100 },
  { date: "2024-06-23", clinica: 480, acidente_veicular: 530, incendio: 100 },
  { date: "2024-06-24", clinica: 132, acidente_veicular: 180, incendio: 100 },
  { date: "2024-06-25", clinica: 141, acidente_veicular: 190, incendio: 100 },
  { date: "2024-06-26", clinica: 434, acidente_veicular: 380, incendio: 100 },
  { date: "2024-06-27", clinica: 448, acidente_veicular: 490, incendio: 100 },
  { date: "2024-06-28", clinica: 149, acidente_veicular: 200, incendio: 100 },
  { date: "2024-06-29", clinica: 103, acidente_veicular: 160, incendio: 100 },
  { date: "2024-06-30", clinica: 446, acidente_veicular: 400, incendio: 100 },
];

const chartConfig = {
  ocorrencias: {
    label: "Ocorrências",
  },
  clinica: {
    label: "Clínica",
    color: "hsl(var(--chart-1))",
  },
  acidente_veicular: {
    label: "Acidente Veicular",
    color: "hsl(var(--chart-2))",
  },

  incendio: {
    label: "Incêndio",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Ocorrências</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillClinica" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clinica)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-clinica)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillAcidente_veicular"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-acidente_veicular)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-acidente_veicular)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillIncendio" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-incendio)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-incendio)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="clinica"
              type="natural"
              fill="url(#fillClinica)"
              stroke="var(--color-clinica)"
              stackId="a"
            />
            <Area
              dataKey="acidente_veicular"
              type="natural"
              fill="url(#fillAcidente_veicular)"
              stroke="var(--color-acidente_veicular)"
              stackId="a"
            />
            <Area
              dataKey="incendio"
              type="natural"
              fill="url(#fillIncendio)"
              stroke="var(--color-incendio)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
