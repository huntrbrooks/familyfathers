"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Upload, Loader2, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroContent, defaultHeroContent } from "@/lib/content";

export default function HeroEditor() {
  const [content, setContent] = useState<HeroContent>(defaultHeroContent);
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
      const res = await fetch("/api/admin/content?section=hero");
      const data = await res.json();
      if (data.hero) {
        setContent(data.hero);
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
        body: JSON.stringify({ section: "hero", content }),
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
            <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
            <p className="text-gray-500 text-sm">Edit the main landing section</p>
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
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
          <div>
            <p className="font-medium">{message.text}</p>
            {message.type === "success" && lastSaved && (
              <p className="text-sm text-green-600 mt-0.5">
                Last saved at {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Heading */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="heading">Main Heading</Label>
            <Input
              id="heading"
              value={content.heading}
              onChange={(e) => setContent((prev) => ({ ...prev, heading: e.target.value }))}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">The main text before the highlight</p>
          </div>
          <div>
            <Label htmlFor="headingHighlight">Highlighted Text</Label>
            <Input
              id="headingHighlight"
              value={content.headingHighlight}
              onChange={(e) => setContent((prev) => ({ ...prev, headingHighlight: e.target.value }))}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">Appears in teal color</p>
          </div>
        </div>

        {/* Subheading */}
        <div>
          <Label htmlFor="subheading">Subheading</Label>
          <textarea
            id="subheading"
            value={content.subheading}
            onChange={(e) => setContent((prev) => ({ ...prev, subheading: e.target.value }))}
            rows={3}
            className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
          />
        </div>

        {/* Badges */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="badge1">Badge 1</Label>
            <Input
              id="badge1"
              value={content.badge1}
              onChange={(e) => setContent((prev) => ({ ...prev, badge1: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="badge2">Badge 2</Label>
            <Input
              id="badge2"
              value={content.badge2}
              onChange={(e) => setContent((prev) => ({ ...prev, badge2: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="ctaButtonText">CTA Button Text</Label>
            <Input
              id="ctaButtonText"
              value={content.ctaButtonText || ""}
              onChange={(e) => setContent((prev) => ({ ...prev, ctaButtonText: e.target.value }))}
              className="mt-2"
              placeholder="e.g., Get in Touch"
            />
          </div>
          <div>
            <Label htmlFor="ctaButtonHref">CTA Button Link</Label>
            <Input
              id="ctaButtonHref"
              value={content.ctaButtonHref || ""}
              onChange={(e) => setContent((prev) => ({ ...prev, ctaButtonHref: e.target.value }))}
              className="mt-2"
              placeholder="e.g., #contact or /services"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <Label>Hero Image</Label>
          <div className="mt-2 flex items-start gap-4">
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
    </div>
  );
}
