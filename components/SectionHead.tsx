import type { ReactNode } from "react";

type SectionHeadProps = {
  badge: string;
  title: ReactNode;
  description?: string;
  className?: string;
  centered?: boolean;
};

export function SectionHead({
  badge,
  title,
  description,
  className = "",
  centered = true,
}: SectionHeadProps) {
  return (
    <div
      className={`section-head-premium ${centered ? "section-head-premium--center" : ""} ${className}`.trim()}
    >
      <span className="section-badge-premium">{badge}</span>
      <h2 className="section-title-premium">{title}</h2>
      {description ? <p className="section-desc-premium">{description}</p> : null}
    </div>
  );
}

export function SectionPremiumMesh({ variant = "default" }: { variant?: "default" | "warm" }) {
  return (
    <div
      className={`section-premium-mesh ${variant === "warm" ? "section-premium-mesh--warm" : ""}`}
      aria-hidden="true"
    />
  );
}
