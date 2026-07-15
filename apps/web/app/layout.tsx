import { cn } from "@abhimanyu/ui/lib/utils"

import "@abhimanyu/ui/globals.css"
import { Geist_Mono, Roboto, Space_Grotesk } from "next/font/google"

import { SonnerToaster } from "@/components/sonner-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { TrpcClientProvider } from "@/providers/trpcClientProvider"

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
        <TrpcClientProvider>
          <ThemeProvider>
            {children}
            <SonnerToaster />
          </ThemeProvider>
        </TrpcClientProvider>
      </body>
    </html>
  )
}
