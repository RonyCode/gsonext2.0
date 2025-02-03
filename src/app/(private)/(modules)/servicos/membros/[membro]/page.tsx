import { getServerSession } from 'next-auth'

import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Members = async ({ params }: { params: { membro: string } }) => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFounded = data?.find((corp) => corp?.id === session?.id_corporation)
  const memberFOunded = corpFounded?.members?.find(
    (member) => member?.id === params?.membro?.split('-')[1],
  )
  console.log(params?.membro?.split('-')[1])

  return (
    <CardDefault
      title={memberFOunded?.competence + ' - ' + memberFOunded?.name}
      description={memberFOunded?.email ?? ''}
      image={
        process.env.NEXT_PUBLIC_API_GSO && memberFOunded?.image
          ? process.env.NEXT_PUBLIC_API_GSO + memberFOunded?.image
          : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
      }
      imageMobile={
        process.env.NEXT_PUBLIC_API_GSO && memberFOunded?.image
          ? process.env.NEXT_PUBLIC_API_GSO + memberFOunded?.image
          : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
      }
    >
      teste
    </CardDefault>
  )
}
export default Members
