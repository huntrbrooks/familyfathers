"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Trash2,
  Loader2,
  Upload,
  FileText,
  Pencil,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { ResourcesContent, ResourceDocument, defaultResourcesContent } from "@/lib/content";

export default function ResourcesEditor() {
  const [content, setContent] = useState<ResourcesContent>(defaultResourcesContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?section=resources");
      const data = await res.json();
      if (data.resources) {
        setContent(data.resources);
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
        body: JSON.stringify({ section: "resources", content }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Resources saved successfully!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate it's a PDF
    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Please upload a PDF file." });
      return;
    }

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
        // Create new document entry
        const newDocument: ResourceDocument = {
          id: Date.now().toString(),
          name: file.name.replace(".pdf", ""),
          url: data.url,
          uploadedAt: new Date().toISOString(),
        };

        setContent((prev) => ({
          ...prev,
          documents: [...prev.documents, newDocument],
        }));
        setMessage({ type: "success", text: "PDF uploaded successfully! Click Save to persist changes." });
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to upload PDF" });
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleDeleteDocument = (id: string) => {
    setContent((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc) => doc.id !== id),
    }));
    setMessage({ type: "success", text: "Document removed. Click Save to persist changes." });
  };

  const startEditing = (doc: ResourceDocument) => {
    setEditingId(doc.id);
    setEditingName(doc.name);
  };

  const saveEditing = () => {
    if (!editingId) return;

    setContent((prev) => ({
      ...prev,
      documents: prev.documents.map((doc) =>
        doc.id === editingId ? { ...doc, name: editingName } : doc
      ),
    }));
    setEditingId(null);
    setEditingName("");
    setMessage({ type: "success", text: "Document name updated. Click Save to persist changes." });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
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
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-gray-500 text-sm">Upload and manage PDF documents</p>
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

      {/* Page Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sectionTitle">Page Title</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionTitle: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
          <div>
            <Label htmlFor="sectionSubtitle">Page Subtitle</Label>
            <Input
              id="sectionSubtitle"
              value={content.sectionSubtitle}
              onChange={(e) => setContent((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Document</h2>
        <label className="cursor-pointer">
          <div className="flex items-center justify-center gap-2 px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#02B1C5] hover:bg-[#E6F7F9]/20 transition-colors">
            {isUploading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-[#02B1C5]" />
                <span className="text-gray-600">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-gray-600">Click to upload a PDF document</span>
              </>
            )}
          </div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB</p>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Uploaded Documents ({content.documents.length})
        </h2>
        {content.documents.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No documents uploaded yet. Upload a PDF to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {content.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#02B1C5]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  {editingId === doc.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="max-w-xs"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditing();
                          if (e.key === "Escape") cancelEditing();
                        }}
                      />
                      <Button variant="ghost" size="sm" onClick={saveEditing}>
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={cancelEditing}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
                {editingId !== doc.id && (
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-[#02B1C5] hover:bg-[#E6F7F9] rounded-lg transition-colors"
                      title="View document"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => startEditing(doc)}
                      className="p-2 text-gray-500 hover:text-[#02B1C5] hover:bg-[#E6F7F9] rounded-lg transition-colors"
                      title="Edit name"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
