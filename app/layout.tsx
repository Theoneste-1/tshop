import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import NextTopLoader from 'nextjs-toploader';


export const metadata: Metadata = {
  title: 'TShop',
  description: 'Created by Theoneste',
  generator: 'Theoneste-1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
      <NextTopLoader/>
    </html>
  )
}
