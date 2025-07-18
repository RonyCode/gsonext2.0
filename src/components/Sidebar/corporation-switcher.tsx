"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IOrganizacaoSchema } from "@/schemas/OrganizacaoSchema";
import { Avatar, AvatarImage } from "@/ui/avatar";
import Link from "next/link";

export function CorporationSwitcher(corp?: { corp: IOrganizacaoSchema }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarGroupLabel>Minha Corporação</SidebarGroupLabel>

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
                      corp?.corp?.image !== undefined
                        ? process.env.NEXT_PUBLIC_API_GSO + corp?.corp?.image
                        : process.env.NEXT_PUBLIC_API_GSO + "/images/img.svg"
                    }
                    alt={"img user"}
                  />
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {corp?.corp?.short_name_corp}
                </span>
                <span className="truncate text-xs">{corp?.corp?.phone}</span>
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
              Corporações
            </DropdownMenuLabel>
            <DropdownMenuItem
              key={corp?.corp?.short_name_corp}
              className="gap-4 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Avatar className="h-8 w-8 gap-2 rounded-lg">
                  <AvatarImage
                    src={
                      process.env.NEXT_PUBLIC_API_GSO !== undefined &&
                      corp?.corp?.image !== undefined
                        ? process.env.NEXT_PUBLIC_API_GSO + corp?.corp?.image
                        : process.env.NEXT_PUBLIC_API_GSO + "/images/avatar.svg"
                    }
                    alt={"img user"}
                  />
                </Avatar>
              </div>
              {corp?.corp?.short_name_corp}
              <DropdownMenuShortcut>⌘{1}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                <Link href={"/servicos/gestor/salvar-organizacao"}>
                  Add Corporação
                </Link>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
