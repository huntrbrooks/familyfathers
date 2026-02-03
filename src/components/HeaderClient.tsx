"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NavLink } from "@/lib/content";

interface HeaderClientProps {
  navLinks: NavLink[];
}

export function HeaderClient({ navLinks }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/FAMILY BOND AUSTRALIA LOGO.png"
            alt="Family Bond Australia"
            width={50}
            height={50}
            className="transition-transform duration-300 group-hover:scale-105 w-10 h-10 sm:w-12 sm:h-12"
          />
          <div className="flex flex-col ml-2">
            <span className="text-base sm:text-xl font-bold text-[#3d6b4f] leading-tight tracking-wide">
              FAMILY BOND
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#8ba888] leading-tight tracking-wider">
              AUSTRALIA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-[#3d6b4f] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#3d6b4f] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-[#e8f0e6] transition-colors duration-300 h-10 w-10 min-h-[44px] min-w-[44px]">
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
                  className="text-base sm:text-lg font-medium text-gray-600 hover:text-[#3d6b4f] active:text-[#3d6b4f] transition-colors duration-300 py-3 px-2 border-b border-gray-100 hover:border-[#3d6b4f] active:bg-[#e8f0e6] rounded-sm min-h-[44px] flex items-center"
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
