"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {Avatar, AvatarImage} from "@/ui/avatar";
import Link from "next/link";
import {IUnidadeSchema} from "@/schemas/UnidadeSchema";
import {useRouter} from "next/navigation";

type SwitcherComp = {
  companies: Partial<IUnidadeSchema[]>
  setCompSelected: (company: IUnidadeSchema) => void
}

export function CompanySwitcher({companies, setCompSelected}:SwitcherComp) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [activeTeam, setActiveTeam] = React.useState(companies[0])



  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarGroupLabel>Unidade Selecionada</SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                        src={
                          process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                          activeTeam?.image !== undefined ?
                              process.env.NEXT_PUBLIC_API_GSO + activeTeam?.image :
                              process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                        }
                        alt={'img user'}
                    />
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam?.name}
                </span>
                  <span className="truncate text-xs">{activeTeam?.companyAddress?.city}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Unidades
              </DropdownMenuLabel>
              {companies.map((team, index) => (
                  <DropdownMenuItem
                      key={team?.name}
                      onClick={() => {
                        setCompSelected(team ?? {})
                        setActiveTeam(team)
                        router.push('/servicos')
                      }}
                      className="gap-2 p-2"
                  >
                    <div className=" flex size-6 items-center justify-center rounded-sm border">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                            src={
                              process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                              team?.image !== undefined ?
                                  process.env.NEXT_PUBLIC_API_GSO + team.image :
                                  process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                            }
                            alt={'img user'}
                        />
                      </Avatar>
                    </div>
                   <span className='ml-2'> {team?.name}</span>
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  <Link href={'/servicos/gestor/salvar-unidade'}>
                    Add Unidade
                  </Link>
                </div>              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
  )
}
