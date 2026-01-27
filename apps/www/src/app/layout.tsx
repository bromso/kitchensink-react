import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import type { Organization, WithContext } from "schema-dts"

import { Footer } from "@/components/blocks/footer"
import { Navbar } from "@/components/blocks/navbar"
import { JsonLd } from "@/components/json-ld"
import { StyleGlideProvider } from "@/components/styleglide-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { metadata as brandMonitorMetadata, siteConfig } from "@/content/kitchensink-react"
import "@/styles/globals.css"

const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  description: brandMonitorMetadata.description,
  sameAs: ["https://twitter.com/brandmonitor", "https://linkedin.com/company/brandmonitor"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${siteConfig.url}/contact`,
  },
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Ensures text remains visible during font load
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: brandMonitorMetadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: brandMonitorMetadata.description,
  keywords: brandMonitorMetadata.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: brandMonitorMetadata.title,
    description: brandMonitorMetadata.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: brandMonitorMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brandMonitorMetadata.title,
    description: brandMonitorMetadata.description,
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://api.iconify.design" />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
        <JsonLd data={organizationSchema} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StyleGlideProvider />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
