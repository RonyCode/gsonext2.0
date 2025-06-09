"use client";

import { useNotificationStore } from "./useNotificationStore";
import { type UserNotification } from "@/types/index";

interface AppInitializerProps {
  userNotification: UserNotification[] | null;
}

export default function UserNotifcationStoreInitialize({
  userNotification,
}: AppInitializerProps): null {
  if (userNotification != null) {
    useNotificationStore
      .getState()
      .actions.setAll(userNotification as UserNotification[]);
    return null;
  }
  return null;
}
