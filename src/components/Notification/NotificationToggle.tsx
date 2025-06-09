"use client";

import { useState } from "react";
import {
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from "@/functions/pushSubscription"; // Certifique-se que o caminho está correto
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/user/useNotificationStore";

export default function NotificationToggle() {
  const [isEnabled, setIsEnabled] = useState(
    getCookie("pushEnabled") === "true",
  );
  const router = useRouter();
  const setAllNotifications = useNotificationStore(
    (state) => state.actions.setAll,
  );
  const handleToggle = async () => {
    try {
      setIsEnabled(!isEnabled);
      setCookie("pushEnabled", !isEnabled, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
      });

      if (getCookie("pushEnabled") === "false") {
        setAllNotifications([]);
      }

      if (!isEnabled) {
        const subscription = await subscribeUserToPush();
        console.log(JSON.stringify(subscription));

        if (subscription) {
          setCookie("subscription", JSON.stringify(subscription)); // Stringify a subscrição
          toast({
            variant: "success",
            title: "Você ativou as notificações",
            description: "Notificações ativadas. 🚀 ",
          });
        } else {
          deleteCookie("subscription");

          toast({
            variant: "danger",
            title: "Você desativou as notificações",
            description: "Notificações desativadas. ",
          });
          // subscribeUserToPush já deve ter lidado com o toast de erro/aviso
        }
      }

      if (isEnabled) {
        const unsubscribed = await unsubscribeUserFromPush();
        if (unsubscribed) {
          deleteCookie("subscription");
          toast({
            variant: "alert", // Usar 'default' ou 'info' para desativação
            title: "Notificações desativadas",
            description: "Você não receberá mais notificações push. 😢",
          });
        } else {
          // unsubscribeUserFromPush já deve ter lidado com o toast de erro
          // Se a inscrição falhar, o estado isEnabled não deve mudar
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
      // Considerar reverter o estado visual de isEnabled se a operação falhou
      // e o estado mudou otimisticamente.
    } finally {
      router.refresh();
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
          // Impede que o clique na label propague para o DropdownMenuItem,
          // evitando que o menu feche.
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
