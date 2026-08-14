/**
 * lib/auth.ts – Authentication helpers
 *
 * NEXT.JS CONCEPT: Server Actions vs Route Handlers
 * ──────────────────────────────────────────────────
 * Authentication logic belongs on the server. You have two main options:
 *
 * 1. Route Handlers  → app/api/auth/[...route]/route.ts
 *    Good for REST-style auth (JWT in Authorization header, OAuth flows).
 *
 * 2. Server Actions  → functions marked with "use server" called from forms.
 *    Good for simple form-based login/register (no extra API endpoint needed).
 *
 * For Electra we recommend NextAuth.js v5 (Auth.js) once you add a DB.
 * Install: npm install next-auth@beta
 *
 * NEXT.JS CONCEPT: Cookies & Sessions
 * ─────────────────────────────────────
 * Use `cookies()` from "next/headers" to read/write HTTP-only cookies
 * in Server Components and Route Handlers.
 *
 * SCHOOL EMAIL VALIDATION
 * ────────────────────────
 * Change SCHOOL_EMAIL_DOMAIN to match your institution's domain.
 */

export const SCHOOL_EMAIL_DOMAIN = "@runsa.edu.ng";

/**
 * Checks whether an email belongs to the school domain.
 * Called during registration to prevent external sign-ups.
 */
export function isSchoolEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith(SCHOOL_EMAIL_DOMAIN);
}

/**
 * Stub: Returns the currently logged-in user from the session.
 *
 * Replace this with a real session check once you integrate NextAuth:
 *
 *   import { auth } from "@/auth";
 *   export async function getCurrentUser() {
 *     const session = await auth();
 *     return session?.user ?? null;
 *   }
 */
export async function getCurrentUser() {
  // TODO: integrate with NextAuth / JWT
  return null;
}

/**
 * Stub: Checks if the current user is an admin.
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  // @ts-expect-error – user is null in stub
  return user?.role === "admin";
}
