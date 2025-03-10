import { type UserNotification } from "@/types/index";
import { create } from "zustand";

interface ActionsProps {
  add: (notification: UserNotification[]) => void;
}

interface UserNotificationStore {
  state: { notifications: UserNotification[] };
  actions: ActionsProps;
}

export const useNotificationStore = create<UserNotificationStore>()((set) => {
  return {
    state: {
      notifications: [] as UserNotification[],
    },
    actions: {
      add: (notification: UserNotification[]) => {
        set((state): { state: { notifications: UserNotification[] } } => ({
          state: {
            notifications: [...state.state.notifications, ...notification],
          },
        }));
      },
    },
  };
});
