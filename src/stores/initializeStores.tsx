import React from 'react'

import { stateStore } from './Address/stateStore'
import StateStoreInitialize from './Address/StateStoreInitialize'
import UserErrorRegisterInitializeStore from './user/UserErrorRegisterInitializeStore'
import { userErrorRegisterStore } from './user/userErrorRegisterStore'
import { useUserStore } from './user/userStore'
import UserStoreInitialize from './user/userStoreInitialize'
import { type AddressProps, type UserType } from '@/types/index'

const InitializeStores = () => {
  const dataUserErro: UserType = userErrorRegisterStore.getState().user
  const dataStates: AddressProps[] = stateStore.getState().states
  const dataUser: UserType = useUserStore.getState().state.user

  return (
    <>
      <UserErrorRegisterInitializeStore userError={dataUserErro} />
      <StateStoreInitialize states={dataStates} />
      <UserStoreInitialize user={dataUser} />
      {/* <OrganizacaoStoreInitialize corporacao={dataOrganizacao} /> */}
    </>
  )
}

export default InitializeStores
