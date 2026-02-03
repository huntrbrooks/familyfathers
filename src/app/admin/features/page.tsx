"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2, GripVertical, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { FeaturesContent, defaultFeaturesContent, FeatureItem, HighlightItem } from "@/lib/content";

const availableIcons = [
  "Shield", "Users", "Heart", "FileText", "Scale", "Brain", "AlertTriangle",
  "Star", "CheckCircle", "Award", "Briefcase", "Calendar", "Clock", "Home",
];

export default function FeaturesEditor() {
  const [content, setContent] = useState<FeaturesContent>(defaultFeaturesContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=features");
      const data = await res.json();
      if (data.features) {
        setContent(data.features);
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
        body: JSON.stringify({ section: "features", content }),
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

  const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setContent((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setContent((prev) => ({
      ...prev,
      features: [...prev.features, { icon: "Star", title: "", description: "" }],
    }));
  };

  const removeFeature = (index: number) => {
    setContent((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateHighlight = (index: number, field: keyof HighlightItem, value: string) => {
    const newHighlights = [...content.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setContent((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setContent((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { icon: "CheckCircle", text: "" }],
    }));
  };

  const removeHighlight = (index: number) => {
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
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
            <h1 className="text-2xl font-bold text-gray-900">Features Section</h1>
            <p className="text-gray-500 text-sm">Edit feature cards and highlights</p>
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

      {/* Section Title */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <Label htmlFor="sectionTitle">Section Title</Label>
        <Input
          id="sectionTitle"
          value={content.sectionTitle}
          onChange={(e) => setContent((prev) => ({ ...prev, sectionTitle: e.target.value }))}
          className="mt-2 max-w-md"
        />
      </div>

      {/* Feature Cards */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Feature Cards</h2>
          <Button variant="outline" size="sm" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>

        <div className="space-y-4">
          {content.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <GripVertical className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
              <div className="flex-1 grid gap-3 md:grid-cols-4">
                <div>
                  <Label>Icon</Label>
                  <select
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, "icon", e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => updateFeature(index, "title", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Input
                    value={feature.description}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
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

      {/* Highlights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Highlights</h2>
          <Button variant="outline" size="sm" onClick={addHighlight}>
            <Plus className="w-4 h-4 mr-2" />
            Add Highlight
          </Button>
        </div>

        <div className="space-y-3">
          {content.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <select
                value={highlight.icon}
                onChange={(e) => updateHighlight(index, "icon", e.target.value)}
                className="w-32 rounded-md border border-gray-200 px-3 py-2 text-sm"
              >
                {availableIcons.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <Input
                value={highlight.text}
                onChange={(e) => updateHighlight(index, "text", e.target.value)}
                className="flex-1"
                placeholder="Highlight text"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHighlight(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practice Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Best Practice Section</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bestPracticeHeading">Heading</Label>
            <Input
              id="bestPracticeHeading"
              value={content.bestPracticeHeading}
              onChange={(e) => setContent((prev) => ({ ...prev, bestPracticeHeading: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="bestPracticeParagraph1">Paragraph 1</Label>
            <textarea
              id="bestPracticeParagraph1"
              value={content.bestPracticeParagraph1}
              onChange={(e) => setContent((prev) => ({ ...prev, bestPracticeParagraph1: e.target.value }))}
              rows={3}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <Label htmlFor="bestPracticeParagraph2">Paragraph 2</Label>
            <textarea
              id="bestPracticeParagraph2"
              value={content.bestPracticeParagraph2}
              onChange={(e) => setContent((prev) => ({ ...prev, bestPracticeParagraph2: e.target.value }))}
              rows={3}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <Label htmlFor="ctaButtonText">CTA Button Text</Label>
            <Input
              id="ctaButtonText"
              value={content.ctaButtonText}
              onChange={(e) => setContent((prev) => ({ ...prev, ctaButtonText: e.target.value }))}
              className="mt-2 max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
