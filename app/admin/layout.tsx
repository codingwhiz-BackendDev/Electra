/*
 * app/admin/layout.tsx – Admin Section Layout  (route prefix: /admin/*)
 *
 * NEXT.JS CONCEPT: Nested Layouts
 * ─────────────────────────────────
 * This layout wraps ONLY the /admin/* routes.
 * It renders inside the root layout, so the Navbar and Footer
 * from app/layout.tsx are still present.
 *
 * In production, add an auth check here to protect all admin routes:
 *
 *   import { redirect } from "next/navigation";
 *   const user = await getCurrentUser();
 *   if (!user || user.role !== "admin") redirect("/login");
 */

import Link from "next/link";

const adminNavLinks = [
  { href: "/admin", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/elections", label: "Elections", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { href: "/admin/candidates", label: "Candidates", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/admin/positions", label: "Positions", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { href: "/admin/voters", label: "Voters", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { href: "/admin/results", label: "Results", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
];

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-brand-100 bg-white px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Admin Panel
        </p>
        <nav aria-label="Admin navigation">
          <ul className="flex flex-col gap-1" role="list">
            {adminNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-brand-100">
          <p className="text-xs text-gray-400 px-3">Logged in as Admin</p>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 overflow-auto bg-gray-50/50">
        {/* Mobile nav bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto bg-white border-b border-brand-100 px-4 py-2">
          {adminNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
