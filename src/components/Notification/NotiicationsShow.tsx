import Link from "next/link";
import React, { useTransition, type ReactElement } from "react";
import { LuBell, LuBellRing, LuCheck, LuTrash2 } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/stores/user/useNotificationStore";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import NotificationToggle from "./NotificationToggle";
import LoadingPage from "../Loadings/LoadingPage";
import { useSession } from "next-auth/react";
import { DeleteAllNotificationUser } from "@/lib/DeleteAllNotificationUser";
import { DeleteNotificationUser } from "@/lib/DeleteNotificationUser";
import moment from "moment";
import { Badge } from "@/ui/badge";

type NotificationProps = {
  className?: string;
} & React.ComponentProps<typeof Card>;

export const NotificationsShow = ({
  className,
}: NotificationProps): ReactElement => {
  const notifications = useNotificationStore.getState()?.state?.notification;
  const { removeById, setAll } = useNotificationStore.getState().actions;
  const [pending, startTransition] = useTransition();
  const { data: session } = useSession();

  const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    startTransition(async () => {
      const resp = await DeleteNotificationUser(
        "general-exchange",
        session?.id ?? "",
        id,
      );
      if (resp.code === 200) {
        // router.refresh();
      }
      removeById(id);
    });
  };

  const handleDeleteAllNotification = async (e: React.MouseEvent) => {
    e.stopPropagation();

    startTransition(async () => {
      const resp = await DeleteAllNotificationUser(
        "general",
        "general-exchange",
        session?.id ?? "",
      );
      if (resp.code !== 200) {
      }
      setAll([]);
    });
  };

  const notificationsOrdened = notifications.sort((a, b) => {
    const dataA = moment(a.date, "DD/MM/YYYY HH:mm:ss");
    const dataB = moment(b.date, "DD/MM/YYYY HH:mm:ss");

    return dataB.valueOf() - dataA.valueOf();
  });

  return (
    <>
      <LoadingPage pending={pending} />

      <DropdownMenu>
        {/* <AllowCookie /> */}
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "group relative m-0 h-12 w-12 rounded-full border border-foreground/25 p-0 transition delay-150 duration-300 ease-in-out hover:cursor-pointer hover:bg-foreground/10 md:flex md:h-11 md:w-11",
              className,
            )}
          >
            {notificationsOrdened && notificationsOrdened?.length > 0 && (
              <div className="absolute -right-1 top-0 z-10 m-0 flex h-4 min-w-4 animate-bounce items-center justify-center rounded-full bg-primary p-0 text-[.750rem] font-bold text-foreground">
                <span className="ml-1 flex items-center justify-center px-[1px]">
                  {notificationsOrdened?.length > 9
                    ? "9+"
                    : notificationsOrdened?.length}
                </span>
              </div>
            )}
            <LuBell
              size={28}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition delay-150 duration-300 ease-in-out group-hover:text-foreground/60"
            />
          </div>
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
                      {notificationsOrdened?.length}
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
                    {notificationsOrdened?.map((notification, indexNoti) => (
                      <div
                        key={indexNoti}
                        className="relative my-1 rounded-md border border-foreground/15"
                      >
                        <Link passHref href={notification?.url}>
                          <div className="animate trasnsition group grid grid-cols-[25px_1fr] items-center justify-center rounded-2xl p-4 duration-300 hover:bg-background/90">
                            <span className="flex h-2 w-2 rounded-full bg-primary group-hover:bg-foreground" />
                            <div className="flex w-full flex-col items-center justify-center gap-1">
                              <p className="mb-2 text-sm font-medium leading-none">
                                {notification?.title}
                              </p>
                              <p className="text-sm text-muted-foreground group-hover:text-foreground">
                                {notification?.message}
                              </p>
                              <Badge
                                variant="outline"
                                className="m-0 self-end px-2 text-[.650rem] text-muted-foreground"
                              >
                                {notification?.date}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                        <div
                          className="absolute right-2 top-2 cursor-pointer hover:text-primary"
                          onClick={async (e) =>
                            handleDeleteNotification(
                              notification?.id_message,
                              e,
                            )
                          }
                        >
                          <LuTrash2 />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {notificationsOrdened !== undefined &&
                  notificationsOrdened?.length > 0 && (
                    <CardFooter>
                      <Button
                        onClick={async (e) => handleDeleteAllNotification(e)}
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
};
