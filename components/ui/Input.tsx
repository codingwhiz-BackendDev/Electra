"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-red-500" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400",
          "transition-colors duration-150 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500",
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-200 hover:border-brand-300",
          className,
        ].join(" ")}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        aria-invalid={error ? "true" : undefined}
        {...props}
      />

      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
