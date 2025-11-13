import type React from "react"
import type { Metadata } from "next"
import { Spectral } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Bay Area Realty - Premier Real Estate Platform",
  description:
    "Discover exceptional real estate opportunities in the San Francisco Bay Area with secure authentication and property management.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spectral.variable}>
      <body className={`${spectral.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
