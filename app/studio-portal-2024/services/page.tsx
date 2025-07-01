"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, ArrowLeft, Music, Calendar, Users, Building, Mail, Phone, MapPin, Globe, Star, Heart } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const ICON_OPTIONS = [
  { name: "Music", icon: Music },
  { name: "Calendar", icon: Calendar },
  { name: "Users", icon: Users },
  { name: "Building", icon: Building },
  { name: "Mail", icon: Mail },
  { name: "Phone", icon: Phone },
  { name: "MapPin", icon: MapPin },
  { name: "Globe", icon: Globe },
  { name: "Star", icon: Star },
  { name: "Heart", icon: Heart },
];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [siteContent, setSiteContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    setSiteContent(data);
    setServices(data.businessServices || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceChange = (idx: number, field: keyof Service, value: any) => {
    setServices(prev => prev.map((s, i) => i === idx ? { ...s, [field]: field === 'icon' ? String(value) : value } : s));
  };

  const handleFeatureChange = (idx: number, fIdx: number, value: string) => {
    setServices(prev => prev.map((s, i) => i === idx ? { ...s, features: s.features.map((f, j) => j === fIdx ? value : f) } : s));
  };

  const addService = () => {
    setServices(prev => [...prev, { title: "", description: "", icon: "Music", color: "bg-purple-600", features: [""] }]);
  };

  const removeService = (idx: number) => {
    setServices(prev => prev.filter((_, i) => i !== idx));
  };

  const addFeature = (idx: number) => {
    setServices(prev => prev.map((s, i) => i === idx ? { ...s, features: [...s.features, ""] } : s));
  };

  const removeFeature = (idx: number, fIdx: number) => {
    setServices(prev => prev.map((s, i) => i === idx ? { ...s, features: s.features.filter((_, j) => j !== fIdx) } : s));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...siteContent, businessServices: services.map(s => ({ ...s, icon: String(s.icon) })) }),
      });
      if (!response.ok) throw new Error('Failed to save');
      await fetchServices(); // Refresh data after save
      alert("Services updated!");
    } catch (err) {
      alert("Failed to update services. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => window.location.href = '/studio-portal-2024'}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
      </div>
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Edit Business Services</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {services.map((service, idx) => (
            <div key={idx} className="border rounded-lg p-4 mb-4 relative bg-muted/30">
              <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeService(idx)}><X size={16} /></Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="title"
                  placeholder="Service Title"
                  value={service.title}
                  onChange={e => handleServiceChange(idx, "title", e.target.value)}
                  required
                />
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <select
                    className="w-full border rounded px-2 py-2 bg-background"
                    value={service.icon}
                    onChange={e => handleServiceChange(idx, "icon", e.target.value)}
                    required
                  >
                    {ICON_OPTIONS.map(opt => (
                      <option key={opt.name} value={opt.name}>{opt.name}</option>
                    ))}
                  </select>
                  <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                    {(() => {
                      const IconComponent = ICON_OPTIONS.find(opt => opt.name === service.icon)?.icon;
                      return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
                    })()}
                    <span className="text-xs">{service.icon}</span>
                  </div>
                </div>
                <Input
                  name="color"
                  placeholder="Color (e.g. bg-purple-600)"
                  value={service.color}
                  onChange={e => handleServiceChange(idx, "color", e.target.value)}
                  required
                />
              </div>
              <Textarea
                name="description"
                placeholder="Service Description"
                value={service.description}
                onChange={e => handleServiceChange(idx, "description", e.target.value)}
                required
                rows={3}
                className="mt-4"
              />
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Features</span>
                  <Button type="button" size="sm" variant="secondary" onClick={() => addFeature(idx)}><Plus size={16} className="mr-1" /> Add Feature</Button>
                </div>
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 mb-2">
                    <Input
                      value={feature}
                      onChange={e => handleFeatureChange(idx, fIdx, e.target.value)}
                      placeholder="Feature"
                      className="flex-1"
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(idx, fIdx)}><X size={16} /></Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addService}><Plus size={16} className="mr-1" /> Add Service</Button>
          <div className="mt-8">
            <Button type="submit" className="w-full text-lg font-bold" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 