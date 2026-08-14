/**
 * lib/db.ts – Database connection helper
 *
 * NEXT.JS CONCEPT: Server-only module
 * ─────────────────────────────────────
 * This file must NEVER be imported into a Client Component ("use client").
 * It contains secrets (DATABASE_URL) that should stay on the server.
 *
 * When you add PostgreSQL (e.g. with `npm install pg` or `npm install postgres`),
 * replace the stub below with a real pool/client.
 *
 * Example with the `postgres` package:
 *
 *   import postgres from "postgres";
 *   const sql = postgres(process.env.DATABASE_URL!);
 *   export default sql;
 *
 * Example with `pg` (node-postgres):
 *
 *   import { Pool } from "pg";
 *   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
 *   export default pool;
 *
 * NEXT.JS CONCEPT: Environment Variables
 * ────────────────────────────────────────
 * Variables WITHOUT the NEXT_PUBLIC_ prefix are server-side only.
 * They are never sent to the browser — perfect for DB credentials.
 * Add DATABASE_URL to your .env.local file:
 *
 *   DATABASE_URL=postgresql://user:password@localhost:5432/electra
 */

// ── Stub ──────────────────────────────────────────────────────
// Replace this with a real DB client once PostgreSQL is set up.

export const db = {
  query: async <T = unknown>(
    _sql: string,
    _params?: unknown[]
  ): Promise<T[]> => {
    console.warn(
      "[electra/db] Using stub DB. Connect a real PostgreSQL instance."
    );
    return [] as T[];
  },
};

export default db;
