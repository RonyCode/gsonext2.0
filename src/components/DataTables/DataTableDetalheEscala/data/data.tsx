import {
  LuBookMarked,
  LuClock,
  LuStar,
} from "react-icons/lu";
import { LucideSpellCheck2 } from "lucide-react";

export const periodSchedule = [
  { value: 6, period: "06h:00min", icon: LuClock },
  { value: 8, period: "08h:00min", icon: LuClock },
  { value: 12, period: "12h:00min", icon: LuClock },
  { value: 24, period: "24h:00min", icon: LuClock },
];

export const typesSchedule = [
  { value: 1, name: "NORMAL", icon: LuBookMarked },
  { value: 2, name: "EXTRA", icon: LuStar },
  { value: 3, name: "ORDEM SERVIÇO", icon: LucideSpellCheck2 },
];

export const teamSchedule = [
  { value: 1, name: "ALFA", icon: LuClock },
  { value: 2, name: "BRAVO", icon: LuClock },
  { value: 3, name: "CHARLIE", icon: LuClock },
  { value: 4, name: "DELTA", icon: LuClock },
  { value: 5, name: "EXTRA", icon: LuClock },
];
