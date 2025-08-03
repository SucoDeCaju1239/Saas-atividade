import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Don Pollos Hermano',
  description: 'Created with v0',
  generator: 'v0.dev',
}


export default function RootLayout({
  children,
  
}: Readonly<{

  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
          <link rel="icon" href="images/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-papovR1y2bbZm4YzF7EBE4RQYNoa+P+KZ0lFw1rKXHoZl6RMP2R2i+81S0VTxOTRaG+n8kg7Q6/V1G2l2p0m8A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
