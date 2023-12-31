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
      <div className='lg:h-[80vh] relative min-w-min overflow-hidden mb-4'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt='image movie'
          className='w-full object-contain rounded-lg'
          width={1920}
          height={1080}
        />
      </div>
      <div className='flex flex-col lg:flex-row mt-10 gap-x-2'>
        <div className='flex flex-col md:flex-row gap-x-5'>
          <div className='block min-w-max'>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt=''
              width={150}
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
        <div className='w-full my-8 lg:my-0'>{children}</div>
      </div>
    </div>
  )
}
