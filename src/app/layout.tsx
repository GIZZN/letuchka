import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Туристическое агентство',
  description: 'Организация незабываемых путешествий по всему миру',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="mainContent flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
