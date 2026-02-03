import { getContent } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ResourcesPage() {
  const content = await getContent("resources");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-[#F9F9F9]">
        {/* Hero Section */}
        <section className="bg-white py-12 md:py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#02B1C5] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.sectionTitle}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              {content.sectionSubtitle}
            </p>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {content.documents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Documents Available
                </h2>
                <p className="text-gray-500">
                  Please check back later for important documents and policies.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:gap-6">
                {content.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4 hover:border-[#02B1C5]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <FileText className="w-7 h-7 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#02B1C5] transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-gray-500">PDF Document</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2 text-[#02B1C5] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium hidden sm:inline">View Document</span>
                      <Download className="w-5 h-5" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
