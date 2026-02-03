"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2, GripVertical, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { ProcessContent, defaultProcessContent, ProcessStep } from "@/lib/content";

export default function ProcessEditor() {
  const [content, setContent] = useState<ProcessContent>(defaultProcessContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=process");
      const data = await res.json();
      if (data.process) {
        setContent(data.process);
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
        body: JSON.stringify({ section: "process", content }),
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

  const updateStep = (index: number, field: keyof ProcessStep, value: string) => {
    const newSteps = [...content.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setContent((prev) => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    const nextNumber = String(content.steps.length + 1).padStart(2, "0");
    setContent((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        { number: nextNumber, title: "", timeframe: "", subtitle: "", content: "" },
      ],
    }));
  };

  const removeStep = (index: number) => {
    const newSteps = content.steps.filter((_, i) => i !== index);
    // Renumber remaining steps
    const renumberedSteps = newSteps.map((step, i) => ({
      ...step,
      number: String(i + 1).padStart(2, "0"),
    }));
    setContent((prev) => ({ ...prev, steps: renumberedSteps }));
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
            <h1 className="text-2xl font-bold text-gray-900">Process Section</h1>
            <p className="text-gray-500 text-sm">Edit the step-by-step process</p>
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
            <Label htmlFor="sectionSubtitle">Section Subtitle</Label>
            <Input
              id="sectionSubtitle"
              value={content.sectionSubtitle}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Process Steps</h2>
          <Button variant="outline" size="sm" onClick={addStep}>
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </Button>
        </div>

        <div className="space-y-6">
          {content.steps.map((step, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 mt-1">
                  <GripVertical className="w-5 h-5 text-gray-400" />
                  <span className="text-2xl font-bold text-[#02B1C5]">{step.number}</span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateStep(index, "title", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Timeframe</Label>
                      <Input
                        value={step.timeframe}
                        onChange={(e) => updateStep(index, "timeframe", e.target.value)}
                        className="mt-1"
                        placeholder="e.g., Within 24 hours"
                      />
                    </div>
                    <div>
                      <Label>Subtitle</Label>
                      <Input
                        value={step.subtitle}
                        onChange={(e) => updateStep(index, "subtitle", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Content</Label>
                    <textarea
                      value={step.content}
                      onChange={(e) => updateStep(index, "content", e.target.value)}
                      rows={4}
                      className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
                      placeholder="Detailed content for this step..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Use blank lines to create paragraphs</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                  disabled={content.steps.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
