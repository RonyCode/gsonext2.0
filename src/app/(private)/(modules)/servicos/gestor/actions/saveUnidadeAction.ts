'use server'

import { revalidateTag } from 'next/cache'

import { fetchWrapper } from '../../../../../../../../teste/src/functions/fetch'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type ResponseApi } from '../../../../../../../../teste/types/index'

export async function saveUnidadeAction(
  formData?: Partial<IUnidadeSchema>,
): Promise<ResponseApi<Partial<IUnidadeSchema>>> {
  revalidateTag('unidadesFetch')
  console.log(formData)
  return await fetchWrapper<ResponseApi<Partial<IUnidadeSchema>>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidade-save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      cache: 'no-store',
    },
  )
}
