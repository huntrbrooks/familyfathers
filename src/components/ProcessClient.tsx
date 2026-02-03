"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProcessContent } from "@/lib/content";

interface ProcessClientProps {
  content: ProcessContent;
}

export function ProcessClient({ content }: ProcessClientProps) {
  return (
    <section id="process" className="py-12 sm:py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {content.sectionTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {content.steps.map((step, index) => (
              <AccordionItem
                key={index}
                value={`step-${index}`}
                className="bg-white rounded-lg sm:rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#02B1C5]/20 data-[state=open]:shadow-md data-[state=open]:border-[#02B1C5]/30"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline group min-h-[60px]">
                  <div className="flex items-start gap-3 sm:gap-4 text-left">
                    <span className="text-xl sm:text-2xl font-bold text-[#02B1C5] transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg transition-colors duration-300 group-hover:text-[#02B1C5]">
                        {step.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                        <span className="text-xs sm:text-sm font-medium text-[#02B1C5]">
                          {step.timeframe}
                        </span>
                        <span className="text-gray-400 hidden sm:inline">•</span>
                        <span className="text-xs sm:text-sm text-gray-500 italic">
                          {step.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <div className="pl-8 sm:pl-12 text-gray-600 whitespace-pre-line leading-relaxed text-xs sm:text-sm md:text-base">
                    {step.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
