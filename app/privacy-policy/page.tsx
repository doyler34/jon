"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-purple-500/20"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-4xl font-bold mb-8">Privacy-First Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Our Philosophy: Zero Personal Data</h2>
            <p>
              We believe in your privacy. This website is designed to be a completely private experience. We do not collect, store, or process any of your personal information. Your visit is anonymous.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. How We Handle Data</h2>
             <h3 className="text-xl font-semibold">2.1 Essential Cookies Only</h3>
            <p>
              We use only the essential cookies required for basic website functionality. We do not use any cookies for analytics, marketing, or tracking.
            </p>
             <h3 className="text-xl font-semibold">2.2 Daily Data Wipe</h3>
             <p>
              For your peace of mind, all cookie data is automatically and permanently deleted every 24 hours. Every day is a clean slate.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Your Rights & Your Data</h2>
            <p>
              You have the ultimate right to privacy. Since we do not collect or store any of your personal data, there is no information to access, correct, or delete. Your data remains yours, always. You can decline even essential cookies, and the site will remain functional.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Third-Party Services & Ticket Purchases</h2>
            <p>
              When you click a link to purchase tickets for an event, you will be redirected to a third-party website (such as Universe, Ticketmaster, etc.). All ticket purchases are handled directly by these external vendors. We do not process payments, collect financial information, or store any personal data related to ticket sales. Your transaction is governed entirely by the privacy policy of the ticket vendor.
            </p>
            <p>
              Similarly, our site may link to other third-party services like Spotify. Any interaction you have on their websites is governed by their own privacy policies. We do not share any data with them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Contact Us</h2>
            <p>
              If you have any general questions about this privacy policy, you can reach out to us.
            </p>
            <p>
              Email: <Link href="mailto:privacy@jonspirit.com" className="text-purple-400 hover:text-purple-500">privacy@jonspirit.com</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}