"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { SCHOOL_EMAIL_DOMAIN } from "@/lib/auth";

type Fields = {
  name: string;
  email: string;
  studentId: string;
  department: string;
  level: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof Fields | "form", string>>;

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Accounting",
  "Mass Communication",
  "Law",
  "Medicine & Surgery",
  "Pharmacy",
  "Nursing Science",
  "Architecture",
  "Other",
];

const LEVELS = ["100", "200", "300", "400", "500", "600"];

export default function RegisterForm() {
  const router = useRouter();

  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    studentId: "",
    department: "",
    level: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!fields.name.trim()) errs.name = "Full name is required.";
    if (!fields.email) {
      errs.email = "Email is required.";
    } else if (!fields.email.toLowerCase().endsWith(SCHOOL_EMAIL_DOMAIN)) {
      errs.email = `Only ${SCHOOL_EMAIL_DOMAIN} email addresses are allowed.`;
    }
    if (!fields.studentId.trim()) errs.studentId = "Student ID is required.";
    if (!fields.department) errs.department = "Select your department.";
    if (!fields.level) errs.level = "Select your level.";
    if (!fields.password) {
      errs.password = "Password is required.";
    } else if (fields.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (!fields.confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (fields.password !== fields.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with POST /api/auth/register
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(true);
    } catch {
      setErrors({ form: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
          We sent a verification link to <strong>{fields.email}</strong>. Click
          the link to activate your account.
        </p>
        <Button variant="secondary" onClick={() => router.push("/login")}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        label="Full Name"
        name="name"
        id="name"
        placeholder="e.g. Amara Okafor"
        required
        autoComplete="name"
        value={fields.name}
        onChange={handleChange}
        error={errors.name}
      />

      <Input
        label="School Email"
        type="email"
        name="email"
        id="email"
        placeholder={`you${SCHOOL_EMAIL_DOMAIN}`}
        required
        autoComplete="email"
        value={fields.email}
        onChange={handleChange}
        error={errors.email}
        hint={`Must end with ${SCHOOL_EMAIL_DOMAIN}`}
      />

      <Input
        label="Student ID / Matric Number"
        name="studentId"
        id="studentId"
        placeholder="e.g. RUNSA/2021/CS/001"
        required
        value={fields.studentId}
        onChange={handleChange}
        error={errors.studentId}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Department select */}
        <div className="flex flex-col gap-1">
          <label htmlFor="department" className="text-sm font-medium text-gray-700">
            Department <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="department"
            name="department"
            required
            value={fields.department}
            onChange={handleChange}
            className={[
              "w-full rounded-lg border px-3 py-2 text-sm bg-white text-gray-900",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors",
              errors.department
                ? "border-red-400"
                : "border-gray-200 hover:border-brand-300",
            ].join(" ")}
            aria-describedby={errors.department ? "department-error" : undefined}
            aria-invalid={errors.department ? "true" : undefined}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.department && (
            <p id="department-error" className="text-xs text-red-600" role="alert">
              {errors.department}
            </p>
          )}
        </div>

        {/* Level select */}
        <div className="flex flex-col gap-1">
          <label htmlFor="level" className="text-sm font-medium text-gray-700">
            Level <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="level"
            name="level"
            required
            value={fields.level}
            onChange={handleChange}
            className={[
              "w-full rounded-lg border px-3 py-2 text-sm bg-white text-gray-900",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors",
              errors.level
                ? "border-red-400"
                : "border-gray-200 hover:border-brand-300",
            ].join(" ")}
            aria-invalid={errors.level ? "true" : undefined}
          >
            <option value="">Select level</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>{l}L</option>
            ))}
          </select>
          {errors.level && (
            <p className="text-xs text-red-600" role="alert">{errors.level}</p>
          )}
        </div>
      </div>

      <Input
        label="Password"
        type="password"
        name="password"
        id="password"
        placeholder="Minimum 8 characters"
        required
        autoComplete="new-password"
        value={fields.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Re-enter your password"
        required
        autoComplete="new-password"
        value={fields.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      {errors.form && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
          {errors.form}
        </p>
      )}

      <p className="text-xs text-gray-500">
        By registering you agree to the platform&apos;s election rules and code of conduct.
      </p>

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        {loading ? "Creating account…" : "Create Account"}
      </Button>
    </form>
  );
}
