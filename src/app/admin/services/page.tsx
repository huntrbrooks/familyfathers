"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2, GripVertical, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { ServicesContent, defaultServicesContent, ServiceItem, ServiceFeePlan } from "@/lib/content";

export default function ServicesEditor() {
  const [content, setContent] = useState<ServicesContent>(defaultServicesContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=services");
      const data = await res.json();
      if (data.services) {
        setContent(data.services);
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
        body: JSON.stringify({ section: "services", content }),
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

  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setContent((prev) => ({ ...prev, services: newServices }));
  };

  const addService = () => {
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, { title: "", shortDescription: "", fullDescription: "" }],
    }));
  };

  const removeService = (index: number) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const updateFeePlan = (index: number, field: keyof ServiceFeePlan, value: string) => {
    const newPlans = [...content.feePlans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setContent((prev) => ({ ...prev, feePlans: newPlans }));
  };

  const addFeePlan = () => {
    setContent((prev) => ({
      ...prev,
      feePlans: [...prev.feePlans, { title: "", price: "", description: "" }],
    }));
  };

  const removeFeePlan = (index: number) => {
    setContent((prev) => ({
      ...prev,
      feePlans: prev.feePlans.filter((_, i) => i !== index),
    }));
  };

  const updateAdditionalService = (index: number, value: string) => {
    const newList = [...content.additionalServicesList];
    newList[index] = value;
    setContent((prev) => ({ ...prev, additionalServicesList: newList }));
  };

  const addAdditionalService = () => {
    setContent((prev) => ({
      ...prev,
      additionalServicesList: [...prev.additionalServicesList, ""],
    }));
  };

  const removeAdditionalService = (index: number) => {
    setContent((prev) => ({
      ...prev,
      additionalServicesList: prev.additionalServicesList.filter((_, i) => i !== index),
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
            <h1 className="text-2xl font-bold text-gray-900">Services Page</h1>
            <p className="text-gray-500 text-sm">Edit the /services page content</p>
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

      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Header</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              value={content.pageTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, pageTitle: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="pageSubtitle">Page Subtitle</Label>
            <Input
              id="pageSubtitle"
              value={content.pageSubtitle}
              onChange={(e) => setContent((prev) => ({ ...prev, pageSubtitle: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Services</h2>
          <Button variant="outline" size="sm" onClick={addService}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        <div className="space-y-6">
          {content.services.map((service, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <GripVertical className="w-5 h-5 text-gray-400 mt-2" />
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, "title", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Short Description</Label>
                      <Input
                        value={service.shortDescription}
                        onChange={(e) => updateService(index, "shortDescription", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Full Description</Label>
                    <textarea
                      value={service.fullDescription}
                      onChange={(e) => updateService(index, "fullDescription", e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Plans */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Fee Plans</h2>
          <Button variant="outline" size="sm" onClick={addFeePlan}>
            <Plus className="w-4 h-4 mr-2" />
            Add Fee Plan
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div>
            <Label htmlFor="feeSectionTitle">Fees Section Title</Label>
            <Input
              id="feeSectionTitle"
              value={content.feeSectionTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, feeSectionTitle: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="feeSectionSubtitle">Fees Section Subtitle</Label>
            <Input
              id="feeSectionSubtitle"
              value={content.feeSectionSubtitle}
              onChange={(e) => setContent((prev) => ({ ...prev, feeSectionSubtitle: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.feePlans.map((plan, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Fee Plan {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeePlan(index)}
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
                    onChange={(e) => updateFeePlan(index, "title", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    value={plan.price}
                    onChange={(e) => updateFeePlan(index, "price", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., $250 or Included"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={plan.description}
                    onChange={(e) => updateFeePlan(index, "description", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., per session"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel & Additional Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Travel & Additional Services</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="travelTitle">Travel Section Title</Label>
            <Input
              id="travelTitle"
              value={content.travelTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, travelTitle: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
          <div>
            <Label htmlFor="travelText">Travel Text</Label>
            <textarea
              id="travelText"
              value={content.travelText}
              onChange={(e) => setContent((prev) => ({ ...prev, travelText: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <Label htmlFor="additionalServicesTitle">Additional Services Title</Label>
            <Input
              id="additionalServicesTitle"
              value={content.additionalServicesTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, additionalServicesTitle: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
          <div>
            <Label htmlFor="additionalServicesText">Additional Services Text</Label>
            <textarea
              id="additionalServicesText"
              value={content.additionalServicesText}
              onChange={(e) => setContent((prev) => ({ ...prev, additionalServicesText: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Additional Services List</Label>
              <Button variant="outline" size="sm" onClick={addAdditionalService}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="space-y-2">
              {content.additionalServicesList.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-[#02B1C5]">•</span>
                  <Input
                    value={item}
                    onChange={(e) => updateAdditionalService(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAdditionalService(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment & Invoicing</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="paymentTitle">Payment Section Title</Label>
            <Input
              id="paymentTitle"
              value={content.paymentTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, paymentTitle: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
          <div>
            <Label htmlFor="paymentText">Payment Text</Label>
            <textarea
              id="paymentText"
              value={content.paymentText}
              onChange={(e) => setContent((prev) => ({ ...prev, paymentText: e.target.value }))}
              rows={4}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
