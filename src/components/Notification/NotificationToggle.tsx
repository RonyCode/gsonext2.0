"use client";

import { useState, useTransition } from "react";
import {
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from "@/functions/pushSubscription";
import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/user/useNotificationStore";
import SaveUserAction from "@/actions/user/SaveUserAction";
import LoadingPage from "@/components/Loadings/LoadingPage";
import { useSession } from "next-auth/react";

export default function NotificationToggle() {
  const { data: session, update } = useSession();
  const [isEnabled, setIsEnabled] = useState(
    session?.is_notification_enabled ?? false,
  );
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const setAllNotifications = useNotificationStore(
    (state) => state.actions.setAll,
  );

  const handleToggle = async () => {
    try {
      setIsEnabled(!isEnabled);

      if (!isEnabled) {
        setAllNotifications([]);
      }

      if (!isEnabled) {
        const subscription = await subscribeUserToPush();
        if (session?.id) {
          if (subscription) {
            startTransition(async () => {
              const payload = {
                id: session?.id,
                is_notification_enabled: true,
              };
              const data = await SaveUserAction({ ...payload });
              if (data.code === 202) {
                await update({
                  ...session,
                  is_notification_enabled: true,
                });
                setCookie("subscription", JSON.stringify(subscription));
                toast({
                  variant: "success",
                  title: "Você ativou as notificações",
                  description: "Notificações ativadas. 🚀 ",
                });
              }
            });
          } else {
            deleteCookie("subscription");
            toast({
              variant: "danger",
              title: "Você desativou as notificações",
              description: "Notificações desativadas. ",
            });
          }
        }
      }

      if (isEnabled) {
        const unsubscribed = await unsubscribeUserFromPush();
        if (unsubscribed) {
          startTransition(async () => {
            const payload = {
              id: session?.id,
              is_notification_enabled: false,
            };
            const data = await SaveUserAction({ ...payload });
            if (data.code === 202) {
              await update({
                ...session,
                is_notification_enabled: false,
              });
              deleteCookie("subscription");
              toast({
                variant: "alert",
                title: "Notificações desativadas",
                description: "Você não receberá mais notificações push. 😢",
              });
            }
          });
        } else {
        }
      }
    } catch (error) {
      console.error("NotificationToggle: Erro em handleToggle:", error);
      toast({
        variant: "danger",
        title: "Erro ao alterar notificações",
        description:
          "Ocorreu um problema ao tentar atualizar suas preferências de notificação.",
      });
    }
  };

  if (
    typeof window !== "undefined" &&
    !("Notification" in window && "PushManager" in window)
  ) {
    return <p>Seu navegador não suporta notificações push.</p>;
  }

  return (
    <div>
      <label
        className="flex cursor-pointer items-center space-x-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input type="checkbox" onChange={handleToggle} className="hidden" />
        <div
          className={`relative flex h-6 w-12 items-center rounded-full p-1 transition-colors duration-300 ${
            isEnabled ? "bg-primary" : "bg-gray-300"
          }`}
        >
          {/* Adicionar um ícone de spinner aqui pode ser uma boa melhoria visual */}
          <div
            className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
              isEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}
