"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, X } from 'lucide-react'
import Link from 'next/link'
import {
  getCookiePreferences,
  saveCookiePreferences,
  hasConsentBannerBeenShown,
  markConsentBannerShown
} from '@/lib/cookies'

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if banner should be shown
    const shouldShow = !hasConsentBannerBeenShown()
    if (shouldShow) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptEssential = () => {
    const newConsent = {
      essential: true,
      timestamp: Date.now()
    }
    
    saveCookiePreferences(newConsent)
    markConsentBannerShown()
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Still mark as shown but don't save preferences
    markConsentBannerShown()
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <h3 className="font-semibold text-foreground">Essential Cookies Only</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              We use only essential cookies for basic website functionality. All data is automatically wiped daily for your privacy. 
              <Link href="/cookie-policy" className="text-purple-400 hover:text-purple-500 ml-1 underline">
                Learn more
              </Link>
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Essential Only
              </Badge>
              <Badge variant="outline" className="text-xs">
                Daily Data Wipe
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              onClick={handleAcceptEssential}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Accept Essential Cookies
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="sm:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 