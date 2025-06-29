"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, UploadCloud, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getArtistById, hasSpotifyCredentials } from "@/lib/spotify";

interface AboutData {
  title: string;
  bio: string;
  aboutImage?: string;
}

interface SiteContent {
  about: AboutData;
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

export default function AboutManager() {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [formData, setFormData] = useState<AboutData>({
    title: '',
    bio: '',
    aboutImage: ''
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
          setFormData(contentData.about || { title: '', bio: '', aboutImage: '' });
  
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
    if (!formData.title || !formData.bio) {
      alert('Please fill in the title and bio fields.');
      return;
    }
    
    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...siteContent, 
          about: formData 
        }),
      });

      if (response.ok) {
        alert('About section updated successfully!');
      } else {
        alert('Failed to update about section.');
      }
    } catch (error) {
      console.error('Failed to update about section:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const fallbackArtistData = {
    images: [{}, { url: "/placeholder.svg?height=600&width=500" }],
    genres: ["Rock", "Electronic", "Pop"],
  }
  const displayArtistData = artistData || fallbackArtistData;
  const aboutImageSrc = formData.aboutImage || displayArtistData.images?.[1]?.url;

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
                    <h2 className="text-xl font-semibold mb-4">Edit About Content</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                        name="title"
                        placeholder="Section Title *"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                        />
                        
                        <Textarea
                        name="bio"
                        placeholder="Bio/Description *"
                        value={formData.bio}
                        onChange={handleFormChange}
                        required
                        rows={10}
                        />

                        <ImageUpload 
                        value={formData.aboutImage || ''}
                        onChange={(path) => setFormData(prev => ({ ...prev, aboutImage: path }))}
                        onUploadStart={() => setIsUploading(true)}
                        onUploadEnd={() => setIsUploading(false)}
                        label="Custom About Image (optional)"
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
                    <section className="p-8 sm:p-12 bg-muted/50">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-6">{formData.title || 'About Section Title'}</h2>
                                <p className="text-muted-foreground text-md sm:text-lg mb-6 leading-relaxed">
                                    {formData.bio || 'Your bio will appear here. This is a great place to tell your story, share your journey, and connect with your fans on a personal level.'}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {(displayArtistData.genres || []).slice(0, 4).map((genre: string, index: number) => (
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
                            </div>
                            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto">
                                {aboutImageSrc ? (
                                    <Image
                                        src={aboutImageSrc}
                                        alt="About Portrait Preview"
                                        fill
                                        className="rounded-lg shadow-2xl object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 rounded-lg shadow-2xl flex items-center justify-center">
                                        <p className="text-gray-500">No Image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
      </div>
    </div>
  );
} 