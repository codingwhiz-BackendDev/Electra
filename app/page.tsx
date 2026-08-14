/*
 * app/page.tsx – Landing Page  (route: /)
 *
 * NEXT.JS CONCEPT: Server Component (default)
 * ─────────────────────────────────────────────
 * Pages are Server Components by default. No "use client" here means
 * this HTML is rendered on the server and sent to the browser —
 * faster First Contentful Paint and great for SEO.
 *
 * Static content like this landing page is automatically pre-rendered
 * at build time (Static Site Generation).
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electra – Secure Digital Voting for RUNSA",
};

// ── Feature data (static — rendered on server, zero client JS) ──
const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 11.396a11.959 11.959 0 002.285 6.88 11.954 11.954 0 006.715 4.18V21a1 1 0 001 1h.004a1 1 0 001-1v-.544a11.954 11.954 0 006.716-4.18A11.959 11.959 0 0021 11.396a11.955 11.955 0 00-.598-5.396A11.959 11.959 0 0015 3.714" />
      </svg>
    ),
    title: "School Email Verification",
    description:
      "Only students with verified official school email addresses can register and vote, ensuring election integrity.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "One Person, One Vote",
    description:
      "Cryptographic safeguards prevent double voting. Each eligible student can cast exactly one vote per position.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Transparent Results",
    description:
      "Vote counts and turnout percentages are published by the administrator after verification. No hidden tallies.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Candidate Profiles & Manifestos",
    description:
      "View detailed profiles, photos, and full manifestos for every candidate before making your choice.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Mobile Friendly",
    description:
      "Vote from anywhere on your phone or laptop. Electra works seamlessly across all screen sizes.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: "Admin Control Panel",
    description:
      "Authorized election administrators manage every aspect: positions, candidates, elections, voters, and result publication.",
  },
];

const steps = [
  {
    step: "01",
    title: "Register with School Email",
    description: "Sign up using your official school email. A verification link will be sent to confirm your identity.",
  },
  {
    step: "02",
    title: "Browse Candidates",
    description: "Explore candidate profiles, read their manifestos, and learn who is running for each position.",
  },
  {
    step: "03",
    title: "Cast Your Vote",
    description: "Vote securely during the election window. Your vote is encrypted and stored safely.",
  },
  {
    step: "04",
    title: "View Results",
    description: "After the election closes, verified results are published for all to see — completely transparent.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-white via-brand-50 to-brand-100 pt-20 pb-28 overflow-hidden">
        {/* Background decoration */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-200 opacity-30 blur-3xl" />
          <div className="absolute bottom-0 -left-10 h-56 w-56 rounded-full bg-brand-300 opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 border border-brand-200 px-4 py-1.5 text-sm font-medium text-brand-700 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" aria-hidden="true" />
            RUNSA Student Association Election Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Your Voice.{" "}
            <span className="text-brand-600">Your Vote.</span>
            <br />
            Made Secure.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            Electra replaces the manual RUNSA election process with a modern, transparent,
            and tamper-proof digital voting platform — accessible from any device.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-brand-700 transition-colors"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/elections"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-300 bg-white px-8 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              View Elections
            </Link>
          </div>

          {/* Trust stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "100%", label: "Secure" },
              { value: "1-Vote", label: "Per Person" },
              { value: "Live", label: "Results" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-brand-700">{stat.value}</span>
                <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Electra?
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Everything you need for a fair, efficient, and trustworthy student election.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-brand-100 bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all duration-200"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="py-20 bg-brand-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-500">Four simple steps to cast your vote.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-brand-200"
                  />
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-sm mb-4 shadow-md">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to action ───────────────────────────────────────── */}
      <section className="py-20 bg-brand-600">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to make your voice heard?
          </h2>
          <p className="text-brand-100 text-lg mb-8">
            Register with your school email today and participate in shaping your student association.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow hover:bg-brand-50 transition-colors"
          >
            Register Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
