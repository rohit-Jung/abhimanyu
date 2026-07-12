import { Geist, Geist_Mono, Roboto, Space_Grotesk } from "next/font/google"

import "@abhimanyu/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { cn } from "@abhimanyu/ui/lib/utils"
import { SonnerToaster } from "@/components/sonner-provider"

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        roboto.variable,
        spaceGroteskHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          {children}
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
