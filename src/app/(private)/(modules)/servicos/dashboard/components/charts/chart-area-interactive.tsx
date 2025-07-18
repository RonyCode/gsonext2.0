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
const chartData = [
  {
    date: "2024-04-01",
    clinica: 222,
    acidente_veicular: 150,
    incendio: 100,
    afogamento: 30,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-04-02",
    clinica: 97,
    acidente_veicular: 180,
    incendio: 150,
    afogamento: 25,
    queda: 15,
    trote: 5,
  },
  {
    date: "2024-04-03",
    clinica: 167,
    acidente_veicular: 120,
    incendio: 132,
    afogamento: 40,
    queda: 30,
    trote: 20,
  },
  {
    date: "2024-04-04",
    clinica: 242,
    acidente_veicular: 260,
    incendio: 120,
    afogamento: 50,
    queda: 40,
    trote: 30,
  },
  {
    date: "2024-04-05",
    clinica: 373,
    acidente_veicular: 290,
    incendio: 180,
    afogamento: 60,
    queda: 50,
    trote: 40,
  },
  {
    date: "2024-04-06",
    clinica: 301,
    acidente_veicular: 340,
    incendio: 34,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-04-07",
    clinica: 245,
    acidente_veicular: 180,
    incendio: 65,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-04-08",
    clinica: 409,
    acidente_veicular: 320,
    incendio: 113,
    afogamento: 30,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-04-09",
    clinica: 59,
    acidente_veicular: 110,
    incendio: 53,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-04-10",
    clinica: 261,
    acidente_veicular: 190,
    incendio: 67,
    afogamento: 15,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-04-11",
    clinica: 327,
    acidente_veicular: 350,
    incendio: 88,
    afogamento: 20,
    queda: 15,
    trote: 7,
  },
  {
    date: "2024-04-12",
    clinica: 292,
    acidente_veicular: 210,
    incendio: 232,
    afogamento: 50,
    queda: 30,
    trote: 15,
  },
  {
    date: "2024-04-13",
    clinica: 342,
    acidente_veicular: 380,
    incendio: 343,
    afogamento: 70,
    queda: 40,
    trote: 20,
  },
  {
    date: "2024-04-14",
    clinica: 137,
    acidente_veicular: 220,
    incendio: 176,
    afogamento: 30,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-04-15",
    clinica: 120,
    acidente_veicular: 170,
    incendio: 100,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-04-16",
    clinica: 138,
    acidente_veicular: 190,
    incendio: 21,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-04-17",
    clinica: 446,
    acidente_veicular: 360,
    incendio: 54,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-04-18",
    clinica: 364,
    acidente_veicular: 410,
    incendio: 32,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-04-19",
    clinica: 243,
    acidente_veicular: 180,
    incendio: 65,
    afogamento: 15,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-04-20",
    clinica: 89,
    acidente_veicular: 150,
    incendio: 76,
    afogamento: 20,
    queda: 15,
    trote: 7,
  },
  {
    date: "2024-04-21",
    clinica: 137,
    acidente_veicular: 200,
    incendio: 98,
    afogamento: 25,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-04-22",
    clinica: 224,
    acidente_veicular: 170,
    incendio: 9,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-04-23",
    clinica: 138,
    acidente_veicular: 230,
    incendio: 122,
    afogamento: 30,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-04-24",
    clinica: 387,
    acidente_veicular: 290,
    incendio: 133,
    afogamento: 40,
    queda: 30,
    trote: 20,
  },
  {
    date: "2024-04-25",
    clinica: 215,
    acidente_veicular: 250,
    incendio: 144,
    afogamento: 50,
    queda: 40,
    trote: 30,
  },
  {
    date: "2024-04-26",
    clinica: 75,
    acidente_veicular: 130,
    incendio: 155,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-04-27",
    clinica: 383,
    acidente_veicular: 420,
    incendio: 166,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-04-28",
    clinica: 122,
    acidente_veicular: 180,
    incendio: 177,
    afogamento: 30,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-04-29",
    clinica: 315,
    acidente_veicular: 240,
    incendio: 188,
    afogamento: 40,
    queda: 30,
    trote: 20,
  },
  {
    date: "2024-04-30",
    clinica: 454,
    acidente_veicular: 380,
    incendio: 199,
    afogamento: 50,
    queda: 40,
    trote: 30,
  },
  {
    date: "2024-05-01",
    clinica: 165,
    acidente_veicular: 220,
    incendio: 21,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-02",
    clinica: 293,
    acidente_veicular: 310,
    incendio: 31,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-03",
    clinica: 247,
    acidente_veicular: 190,
    incendio: 14,
    afogamento: 3,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-04",
    clinica: 385,
    acidente_veicular: 420,
    incendio: 41,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-05",
    clinica: 481,
    acidente_veicular: 390,
    incendio: 51,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-05-06",
    clinica: 498,
    acidente_veicular: 520,
    incendio: 662,
    afogamento: 100,
    queda: 50,
    trote: 25,
  },
  {
    date: "2024-05-07",
    clinica: 388,
    acidente_veicular: 300,
    incendio: 61,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-08",
    clinica: 149,
    acidente_veicular: 210,
    incendio: 200,
    afogamento: 50,
    queda: 30,
    trote: 15,
  },
  {
    date: "2024-05-09",
    clinica: 227,
    acidente_veicular: 180,
    incendio: 221,
    afogamento: 50,
    queda: 30,
    trote: 15,
  },
  {
    date: "2024-05-10",
    clinica: 293,
    acidente_veicular: 330,
    incendio: 222,
    afogamento: 60,
    queda: 40,
    trote: 20,
  },
  {
    date: "2024-05-11",
    clinica: 335,
    acidente_veicular: 270,
    incendio: 223,
    afogamento: 70,
    queda: 50,
    trote: 25,
  },
  {
    date: "2024-05-12",
    clinica: 197,
    acidente_veicular: 240,
    incendio: 40,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-13",
    clinica: 197,
    acidente_veicular: 160,
    incendio: 240,
    afogamento: 30,
    queda: 20,
    trote: 10,
  },
  {
    date: "2024-05-14",
    clinica: 448,
    acidente_veicular: 490,
    incendio: 260,
    afogamento: 60,
    queda: 40,
    trote: 20,
  },
  {
    date: "2024-05-15",
    clinica: 473,
    acidente_veicular: 380,
    incendio: 290,
    afogamento: 70,
    queda: 50,
    trote: 25,
  },
  {
    date: "2024-05-16",
    clinica: 338,
    acidente_veicular: 400,
    incendio: 42,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-17",
    clinica: 499,
    acidente_veicular: 420,
    incendio: 52,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-05-18",
    clinica: 315,
    acidente_veicular: 350,
    incendio: 27,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-19",
    clinica: 235,
    acidente_veicular: 180,
    incendio: 75,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-20",
    clinica: 177,
    acidente_veicular: 230,
    incendio: 90,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-05-21",
    clinica: 82,
    acidente_veicular: 140,
    incendio: 80,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-22",
    clinica: 81,
    acidente_veicular: 120,
    incendio: 70,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-23",
    clinica: 252,
    acidente_veicular: 290,
    incendio: 60,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-05-24",
    clinica: 294,
    acidente_veicular: 220,
    incendio: 50,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-25",
    clinica: 201,
    acidente_veicular: 250,
    incendio: 40,
    afogamento: 3,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-05-26",
    clinica: 213,
    acidente_veicular: 170,
    incendio: 30,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-05-27",
    clinica: 420,
    acidente_veicular: 460,
    incendio: 32,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-28",
    clinica: 233,
    acidente_veicular: 190,
    incendio: 100,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-05-29",
    clinica: 78,
    acidente_veicular: 130,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-05-30",
    clinica: 340,
    acidente_veicular: 280,
    incendio: 100,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-05-31",
    clinica: 178,
    acidente_veicular: 230,
    incendio: 24,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-01",
    clinica: 178,
    acidente_veicular: 200,
    incendio: 25,
    afogamento: 3,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-02",
    clinica: 470,
    acidente_veicular: 410,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-03",
    clinica: 103,
    acidente_veicular: 160,
    incendio: 66,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-04",
    clinica: 439,
    acidente_veicular: 380,
    incendio: 100,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-06-05",
    clinica: 88,
    acidente_veicular: 140,
    incendio: 76,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-06",
    clinica: 294,
    acidente_veicular: 250,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-07",
    clinica: 323,
    acidente_veicular: 370,
    incendio: 22,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-08",
    clinica: 385,
    acidente_veicular: 320,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-09",
    clinica: 438,
    acidente_veicular: 480,
    incendio: 141,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-06-10",
    clinica: 155,
    acidente_veicular: 200,
    incendio: 15,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-11",
    clinica: 92,
    acidente_veicular: 150,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-12",
    clinica: 492,
    acidente_veicular: 420,
    incendio: 145,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-13",
    clinica: 81,
    acidente_veicular: 130,
    incendio: 100,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-14",
    clinica: 426,
    acidente_veicular: 380,
    incendio: 66,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-15",
    clinica: 307,
    acidente_veicular: 350,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-16",
    clinica: 371,
    acidente_veicular: 310,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-17",
    clinica: 475,
    acidente_veicular: 520,
    incendio: 100,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-06-18",
    clinica: 107,
    acidente_veicular: 170,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-19",
    clinica: 341,
    acidente_veicular: 290,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-20",
    clinica: 408,
    acidente_veicular: 450,
    incendio: 100,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-06-21",
    clinica: 169,
    acidente_veicular: 210,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-22",
    clinica: 317,
    acidente_veicular: 270,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-23",
    clinica: 480,
    acidente_veicular: 530,
    incendio: 100,
    afogamento: 20,
    queda: 10,
    trote: 5,
  },
  {
    date: "2024-06-24",
    clinica: 132,
    acidente_veicular: 180,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-25",
    clinica: 141,
    acidente_veicular: 190,
    incendio: 100,
    afogamento: 7,
    queda: 3,
    trote: 1,
  },
  {
    date: "2024-06-26",
    clinica: 434,
    acidente_veicular: 380,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
  {
    date: "2024-06-27",
    clinica: 448,
    acidente_veicular: 490,
    incendio: 100,
    afogamento: 15,
    queda: 7,
    trote: 3,
  },
  {
    date: "2024-06-28",
    clinica: 149,
    acidente_veicular: 200,
    incendio: 100,
    afogamento: 5,
    queda: 2,
    trote: 1,
  },
  {
    date: "2024-06-29",
    clinica: 103,
    acidente_veicular: 160,
    incendio: 100,
    afogamento: 2,
    queda: 1,
    trote: 0,
  },
  {
    date: "2024-06-30",
    clinica: 446,
    acidente_veicular: 400,
    incendio: 100,
    afogamento: 10,
    queda: 5,
    trote: 2,
  },
];

const chartConfig = {
  ocorrencias: {
    label: "Ocorrências",
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
  afogamento: {
    label: "Afogamento",
    color: "hsl(var(--chart-4))",
  },
  queda: {
    label: "Queda",
    color: "hsl(var(--chart-5))",
  },
  trote: {
    label: "Trote",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");
  const [typeOcorrence, setTypeOcorrence] = React.useState([]);

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

  const teet = filteredData?.filter((item) => {
    Object.keys(item).some((key) => {
      console.log(typeOcorrence.some((type) => type === key));
    });
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
          <ToggleGroup
            type="multiple"
            onValueChange={setTypeOcorrence}
            variant="outline"
            className="@[767px]/card:flex"
            aria-pressed="true"
          >
            <ToggleGroupItem
              value="clinica"
              aria-label="clinica"
              className="h-8 px-2.5"
            >
              Clínica
            </ToggleGroupItem>
            <ToggleGroupItem
              value="acidente_veicular"
              aria-label="acidente_veicular"
              className="h-8 px-2.5"
            >
              Acid. Veicular
            </ToggleGroupItem>
            <ToggleGroupItem
              value="incendio"
              aria-label="incendio"
              className="h-8 px-2.5"
            >
              Incêndio{" "}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="afogamento"
              aria-label="afogamento"
              className="h-8 px-2.5"
            >
              Afogamento
            </ToggleGroupItem>
            <ToggleGroupItem
              value="queda"
              aria-label="queda"
              className="h-8 px-2.5"
            >
              Queda
            </ToggleGroupItem>
            <ToggleGroupItem
              value="trote"
              aria-label="trote"
              className="h-8 px-2.5"
            >
              Trote
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

          {/*<Select value={typeOcorrence} onValueChange={setTypeOcorrence}>*/}
          {/*  <SelectTrigger*/}
          {/*    className="@[767px]/card:hidden flex w-40"*/}
          {/*    aria-label="Select a value"*/}
          {/*  >*/}
          {/*    <SelectValue placeholder="Last 3 months" />*/}
          {/*  </SelectTrigger>*/}
          {/*  <SelectContent className="rounded-xl">*/}
          {/*    <SelectItem*/}
          {/*      value={chartConfig?.clinica?.label}*/}
          {/*      className="rounded-lg"*/}
          {/*    >*/}
          {/*      {chartConfig?.clinica?.label}*/}
          {/*    </SelectItem>*/}
          {/*    <SelectItem*/}
          {/*      value={chartConfig?.acidente_veicular?.label}*/}
          {/*      className="rounded-lg"*/}
          {/*    >*/}
          {/*      {chartConfig?.acidente_veicular?.label}*/}
          {/*    </SelectItem>*/}
          {/*    <SelectItem*/}
          {/*      value={chartConfig?.incendio?.label}*/}
          {/*      className="rounded-lg"*/}
          {/*    >*/}
          {/*      {chartConfig?.incendio?.label}*/}
          {/*    </SelectItem>*/}
          {/*    <SelectItem*/}
          {/*      value={chartConfig?.afogamento?.label}*/}
          {/*      className="rounded-lg"*/}
          {/*    >*/}
          {/*      {chartConfig?.afogamento?.label}*/}
          {/*    </SelectItem>*/}
          {/*    <SelectItem*/}
          {/*      value={chartConfig?.queda?.label}*/}
          {/*      className="rounded-lg"*/}
          {/*    >*/}
          {/*      {chartConfig?.queda?.label}*/}
          {/*    </SelectItem>*/}
          {/*    <SelectItem*/}
          {/*      value={chartConfig?.trote?.label}*/}
          {/*      className="rounded-lg"*/}
          {/*    >*/}
          {/*      {chartConfig?.trote?.label}*/}
          {/*    </SelectItem>*/}
          {/*  </SelectContent>*/}
          {/*</Select>*/}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            data={filteredData}
            accessibilityLayer={true}
            margin={{
              left: -20,
              right: 12,
            }}
          >
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
              <linearGradient id="fillAfogamento" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-afogamento)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-afogamento)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillQueda" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-queda)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-queda)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTrote" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-trote)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-trote)"
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
            <Area
              dataKey="afogamento"
              type="natural"
              fill="url(#fillAfogamento)"
              stroke="var(--color-afogamento)"
              stackId="a"
            />
            <Area
              dataKey="queda"
              type="natural"
              fill="url(#fillQueda)"
              stroke="var(--color-queda)"
              stackId="a"
            />
            <Area
              dataKey="trote"
              type="natural"
              fill="url(#fillTrote)"
              stroke="var(--color-trote)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
