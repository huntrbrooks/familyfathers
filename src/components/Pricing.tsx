const pricingPlans = [
  {
    title: "Intake Assessment",
    price: "$250",
    description: "Fixed fee per parent",
    highlight: false,
  },
  {
    title: "Weekday Supervision",
    price: "$250",
    description: "Fixed fee per 120 minute session",
    highlight: false,
  },
  {
    title: "Weekend Supervision",
    price: "$250",
    description: "Fixed fee per 120 minute session",
    highlight: false,
  },
  {
    title: "Additional Supervision",
    price: "$125",
    description: "Fixed fee per hour of additional supervision",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Professional Fees
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Industry best-practice assistance with simple fixed fee services for
            you and your child
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`group bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border ${
                plan.highlight
                  ? "border-[#02B1C5] ring-2 ring-[#02B1C5]"
                  : "border-gray-100"
              } transition-all duration-300 hover:shadow-lg sm:hover:-translate-y-1 hover:border-[#02B1C5]/30 text-center active:scale-[0.98] sm:active:scale-100`}
            >
              <h3 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-xs sm:text-sm md:text-base transition-colors duration-300 group-hover:text-[#02B1C5]">{plan.title}</h3>
              <div className="mb-2 sm:mb-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#02B1C5] transition-transform duration-300 inline-block group-hover:scale-110">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm block mt-1">
                  inc GST
                </span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-snug">{plan.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-100 max-w-2xl mx-auto transition-all duration-300 hover:shadow-md hover:border-[#02B1C5]/20">
          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
            Supervised Observation Reports
          </h4>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Available upon request (<strong>$75 per session</strong>) with a
            minimum of four session reports (
            <strong>$300 minimum fee</strong>) for family law proceedings.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            You and your children are in safe hands
          </h3>
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#02B1C5] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-[10px] font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#019AAD] hover:shadow-lg hover:shadow-[#02B1C5]/25 sm:hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            Enquire Here
          </a>
        </div>
      </div>
    </section>
  );
}
