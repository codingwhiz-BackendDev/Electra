import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Removes default padding */
  noPadding?: boolean;
}

export default function Card({ children, className = "", noPadding }: CardProps) {
  return (
    <div
      className={[
        "bg-white rounded-2xl border border-brand-100 shadow-sm",
        noPadding ? "" : "p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["px-6 py-4 border-b border-brand-100", className].join(" ")}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["px-6 py-5", className].join(" ")}>
      {children}
    </div>
  );
}
