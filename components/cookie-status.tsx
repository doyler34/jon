"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, RefreshCw } from 'lucide-react'
import { getCookiePreferences, resetCookiesForTesting } from '@/lib/cookies'

export default function CookieStatus() {
  const [preferences, setPreferences] = useState({
    essential: true
  })

  useEffect(() => {
    const currentPrefs = getCookiePreferences()
    setPreferences(currentPrefs.consent)
  }, [])

  const handleReset = () => {
    if (confirm('Reset cookies and show consent banner again?')) {
      resetCookiesForTesting()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-xs"
      >
        <Shield className="h-3 w-3" />
        Essential Cookies Only
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReset}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        title="Reset cookies for testing"
      >
        <RefreshCw className="h-3 w-3" />
        Reset
      </Button>
    </div>
  )
} 