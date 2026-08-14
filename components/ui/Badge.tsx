import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "green" | "blue" | "orange" | "gray" | "red";
}

const variantMap = {
  green:  "bg-emerald-100 text-emerald-800",
  blue:   "bg-blue-100 text-blue-800",
  orange: "bg-orange-100 text-orange-800",
  gray:   "bg-gray-100 text-gray-700",
  red:    "bg-red-100 text-red-700",
};

export default function Badge({ children, className = "", variant = "green" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantMap[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
