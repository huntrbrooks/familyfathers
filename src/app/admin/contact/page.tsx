"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { ContactContent, FooterContent, defaultContactContent, defaultFooterContent, EnquiryOption, NavLink } from "@/lib/content";

export default function ContactFooterEditor() {
  const [contactContent, setContactContent] = useState<ContactContent>(defaultContactContent);
  const [footerContent, setFooterContent] = useState<FooterContent>(defaultFooterContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [contactRes, footerRes] = await Promise.all([
        fetch("/api/admin/content?section=contact"),
        fetch("/api/admin/content?section=footer"),
      ]);
      const contactData = await contactRes.json();
      const footerData = await footerRes.json();
      
      if (contactData.contact) setContactContent(contactData.contact);
      if (footerData.footer) setFooterContent(footerData.footer);
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
      const [contactRes, footerRes] = await Promise.all([
        fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "contact", content: contactContent }),
        }),
        fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "footer", content: footerContent }),
        }),
      ]);

      if (contactRes.ok && footerRes.ok) {
        setMessage({ type: "success", text: "Contact and footer saved successfully!" });
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const updateEnquiryOption = (index: number, field: keyof EnquiryOption, value: string) => {
    const newOptions = [...contactContent.enquiryOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setContactContent((prev) => ({ ...prev, enquiryOptions: newOptions }));
  };

  const addEnquiryOption = () => {
    setContactContent((prev) => ({
      ...prev,
      enquiryOptions: [...prev.enquiryOptions, { value: "", label: "" }],
    }));
  };

  const removeEnquiryOption = (index: number) => {
    setContactContent((prev) => ({
      ...prev,
      enquiryOptions: prev.enquiryOptions.filter((_, i) => i !== index),
    }));
  };

  const updateNavLink = (index: number, field: keyof NavLink, value: string) => {
    const newLinks = [...footerContent.navLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooterContent((prev) => ({ ...prev, navLinks: newLinks }));
  };

  const addNavLink = () => {
    setFooterContent((prev) => ({
      ...prev,
      navLinks: [...prev.navLinks, { href: "#", label: "" }],
    }));
  };

  const removeNavLink = (index: number) => {
    setFooterContent((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== index),
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
            <h1 className="text-2xl font-bold text-gray-900">Contact & Footer</h1>
            <p className="text-gray-500 text-sm">Manage contact form and footer content</p>
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

      {/* Contact Form Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Form</h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="contactTitle">Section Title</Label>
              <Input
                id="contactTitle"
                value={contactContent.sectionTitle}
                onChange={(e) => setContactContent((prev) => ({ ...prev, sectionTitle: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={contactContent.phoneNumber}
                onChange={(e) => setContactContent((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="contactSubtitle">Section Subtitle</Label>
            <Input
              id="contactSubtitle"
              value={contactContent.sectionSubtitle}
              onChange={(e) => setContactContent((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Enquiry Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Enquiry Options</h2>
          <Button variant="outline" size="sm" onClick={addEnquiryOption}>
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>
        <div className="space-y-3">
          {contactContent.enquiryOptions.map((option, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Input
                value={option.value}
                onChange={(e) => updateEnquiryOption(index, "value", e.target.value)}
                placeholder="Value (e.g., supervision)"
                className="w-40"
              />
              <Input
                value={option.label}
                onChange={(e) => updateEnquiryOption(index, "label", e.target.value)}
                placeholder="Display label"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEnquiryOption(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Success Message</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="successHeading">Success Heading</Label>
            <Input
              id="successHeading"
              value={contactContent.successHeading}
              onChange={(e) => setContactContent((prev) => ({ ...prev, successHeading: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="successMessage">Success Message</Label>
            <textarea
              id="successMessage"
              value={contactContent.successMessage}
              onChange={(e) => setContactContent((prev) => ({ ...prev, successMessage: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer Content</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <textarea
              id="tagline"
              value={footerContent.tagline}
              onChange={(e) => setFooterContent((prev) => ({ ...prev, tagline: e.target.value }))}
              rows={2}
              className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02B1C5]"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="footerPhone">Phone</Label>
              <Input
                id="footerPhone"
                value={footerContent.phone}
                onChange={(e) => setFooterContent((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="footerEmail">Email</Label>
              <Input
                id="footerEmail"
                value={footerContent.email}
                onChange={(e) => setFooterContent((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="copyrightText">Copyright Text</Label>
            <Input
              id="copyrightText"
              value={footerContent.copyrightText}
              onChange={(e) => setFooterContent((prev) => ({ ...prev, copyrightText: e.target.value }))}
              className="mt-2 max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Navigation Links</h2>
          <Button variant="outline" size="sm" onClick={addNavLink}>
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>
        <p className="text-sm text-gray-500 mb-4">These links appear in both the header and footer navigation.</p>
        <div className="space-y-3">
          {footerContent.navLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Input
                value={link.href}
                onChange={(e) => updateNavLink(index, "href", e.target.value)}
                placeholder="Link (e.g., #about)"
                className="w-40"
              />
              <Input
                value={link.label}
                onChange={(e) => updateNavLink(index, "label", e.target.value)}
                placeholder="Display text"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNavLink(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
