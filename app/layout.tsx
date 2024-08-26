import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import { Providers } from './providers'
import '@/app/globals.css'


const inter = Source_Sans_3({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Loqi',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
