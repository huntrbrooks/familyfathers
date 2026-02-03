import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { getContent, AboutContent } from "@/lib/content";

export async function About() {
  const content: AboutContent = await getContent("about");
  
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl transition-all duration-500 hover:shadow-2xl sm:hover:-translate-y-1">
              <div className="aspect-[4/3] relative">
                <Image
                  src={content.imageUrl}
                  alt={content.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Decorative element - hidden on very small screens */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 bg-[#FAC39D] rounded-full -z-10 opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-xs sm:text-sm font-semibold text-[#02B1C5] uppercase tracking-wider mb-2">
              {content.sectionLabel}
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-snug">
              {content.heading}
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {content.paragraph1}
            </p>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {content.paragraph2}
            </p>

            {/* Features */}
            <ul className="space-y-2 sm:space-y-3 inline-block text-left">
              {content.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3 group cursor-default">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#02B1C5] flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#02B1C5] text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
