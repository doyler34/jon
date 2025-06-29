"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Calendar, Edit, Trash2, X, UploadCloud, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  link?: string;
  image?: string;
}

interface SiteContent {
  events: Event[];
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
            <div className="relative w-full h-48 rounded-md border">
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

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/content');
      const data: SiteContent = await response.json();
      setEvents(data.events || []);
      setSiteContent(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (event: Event) => {
    setEditingEventId(event.id);
    setFormData(event);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }
    
    try {
      setIsSaving(true);
      const currentContent = await fetchEvents();
      if (!currentContent) return;

      let updatedEvents;
      const newEventData = { ...formData, id: formData.id || Date.now().toString() };

      if (editingEventId) {
        updatedEvents = events.map(e => e.id === editingEventId ? newEventData : e);
      } else {
        updatedEvents = [...events, newEventData];
      }
      
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentContent, events: updatedEvents }),
      });

      if (response.ok) {
        handleCancelEdit();
        fetchEvents();
      } else {
        alert(`Failed to ${editingEventId ? 'update' : 'add'} event.`);
      }
    } catch (error) {
      console.error(`Failed to ${editingEventId ? 'update' : 'add'} event:`, error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const currentContent = await fetchEvents();
      if (!currentContent) return;
      
      const updatedEvents = currentContent.events.filter(event => event.id !== id);

      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentContent, events: updatedEvents }),
      });

      if (response.ok) {
        fetchEvents();
      } else {
        alert('Failed to delete event.');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => window.location.href = '/studio-portal-2024'}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Manage Events</h1>
      </div>

      <Card className="p-6 mb-8" ref={formRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editingEventId ? 'Edit Event' : 'Add New Event'}</h2>
          {editingEventId && (
            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
              <X className="mr-2" size={16} /> Cancel Edit
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="title"
              placeholder="Event Title *"
              value={formData.title || ''}
              onChange={handleFormChange}
              required
            />
            <Input
              name="date"
              type="date"
              value={formData.date || ''}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="location"
              placeholder="Location (optional)"
              value={formData.location || ''}
              onChange={handleFormChange}
            />
            <Input
              name="link"
              placeholder="Ticket/Event Link (optional)"
              value={formData.link || ''}
              onChange={handleFormChange}
            />
          </div>
          
          <Textarea
            name="description"
            placeholder="Event Description *"
            value={formData.description || ''}
            onChange={handleFormChange}
            required
            rows={4}
          />

          <ImageUpload 
            value={formData.image || ''}
            onChange={(path) => setFormData(prev => ({ ...prev, image: path }))}
            onUploadStart={() => setIsUploading(true)}
            onUploadEnd={() => setIsUploading(false)}
            label="Event Image (optional)"
          />

          <Button type="submit" className="w-full md:w-auto" disabled={isUploading || isSaving}>
            {isSaving ? 'Saving...' : (editingEventId ? 'Update Event' : 'Add Event')}
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Current Events ({events.length})</h2>
        {events.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No events added yet.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="p-4 flex flex-col">
                {event.image ? (
                  <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-gray-200">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                ) : (
                    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No Image</p>
                    </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Upcoming
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2 flex-grow">{event.title}</h3>
                {event.location && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                )}
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{event.description}</p>
                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mb-4 flex items-center gap-1">
                    View Event <ExternalLink size={14} />
                  </a>
                )}
                <div className="flex flex-col gap-2 w-full mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(event)}
                    className="w-full"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteEvent(event.id)}
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