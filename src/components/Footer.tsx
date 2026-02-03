import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { getContent, FooterContent } from "@/lib/content";

export async function Footer() {
  const content: FooterContent = await getContent("footer");
  
  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer justify-center sm:justify-start">
              <svg
                width="40"
                height="40"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105 w-9 h-9 sm:w-11 sm:h-11"
              >
                <path
                  d="M22 6L38 16V28L22 38L6 28V16L22 6Z"
                  stroke="#02B1C5"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path d="M22 16L30 21V27L22 32L14 27V21L22 16Z" fill="#FAC39D" />
              </svg>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-[#02B1C5] leading-tight tracking-wide">
                  FAMILY
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#FAC39D] leading-tight tracking-wider">
                  FATHERS
                </span>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">{content.getInTouchTitle}</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              {content.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{content.quickLinksTitle}</h4>
            <ul className="space-y-2">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#02B1C5] transition-all duration-300 text-xs sm:text-sm inline-block sm:hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{content.contactTitle}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href={`tel:${content.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-[#02B1C5] transition-all duration-300 text-xs sm:text-sm group"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{content.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-[#02B1C5] transition-all duration-300 text-xs sm:text-sm group"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                  <span className="break-all sm:break-normal">{content.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} {content.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
