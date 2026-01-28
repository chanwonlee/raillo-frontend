import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer'
import { QueryProvider } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
  title: 'Raillo',
  description: 'GOORM DEEPDIVE Raillo Project',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col' >
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html >
  )
}
