import { useIsMobile } from "@/hooks/use-mobile";

export function useCheckMobile(): boolean {
  return useIsMobile();
}
