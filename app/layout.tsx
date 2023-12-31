import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS Project',
  description: 'A Trending Movie Project from Youtube by Jan Marshal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav className='px-10'>
          <Link prefetch href='/' className='text-2xl font-semibold'>
            Bryanth<span className='text-teal-500'>Briones</span>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
