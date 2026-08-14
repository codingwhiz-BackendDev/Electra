"use client";
/*
 * NEXT.JS CONCEPT: Client Component for interactivity
 * The mobile menu toggle requires useState, so this must be 'use client'.
 * The parent layout (app/layout.tsx) is a Server Component — it simply
 * imports and renders this Client Component.
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/elections", label: "Elections" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-brand-100">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            {/* Lightning bolt icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-white"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-xl font-bold text-brand-800 tracking-tight">
            Electra
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-100 text-brand-800"
                      : "text-gray-600 hover:bg-brand-50 hover:text-brand-700",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors px-3 py-2 rounded-lg hover:bg-brand-50"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-brand-50 hover:text-brand-700"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-brand-100 bg-white px-4 pb-4 pt-2"
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-brand-100 text-brand-800"
                        : "text-gray-600 hover:bg-brand-50 hover:text-brand-700",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-brand-100 pt-3">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-sm font-medium text-gray-700 border border-brand-200 px-4 py-2 rounded-lg hover:bg-brand-50"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="block text-center text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
