"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, ExternalLink, Edit, X, UploadCloud, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo?: string;
  link: string;
  color: string;
}

interface SiteContent {
  sponsors: Sponsor[];
  [key: string]: any;
}

const ImageUpload = ({ value, onChange, onUploadStart, onUploadEnd }: { value: string, onChange: (path: string) => void, onUploadStart: () => void, onUploadEnd: () => void }) => {
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
        <label className="block text-sm font-medium text-gray-700">Sponsor Logo (Optional)</label>
        {value ? (
            <div className="relative w-32 h-32 rounded-md border">
                <img 
                  src={value} 
                  alt="Uploaded logo" 
                  className="w-full h-full object-contain p-2" 
                />
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

export default function SponsorsManager() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [formData, setFormData] = useState<Partial<Sponsor>>({ 
    name: '', 
    description: '', 
    logo: '', 
    link: '', 
    color: 'from-gray-400 to-gray-600'
  });
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/content');
      const data: SiteContent = await response.json();
      setSponsors(data.sponsors || []);
      setSiteContent(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (sponsor: Sponsor) => {
    setEditingSponsorId(sponsor.id);
    setFormData(sponsor);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingSponsorId(null);
    setFormData({ 
      name: '', 
      description: '', 
      logo: '', 
      link: '', 
      color: 'from-gray-400 to-gray-600'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.link || !formData.color) {
      alert('Please fill in all required fields.');
      return;
    }
    
    try {
      const currentContent = await fetchSponsors();
      if (!currentContent) return;

      let updatedSponsors;
      const newSponsorData = { 
        ...formData, 
        id: formData.id || Date.now().toString()
      };

      if (editingSponsorId) {
        updatedSponsors = sponsors.map(s => s.id === editingSponsorId ? newSponsorData : s);
      } else {
        updatedSponsors = [...sponsors, newSponsorData];
      }
      
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentContent, sponsors: updatedSponsors }),
      });

      if (response.ok) {
        handleCancelEdit();
        fetchSponsors();
      } else {
        alert(`Failed to ${editingSponsorId ? 'update' : 'add'} sponsor.`);
      }
    } catch (error) {
      console.error(`Failed to ${editingSponsorId ? 'update' : 'add'} sponsor:`, error);
    }
  };

  const deleteSponsor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) return;
    
    try {
      const currentContent = await fetchSponsors();
      if (!currentContent) return;
      
      const updatedSponsors = currentContent.sponsors.filter(sponsor => sponsor.id !== id);

      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentContent, sponsors: updatedSponsors }),
      });

      if (response.ok) {
        fetchSponsors();
      } else {
        alert('Failed to delete sponsor.');
      }
    } catch (error) {
      console.error('Failed to delete sponsor:', error);
    }
  };

  if (isLoading && !siteContent) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Sponsors</h1>
        <Button onClick={() => window.location.href = '/studio-portal-2024'}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
      </div>

      <Card className="p-6 mb-8" ref={formRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editingSponsorId ? 'Edit Sponsor' : 'Add New Sponsor'}</h2>
          {editingSponsorId && (
            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
              <X className="mr-2" size={16} /> Cancel Edit
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Sponsor Name *"
              value={formData.name || ''}
              onChange={handleFormChange}
              required
            />
            <Input
              name="link"
              placeholder="Website Link *"
              value={formData.link || ''}
              onChange={handleFormChange}
              required
            />
          </div>
          
          <Textarea
            name="description"
            placeholder="Description *"
            value={formData.description || ''}
            onChange={handleFormChange}
            required
            rows={3}
          />
          
          <Input
            name="color"
            placeholder="Tailwind Gradient Classes (e.g., from-blue-500 to-green-500) *"
            value={formData.color || ''}
            onChange={handleFormChange}
            required
          />

          <ImageUpload 
            value={formData.logo || ''}
            onChange={(path) => setFormData(prev => ({ ...prev, logo: path }))}
            onUploadStart={() => setIsUploading(true)}
            onUploadEnd={() => setIsUploading(false)}
          />

          <Button type="submit" className="w-full md:w-auto" disabled={isUploading}>
            {isUploading ? 'Uploading...' : (editingSponsorId ? 'Update Sponsor' : 'Add Sponsor')}
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Current Sponsors ({sponsors.length})</h2>
        {sponsors.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No sponsors added yet.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="p-4 flex flex-col items-center text-center">
                {sponsor.logo ? (
                  <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${sponsor.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {sponsor.name.charAt(0)}
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-2 flex-grow">{sponsor.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{sponsor.description}</p>
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mb-4 flex items-center gap-1">
                  Visit Website <ExternalLink size={14} />
                </a>
                <div className="flex flex-col gap-2 w-full mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(sponsor)}
                    className="w-full"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSponsor(sponsor.id)}
                    className="w-full"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 