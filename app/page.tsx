"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MapPin, Music, Calendar, Share2, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getArtistAlbums, getArtistTopTracks, getArtistById, hasSpotifyCredentials } from "@/lib/spotify"

interface SpotifyTrack {
  id: string
  name: string
  album: {
    name: string
    images: Array<{ url: string; height: number; width: number }>
    release_date: string
  }
  external_urls: {
    spotify: string
  }
}

interface SpotifyAlbum {
  id: string
  name: string
  images: Array<{ url: string; height: number; width: number }>
  release_date: string
  external_urls: {
    spotify: string
  }
  album_type?: string
}

export default function Home() {
  const [artistData, setArtistData] = useState<any>(null)
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([])
  const [loading, setLoading] = useState(true)
  const [spotifyConnected, setSpotifyConnected] = useState(false)
  const [siteContent, setSiteContent] = useState<any>(null)
  const [siteContentLoading, setSiteContentLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch Spotify data
        if (hasSpotifyCredentials()) {
          try {
            console.log("Fetching Spotify data...")
            const artistId = "2JvA93ASY6Tq4bISN2eh6Z"
            const artist = await getArtistById(artistId)

            if (artist) {
              setArtistData(artist)
              setSpotifyConnected(true)

              const [albumsData, tracksData] = await Promise.all([
                getArtistAlbums(artist.id),
                getArtistTopTracks(artist.id),
              ])

              setAlbums(albumsData?.items || [])
              console.log("Spotify data loaded successfully")
            }
          } catch (spotifyError) {
            console.error("Spotify error:", spotifyError)
            setSpotifyConnected(false)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => setSiteContent(data))
      .finally(() => setSiteContentLoading(false))
  }, [])

  // Enhanced fallback data
  const fallbackArtistData = {
    name: "Jon Spirit",
    followers: { total: 25000 },
    genres: ["Hip Hop", "Electronic", "Pop", "R&B"],
    images: [{ url: "/placeholder.svg?height=1080&width=1920" }, { url: "/placeholder.svg?height=600&width=500" }],
    external_urls: { spotify: "https://open.spotify.com/artist/2JvA93ASY6Tq4bISN2eh6Z" },
  }

  const displayArtistData = artistData || fallbackArtistData
  const displayAlbums = albums.length > 0 ? albums : []

  if (siteContentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
        <Image
          src={siteContent?.hero?.backgroundImage || displayArtistData.images?.[0]?.url || "/placeholder.svg?height=1080&width=1920"}
          alt="Jon Spirit Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {siteContent?.hero?.title || 'JON SPIRIT'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            {siteContent?.hero?.subtitle || 'Interdimensional Rock & Roll'}
          </p>
          <p className="text-lg mb-8 text-muted-foreground">
            {displayArtistData.followers?.total?.toLocaleString() || "25,000"} followers on Spotify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/music">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Listen to Music
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3">
                <Calendar className="mr-2 h-5 w-5" />
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{siteContent?.about?.title || 'About Jon Spirit'}</h2>
              <p className="text-muted-foreground text-lg mb-6">
                {siteContent?.about?.bio || 'Introducing Jon Spirit, the unparalleled musical sensation from Barrie, Ontario. With a unique sound that defies comparison, Jon Spirit has been captivating audiences as a professional recording artist for six years and electrifying live performances for four years.'}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {displayArtistData.genres?.slice(0, 4).map((genre: string, index: number) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className={`${
                      index === 0
                        ? "bg-purple-600"
                        : index === 1
                          ? "bg-pink-600"
                          : index === 2
                            ? "bg-blue-600"
                            : "bg-green-600"
                    } text-white`}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src={siteContent?.about?.aboutImage || displayArtistData.images?.[1]?.url || "/placeholder.svg?height=600&width=500"}
                alt="Jon Spirit Portrait"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Music */}
            <Link href="/music" className="group h-full">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Music className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Music</h3>
                <p className="text-muted-foreground mb-4">Latest releases, albums, and tracks</p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span>Explore Music</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Events */}
            <Link href="/events" className="group h-full">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Calendar className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Events</h3>
                <p className="text-muted-foreground mb-4">Upcoming shows and performances</p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span>View Events</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Socials */}
            <Link href="/socials" className="group h-full">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Share2 className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Socials</h3>
                <p className="text-muted-foreground mb-4">Connect across all platforms</p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span>Follow Me</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Contact */}
            <Link href="/contact" className="group h-full">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Mail className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p className="text-muted-foreground mb-4">Booking, business, and inquiries</p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  <span>Get in Touch</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Release Preview */}
      {displayAlbums.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Latest Release</h2>
              <p className="text-muted-foreground">Check out the newest music from Jon Spirit</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <Image
                  src={displayAlbums[0].images?.[0]?.url || "/placeholder.svg?height=300&width=300"}
                  alt={displayAlbums[0].name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{displayAlbums[0].name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {displayAlbums[0].album_type} • {new Date(displayAlbums[0].release_date).getFullYear()}
                  </p>
                  <Link href="/music">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Play className="mr-2 h-4 w-4" />
                      Listen Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sponsors Section */}
      {siteContent?.sponsors && siteContent.sponsors.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Sponsors
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Proud to be supported by these amazing partners who help make the music possible
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteContent.sponsors.map((sponsor: any) => (
                <div
                  key={sponsor.id}
                  className="group relative bg-card border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color || 'from-purple-500/10 to-pink-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Card content */}
                  <div className="relative p-8 flex flex-col items-center text-center">
                    {/* Logo container */}
                    {sponsor.logo && (
                      <div className="relative w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-border group-hover:border-purple-300 transition-all duration-300 shadow-md bg-muted">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    {/* Sponsor name */}
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-purple-400 transition-colors duration-300">
                      {sponsor.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {sponsor.description}
                    </p>
                    
                    {/* Visit button */}
                    {sponsor.link && (
                      <a
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        Visit Sponsor
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${sponsor.color || 'from-purple-500/20 to-pink-500/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
