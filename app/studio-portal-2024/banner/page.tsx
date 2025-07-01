"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, UploadCloud, ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import { getArtistById, hasSpotifyCredentials } from "@/lib/spotify";

interface BannerData {
  title: string;
  subtitle: string;
  backgroundVideo?: string;
  heroImage?: string;
}

interface SiteContent {
  hero: BannerData;
  [key: string]: any;
}

const ImageUpload = ({ value, onChange, onUploadStart, onUploadEnd, label }: {
  value: string,
  onChange: (path: string) => void,
  onUploadStart: () => void,
  onUploadEnd: () => void,
  label: string
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    onUploadStart();
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) {
        onChange(result.path);
      } else {
        alert(result.error || 'Upload failed.');
      }
    } catch (error) {
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
      onUploadEnd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {value ? (
        <div className="relative w-full h-32 rounded-md border">
          <img src={value} alt="Uploaded image" className="w-full h-full object-cover rounded-md" />
          <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-7 w-7 rounded-full" onClick={() => onChange('')}><X size={16} /></Button>
        </div>
      ) : (
        <div
          className="w-full border-2 border-dashed rounded-md h-32 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud size={32} />
          <span>Click to upload</span>
          <span className="text-xs">PNG, JPG, SVG (Max 5MB)</span>
          <Input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} disabled={isUploading} />
        </div>
      )}
    </div>
  )
};

export default function BannerManager() {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [formData, setFormData] = useState<BannerData>({
    title: '',
    subtitle: '',
    backgroundVideo: '',
    heroImage: ''
  });
  const [artistData, setArtistData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // Fetch site content
        const contentResponse = await fetch('/api/admin/content');
        const contentData: SiteContent = await contentResponse.json();
        setSiteContent(contentData);
        setFormData(contentData.hero || { title: '', subtitle: '', backgroundVideo: '', heroImage: '' });

        // Fetch Spotify data
        if (hasSpotifyCredentials()) {
          const artist = await getArtistById("2JvA93ASY6Tq4bISN2eh6Z");
          setArtistData(artist);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle) {
      alert('Please fill in the title and subtitle fields.');
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...siteContent,
          hero: formData
        }),
      });

      if (response.ok) {
        alert('Banner updated successfully!');
      } else {
        alert('Failed to update banner.');
      }
    } catch (error) {
      console.error('Failed to update banner:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const fallbackArtistData = {
    images: [{ url: "/placeholder.svg?height=1080&width=1920" }],
    followers: { total: "..." },
  }
  const displayArtistData = artistData || fallbackArtistData;
  const heroImageSrc = formData.heroImage || displayArtistData.images?.[0]?.url;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => window.location.href = '/studio-portal-2024'}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Edit Banner Content</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                    name="title"
                    placeholder="Main Title *"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    />

                    <Textarea
                    name="subtitle"
                    placeholder="Subtitle *"
                    value={formData.subtitle}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    />

                    <Input
                    name="backgroundVideo"
                    placeholder="Background Video URL (optional)"
                    value={formData.backgroundVideo || ''}
                    onChange={handleFormChange}
                    />

                    <ImageUpload
                    value={formData.heroImage || ''}
                    onChange={(path) => setFormData(prev => ({ ...prev, heroImage: path }))}
                    onUploadStart={() => setIsUploading(true)}
                    onUploadEnd={() => setIsUploading(false)}
                    label="Custom Hero Image (optional)"
                    />
                     <p className="text-xs text-muted-foreground">This will override the default Spotify artist image.</p>


                    <Button type="submit" className="w-full" disabled={isUploading || isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="rounded-xl overflow-hidden border">
                <section className="relative h-[600px] flex items-center justify-center w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50 z-10"></div>
                    {heroImageSrc ? (
                        <Image
                            src={heroImageSrc}
                            alt="Hero Background"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800"></div>
                    )}

                    <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {formData.title || 'Your Title Here'}
                        </h1>
                        <p className="text-lg md:text-xl mb-2 text-white font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,1)] bg-black/70 px-4 py-2 rounded-lg inline-block w-fit mx-auto">
                            {formData.subtitle || 'Your subtitle here'}
                        </p>
                        <p className="text-md mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] bg-black/80 px-4 py-2 rounded-lg inline-block w-fit mx-auto">
                            {displayArtistData.followers?.total?.toLocaleString() || "..."} followers on Spotify
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                            <Play className="mr-2 h-5 w-5" />
                            Listen to Music
                            </Button>
                            <Button
                            size="lg"
                            variant="outline"
                             className="border-white text-white hover:bg-white hover:text-background"
                            >
                            View Shows
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
} 