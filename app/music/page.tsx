"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Music, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
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

export default function MusicPage() {
  const [artistData, setArtistData] = useState<any>(null)
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([])
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [spotifyConnected, setSpotifyConnected] = useState(false)

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
              setTopTracks(tracksData?.tracks || [])
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

  // Enhanced fallback data
  const fallbackArtistData = {
    name: "Jon Spirit",
    followers: { total: 25000 },
    genres: ["Hip Hop", "Electronic", "Pop", "R&B"],
    images: [{ url: "/placeholder.svg?height=1080&width=1920" }, { url: "/placeholder.svg?height=600&width=500" }],
    external_urls: { spotify: "https://open.spotify.com/artist/2JvA93ASY6Tq4bISN2eh6Z" },
  }

  const fallbackAlbums = [
    {
      id: "1",
      name: "Dreaming of Your Past",
      album_type: "single",
      release_date: "2024-01-15",
      images: [{ url: "/placeholder.svg?height=300&width=300", height: 300, width: 300 }],
      external_urls: { spotify: "https://open.spotify.com/artist/2JvA93ASY6Tq4bISN2eh6Z" },
    },
    {
      id: "2",
      name: "Spirit Vibes Collection",
      album_type: "EP",
      release_date: "2023-12-01",
      images: [{ url: "/placeholder.svg?height=300&width=300", height: 300, width: 300 }],
      external_urls: { spotify: "https://open.spotify.com/artist/2JvA93ASY6Tq4bISN2eh6Z" },
    },
    {
      id: "3",
      name: "Digital Dreams",
      album_type: "album",
      release_date: "2023-08-15",
      images: [{ url: "/placeholder.svg?height=300&width=300", height: 300, width: 300 }],
      external_urls: { spotify: "https://open.spotify.com/artist/2JvA93ASY6Tq4bISN2eh6Z" },
    },
  ]

  const displayArtistData = artistData || fallbackArtistData
  const displayAlbums = albums.length > 0 ? albums : fallbackAlbums

  const getStatusInfo = () => {
    if (spotifyConnected) {
      return { text: "Spotify Live", color: "text-green-500", icon: CheckCircle }
    } else {
      return { text: "Demo Mode", color: "text-blue-500", icon: AlertCircle }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Music
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the latest releases and popular tracks from Jon Spirit
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <statusInfo.icon className={`h-4 w-4 ${statusInfo.color}`} />
              <span className={statusInfo.color}>{statusInfo.text}</span>
            </div>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              {displayArtistData.followers?.total?.toLocaleString() || "25,000"} followers
            </Badge>
          </div>
        </div>
      </section>

      {/* Albums Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-center">Latest Releases</h2>
            {spotifyConnected && (
              <Badge className="bg-green-600 text-white">
                <Music className="mr-1 h-3 w-3" />
                Live from Spotify
              </Badge>
            )}
          </div>

          {loading ? (
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading music data...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayAlbums.map((album, index) => (
                <Card
                  key={album.id}
                  className="bg-card border-border hover:border-purple-500 transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={album.images?.[0]?.url || "/placeholder.svg?height=300&width=300"}
                        alt={album.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => window.open(album.external_urls.spotify, "_blank")}
                        >
                          <Play className="mr-2 h-5 w-5" />
                          View on Spotify
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{album.name}</h3>
                      <p className="text-muted-foreground">
                        {album.album_type} • {new Date(album.release_date).getFullYear()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Tracks Section */}
      {topTracks.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Tracks</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {topTracks.map((track, index) => (
                <Card
                  key={track.id}
                  className="bg-card border-border hover:border-purple-500/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="text-3xl font-bold text-purple-400 w-12 text-center">{index + 1}</div>
                      <Image
                        src={track.album.images?.[2]?.url || "/placeholder.svg?height=64&width=64"}
                        alt={track.album.name}
                        width={64}
                        height={64}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{track.name}</h4>
                        <p className="text-muted-foreground">{track.album.name}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.open(track.external_urls.spotify, "_blank")}
                        className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Play
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spotify Follow Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Follow on Spotify</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Stay updated with the latest releases and get notified when new music drops
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg"
            onClick={() => window.open(displayArtistData.external_urls.spotify, "_blank")}
          >
            <Music className="mr-2 h-5 w-5" />
            Follow Jon Spirit on Spotify
          </Button>
        </div>
      </section>
    </div>
  )
} 