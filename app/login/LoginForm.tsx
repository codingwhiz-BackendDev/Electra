"use client";
/*
 * NEXT.JS CONCEPT: Client Component
 * ────────────────────────────────────
 * This form uses useState (controlled inputs) and an onClick handler,
 * so it must be a Client Component. We keep it separate from the page
 * so the page itself stays a lighter Server Component.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined, form: undefined }));
  }

  function validate() {
    const newErrors: typeof errors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
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
      /*
       * NEXT.JS CONCEPT: Calling a Route Handler from a Client Component
       * ──────────────────────────────────────────────────────────────────
       * When you have real auth, replace this with a fetch to your
       * Route Handler at app/api/auth/login/route.ts, or use NextAuth's
       * signIn() helper.
       *
       * Example:
       *   const res = await fetch("/api/auth/login", {
       *     method: "POST",
       *     headers: { "Content-Type": "application/json" },
       *     body: JSON.stringify(formData),
       *   });
       */

      // Stub: simulate a 1-second network call
      await new Promise((r) => setTimeout(r, 1000));

      // On success, redirect to the voter dashboard
      // useRouter().push() is a client-side navigation — no full page reload
      router.push("/dashboard");
    } catch {
      setErrors({ form: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        label="School Email"
        type="email"
        name="email"
        id="email"
        placeholder="you@runsa.edu.ng"
        autoComplete="email"
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        hint="Use your official school email address"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          Remember me
        </label>
        <a
          href="/forgot-password"
          className="text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          Forgot password?
        </a>
      </div>

      {errors.form && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
          {errors.form}
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        {loading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
