import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Electra" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">About Electra</h1>
        <p className="text-lg text-gray-500">
          Replacing paper ballots with a modern, verifiable digital voting experience.
        </p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8">
        <section className="bg-white rounded-2xl border border-brand-100 shadow-sm p-7">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What is Electra?</h2>
          <p className="text-gray-600 leading-relaxed">
            Electra is a secure digital voting platform built specifically for RUNSA (Ramat University
            Nigeria Student Association) student elections. It was created to replace the manual,
            paper-based election process with an efficient, transparent, and tamper-resistant online system.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-brand-100 shadow-sm p-7">
          <h2 className="text-xl font-bold text-gray-900 mb-3">The Problem We Solve</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Traditional student elections often suffer from:
          </p>
          <ul className="space-y-2">
            {[
              "Long queues and low voter turnout due to inconvenience",
              "Risk of ballot stuffing and manual counting errors",
              "Lack of transparency in result verification",
              "No permanent, auditable record of votes",
              "Difficulty accessing results in a timely manner",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-600 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-brand-100 shadow-sm p-7">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Security", desc: "School email verification ensures only eligible students can vote." },
              { title: "Integrity", desc: "Each student can only cast one vote per position — no duplicates." },
              { title: "Transparency", desc: "Results are published publicly and verifiable by all stakeholders." },
              { title: "Accessibility", desc: "Works on any device with an internet connection." },
            ].map((p) => (
              <div key={p.title} className="rounded-xl bg-brand-50 border border-brand-100 p-4">
                <h3 className="font-semibold text-brand-700 text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-brand-100 shadow-sm p-7">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PostgreSQL"].map((t) => (
              <span key={t} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow hover:bg-brand-700 transition-colors">
          Get Started
        </Link>
      </div>
    </div>
  );
}
