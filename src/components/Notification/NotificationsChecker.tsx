"use client";

import React, { useEffect, useTransition } from "react";
import { GetUserNotification } from "@/lib/GetNotificationUser";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { LuBell, LuBellRing, LuCheck, LuTrash2 } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getNotificationPermission } from "@/functions/notificationSettings";
import NotificationToggle from "@/components/Notification/NotificationToggle";
import { ResponseApi, UserNotification } from "@/types/index";
import { DeleteNotificationUser } from "@/lib/DeleteNotificationUser";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { DeleteAllNotificationUser } from "@/lib/DeleteAllNotificationUser";

export default function NotificationsChecker() {
  const { data: session } = useSession();
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = React.useState(pathname);
  const [notifications, setNotifications] = React.useState<
    ResponseApi<UserNotification[]>
  >({} as ResponseApi<UserNotification[]>);
  const router = useRouter();
  useEffect(() => {
    if (!getNotificationPermission()) return; // Se notificações estiverem desativadas, não faz nada
    setPreviousPathname(pathname);

    if (pathname === previousPathname) {
      const fetchData = async () => {
        const resp = await GetUserNotification(
          "general",
          "general-exchange",
          session?.id,
        );
        if (
          resp.data?.length !== 0 &&
          resp.data !== undefined &&
          resp.code !== 400
        ) {
          setNotifications(resp);
        } else {
          setNotifications({} as ResponseApi<UserNotification[]>);
        }
      };
      // const interval = setInterval(fetchData, 30000); // Verifica a cada 10seg
      const interval = setInterval(fetchData, 60000 * 60); // Verifica a cada 1 hora

      return () => clearInterval(interval);
    } else {
      return async () => {
        const resp = await GetUserNotification(
          "general",
          "general-exchange",
          session?.id,
        );
        if (
          resp.data?.length !== 0 &&
          resp.data !== undefined &&
          resp.code !== 400
        ) {
          setNotifications(resp);
        } else {
          setNotifications({} as ResponseApi<UserNotification[]>);
        }
      };
    }
  }, [pathname, previousPathname, session?.id]);

  const handleDeleteNotification = async (id: string) => {
    startTransition(async () => {
      const resp = await DeleteNotificationUser(
        "general-exchange",
        session?.id ?? "",
        id,
      );
      if (resp.code === 200) {
        router.refresh();
      }
    });

    setNotifications((prevState) => {
      return {
        ...prevState,
        data: prevState?.data?.filter((item) => item?.id_message !== id),
      };
    });
    notifications?.data?.map((item) => item?.id_message !== id);
  };

  const handleDeleteAllNotification = async () => {
    startTransition(async () => {
      const resp = await DeleteAllNotificationUser(
        "general",
        "general-exchange",
        session?.id ?? "",
      );
      if (resp.code === 200) {
        router.refresh();
      }
    });
    setNotifications({} as ResponseApi<UserNotification[]>);
  };

  return (
    <>
      <DropdownMenu>
        {/* <AllowCookie /> */}
        <LoadingPage pending={pending} />
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative mr-2 h-12 w-12 rounded-full border hover:border-foreground/20 md:flex md:h-11 md:w-11"
          >
            <div className="relative flex w-14 items-center justify-center">
              {notifications?.data && notifications?.data?.length > 0 && (
                <div className="absolute -right-1 -top-[6px] z-10 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary text-[.625rem] text-foreground md:-right-2 md:-top-2 md:h-4 md:w-4">
                  {notifications?.data?.length}
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
                      {notifications?.data?.length}
                    </strong>{" "}
                    notificações
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
                  </div>
                  <div>
                    {notifications?.data?.map((notification, indexNoti) => (
                      <div
                        key={indexNoti}
                        className="relative my-1 rounded-md border border-foreground/15"
                      >
                        <Link passHref href={notification?.url}>
                          <div className="animate trasnsition group grid grid-cols-[25px_1fr] items-center justify-center rounded-2xl p-4 duration-300 hover:bg-background/90">
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
                        </Link>
                        <div
                          className="absolute right-2 top-2 cursor-pointer hover:text-primary"
                          onClick={async () =>
                            handleDeleteNotification(notification?.id_message)
                          }
                        >
                          <LuTrash2 />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {notifications?.data !== undefined &&
                  notifications?.data?.length > 0 && (
                    <CardFooter>
                      <Button
                        onClick={async () => handleDeleteAllNotification()}
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
