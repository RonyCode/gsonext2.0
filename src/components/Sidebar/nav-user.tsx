"use client";

import {
  BadgeCheck,
  Bell,
  CalendarCheck,
  ChevronsUpDown,
  CreditCard,
  Landmark,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { GetFirstLettersNameUser } from "@/functions/GetFirstLettersNameUser";
import Credentials from "next-auth/providers/credentials";
import { LuCreditCard, LuIdCard, LuTheater, LuWallet } from "react-icons/lu";
import Link from "next/link";
import { deleteCookies } from "@/components/Buttoms/SignOutButton/LogoutAction";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
}: {
  user?: {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
}) {
  const router = useRouter();

  const { isMobile } = useSidebar();
  const nameUser = GetFirstLettersNameUser();
  const handleClick = async (): Promise<void> => {
    await deleteCookies();
    await signOut({
      redirect: false,
    });
    router.push("/");
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                    user?.image !== undefined
                      ? process.env.NEXT_PUBLIC_API_GSO + user?.image
                      : process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                  }
                  alt={"img user"}
                />
                <AvatarFallback className="rounded-lg">
                  {nameUser}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                      user?.image !== undefined
                        ? process.env.NEXT_PUBLIC_API_GSO + user?.image
                        : process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                    }
                    alt={"img user"}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/conta`}>
                <DropdownMenuItem>
                  <LuIdCard />
                  Minha Conta
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/conta/unidade`}>
                <DropdownMenuItem>
                  <Landmark />
                  Minha Unidade
                </DropdownMenuItem>
              </Link>
              <Link href={`/conta/escala`}>
                <DropdownMenuItem>
                  <CalendarCheck />
                  Minha Escala
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
