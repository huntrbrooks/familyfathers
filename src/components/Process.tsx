"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    number: "01",
    title: "Contact Family Fathers",
    timeframe: "Within 24 hours",
    subtitle: "Understand Your Options",
    content: `Send in your enquiry and we will respond within 24 hours. We understand that your child is your life, and we are here to talk through your concerns and gain an understanding of your unique situation.

We can answer questions such as whether supervision is available in your area and when time can commence. In the event that no services are immediately available, we may place you on our waitlist.`,
  },
  {
    number: "02",
    title: "Intake Assessment",
    timeframe: "Within 7 days",
    subtitle: "Intake Assessments Scheduled",
    content: `Once your matter has been allocated to a suitable supervisor, both parents are required to undertake an initial assessment to determine the specific requirements of your situation and any interventions required to ensure reliable service provision.

The appointed supervisor will proceed to develop a plan as to how supervised time will proceed based on the best interests of the child, the preferences of the parents, and any court ordered requirements. Intakes can progress more quickly if both parties pay the relevant fees and have the relevant availability.`,
  },
  {
    number: "03",
    title: "Supervised Visits",
    timeframe: "Within 14 days",
    subtitle: "Supervised Visit Scheduled",
    content: `Once your matter has been deemed suitable for supervised contact to proceed, the appointed supervisor will schedule supervised time with the non-resident parent and the child to proceed.

Based on the information provided during the initial assessment, an appropriate plan will be developed with relevant interventions required depending on your unique situation and the particular needs of your child. Supervised visits will be directed at the discretion of the supervisor and can be provided on an ongoing basis if required.`,
  },
  {
    number: "04",
    title: "Observation Report",
    timeframe: "Within 7 days",
    subtitle: "Observation Report Prepared",
    content: `These reports provide the Court with detailed observations on your child, interactions with both parents, and any areas of concern identified by the contact supervisor during your engagement with Family Fathers. We understand that an observation report can make or break your case, and we do not charge any extra fees for a formal observation report to be provided if this is required by the Federal Circuit and Family Court of Australia.

We request that you provide the request for an Observational Report more than 7 days before you need the document. This report will be provided on a template affidavit for your solicitor to sign directly as a witness with your appointed supervisor.`,
  },
];

export function Process() {
  return (
    <section id="process" className="py-12 sm:py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Process
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2">
            We follow a streamlined process to minimise your stress
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {steps.map((step, index) => (
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
