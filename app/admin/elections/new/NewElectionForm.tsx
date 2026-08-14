"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type Fields = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

export default function NewElectionForm() {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    title: "", description: "", startDate: "", startTime: "08:00", endDate: "", endTime: "18:00",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "form", string>>>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  }

  function validate() {
    const errs: typeof errors = {};
    if (!fields.title.trim()) errs.title = "Title is required.";
    if (!fields.description.trim()) errs.description = "Description is required.";
    if (!fields.startDate) errs.startDate = "Start date is required.";
    if (!fields.endDate) errs.endDate = "End date is required.";
    if (fields.startDate && fields.endDate && fields.startDate > fields.endDate) {
      errs.endDate = "End date must be after start date.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      // TODO: POST /api/admin/elections
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/admin/elections");
    } catch {
      setErrors({ form: "Failed to create election. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input label="Election Title" name="title" id="title" placeholder="e.g. RUNSA General Elections 2026" required value={fields.title} onChange={handleChange} error={errors.title} />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Brief description of this election…"
          required
          value={fields.description}
          onChange={handleChange}
          className={[
            "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 resize-none bg-white",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors",
            errors.description ? "border-red-400" : "border-gray-200 hover:border-brand-300",
          ].join(" ")}
        />
        {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Start Date" type="date" name="startDate" id="startDate" required value={fields.startDate} onChange={handleChange} error={errors.startDate} />
        <Input label="Start Time" type="time" name="startTime" id="startTime" required value={fields.startTime} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="End Date" type="date" name="endDate" id="endDate" required value={fields.endDate} onChange={handleChange} error={errors.endDate} />
        <Input label="End Time" type="time" name="endTime" id="endTime" required value={fields.endTime} onChange={handleChange} />
      </div>

      {errors.form && <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">{errors.form}</p>}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" loading={loading}>{loading ? "Creating…" : "Create Election"}</Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
