"use client";

import React, { useEffect } from "react";
import { GetUserNotification } from "@/functions/GetNotificationUser";
import { useSession } from "next-auth/react";
import { useNotificationStore } from "@/stores/user/UserNotification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { LuBell, LuBellRing, LuCheck } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getNotificationPermission } from "@/functions/notificationSettings";
import NotificationToggle from "@/components/Notification/NotificationToggle";
import { UserNotification } from "@/types/index";

export default function NotificationsChecker() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = React.useState(
    [] as UserNotification[],
  );
  const router = useRouter();
  useEffect(() => {
    if (!getNotificationPermission()) return; // Se notificações estiverem desativadas, não faz nada

    const fetchData = async () => {
      const resp = await GetUserNotification(
        "general",
        "general-exchange",
        "user." + session?.id,
      );
      if (
        resp.data?.length !== 0 &&
        resp.data !== undefined &&
        resp.code !== 400
      ) {
        setNotifications(resp?.data);
      }
    };

    const interval = setInterval(fetchData, 10000); // Verifica a cada 10seg
    // const interval = setInterval(fetchData, 60000 * 60); // Verifica a cada 1 hora

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmontar
  }, [session?.id, session?.id_message]);

  return (
    <>
      <DropdownMenu>
        {/* <AllowCookie /> */}

        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative mr-2 h-12 w-12 rounded-full border hover:border-foreground/20 md:flex md:h-11 md:w-11"
          >
            <div className="relative flex w-14 items-center justify-center">
              {notifications?.length > 0 && (
                <div className="absolute -right-1 -top-[6px] z-10 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary text-[.625rem] text-foreground md:-right-2 md:-top-2 md:h-4 md:w-4">
                  {notifications?.length}
                </div>
              )}
              <LuBell />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full md:w-96"
          align="center"
          forceMount
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="h-full">
              <Card className="w-full md:w-[380px]">
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Você tem{" "}
                    <strong className="text-sm font-extrabold text-foreground">
                      {" "}
                      {notifications?.length}
                    </strong>{" "}
                    notificações novas
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid max-h-[calc(100vh_-_15rem)] w-96 overflow-y-scroll">
                  <div className="flex max-h-[100px] items-center space-x-4 rounded-md border p-4">
                    <LuBellRing />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Alerta de notificações
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Aceitar notificações neste dispositivo.
                      </p>
                    </div>
                    <NotificationToggle />

                    {/*<Switch*/}
                    {/*  onClick={async () => {*/}
                    {/*    await Notification.requestPermission();*/}
                    {/*  }}*/}
                    {/*  checked={getNotificationPermission()}*/}
                    {/*/>*/}
                  </div>
                  <div>
                    {notifications?.map((notification, indexNoti) => (
                      <Link
                        passHref
                        key={indexNoti}
                        href={notification?.url}
                        className="-mx-1 my-1 h-px bg-muted"
                        onClick={async () => {
                          notifications?.forEach((item, index) => {
                            if (index === indexNoti) {
                              if (index > -1) {
                                notifications?.splice(index, 1);
                              }
                            }
                          });
                        }}
                      >
                        <div className="animate trasnsition group grid grid-cols-[25px_1fr] items-center justify-center rounded-2xl p-4 duration-300 last:mb-0 last:pb-0 hover:bg-background/90">
                          <span className="flex h-2 w-2 rounded-full bg-primary group-hover:bg-foreground" />
                          <div>
                            <p className="mb-2 text-sm font-medium leading-none">
                              {notification?.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {notification?.message}
                            </p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                      </Link>
                    ))}
                  </div>
                </CardContent>

                {notifications?.length > 0 && (
                  <CardFooter>
                    <Button
                      onClick={() => {
                        useNotificationStore.getState().actions.add([]);
                        router.refresh();
                      }}
                      className="w-full"
                    >
                      <LuCheck className="mr-2 h-4 w-4" /> Marcar todas como
                      lidas
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
