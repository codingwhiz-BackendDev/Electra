// =============================================================
// Electra – shared TypeScript types
// These mirror the PostgreSQL schema you will create later.
// =============================================================

// ── Users / Voters ────────────────────────────────────────────
export type UserRole = "voter" | "admin";

export interface User {
  id: string;
  name: string;
  /** Must end with the school's official domain, e.g. @runsa.edu */
  email: string;
  role: UserRole;
  /** Whether the student has verified their email */
  isVerified: boolean;
  /** Student / matriculation number */
  studentId: string;
  department: string;
  level: string; // e.g. "100", "200", "300"
  createdAt: string; // ISO date string
}

// ── Positions ─────────────────────────────────────────────────
export interface Position {
  id: string;
  title: string; // e.g. "President", "Secretary"
  description: string;
  maxVotesPerVoter: number; // normally 1
}

// ── Candidates ────────────────────────────────────────────────
export interface Candidate {
  id: string;
  userId: string;
  electionId: string;
  positionId: string;
  name: string;
  department: string;
  level: string;
  photoUrl?: string;
  manifesto: string;
  /** Running-mate or deputy (optional) */
  runningMate?: string;
  voteCount?: number; // only visible after results are published
}

// ── Elections ─────────────────────────────────────────────────
export type ElectionStatus = "draft" | "upcoming" | "active" | "ended" | "published";

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string;
  status: ElectionStatus;
  /** List of position IDs included in this election */
  positionIds: string[];
  createdAt: string;
}

// ── Votes ─────────────────────────────────────────────────────
export interface Vote {
  id: string;
  electionId: string;
  positionId: string;
  candidateId: string;
  voterId: string;
  createdAt: string;
}

// ── Results ───────────────────────────────────────────────────
export interface PositionResult {
  position: Position;
  candidates: Array<Candidate & { voteCount: number; percentage: number }>;
  totalVotes: number;
}

export interface ElectionResult {
  election: Election;
  positionResults: PositionResult[];
  totalVoters: number;
  totalVotesCast: number;
  turnoutPercentage: number;
  publishedAt: string;
}

// ── API helpers ───────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
