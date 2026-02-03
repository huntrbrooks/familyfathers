import { getContent } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Users, Heart, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

// Icon mapping for services
const iconMap: Record<string, React.ElementType> = {
  "Supported Contact (Supervised Visits)": Shield,
  "Structured Changeovers": Users,
  "Virtual Support": Heart,
  "Observation & Documentation": FileText,
};

export default async function ServicesPage() {
  const content = await getContent("services");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#F9F9F9] py-12 md:py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#3d6b4f] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {content.pageTitle}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              {content.pageSubtitle}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8 md:space-y-12">
              {content.services.map((service, index) => {
                const Icon = iconMap[service.title] || Shield;
                return (
                  <div
                    key={index}
                    className="bg-[#F9F9F9] rounded-2xl p-6 md:p-8 border border-gray-100"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#e8f0e6] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#3d6b4f]" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                          {service.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {service.fullDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fees Section */}
        <section className="py-12 md:py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {content.feeSectionTitle}
              </h2>
              <p className="text-gray-600 text-lg">
                {content.feeSectionSubtitle}
              </p>
            </div>

            {/* Fee Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {content.feePlans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:border-[#3d6b4f]/20"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 md:mb-4 text-xs md:text-sm">
                    {plan.title}
                  </h3>
                  <div className="mb-2 md:mb-4">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3d6b4f]">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">
                    {plan.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Travel Info */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                {content.travelTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.travelText}
              </p>
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                {content.additionalServicesTitle}
              </h3>
              <p className="text-gray-600 mb-4">
                {content.additionalServicesText}
              </p>
              <ul className="space-y-2">
                {content.additionalServicesList.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="text-[#3d6b4f]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                {content.paymentTitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.paymentText}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-[#3d6b4f]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Get in touch to discuss your needs or begin the intake process.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center bg-white text-[#3d6b4f] px-8 py-3.5 rounded-[10px] font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
