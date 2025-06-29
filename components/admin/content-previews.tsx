"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const HeroPreview = ({ content, artistData }: { content: any, artistData: any }) => (
  <section className="relative h-screen flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
    <Image
        src={content?.backgroundImage || artistData?.images?.[0]?.url || "/placeholder.svg?height=1080&width=1920"}
        alt="Jon Spirit Hero Background"
        fill
        className="object-cover"
        priority
    />
    <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {content?.title || "JON SPIRIT"}
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-muted-foreground">{content?.subtitle || "Music Producer & Content Creator"}</p>
      <p className="text-lg mb-8 text-muted-foreground">
        {artistData?.followers?.total?.toLocaleString() || "25,000"} followers on Spotify
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
          <Play className="mr-2 h-5 w-5" />
          Listen to Music
        </Button>
        <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3">
          View Shows
        </Button>
      </div>
    </div>
  </section>
);

export const AboutPreview = ({ content, artistData }: { content: any, artistData: any }) => (
  <section className="py-20 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">{content?.title || "About Jon Spirit"}</h2>
          <p className="text-muted-foreground text-lg mb-6">
            {content?.description || "Loading description..."}
          </p>
          <div className="flex flex-wrap gap-2">
            {(artistData?.genres || ["Hip Hop", "Electronic", "Pop"]).slice(0, 4).map((genre: string, index: number) => (
              <Badge
                key={genre}
                variant="secondary"
                className={`${
                  index === 0 ? "bg-purple-600" : index === 1 ? "bg-pink-600" : index === 2 ? "bg-blue-600" : "bg-green-600"
                } text-white`}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src={artistData?.images?.[1]?.url || "/placeholder.svg?height=600&width=500"}
            alt="Jon Spirit Portrait"
            width={500}
            height={600}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
); 