"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, ExternalLink, Mail } from "lucide-react"
import { useState, useEffect } from "react"

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  link?: string;
  image?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || [])
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch events:', error)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      full: date.toLocaleDateString(),
      short: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    }
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  const upcomingEvents = events.filter(event => isUpcoming(event.date))
  const pastEvents = events.filter(event => !isUpcoming(event.date))

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Events
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Catch Jon Spirit live in concert and experience the energy firsthand
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              {upcomingEvents.length} upcoming events
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Live performances
            </Badge>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Upcoming Events</h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => {
                const dateInfo = formatDate(event.date)
                return (
                  <div
                    key={event.id}
                    className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    {event.image && (
                      <div className="relative h-64 w-full flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          {dateInfo.short}
                        </Badge>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          Upcoming
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {event.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{dateInfo.full}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{dateInfo.time}</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Button
                          size="lg"
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => event.link && window.open(event.link, '_blank')}
                          disabled={!event.link}
                        >
                          {event.link ? (
                            <>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Get Tickets
                            </>
                          ) : (
                            'Coming Soon'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🎵</div>
              <h3 className="text-2xl font-bold mb-4">No upcoming events</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Check back soon for new shows and performances!
              </p>
              <div className="bg-card border border-border rounded-xl p-8 max-w-md mx-auto">
                <h4 className="font-bold mb-2">Stay Updated</h4>
                <p className="text-muted-foreground mb-4">
                  Follow Jon Spirit on social media to be the first to know about new events
                </p>
                <Button 
                  variant="outline" 
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  onClick={() => window.location.href = '/socials'}
                >
                  Follow on Socials
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.slice(0, 6).map((event) => {
                const dateInfo = formatDate(event.date)
                return (
                  <div
                    key={event.id}
                    className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col hover:border-purple-500/50 transition-all duration-300 group opacity-75"
                  >
                    {event.image && (
                      <div className="relative h-48 w-full flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-gray-600 text-white">
                          {dateInfo.short}
                        </Badge>
                        <Badge variant="outline" className="border-gray-500 text-gray-600">
                          Past Event
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 flex-1">{event.description}</p>
                      
                      {event.location && (
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Want to Book Jon Spirit?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Interested in having Jon Spirit perform at your venue or event? Get in touch for booking information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact for Booking
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/socials'}
            >
              Follow for Updates
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 