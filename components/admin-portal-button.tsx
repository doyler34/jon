"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Settings, ArrowRight } from "lucide-react"

export default function AdminPortalButton() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated by looking for admin token
    const checkAuth = () => {
      const hasToken = document.cookie.includes('admin_token=')
      
      // Only show on main site pages (not admin pages)
      const isMainSite = !pathname.startsWith('/studio-portal-2024')
      
      // For now, let's make it always visible on main site for testing
      setIsVisible(isMainSite)
    }

    checkAuth()
    
    // Check when pathname changes
    const interval = setInterval(checkAuth, 2000)
    
    return () => clearInterval(interval)
  }, [pathname])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => window.location.href = '/studio-portal-2024'}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-purple-400/20"
      >
        <Settings className="h-4 w-4" />
        Admin Portal
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
} 