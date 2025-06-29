"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Instagram, Twitter, Youtube, Facebook, Music } from "lucide-react";

interface SocialData {
  email: string;
  social: {
    spotify?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
  };
}

interface SiteContent {
  contact: SocialData;
  [key: string]: any;
}

export default function RedirectSocials() {
  useEffect(() => {
    window.location.href = "/studio-portal-2024/contact";
  }, []);
  return null;
}

export function SocialsManager() {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [formData, setFormData] = useState<SocialData>({
    email: '',
    social: {
      spotify: '',
      instagram: '',
      youtube: '',
      twitter: '',
      facebook: '',
      tiktok: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/content');
      const data: SiteContent = await response.json();
      setSiteContent(data);
      setFormData(data.contact || { 
        email: '', 
        social: {
          spotify: '',
          instagram: '',
          youtube: '',
          twitter: '',
          facebook: '',
          tiktok: ''
        }
      });
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setFormData(prev => ({ ...prev, email: value }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        social: { ...prev.social, [name]: value }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      alert('Please fill in the email field.');
      return;
    }
    
    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...siteContent, 
          contact: formData 
        }),
      });

      if (response.ok) {
        alert('Social media links updated successfully!');
        fetchContent();
      } else {
        alert('Failed to update social media links.');
      }
    } catch (error) {
      console.error('Failed to update social media links:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => window.location.href = '/studio-portal-2024'}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Manage Social Media & Contact</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Contact Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Email *</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Input
                  name="email"
                  type="email"
                  placeholder="contact@example.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Media Links</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Spotify</label>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-green-500" />
                  <Input
                    name="spotify"
                    placeholder="https://open.spotify.com/artist/..."
                    value={formData.social.spotify || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <Input
                    name="instagram"
                    placeholder="https://instagram.com/username"
                    value={formData.social.instagram || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">YouTube</label>
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <Input
                    name="youtube"
                    placeholder="https://youtube.com/@channel"
                    value={formData.social.youtube || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Twitter/X</label>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-blue-500" />
                  <Input
                    name="twitter"
                    placeholder="https://x.com/username"
                    value={formData.social.twitter || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Facebook</label>
                <div className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <Input
                    name="facebook"
                    placeholder="https://facebook.com/username"
                    value={formData.social.facebook || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">TikTok</label>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <Input
                    name="tiktok"
                    placeholder="https://tiktok.com/@username"
                    value={formData.social.tiktok || ''}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>

        {/* Preview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="text-muted-foreground">
                <Mail className="inline h-4 w-4 mr-2" />
                {formData.email || 'No email set'}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Social Media</h3>
              <div className="space-y-2">
                {formData.social.spotify && (
                  <a href={formData.social.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-500 hover:underline">
                    <Music className="h-4 w-4" />
                    Spotify
                  </a>
                )}
                {formData.social.instagram && (
                  <a href={formData.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-500 hover:underline">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                )}
                {formData.social.youtube && (
                  <a href={formData.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-500 hover:underline">
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </a>
                )}
                {formData.social.twitter && (
                  <a href={formData.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:underline">
                    <Twitter className="h-4 w-4" />
                    Twitter/X
                  </a>
                )}
                {formData.social.facebook && (
                  <a href={formData.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                )}
                {formData.social.tiktok && (
                  <a href={formData.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:underline">
                    <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    TikTok
                  </a>
                )}
                {!Object.values(formData.social).some(link => link) && (
                  <p className="text-muted-foreground text-sm">No social media links set</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 