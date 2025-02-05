"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {GetFirstLettersNameUser} from "@/functions/GetFirstLettersNameUser";

export function NavCorp({
                          corp,
                        }: {
  corp?: {
    short_name_corp: string | null | undefined
    name: string| null | undefined
    image: string| null | undefined
  }
}) {
  const {isMobile} = useSidebar()
  const nameUser = GetFirstLettersNameUser()
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
                  <AvatarImage src={
                    process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                    corp?.image !== undefined ?
                        process.env.NEXT_PUBLIC_API_GSO + corp?.image :
                        process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                  } alt={'img user'}/>
                  <AvatarFallback className="rounded-lg">{nameUser}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{corp?.name}</span>
                  <span className="truncate text-xs">{corp?.short_name_corp}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4"/>
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
                    <AvatarImage src={
                      process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                      corp?.image !== undefined ?
                          process.env.NEXT_PUBLIC_API_GSO + corp?.image :
                          process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                    } alt={'img user'}/>
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{corp?.name}</span>
                    <span className="truncate text-xs">{corp?.short_name_corp}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles/>
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck/>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard/>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell/>
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <LogOut/>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
  )
}
