/*
 * app/not-found.tsx – 404 Page
 *
 * NEXT.JS CONCEPT: Special file conventions
 * ───────────────────────────────────────────
 * Next.js automatically uses this file whenever a route is not found.
 * It renders inside the root layout (Navbar + Footer still appear).
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
        <span className="text-4xl font-extrabold text-brand-600">4</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-4xl font-extrabold text-brand-600">4</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        We couldn't find the page you were looking for. It may have been moved or doesn't exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/elections"
          className="rounded-lg border border-brand-200 px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors"
        >
          View Elections
        </Link>
      </div>
    </div>
  );
}
