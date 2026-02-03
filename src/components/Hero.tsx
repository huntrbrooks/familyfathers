import { CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F9F9F9] py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Specialists in child-centred supervision to support{" "}
              <span className="text-[#02B1C5]">your family</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              At Family Fathers, we provide innovative, specialised child
              contact services for family law matters. Our professional and
              caring supervisors facilitate court ordered time arrangements
              between parents and children for your peace of mind.
            </p>

            {/* Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mt-2 justify-center lg:justify-start">
              <div className="inline-flex items-center justify-center gap-2 bg-[#FEF3EB] text-[#F5A66A] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#FAC39D] transition-all duration-300 hover:shadow-md sm:hover:scale-105 cursor-default">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Weekday & Weekend Visits
                </span>
              </div>
              <div className="inline-flex items-center justify-center gap-2 bg-[#FEF3EB] text-[#F5A66A] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#FAC39D] transition-all duration-300 hover:shadow-md sm:hover:scale-105 cursor-default">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Metropolitan Melbourne
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mt-4 lg:mt-0">
            {/* Decorative teal circle with animation - hidden on very small screens */}
            <div className="hidden sm:block absolute -top-4 sm:-top-8 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-[#02B1C5] rounded-full -z-10 translate-x-1/4 animate-pulse" style={{ animationDuration: '3s' }} />

            {/* Main image */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl transition-all duration-500 hover:shadow-2xl sm:hover:-translate-y-1">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/hero-family.jpg"
                  alt="Family playing together outdoors in the sunshine"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
