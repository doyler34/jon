"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Instagram, 
  ExternalLink,
  Heart,
  MessageCircle,
  Image as ImageIcon,
  ArrowLeft,
  Play,
  Images
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import Script from "next/script";

export default function InstagramPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Link href="/socials" className="mr-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Instagram
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            @jonspirit.mp4
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Behind-the-scenes content, studio sessions, and daily updates from my creative journey
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-pink-500 text-pink-400">
              Visual stories
            </Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Studio moments
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              Daily updates
            </Badge>
          </div>
        </div>
      </section>

      {/* Elfsight Instagram Feed Embed */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="elfsight-app-8d753aa1-1171-44df-ae0d-161acd154746" data-elfsight-app-lazy></div>
      </div>
      <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />

      {/* Call to Action */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Follow me on Instagram for exclusive behind-the-scenes content, studio sessions, and daily updates from my creative journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
              onClick={() => window.open('https://www.instagram.com/jonspirit.mp4', '_blank')}
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-8 py-4 text-lg"
              asChild
            >
              <Link href="/socials">
                Back to Socials
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 