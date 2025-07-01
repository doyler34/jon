"use client"

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/80 py-6 mt-12 text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center gap-4">
        <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        <span className="hidden sm:inline">|</span>
        <a href="/terms-of-use" className="hover:underline">Terms of Use</a>
        <span className="hidden sm:inline">|</span>
        <a href="/cookie-policy" className="hover:underline">Cookie Policy</a>
      </div>
      <div className="mt-2">&copy; {new Date().getFullYear()} Jon Spirit. All rights reserved.</div>
    </footer>
  )
} 