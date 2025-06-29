"use client"

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';

export default function SocialsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Socials
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with Jon Spirit across all platforms and stay updated with the latest content
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Live content
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Daily updates
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              Behind scenes
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Social Platforms */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Platforms</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Instagram */}
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Instagram</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      @jonspirit.mp4
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Get a glimpse into my creative process, studio sessions, and personal moments. 
                  Follow for exclusive photos and stories.
                </p>
                <div className="flex gap-3">
                  <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                    <Link href="/socials/instagram">
                      View Posts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                    <a href="https://www.instagram.com/jonspirit.mp4" target="_blank" rel="noopener noreferrer">
                      Follow
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* TikTok */}
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-black to-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">Tik</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">TikTok</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      @jonspirit
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Watch quick music previews, studio moments, and fun behind-the-scenes clips. 
                  Perfect for discovering new sounds and seeing the creative process in action.
                </p>
                <div className="flex gap-3">
                  <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                    <Link href="/socials/tiktok">
                      View Videos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                    <a href="https://www.tiktok.com/@jonspirit" target="_blank" rel="noopener noreferrer">
                      Follow
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Social Platforms */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Other Platforms</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Connect with me across all your favorite platforms
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Twitter */}
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Twitter className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Twitter</CardTitle>
                <CardDescription className="text-muted-foreground">
                  @JonSpiritPrime
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Thoughts, updates, and real-time conversations</p>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full">
                  <a href="https://x.com/jonspiritprime" target="_blank" rel="noopener noreferrer">
                    Follow on Twitter
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Facebook */}
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Facebook className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Facebook</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Jon Spirit
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Community updates and longer-form content</p>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full">
                  <a href="https://www.facebook.com/share/12MaeXq11TT" target="_blank" rel="noopener noreferrer">
                    Like on Facebook
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <CardTitle>YouTube</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Jon Spirit
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Music videos, live performances, and interviews</p>
                <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full">
                  <a href="https://youtube.com/jonspirit" target="_blank" rel="noopener noreferrer">
                    Subscribe
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 