"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

function getCookie(name: string) {
  return document.cookie.split("; ").some(row => row.startsWith(name + "="));
}

export default function BackToAdminButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hasToken = getCookie("admin_token");
    const viewingFullSite = getCookie("viewingFullSite");
    const isNotAdminPage = !pathname.startsWith("/studio-portal-2024");
    setIsVisible(hasToken && viewingFullSite && isNotAdminPage);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={() => {
          document.cookie = "viewingFullSite=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/studio-portal-2024";
        }}
        className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-pink-400/20"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Admin
      </Button>
    </div>
  );
} 