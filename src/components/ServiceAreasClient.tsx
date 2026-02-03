"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceAreasContent } from "@/lib/content";

interface ServiceAreasClientProps {
  content: ServiceAreasContent;
}

export function ServiceAreasClient({ content }: ServiceAreasClientProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {content.sectionTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            {content.sectionSubtitle}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
            {content.helperText}
          </p>
        </div>

        {/* Service Areas Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {content.areas.map((area, index) => (
              <AccordionItem
                key={index}
                value={`area-${index}`}
                className="bg-[#F9F9F9] rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#02B1C5]/20 data-[state=open]:shadow-md data-[state=open]:border-[#02B1C5]/30"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline group text-left">
                  <span className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#02B1C5] text-sm sm:text-base">
                    {area.region}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <ul className="space-y-1.5 sm:space-y-2">
                    {area.councils.map((council, councilIndex) => (
                      <li
                        key={councilIndex}
                        className="text-gray-600 text-xs sm:text-sm flex items-start gap-2 transition-colors duration-200 hover:text-gray-900"
                      >
                        <span className="text-[#02B1C5] mt-0.5 sm:mt-1">•</span>
                        <span>
                          {council.name}
                          {council.example && (
                            <span className="text-gray-400 italic ml-1 text-xs">
                              ({council.example})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
