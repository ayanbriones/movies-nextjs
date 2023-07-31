export const dynamic = 'force-dynamic'

import SubmitButton from '@/app/components/SubmitButton'
import { prisma } from '@/app/db'
import { revalidatePath } from 'next/cache'

async function getData(id: string) {
  const data = await prisma.comment.findMany({
    where: { movieId: id },
    orderBy: { createdAt: 'desc' },
  })
  return data
}

async function postDAta(formData: FormData) {
  'use server'
  const data = await prisma.comment.create({
    data: {
      message: formData.get('message') as string,
      movieId: formData.get('movie-id') as string,
      userName: formData.get('user-name') as string,
    },
  })
  revalidatePath('/movie/[id]')
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  return (
    <section className='rounded-lg border p-3'>
      <h2 className='text-2xl'>Your Opinion</h2>
      <div>
        <form action={postDAta}>
          <textarea
            name='message'
            placeholder='Add your comment...'
            className='w-full border rounded-lg p-2 my-2'
            minLength={5}
            maxLength={300}
            required
          ></textarea>
          <input type='hidden' name='movie-id' value={params.id} />
          <input
            type='text'
            name='user-name'
            placeholder='Your name'
            className='w-full border rounded-lg p-2 my-2'
            minLength={2}
            maxLength={100}
            required
          />
          <SubmitButton />
        </form>
      </div>
      <h2 className='text-lg font-bold mt-4 mb-2'>Comments</h2>
      <div className='rounded-lg border p-3'>
        {data.map((post) => (
          <div key={post.id} className='my-2'>
            <p>{post.message}</p>
            <h3 className='italic text-sm'>-{post.userName}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
