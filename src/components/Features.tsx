import {
  Shield,
  Users,
  Heart,
  FileText,
  Scale,
  Brain,
  AlertTriangle,
  Star,
  CheckCircle,
  Award,
  Briefcase,
  Calendar,
  Clock,
  Home,
  LucideIcon,
} from "lucide-react";
import { getContent, FeaturesContent } from "@/lib/content";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Shield,
  Users,
  Heart,
  FileText,
  Scale,
  Brain,
  AlertTriangle,
  Star,
  CheckCircle,
  Award,
  Briefcase,
  Calendar,
  Clock,
  Home,
};

// Icon mapping helper
const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Star;
};

export async function Features() {
  const content: FeaturesContent = await getContent("features");
  
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.sectionTitle}
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {content.features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg sm:hover:-translate-y-1 hover:border-[#02B1C5]/20 active:scale-[0.98] sm:active:scale-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E6F7F9] flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-[#02B1C5] group-hover:scale-110">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#02B1C5] transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base transition-colors duration-300 group-hover:text-[#02B1C5]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Highlights */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-8">
          {content.highlights.map((highlight, index) => {
            const Icon = getIcon(highlight.icon);
            return (
              <div
                key={index}
                className="flex items-center justify-center sm:justify-start gap-2 text-gray-700 transition-all duration-300 hover:text-[#02B1C5] cursor-default"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#02B1C5] flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base">{highlight.text}</span>
              </div>
            );
          })}
        </div>

        {/* Best Practice Statement */}
        <div className="mt-10 sm:mt-16 bg-[#F9F9F9] rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center leading-snug">
            {content.bestPracticeHeading}
          </h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            {content.bestPracticeParagraph1}
          </p>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mt-3 sm:mt-4 text-sm sm:text-base">
            {content.bestPracticeParagraph2}
          </p>
          <div className="flex justify-center mt-6 sm:mt-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#02B1C5] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-[10px] font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#019AAD] hover:shadow-lg hover:shadow-[#02B1C5]/25 sm:hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              {content.ctaButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
