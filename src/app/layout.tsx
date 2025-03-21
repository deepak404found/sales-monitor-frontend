import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@sales-monitor-frontend/components/providers/ReduxProvider'
import AlertProvider from '@sales-monitor-frontend/components/providers/AlertProvider'
import AuthProvider from '@sales-monitor-frontend/components/providers/AuthProivder'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sales Monitor',
  description: 'Sales Monitor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AlertProvider>
            <AuthProvider>{children}</AuthProvider>
          </AlertProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
