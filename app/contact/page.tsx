"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Music, 
  Users, 
  Building, 
  ExternalLink,
  MessageCircle,
  Clock,
  Globe
} from "lucide-react"

export default function ContactPage() {
  const [siteContent, setSiteContent] = useState<any>(null)
  useEffect(() => {
    fetch("/api/admin/content")
      .then(res => res.json())
      .then(data => setSiteContent(data))
  }, [])

  const businessServices = siteContent?.businessServices || [
    {
      title: "Live Performances",
      description: "Book Jon Spirit for live shows, concerts, and special events",
      icon: Music,
      color: "bg-purple-600",
      features: ["Solo performances", "Band shows", "Acoustic sets", "Custom arrangements"]
    },
    {
      title: "Event Booking",
      description: "Available for private events, corporate functions, and special occasions",
      icon: Calendar,
      color: "bg-pink-600",
      features: ["Private parties", "Corporate events", "Weddings", "Product launches"]
    },
    {
      title: "Collaborations",
      description: "Open to creative collaborations with other artists and brands",
      icon: Users,
      color: "bg-blue-600",
      features: ["Music collaborations", "Brand partnerships", "Content creation", "Studio sessions"]
    },
    {
      title: "Licensing",
      description: "Music licensing for commercial use, films, and media projects",
      icon: Building,
      color: "bg-green-600",
      features: ["Commercial licensing", "Film & TV", "Advertising", "Digital media"]
    }
  ]

  const faqItems = [
    {
      question: "How do I book Jon Spirit for an event?",
      answer: "Contact us at booking@jonspirit.com with your event details, date, and venue information. We'll get back to you within 24-48 hours."
    },
    {
      question: "What types of events does Jon Spirit perform at?",
      answer: "Jon Spirit performs at a variety of events including concerts, private parties, corporate functions, weddings, and special occasions."
    },
    {
      question: "Is Jon Spirit available for international bookings?",
      answer: "Yes, Jon Spirit is available for international bookings. Travel arrangements and logistics will be discussed during the booking process."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-3 months in advance for best availability, especially for weekend events and peak seasons."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch for bookings, collaborations, press inquiries, and business opportunities
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Available for booking
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Quick response
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              Professional service
            </Badge>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto justify-center">
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">Primary contact method</p>
                <Button 
                  variant="outline" 
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  onClick={() => window.open(`mailto:${siteContent?.contact?.email}`)}
                >
                  {siteContent?.contact?.email}
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-muted-foreground mb-4">Based in Ontario, Canada</p>
                <p className="text-foreground font-semibold">{siteContent?.contact?.location}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Business Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {businessServices.map((service: any) => {
              const iconMap = { Music, Calendar, Users, Building };
              const Icon = typeof service.icon === 'string' && iconMap[service.icon as keyof typeof iconMap]
                ? iconMap[service.icon as keyof typeof iconMap]
                : Music;
              return (
                <Card key={service.title} className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="space-y-2">
                          {service.features.map((feature: any) => (
                            <div key={feature} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-card border border-border hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-400" />
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Management Info */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Management & Business</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card border border-border">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Management</h3>
                  <p className="text-muted-foreground mb-4">{siteContent?.contact?.management}</p>
                  <Button 
                    variant="outline" 
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    onClick={() => window.open(`mailto:${siteContent?.contact?.booking}`)}
                  >
                    Contact Management
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Press & Media</h3>
                  <p className="text-muted-foreground mb-4">For press inquiries and media requests</p>
                  <Button 
                    variant="outline" 
                    className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white"
                    onClick={() => window.open(`mailto:${siteContent?.contact?.press}`)}
                  >
                    Press Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Work Together?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Whether you're looking to book a performance, collaborate on a project, or just want to say hello, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => window.open(`mailto:${siteContent?.contact?.booking}`)}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Booking Inquiry
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/socials'}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Follow on Socials
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 