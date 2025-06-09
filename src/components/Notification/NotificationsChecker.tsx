"use client";
import { useEffect } from "react";
import { useNotificationStore } from "@/stores/user/useNotificationStore";
import { useSession } from "next-auth/react";
import { GetUserNotificationAction } from "@/actions/notification/GetUserNotificationAction";
import { UserNotification } from "@/types/index";
import { getCookie } from "cookies-next";

export default function NotificationsChecker() {
  const { data: session } = useSession();
  const setAllNotifications = useNotificationStore(
    (state) => state.actions.setAll,
  );

  const userId = session?.id; // Extract session?.id
  const isPushEnabled = getCookie("pushEnabled"); // Ler o cookie

  useEffect(() => {
    if (userId) {
      if (isPushEnabled === "true") {
        GetUserNotificationAction("general", "general-exchange", userId)
          .then(async (resp) => {
            if (resp.code === 200 && resp.data !== undefined) {
              setAllNotifications(resp?.data as unknown as UserNotification[]);
            } else {
              setAllNotifications([]); // Limpar em caso de erro na API ou dados inválidos
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar notificações:", error);
            setAllNotifications([]); // Limpar em caso de falha na promise
          });
      } else {
        // pushEnabled é false ou não definido, limpar notificações
        setAllNotifications([]);
      }
    } else {
      // Se não houver sessão/ID, limpar as notificações
      setAllNotifications([]);
    }
  }, [userId, setAllNotifications, isPushEnabled]); // Adicionar isPushEnabled quando estiver como variável fora do useEffect

  return <></>; // Este componente não renderiza nada visualmente, apenas verifica as notificações
}
