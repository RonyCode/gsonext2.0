'use client';

import React, {useEffect} from 'react';
import {GetUserNotification} from "@/functions/GetNotificationUser";
import {useSession} from "next-auth/react";
import {useNotificationStore} from "@/stores/user/UserNotification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import {Button} from "@/ui/button";
import {LuBell, LuBellRing, LuCheck} from "react-icons/lu";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/ui/card";
import {Switch} from "@/ui/switch";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getNotificationPermission} from "@/functions/notificationSettings";
import NotificationToggle from "@/components/NotificationToggle";

export default function NotificationsChecker() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!getNotificationPermission()) return; // Se notificações estiverem desativadas, não faz nada

    const fetchData = async () => {
    const resp =  await GetUserNotification("auth", "user_logged", session?.id_message)
      if (resp.messages?.length !== 0 && resp.code !== 400) {
        useNotificationStore.getState().actions.add(resp)
      }
    };

    const interval = setInterval(fetchData, 10000 ); // Verifica a cada 5min
    // const interval = setInterval(fetchData, 60000 * 5); // Verifica a cada 5min





    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmontar
  }, [ session?.id_message]);


  const notificationsStore = useNotificationStore.getState().state.notification?.messages
  console.log(notificationsStore)
  return (
      <>
        <DropdownMenu>
          {/* <AllowCookie /> */}

          <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="relative mr-2 h-10 w-10 rounded-full border hover:border-foreground/20 md:flex lg:h-12 lg:w-12"
            >
              <div className="relative flex w-14 items-center justify-center">
                {
                    notificationsStore?.length > 0 && (
                        <div className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[.725rem] text-foreground md:h-[17px] md:w-[17px]">
                          {
                            notificationsStore?.length
                          }
                        </div>
                    )
                }
                <LuBell size={24} style={{ zIndex: 0 }} />
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
                      <strong className="font-extrabold text-foreground">
                        {" "}
                        {
                          notificationsStore?.length
                        }
                      </strong>{" "}
                      notificações novas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid max-h-[calc(100vh_-_15rem)] w-96 overflow-y-scroll">
                    <div className="flex max-h-[100px] items-center space-x-4 rounded-md border p-4">
                      <LuBellRing />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Alerta de notificatções
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Aceitar notificações neste dispositivo.
                        </p>
                      </div>
                      <NotificationToggle  />

                      {/*<Switch*/}
                      {/*    onClick={async () => {*/}
                      {/*      await Notification.requestPermission();*/}
                      {/*    }}*/}
                      {/*    checked={<NotificationToggle onToggle={setNotificationsEnabled} />*/}
                      {/*    }*/}
                      {/*/>*/}
                    </div>
                    <div>
                      {notificationsStore?.map(
                              (notification, indexNoti) => (
                                  <Link
                                      passHref
                                      key={indexNoti}
                                      href={notification?.url}
                                      className="-mx-1 my-1 h-px bg-muted"
                                      onClick={async () => {
                                        notificationsStore?.forEach(
                                            (item, index) => {
                                              if (index === indexNoti) {
                                                if (index > -1) {
                                                  notificationsStore?.splice(
                                                      index,
                                                      1,
                                                  );
                                                }
                                              }
                                              console.log(notification);
                                            },
                                        );
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
                              ),
                          )}
                    </div>
                  </CardContent>

                  {
                      notificationsStore?.length > 0 && (
                          <CardFooter>
                            <Button
                                onClick={() => {
                                  useNotificationStore.getState().actions.add({
                                    messages: [],
                                    id: "",
                                    status: "",
                                    title: "",
                                    type: "",
                                    qtd: 0,
                                    code: 0,
                                  });
                                  router.refresh();
                                }}
                                className="w-full"
                            >
                              <LuCheck className="mr-2 h-4 w-4" /> Marcar todas como
                              lidas
                            </Button>
                          </CardFooter>
                      )
                  }
                </Card>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>

  );
}
