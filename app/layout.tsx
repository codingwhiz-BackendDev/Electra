/*
 * app/layout.tsx – Root Layout
 *
 * NEXT.JS CONCEPT: Root Layout
 * ─────────────────────────────
 * Every Next.js App Router project needs a root layout at app/layout.tsx.
 * It must render <html> and <body> tags.
 * It wraps ALL pages in the app — great for global chrome like
 * the navbar and footer.
 *
 * This is a SERVER Component by default (no "use client" needed).
 * Interactive children (Navbar) are Client Components imported here.
 *
 * NEXT.JS CONCEPT: Metadata export
 * ──────────────────────────────────
 * Exporting a `metadata` object sets the <title> and <meta> tags
 * for the entire app. Individual pages can override it.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Electra – RUNSA Digital Voting Platform",
    template: "%s | Electra",
  },
  description:
    "Secure, transparent, and modern online voting for RUNSA student association elections. Verify your school email and vote with confidence.",
  keywords: ["voting", "election", "RUNSA", "student association", "digital voting"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        {/* Navbar is a Client Component — handles mobile toggle, active link state */}
        <Navbar />

        {/* Main content — each page fills this area */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer is a Server Component — purely static HTML */}
        <Footer />
      </body>
    </html>
  );
}
