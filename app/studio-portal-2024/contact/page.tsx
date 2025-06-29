"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook, Music } from "lucide-react";

const initialForm = {
  email: "",
  phone: "",
  address: "",
  social: {
    spotify: "",
    instagram: "",
    youtube: "",
    twitter: "",
    facebook: "",
    tiktok: ""
  }
};

export default function ContactAdmin() {
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(res => res.json())
      .then(data => {
        setFormData({
          email: data.contact?.email || "",
          phone: data.contact?.phone || "",
          address: data.contact?.address || "",
          social: {
            spotify: data.contact?.social?.spotify || "",
            instagram: data.contact?.social?.instagram || "",
            youtube: data.contact?.social?.youtube || "",
            twitter: data.contact?.social?.twitter || "",
            facebook: data.contact?.social?.facebook || "",
            tiktok: data.contact?.social?.tiktok || ""
          }
        });
      })
      .catch(() => setToast({ type: "error", message: "Failed to load contact info." }))
      .finally(() => setIsLoading(false));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in formData.social) {
      setFormData(prev => ({ ...prev, social: { ...prev.social, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Invalid email address.";
    if (formData.phone && !formData.phone.match(/^[\d\s\-()+]+$/)) return "Invalid phone number.";
    for (const [key, val] of Object.entries(formData.social)) {
      if (val && !val.match(/^https?:\/\//)) return `Invalid URL for ${key}.`;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setToast({ type: "error", message: error });
      return;
    }
    setIsSaving(true);
    try {
      // Fetch current content to preserve other fields
      const res = await fetch("/api/admin/content");
      const content = await res.json();
      const updated = { ...content, contact: formData };
      const saveRes = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (saveRes.ok) {
        setToast({ type: "success", message: "Contact info updated!" });
      } else {
        setToast({ type: "error", message: "Failed to save." });
      }
    } catch {
      setToast({ type: "error", message: "Failed to save." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => window.location.href = '/studio-portal-2024'}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Edit Contact Info</h1>
      </div>
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
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
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <Input
                name="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Textarea
                name="address"
                placeholder="123 Main St, City, Country"
                value={formData.address}
                onChange={handleFormChange}
                rows={2}
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mt-6 mb-2">Social Links</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-green-500" />
                <Input
                  name="spotify"
                  placeholder="https://open.spotify.com/artist/..."
                  value={formData.social.spotify}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                <Input
                  name="instagram"
                  placeholder="https://instagram.com/username"
                  value={formData.social.instagram}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-500" />
                <Input
                  name="youtube"
                  placeholder="https://youtube.com/@channel"
                  value={formData.social.youtube}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-blue-500" />
                <Input
                  name="twitter"
                  placeholder="https://x.com/username"
                  value={formData.social.twitter}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-700" />
                <Input
                  name="facebook"
                  placeholder="https://facebook.com/username"
                  value={formData.social.facebook}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <img src="/socials/tiktok.svg" alt="TikTok" className="h-4 w-4" />
                <Input
                  name="tiktok"
                  placeholder="https://tiktok.com/@username"
                  value={formData.social.tiktok}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
        {toast && (
          <div className={`mt-4 px-4 py-2 rounded text-center font-semibold ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {toast.message}
          </div>
        )}
      </Card>
    </div>
  );
} 