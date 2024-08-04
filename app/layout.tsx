import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'
import '@/app/globals.css'


const inter = Roboto({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: 'Loqi',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
