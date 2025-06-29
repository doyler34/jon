"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfUse() {
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

        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: February 28, 2024</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Jon Spirit or its content suppliers and is protected by international copyright laws.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The music, artwork, and videos are protected by copyright</li>
              <li>The Jon Spirit name and logo are trademarks</li>
              <li>Unauthorized use of any materials  is strictly prohibited</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. User Conduct</h2>
            <p>
              When using our website, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Modify, adapt, or hack the website</li>
              <li>Harass, abuse, or harm others</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Third-Party Ticket Sales</h2>
            <p>
              This website provides links to purchase tickets through third-party vendors (e.g., Ticketmaster, Universe). All ticket transactions are processed by these external vendors, not by us. 
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All sales, refunds, and customer service inquiries are subject to the terms and policies of the third-party ticket vendor.</li>
              <li>We are not responsible for any issues arising from your purchase.</li>
              <li>You must comply with the rules and regulations of both the ticket vendor and the event venue.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Disclaimer</h2>
            <p>
              This website is provided "as is" without any representations or warranties, express or implied. Jon Spirit makes no representations or warranties regarding the accuracy or completeness of the content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
            <p>
              Jon Spirit shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Use on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <p>
              Email: <Link href="mailto:legal@jonspirit.com" className="text-purple-400 hover:text-purple-500">legal@jonspirit.com</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 