import type { Metadata } from "next";
import Link from "next/link";
import NewElectionForm from "./NewElectionForm";

export const metadata: Metadata = { title: "Create Election" };

export default function NewElectionPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/elections" className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Elections
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create New Election</h1>
      <p className="text-gray-500 mb-8">Set up a new election with title, description, and schedule.</p>

      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6">
        <NewElectionForm />
      </div>
    </div>
  );
}
