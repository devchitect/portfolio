import type { Metadata } from 'next'

import '../styles/root-layout.scss'
import '../styles/globals.scss'

import RootLayoutClientComponent from '@/app/layout-client'

export const metadata: Metadata = {
  title: 'Dzung Nguyen',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script async type="text/javascript" src='./script/initialize.js'/>
      </head>
      <body className=''>
        <RootLayoutClientComponent>{children}</RootLayoutClientComponent>
      </body>
    </html>
  )
}
