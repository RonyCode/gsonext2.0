import { fetchWrapper } from '../../../teste/src/functions/fetch'
import { useUserStore } from '@/stores/user/userStore'
import { type UserType } from '../../../teste/types/index'

export const GetUserById = async (
  id: string | null | undefined,
): Promise<UserType> => {
  const response = await fetchWrapper<UserType>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user-id?id=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response?.account?.cpf != null)
    useUserStore.getState().actions.add(response)
  return response
}
