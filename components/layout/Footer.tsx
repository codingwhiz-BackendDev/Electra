/*
 * Footer is a Server Component — no interactivity needed,
 * so we do NOT add "use client". It will be rendered on the server
 * and sent as static HTML, saving client JS bundle size.
 */

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-brand-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-white"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="font-bold text-brand-800">Electra</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Secure, transparent digital voting for RUNSA student association elections.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {[
                { href: "/elections", label: "Elections" },
                { href: "/results", label: "Results" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-600 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {[
                { href: "/login", label: "Sign In" },
                { href: "/register", label: "Register" },
                { href: "/dashboard", label: "My Dashboard" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-600 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {year} Electra – RUNSA Digital Voting Platform. All rights reserved.</p>
          <p>Built with Next.js · React · Tailwind CSS · PostgreSQL</p>
        </div>
      </div>
    </footer>
  );
}
