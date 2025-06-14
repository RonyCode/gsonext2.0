"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { type ReactElement, useEffect, useRef, useState } from "react";

import Logo from "@/img/Logo";

import { ModeToggle } from "../Buttoms/ModeTogle";
import { deleteCookies } from "../Buttoms/SignOutButton/LogoutAction";
import { GetFirstLettersNameUser } from "@/functions/GetFirstLettersNameUser";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { getValidImageUrl } from "@/functions/checkImageUrl";
import {
  Building2,
  CalendarCheck,
  CircleHelp,
  DoorOpen,
  Headphones,
  LogOut,
  Megaphone,
  Menu,
  User,
} from "lucide-react";
import { LuComponent } from "react-icons/lu";
import { NotificationsShow } from "@/components/Notification/NotiicationsShow";

export function NavbarMain({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession();

  const [state, setState] = useState(false);
  const router = useRouter();
  const myRef = useRef(null);
  const nameUser = GetFirstLettersNameUser();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Ensure userImage is null if session?.user?.image is undefined or null
    const userImage = session?.image || session?.user?.image;
    const imageUrlPromisse = getValidImageUrl(userImage);
    imageUrlPromisse.then((item) => {
      setImageUrl(item);
    });
    // Use the same expression for the dependency
  }, [session?.image, session?.user?.image]);

  const handleClick = async (): Promise<void> => {
    await deleteCookies();
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  interface MenuTypes {
    title: string;
    icon: ReactElement;
    path: string;
  }
  const pathname = usePathname();

  const menus: MenuTypes[] = [
    {
      title: "Serviços",
      icon: <LuComponent />,
      path: `/servicos`,
    },
    {
      title: "Atendimento",
      icon: <Megaphone />,
      path: "/suporte",
    },
  ];

  return (
    <header
      {...props}
      ref={myRef}
      className={
        "fixed left-0 top-0 z-10 w-screen border-b bg-background/95 text-foreground/70 backdrop-blur " +
        "supports-[backdrop-filter]:bg-background/60 dark:text-foreground/70"
      }
    >
      <div
        className={`fixed h-screen w-screen ${state ? "block" : "hidden"}`}
        onClick={() => {
          setState(false);
        }}
      ></div>
      <nav
        className={cn(
          `${state ? "p-4" : "px-4"} relative mx-auto flex items-center justify-between md:container lg:py-0`,
          className,
        )}
      >
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/" className="hidden md:block">
            <Logo width={100} />
          </Link>
          <div className={`md:hidden ${state ? "hidden" : "block"}`}>
            <button
              className="top-0 rounded-md p-3 outline-none focus:border focus:border-gray-400"
              onClick={() => {
                setState(!state);
              }}
            >
              <Menu />
            </button>
          </div>
        </div>

        <div
          className={`mt-8 flex-1 pb-3 md:mt-0 md:block md:pb-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <Link
            href="/public"
            className="flex w-screen justify-center md:hidden"
          >
            <Logo width={100} />
          </Link>
          <ul className="md:flex md:items-center md:justify-center md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className="text-[#e5e7eb]/60 transition-colors hover:text-[#e5e7eb]/80"
              >
                <div className="flex items-center space-x-1 transition-colors hover:text-primary/80">
                  <Link
                    className="flex items-center justify-center gap-1 text-foreground/60 hover:text-foreground/80 md:space-x-6 md:space-y-0"
                    href={item.path}
                  >
                    <label
                      className={`hover:text-primary/80 ${item.path === pathname ? "text-primary/60" : ""}`}
                    >
                      {item.icon}
                    </label>{" "}
                    {item.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {session?.user != null ? (
          <div
            className={`absolute right-3 flex items-center justify-center md:relative ${
              state ? "flex flex-col-reverse items-stretch gap-2" : "md:flex"
            }`}
          >
            <NotificationsShow className="mr-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full border hover:border-foreground/20 lg:h-12 lg:w-12"
                >
                  <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                    <AvatarImage
                      src={imageUrl ?? ""}
                      alt="@shadcn"
                      style={{ objectFit: "cover" }}
                    />
                    <AvatarFallback>{nameUser}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72" align="center" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center justify-between rounded-[8px] border border-primary/70 px-2">
                    <div className="flex h-14 w-full flex-col items-start justify-center">
                      <p className="text-lg leading-none">{session?.name}</p>
                      <p className="leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                    <ModeToggle />{" "}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link
                    href={`/servicos/usuario/${session?.user?.name + "-" + session?.id}`}
                  >
                    <DropdownMenuItem className="group-hover">
                      Minha Conta
                      <DropdownMenuShortcut className="hover:scale-125">
                        <User style={{ fontSize: "20px" }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/servicos/usuario/${session?.user?.name + "-" + session?.id}/escala`}
                  >
                    <DropdownMenuItem>
                      Minha Escala
                      <DropdownMenuShortcut>
                        <CalendarCheck style={{ fontSize: "20px" }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/servicos/usuario/${session?.user?.name + "-" + session?.id}/unidade`}
                  >
                    <DropdownMenuItem>
                      Minha Unidade
                      <DropdownMenuShortcut>
                        <Building2 size={20} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/suporte`}>
                    <DropdownMenuItem>
                      Suporte
                      <DropdownMenuShortcut>
                        <Headphones style={{ fontSize: "20px" }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>{" "}
                  </Link>

                  <DropdownMenuItem>
                    Ajuda
                    <DropdownMenuShortcut>
                      <CircleHelp style={{ fontSize: "20px" }} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {}
                <DropdownMenuItem onClick={handleClick}>
                  Sair
                  <DropdownMenuShortcut>
                    <LogOut style={{ fontSize: "20px" }} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <p className={"right-5 " + `${state && "hidden"}`}>
            <Link
              href="/auth"
              className="flex items-center space-x-1 text-[#e5e7eb]/60 hover:text-primary/80"
            >
              <DoorOpen />{" "}
              <span className="hidden text-[#e5e7eb]/60 hover:text-[#e5e7eb]/80 md:block">
                Area de acesso
              </span>
            </Link>
          </p>
        )}
      </nav>
    </header>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors " +
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
