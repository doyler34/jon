"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CookiePolicy() {
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

        <h1 className="text-4xl font-bold mb-8">Essential-Only Cookie Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-semibold">Privacy-First Approach</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We believe in minimal data collection and maximum privacy. Our cookie policy is designed to protect your privacy while maintaining essential website functionality.
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Essential Only
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Daily Wipe
              </Badge>
              <Badge variant="outline" className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                No Tracking
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            {/* Essential Cookies Section */}
            <div className="border border-green-500/30 rounded-lg p-4 bg-green-900/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <h3 className="text-xl font-semibold text-green-400">Essential Cookies</h3>
                <Badge variant="secondary" className="text-xs">Always Enabled</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Basic website functionality</li>
                <li>• Page navigation and user experience</li>
                <li>• Security and authentication</li>
              </ul>
            </div>

            {/* Daily Data Wiping Section */}
            <div className="border border-blue-500/30 rounded-lg p-4 bg-blue-900/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <h3 className="text-xl font-semibold text-blue-400">Daily Data Wiping</h3>
                <Badge variant="secondary" className="text-xs">Automatic</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                For your privacy, all cookie data is automatically deleted every 24 hours. This ensures you start fresh each day with no long-term data storage.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• All cookies wiped daily at midnight</li>
                <li>• localStorage and sessionStorage cleared</li>
                <li>• User preferences reset to default</li>
                <li>• No long-term data retention</li>
              </ul>
            </div>

            {/* What We Don't Collect */}
            <div className="border border-red-500/30 rounded-lg p-4 bg-red-900/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-red-400" />
                <h3 className="text-xl font-semibold text-red-400">What We Don't Collect</h3>
                <Badge variant="secondary" className="text-xs">Never</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                We do not collect any of the following types of data:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Analytics or tracking data</li>
                <li>• Marketing or advertising cookies</li>
                <li>• Third-party tracking scripts</li>
                <li>• User behavior analytics</li>
                <li>• Personal identification data</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You have complete control over your data. You can:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Decline cookies entirely (site will still function)</li>
              <li>• Reset cookies at any time using the reset button</li>
              <li>• Contact us with any privacy concerns</li>
              <li>• Request data deletion (though we don't store long-term data)</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/privacy-policy">
                <Button variant="outline" size="sm">Privacy Policy</Button>
              </Link>
              <Link href="/terms-of-use">
                <Button variant="outline" size="sm">Terms of Use</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 