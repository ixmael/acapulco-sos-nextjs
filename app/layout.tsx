import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Acapulco SOS',
  description: 'Listado de personas no localizadas tras el paso del huracán Otis',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="es">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
      </body>
      </html>
  )
}
