"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Image,
  Layers,
  ListOrdered,
  DollarSign,
  MapPin,
  Info,
  MessageSquare,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    href: "/admin/hero",
    icon: Image,
    title: "Hero Section",
    description: "Edit heading, subheading, badges, and hero image",
    color: "bg-blue-500",
  },
  {
    href: "/admin/features",
    icon: Layers,
    title: "Features",
    description: "Manage feature cards, highlights, and best practice section",
    color: "bg-purple-500",
  },
  {
    href: "/admin/process",
    icon: ListOrdered,
    title: "Process Steps",
    description: "Edit the 4-step process with titles and content",
    color: "bg-green-500",
  },
  {
    href: "/admin/pricing",
    icon: DollarSign,
    title: "Pricing",
    description: "Update pricing plans and additional info",
    color: "bg-yellow-500",
  },
  {
    href: "/admin/service-areas",
    icon: MapPin,
    title: "Service Areas",
    description: "Manage Melbourne regions and council areas",
    color: "bg-red-500",
  },
  {
    href: "/admin/about",
    icon: Info,
    title: "About Section",
    description: "Edit about content, features list, and team image",
    color: "bg-indigo-500",
  },
  {
    href: "/admin/contact",
    icon: MessageSquare,
    title: "Contact & Footer",
    description: "Manage contact form options, footer content, and contact info",
    color: "bg-teal-500",
  },
];

export default function AdminDashboard() {
  const [lastUpdated] = useState(() => new Date().toLocaleString());

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Content Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your website content from here
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-gray-900">Quick Actions</h2>
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Dashboard loaded: {lastUpdated}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Link href="/" target="_blank">
              <Button size="sm" className="gap-2 bg-[#02B1C5] hover:bg-[#019AAD]">
                <ExternalLink className="w-4 h-4" />
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#02B1C5]/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#02B1C5] transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {section.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-gradient-to-r from-[#02B1C5]/10 to-[#FAC39D]/10 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-2">How to use</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click on any section above to edit its content</li>
          <li>• Changes are saved when you click the Save button</li>
          <li>• Use &quot;View Site&quot; to preview your changes on the live website</li>
          <li>• Images can be uploaded in the Hero and About sections</li>
        </ul>
      </div>
    </div>
  );
}
