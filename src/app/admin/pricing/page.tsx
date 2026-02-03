"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2, Star } from "lucide-react";
import Link from "next/link";
import { PricingContent, defaultPricingContent, PricingPlan } from "@/lib/content";

export default function PricingEditor() {
  const [content, setContent] = useState<PricingContent>(defaultPricingContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=pricing");
      const data = await res.json();
      if (data.pricing) {
        setContent(data.pricing);
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
        body: JSON.stringify({ section: "pricing", content }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Pricing section saved successfully!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const updatePlan = (index: number, field: keyof PricingPlan, value: string | boolean) => {
    const newPlans = [...content.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setContent((prev) => ({ ...prev, plans: newPlans }));
  };

  const addPlan = () => {
    setContent((prev) => ({
      ...prev,
      plans: [...prev.plans, { title: "", price: "$0", description: "", highlight: false }],
    }));
  };

  const removePlan = (index: number) => {
    setContent((prev) => ({
      ...prev,
      plans: prev.plans.filter((_, i) => i !== index),
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
            <h1 className="text-2xl font-bold text-gray-900">Pricing Section</h1>
            <p className="text-gray-500 text-sm">Edit pricing plans and fees</p>
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
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionTitle: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="priceSuffix">Price Suffix</Label>
            <Input
              id="priceSuffix"
              value={content.priceSuffix}
              onChange={(e) => setContent((prev) => ({ ...prev, priceSuffix: e.target.value }))}
              className="mt-2"
              placeholder="e.g., inc GST"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="sectionSubtitle">Section Subtitle</Label>
          <Input
            id="sectionSubtitle"
            value={content.sectionSubtitle}
            onChange={(e) => setContent((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
            className="mt-2"
          />
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Pricing Plans</h2>
          <Button variant="outline" size="sm" onClick={addPlan}>
            <Plus className="w-4 h-4 mr-2" />
            Add Plan
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.plans.map((plan, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                plan.highlight ? "border-[#02B1C5] bg-[#02B1C5]/5" : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <button
                  onClick={() => updatePlan(index, "highlight", !plan.highlight)}
                  className={`flex items-center gap-1 text-sm ${
                    plan.highlight ? "text-[#02B1C5]" : "text-gray-400"
                  }`}
                >
                  <Star className={`w-4 h-4 ${plan.highlight ? "fill-current" : ""}`} />
                  {plan.highlight ? "Featured" : "Make Featured"}
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePlan(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={plan.title}
                    onChange={(e) => updatePlan(index, "title", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    value={plan.price}
                    onChange={(e) => updatePlan(index, "price", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., $250"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={plan.description}
                    onChange={(e) => updatePlan(index, "description", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="additionalInfoTitle">Title</Label>
            <Input
              id="additionalInfoTitle"
              value={content.additionalInfoTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, additionalInfoTitle: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="additionalInfoText">Text</Label>
            <textarea
              id="additionalInfoText"
              value={content.additionalInfoText}
              onChange={(e) => setContent((prev) => ({ ...prev, additionalInfoText: e.target.value }))}
              rows={3}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Call to Action</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="ctaHeading">CTA Heading</Label>
            <Input
              id="ctaHeading"
              value={content.ctaHeading}
              onChange={(e) => setContent((prev) => ({ ...prev, ctaHeading: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="ctaButtonText">Button Text</Label>
            <Input
              id="ctaButtonText"
              value={content.ctaButtonText}
              onChange={(e) => setContent((prev) => ({ ...prev, ctaButtonText: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
