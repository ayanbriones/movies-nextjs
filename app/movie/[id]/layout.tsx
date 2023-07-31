import { Movie } from '@/app/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

async function getData(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=english`,
    {
      headers: {
        accept: 'application/json',
        Authorization: process.env.THEMOVIEDATABASE_API as string,
      },
      next: {
        revalidate: 60,
      },
    }
  )
  return res.json()
}

export default async function MovieId({
  params,
  children,
}: {
  params: { id: string }
  children: ReactNode
}) {
  const data: Movie = await getData(params.id)
  return (
    <div className='min-h-screen p-10'>
      <div className='h-[80vh] relative mb-4'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt='image movie'
          className='object-cover w-full rounded-lg'
          fill
        />
      </div>
      <div className='flex flex-col lg:flex-row mt-10 gap-x-2'>
        <div className='flex flex-row gap-x-5'>
          <div className='block min-w-max'>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt=''
              width={250}
              height={500}
              className='rounded-lg'
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-4xl font-bold'>{data.title}</h1>
            <h2 className='font-bold'>
              Release Date:{' '}
              <span className='font-normal'>{data.release_date}</span>
            </h2>
            <h2 className='font-bold'>
              Homepage:{' '}
              <span className='underline font-normal'>
                <Link href={data.homepage}>{data.homepage}</Link>
              </span>
            </h2>
            <p className='my-4'>{data.overview}</p>
          </div>
        </div>
        <div className='w-full my-8'>{children}</div>
      </div>
    </div>
  )
}
