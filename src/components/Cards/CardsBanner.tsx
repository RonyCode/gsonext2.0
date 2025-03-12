import React, { type ReactElement } from "react";
import { LuBellRing, LuCheck } from "react-icons/lu";

import { EditPhoto } from "../EditPhoto/EditPhoto";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Switch } from "@/ui/switch";

type CardProps = React.ComponentProps<typeof Card>;

export const CardsBanner = ({
  // eslint-disable-next-line react/prop-types
  className,
  ...props
}: CardProps): ReactElement => {
  const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new notification-view!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ];
  return (
    <>
      <Card className={cn("w-full md:w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Você tem {notifications.length} notificações novas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <LuBellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Alerta de notificatções
              </p>
              <p className="text-sm text-muted-foreground">
                Aceitar notificações neste dispositivo.
              </p>
            </div>
            <EditPhoto />

            <Switch />
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <LuCheck className="mr-2 h-4 w-4" /> Marcar todas como lidas
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
