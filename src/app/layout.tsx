import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Family Fathers – Specialists in Child-Centred Supervision to Support your Family",
  description: "At Family Fathers, we provide innovative, specialised child contact services for family law matters. Our professional and caring supervisors facilitate court ordered time arrangements between parents and children for your peace of mind.",
  keywords: "child supervision, family law, Melbourne, supervised visits, court orders, family fathers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
