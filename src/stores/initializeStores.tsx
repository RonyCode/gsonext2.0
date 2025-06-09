import React from "react";

import { stateStore } from "./Address/stateStore";
import StateStoreInitialize from "./Address/StateStoreInitialize";
import {
  type AddressProps,
  UserNotification,
  type UserType,
} from "@/types/index";
import { useNotificationStore } from "./user/useNotificationStore";
import UserNotifcationStoreInitialize from "@/stores/user/userNotifcationStoreInitialize";

const InitializeStores = () => {
  const dataStates: AddressProps[] = stateStore.getState().states;
  const dataNotification: UserNotification[] =
    useNotificationStore.getState().state.notification;

  return (
    <>
      <StateStoreInitialize states={dataStates} />
      <UserNotifcationStoreInitialize userNotification={dataNotification} />
    </>
  );
};

export default InitializeStores;
