"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2, Upload, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AboutContent, defaultAboutContent } from "@/lib/content";

export default function AboutEditor() {
  const [content, setContent] = useState<AboutContent>(defaultAboutContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=about");
      const data = await res.json();
      if (data.about) {
        setContent(data.about);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "about", content }),
      });

      if (res.ok) {
        setLastSaved(new Date());
        setMessage({ type: "success", text: "Saved — your changes are now live on the website" });
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setContent((prev) => ({ ...prev, imageUrl: data.url }));
        setMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to upload image" });
    } finally {
      setIsUploading(false);
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = value;
    setContent((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setContent((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setContent((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#02B1C5]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">About Section</h1>
            <p className="text-gray-500 text-sm">Edit about content and team image</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="flex items-center gap-1.5 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <Circle className="w-2 h-2 fill-green-500 text-green-500" />
              <span>Live</span>
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#02B1C5] hover:bg-[#019AAD]"
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
          <div>
            <p className="font-medium">{message.text}</p>
            {message.type === "success" && lastSaved && (
              <p className="text-sm text-green-600 mt-0.5">Last saved at {lastSaved.toLocaleTimeString()}</p>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="sectionLabel">Section Label</Label>
            <Input
              id="sectionLabel"
              value={content.sectionLabel}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionLabel: e.target.value }))}
              className="mt-2 max-w-xs"
            />
          </div>
          <div>
            <Label htmlFor="heading">Main Heading</Label>
            <textarea
              id="heading"
              value={content.heading}
              onChange={(e) => setContent((prev) => ({ ...prev, heading: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <Label htmlFor="paragraph1">Paragraph 1</Label>
            <textarea
              id="paragraph1"
              value={content.paragraph1}
              onChange={(e) => setContent((prev) => ({ ...prev, paragraph1: e.target.value }))}
              rows={4}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <Label htmlFor="paragraph2">Paragraph 2</Label>
            <textarea
              id="paragraph2"
              value={content.paragraph2}
              onChange={(e) => setContent((prev) => ({ ...prev, paragraph2: e.target.value }))}
              rows={4}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
        </div>
      </div>

      {/* Feature Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Feature Checklist</h2>
          <Button variant="outline" size="sm" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
        <div className="space-y-3">
          {content.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-[#02B1C5]">✓</span>
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1"
                placeholder="Feature item"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Image</h2>
        <div className="flex items-start gap-4">
          <div className="relative w-48 h-36 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            {content.imageUrl && (
              <Image
                src={content.imageUrl}
                alt={content.imageAlt}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-fit">
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span className="text-sm">Upload New Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            <div className="mt-3">
              <Label htmlFor="imageAlt">Image Alt Text</Label>
              <Input
                id="imageAlt"
                value={content.imageAlt}
                onChange={(e) => setContent((prev) => ({ ...prev, imageAlt: e.target.value }))}
                className="mt-1"
                placeholder="Describe the image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
