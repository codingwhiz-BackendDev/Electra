import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-white to-brand-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white" aria-hidden="true">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-2xl font-bold text-brand-800">Electra</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-sm text-gray-500 mb-6">
            Register with your official school email to participate in elections
          </p>

          <RegisterForm />
        </div>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-brand-600 hover:text-brand-700">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
