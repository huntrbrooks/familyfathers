"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const serviceAreas = [
  {
    region: "Metropolitan South",
    councils: [
      { name: "City of Kingston", example: "e.g. Cheltenham" },
      { name: "City of Greater Dandenong", example: null },
      { name: "City of Frankston", example: null },
      { name: "City of Casey", example: "e.g. Narre Warren" },
      { name: "Shire of Mornington Peninsula", example: "e.g. Rosebud" },
    ],
  },
  {
    region: "Inner Metropolitan South East",
    councils: [
      { name: "City of Bayside", example: "e.g. Sandringham" },
      { name: "City of Boroondara", example: "e.g. Camberwell" },
      { name: "City of Glen Eira", example: "e.g. Caulfield North" },
      { name: "City of Melbourne", example: null },
      { name: "City of Port Phillip", example: "e.g. St Kilda" },
      { name: "City of Stonnington", example: "e.g. Malvern" },
      { name: "City of Yarra", example: "e.g. Richmond" },
    ],
  },
  {
    region: "Metropolitan West",
    councils: [
      { name: "City of Brimbank", example: "e.g. Sunshine" },
      { name: "City of Hobsons Bay", example: "e.g. Altona" },
      { name: "City of Melton", example: null },
      { name: "City of Moonee Valley", example: "e.g. Moonee Ponds" },
      { name: "City of Maribyrnong", example: "e.g. Footscray" },
      { name: "City of Wyndham", example: "e.g. Werribee" },
    ],
  },
  {
    region: "Metropolitan North",
    councils: [
      { name: "City of Banyule", example: "e.g. Greensborough" },
      { name: "City of Darebin", example: "e.g. Preston" },
      { name: "City of Hume", example: "e.g. Broadmeadows" },
      { name: "City of Merri-bek", example: "e.g. Coburg" },
      { name: "Shire of Nillumbik", example: "e.g. Eltham" },
      { name: "City of Whittlesea", example: "e.g. South Morang" },
    ],
  },
  {
    region: "Metropolitan East",
    councils: [
      { name: "City of Knox", example: "e.g. Wantirna South" },
      { name: "City of Manningham", example: "e.g. Doncaster" },
      { name: "City of Maroondah", example: "e.g. Ringwood" },
      { name: "City of Monash", example: "e.g. Glen Waverley" },
      { name: "City of Whitehorse", example: "e.g. Nunawading" },
      { name: "Shire of Yarra Ranges", example: "e.g. Lilydale" },
    ],
  },
];

export function ServiceAreas() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Service Areas
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Family Fathers provides specialist family law child contact
            supervision services to families across Metropolitan Melbourne.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
            View full list of Council service areas below:
          </p>
        </div>

        {/* Service Areas Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {serviceAreas.map((area, index) => (
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
