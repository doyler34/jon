import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import CookieConsentBanner from "@/components/cookie-consent-banner"
import AdminPortalButton from "@/components/admin-portal-button"
import { initializeCookieManagement } from "@/lib/cookies"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Jon Spirit - Music Artist",
  description: "Interdimensional Rock & Roll from Barrie, Ontario",
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%234a1d96'/%3E%3Ctext x='50' y='70' font-family='Arial' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EJS%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navigation />
        {children}
        <AdminPortalButton />
        <CookieConsentBanner />
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize cookie management on page load
              (function() {
                try {
                  ${initializeCookieManagement.toString()}();
                } catch (e) {
                  console.warn('Failed to initialize cookie management:', e);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
