"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "About Our Service" },
  { href: "#process", label: "Our Process" },
  { href: "#pricing", label: "Our Fees" },
  { href: "#contact", label: "Contact Us" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <svg
            width="36"
            height="36"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-105 w-8 h-8 sm:w-10 sm:h-10"
          >
            <path
              d="M22 6L38 16V28L22 38L6 28V16L22 6Z"
              stroke="#02B1C5"
              strokeWidth="2.5"
              fill="none"
            />
            <path d="M22 16L30 21V27L22 32L14 27V21L22 16Z" fill="#FAC39D" />
          </svg>
          <div className="flex flex-col ml-2">
            <span className="text-base sm:text-xl font-bold text-[#02B1C5] leading-tight tracking-wide">
              FAMILY
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#FAC39D] leading-tight tracking-wider">
              FATHERS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-[#02B1C5] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#02B1C5] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-[#E6F7F9] transition-colors duration-300 h-10 w-10 min-h-[44px] min-w-[44px]">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px] p-4 sm:p-6">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-2 mt-6 sm:mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base sm:text-lg font-medium text-gray-600 hover:text-[#02B1C5] active:text-[#02B1C5] transition-colors duration-300 py-3 px-2 border-b border-gray-100 hover:border-[#02B1C5] active:bg-[#E6F7F9] rounded-sm min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
