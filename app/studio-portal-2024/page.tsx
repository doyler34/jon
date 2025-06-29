"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Image, FileText, Share2, Settings, Globe } from "lucide-react";

export default function AdminDashboard() {
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/studio-portal-2024/login';
  }

  const handleViewWebsite = () => {
    // Open the main website in a new tab
    window.open('/', '_blank');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your music artist homepage content</p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleViewWebsite}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            View Website
          </Button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Banner/Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Banner/Header
            </CardTitle>
            <CardDescription>
              Edit hero section, title, subtitle, and background
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/studio-portal-2024/banner'}
            >
              Manage Banner
            </Button>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              About Section
            </CardTitle>
            <CardDescription>
              Edit about text, bio, and about image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/studio-portal-2024/about'}
            >
              Manage About
            </Button>
          </CardContent>
        </Card>

        {/* Contact & Socials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Contact & Socials
            </CardTitle>
            <CardDescription>
              Manage contact info and social media links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/studio-portal-2024/contact'}
            >
              Manage Contact & Socials
            </Button>
          </CardContent>
        </Card>

        {/* Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Events
            </CardTitle>
            <CardDescription>
              Manage upcoming shows and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/studio-portal-2024/events'}
            >
              Manage Events
            </Button>
          </CardContent>
        </Card>

        {/* Sponsors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Sponsors
            </CardTitle>
            <CardDescription>
              Manage sponsor information and logos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => window.location.href = '/studio-portal-2024/sponsors'}
            >
              Manage Sponsors
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>
              General site settings and configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => window.location.href = '/studio-portal-2024/settings'}
            >
              Site Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 