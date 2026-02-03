"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ServiceAreasContent, defaultServiceAreasContent, ServiceArea, Council } from "@/lib/content";

export default function ServiceAreasEditor() {
  const [content, setContent] = useState<ServiceAreasContent>(defaultServiceAreasContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedRegions, setExpandedRegions] = useState<number[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=serviceAreas");
      const data = await res.json();
      if (data.serviceAreas) {
        setContent(data.serviceAreas);
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
        body: JSON.stringify({ section: "serviceAreas", content }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Service areas saved successfully!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleRegion = (index: number) => {
    setExpandedRegions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const updateArea = (index: number, field: keyof ServiceArea, value: string | Council[]) => {
    const newAreas = [...content.areas];
    newAreas[index] = { ...newAreas[index], [field]: value };
    setContent((prev) => ({ ...prev, areas: newAreas }));
  };

  const updateCouncil = (areaIndex: number, councilIndex: number, field: keyof Council, value: string | null) => {
    const newAreas = [...content.areas];
    const newCouncils = [...newAreas[areaIndex].councils];
    newCouncils[councilIndex] = { ...newCouncils[councilIndex], [field]: value };
    newAreas[areaIndex] = { ...newAreas[areaIndex], councils: newCouncils };
    setContent((prev) => ({ ...prev, areas: newAreas }));
  };

  const addArea = () => {
    setContent((prev) => ({
      ...prev,
      areas: [...prev.areas, { region: "New Region", councils: [] }],
    }));
    setExpandedRegions((prev) => [...prev, content.areas.length]);
  };

  const removeArea = (index: number) => {
    setContent((prev) => ({
      ...prev,
      areas: prev.areas.filter((_, i) => i !== index),
    }));
  };

  const addCouncil = (areaIndex: number) => {
    const newAreas = [...content.areas];
    newAreas[areaIndex].councils.push({ name: "", example: null });
    setContent((prev) => ({ ...prev, areas: newAreas }));
  };

  const removeCouncil = (areaIndex: number, councilIndex: number) => {
    const newAreas = [...content.areas];
    newAreas[areaIndex].councils = newAreas[areaIndex].councils.filter((_, i) => i !== councilIndex);
    setContent((prev) => ({ ...prev, areas: newAreas }));
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
            <h1 className="text-2xl font-bold text-gray-900">Service Areas</h1>
            <p className="text-gray-500 text-sm">Manage Melbourne regions and councils</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#02B1C5] hover:bg-[#019AAD]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {/* Section Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionTitle: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
          <div>
            <Label htmlFor="sectionSubtitle">Section Subtitle</Label>
            <textarea
              id="sectionSubtitle"
              value={content.sectionSubtitle}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <Label htmlFor="helperText">Helper Text</Label>
            <Input
              id="helperText"
              value={content.helperText}
              onChange={(e) => setContent((prev) => ({ ...prev, helperText: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Regions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Regions & Councils</h2>
          <Button variant="outline" size="sm" onClick={addArea}>
            <Plus className="w-4 h-4 mr-2" />
            Add Region
          </Button>
        </div>

        <div className="space-y-4">
          {content.areas.map((area, areaIndex) => (
            <div key={areaIndex} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Region Header */}
              <div
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleRegion(areaIndex)}
              >
                <div className="flex items-center gap-3">
                  {expandedRegions.includes(areaIndex) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <Input
                    value={area.region}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateArea(areaIndex, "region", e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-xs font-medium"
                  />
                  <span className="text-sm text-gray-500">
                    ({area.councils.length} councils)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeArea(areaIndex);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Councils */}
              {expandedRegions.includes(areaIndex) && (
                <div className="p-4 space-y-3">
                  {area.councils.map((council, councilIndex) => (
                    <div key={councilIndex} className="flex items-center gap-3">
                      <span className="text-[#02B1C5]">•</span>
                      <Input
                        value={council.name}
                        onChange={(e) => updateCouncil(areaIndex, councilIndex, "name", e.target.value)}
                        placeholder="Council name"
                        className="flex-1"
                      />
                      <Input
                        value={council.example || ""}
                        onChange={(e) => updateCouncil(areaIndex, councilIndex, "example", e.target.value || null)}
                        placeholder="e.g. Suburb name (optional)"
                        className="w-48"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCouncil(areaIndex, councilIndex)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addCouncil(areaIndex)}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Council
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
