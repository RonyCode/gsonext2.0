import { type UserNotification } from "@/types/index";
import { create } from "zustand";

interface ActionsProps {
  add: (newNotifications: UserNotification[]) => void; // Parâmetro renomeado para clareza
  removeById: (id_message: string) => void; // Nova ação para remover
  setAll: (notifications: UserNotification[]) => void; // Nova ação para definir todas as notificações
}

interface UserNotificationStore {
  state: { notification: UserNotification[] };
  actions: ActionsProps;
}

export const useNotificationStore = create<UserNotificationStore>()((set) => {
  return {
    state: {
      notification: [],
    },
    actions: {
      // Ação para definir/substituir todas as notificações
      setAll: (notifications: UserNotification[]) => {
        set((store) => ({
          ...store,
          state: {
            ...store.state,
            notification: notifications,
          },
        }));
      },
      // Ação 'add' corrigida para concatenar os novos items ao array existente
      add: (newNotifications: UserNotification[]) => {
        set((store) => ({
          ...store,
          state: {
            ...store.state,
            notification: [...store.state.notification, ...newNotifications],
          },
        }));
      },
      // Nova ação para remover uma notificação pelo id_message
      removeById: (id_message_to_remove: string) => {
        set((store) => ({
          ...store,
          state: {
            ...store.state,
            notification: store.state.notification.filter(
              (item) => item.id_message !== id_message_to_remove,
            ),
          },
        }));
      },
    },
  };
});
