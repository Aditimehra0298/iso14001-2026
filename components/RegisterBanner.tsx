"use client";

import { ArrowRight, Check, Sparkles, UserPlus, Zap } from "lucide-react";
import { FormCta } from "./FormCta";
import { LIVE_WORKSHOP_PRICE_DISPLAY, SELFPACED_PRICE_DISPLAY } from "@/lib/constants";
import {
  REGISTER_BADGE,
  REGISTER_DEFAULT_HEADLINE,
  REGISTER_DEFAULT_SUBLINE,
  REGISTER_FOOTNOTE,
  REGISTER_PERKS,
  REGISTER_PRIMARY,
  SOCIAL_PROOF,
} from "@/lib/marketing";

type RegisterBannerProps = {
  variant?: "featured" | "compact" | "urgent";
  headline?: string;
  subline?: string;
  className?: string;
};

export function RegisterBanner({
  variant = "featured",
  headline = REGISTER_DEFAULT_HEADLINE,
  subline = REGISTER_DEFAULT_SUBLINE,
  className = "",
}: RegisterBannerProps) {
  if (variant === "compact") {
    return (
      <div className={`register-banner register-banner--compact ${className}`.trim()}>
        <div className="register-banner-compact-copy">
          <div className="flex items-center gap-2">
            <span className="register-pulse-dot-inline" aria-hidden="true" />
            <p className="font-display text-sm font-extrabold text-ink sm:text-base">{headline}</p>
          </div>
          <p className="text-xs text-muted sm:text-sm">{subline}</p>
        </div>
        <FormCta variant="register" className="register-btn-primary shrink-0">
          {REGISTER_PRIMARY}
          <ArrowRight className="h-4 w-4" />
        </FormCta>
      </div>
    );
  }

  if (variant === "urgent") {
    return (
      <div className={`register-banner register-banner--urgent ${className}`.trim()}>
        <div className="register-urgent-glow" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="register-urgent-badge">
              <Zap className="h-3.5 w-3.5" />
              Limited workshop seats · July 18, 2026
            </span>
            <p className="font-display mt-2 text-lg font-extrabold text-white sm:text-xl">
              {headline}
            </p>
            <p className="mt-1 text-sm text-white/85">{subline}</p>
          </div>
          <FormCta variant="register" className="register-btn-urgent shrink-0">
            {REGISTER_PRIMARY}
            <ArrowRight className="h-5 w-5" />
          </FormCta>
        </div>
      </div>
    );
  }

  return (
    <div className={`register-banner register-banner--featured ${className}`.trim()}>
      <div className="register-banner-shine" aria-hidden="true" />
      <div className="relative z-10 grid gap-5 lg:grid-cols-[1.15fr_auto] lg:items-center lg:gap-8">
        <div>
          <span className="register-featured-badge">
            <Sparkles className="h-3.5 w-3.5" />
            {REGISTER_BADGE}
          </span>
          <h3 className="font-display mt-3 text-xl font-extrabold leading-tight text-ink sm:text-2xl">
            {headline}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{subline}</p>
          <p className="mt-2 text-xs font-semibold text-burgundy">{SOCIAL_PROOF}</p>
          <ul className="register-perk-list mt-4">
            {REGISTER_PERKS.map((perk) => (
              <li key={perk}>
                <Check className="h-4 w-4 shrink-0 text-rose" strokeWidth={2.5} />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:items-center lg:items-end">
          <FormCta variant="register" className="register-btn-primary register-btn-primary--lg">
            <UserPlus className="h-5 w-5" />
            {REGISTER_PRIMARY}
            <ArrowRight className="h-5 w-5" />
          </FormCta>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch">
            <FormCta variant="live-workshop" className="register-btn-secondary text-center">
              Live 8-hr {LIVE_WORKSHOP_PRICE_DISPLAY}
            </FormCta>
            <FormCta variant="register" className="register-btn-secondary text-center">
              Self-paced {SELFPACED_PRICE_DISPLAY}
            </FormCta>
          </div>
          <p className="text-center text-[11px] font-semibold text-muted lg:text-right">
            {REGISTER_FOOTNOTE}
          </p>
        </div>
      </div>
    </div>
  );
}
