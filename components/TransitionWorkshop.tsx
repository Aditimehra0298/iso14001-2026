"use client";

import Image from "next/image";
import { FormCta } from "./FormCta";
import {
  LIVE_WORKSHOP_DATE_LABEL,
  LIVE_WORKSHOP_PRICE_DISPLAY,
  SELFPACED_PRICE_DISPLAY,
  WORKSHOP_BG_IMAGE,
  WORKSHOP_PROMO_IMAGE,
} from "@/lib/constants";
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Clock,
  Download,
  Headphones,
  Layers,
  Leaf,
  Lock,
  PlayCircle,
  Shield,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { REGISTER_LIVE_WORKSHOP, REGISTER_SELFPACED } from "@/lib/marketing";
import { Reveal } from "./Reveal";

const SELFPACED_HIGHLIGHTS = [
  { icon: Layers, label: "9 modules", sub: "Full curriculum" },
  { icon: Clock, label: "Anytime", sub: "Learn at your pace" },
  { icon: PlayCircle, label: "Audio + video", sub: "Tutor-led lessons" },
  { icon: Award, label: "Certificate", sub: "On completion" },
] as const;

const OVERVIEW_FEATURES = [
  {
    icon: Users,
    title: "Expert-Led Training",
    desc: "ISO 14001:2026 transition explained by experienced tutors.",
  },
  {
    icon: Shield,
    title: "Auditor Guidance",
    desc: "Professional auditor interpretation and evidence focus.",
  },
  {
    icon: PlayCircle,
    title: "On-Demand Lessons",
    desc: "Replay tutor-led modules anytime during your enrollment.",
  },
  {
    icon: Leaf,
    title: "EMS Transition Learning",
    desc: "Practical environmental management system updates.",
  },
  {
    icon: Download,
    title: "Downloadable Resources",
    desc: "Templates, checklists, and transition reference tools.",
  },
  {
    icon: Award,
    title: "Completion Certificate",
    desc: "Certificate of completion after finishing the self-paced program.",
  },
] as const;

const LEFT_FOOTER = [
  { icon: Video, label: "Online Access" },
  { icon: BookOpen, label: "Self-Paced Learning" },
  { icon: Award, label: "Certificate Included" },
] as const;

const BOTTOM_BAR = [
  { title: "Practical & Actionable", sub: "Real-world Implementation" },
  { title: "Designed for Professionals", sub: "Consultants, Auditors, EMS Experts" },
  { title: "Sustainability Focused", sub: "Environmental Excellence" },
  { title: "Audit & Compliance Ready", sub: "Stay Ahead. Stay Compliant." },
] as const;

const TRUST_ITEMS = [
  { icon: Lock, label: "Secure Payment" },
  { icon: Zap, label: "Instant Access" },
  { icon: Headphones, label: "24/7 Support" },
] as const;

const TUTOR_OVERVIEW_BADGES = [
  "Tutor-Led",
  "ISO 14001:2026",
  "Live 8-Hour",
  "ISO-Strict Focus",
] as const;

export function TransitionWorkshop() {
  return (
    <section id="workshop" className="workshop-premium-section">
      <div
        className="workshop-premium-bg"
        style={{ backgroundImage: `url("${WORKSHOP_BG_IMAGE}")` }}
        aria-hidden="true"
      />
      <div className="workshop-premium-overlay" aria-hidden="true" />

      <div className="section-py relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="workshop-upcoming-pill">
            <Leaf className="h-3.5 w-3.5" />
            Tutor-Led + Self-Paced Transition Training
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-[2.65rem]">
            Master ISO 14001:2026 Through{" "}
            <span className="workshop-title-gradient">Structured Professional Learning</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink/80 sm:text-base">
            Experience a modern transition learning program that combines flexible self-paced modules
            with expert tutor-led guidance, helping consultants, auditors, and organizations build
            practical implementation confidence and transition audit readiness.
          </p>
        </Reveal>

        <div className="workshop-glass-panel mt-6 sm:mt-8">
          <div className="workshop-split-grid grid gap-4 lg:grid-cols-2 lg:gap-5">
            {/* Left — live tutor-led workshop (first) */}
            <div id="workshop-live" className="workshop-overview-card order-1">
              <div className="workshop-overview-tutor-header">
                <span className="workshop-overview-tutor-icon">
                  <Video className="h-6 w-6 text-burgundy" strokeWidth={2.25} />
                </span>
                <div className="workshop-overview-tutor-copy min-w-0">
                  <div className="workshop-overview-badge-row">
                    {TUTOR_OVERVIEW_BADGES.map((badge) => (
                      <span
                        key={badge}
                        className={
                          badge === "Tutor-Led"
                            ? "workshop-overview-badge workshop-overview-badge--primary"
                            : "workshop-overview-badge"
                        }
                      >
                        {badge}
                      </span>
                    ))}
                    <span className="workshop-rating-badge">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      4.9/5 Trusted
                    </span>
                  </div>
                  <p className="workshop-overview-tutor-eyebrow">Course overview</p>
                  <h3 className="font-display workshop-overview-tutor-title">
                    Tutor-Led ISO 14001:2026{" "}
                    <span className="text-rose">Transition Training</span>
                  </h3>
                  <p className="workshop-overview-tutor-desc">
                    Live expert-led transition training covering clause updates, auditor
                    interpretation, practical EMS guidance, interactive implementation support, and
                    downloadable transition tools.
                  </p>
                </div>
              </div>

              <div className="workshop-price-block workshop-price-block--live mt-4">
                <div className="workshop-price-block-main">
                  <p className="workshop-price-block-label">Live 8-hour tutor-led workshop</p>
                  <div className="workshop-price-block-row">
                    <span className="workshop-price-block-amount">{LIVE_WORKSHOP_PRICE_DISPLAY}</span>
                    <span className="workshop-price-block-currency">USD</span>
                  </div>
                  <p className="workshop-price-block-note">
                    <Check className="inline h-4 w-4 text-rose" strokeWidth={3} />
                    {LIVE_WORKSHOP_DATE_LABEL} · interactive live session
                  </p>
                  <FormCta variant="live-workshop" className="workshop-cta-btn workshop-cta-btn--secondary workshop-price-cta">
                    {REGISTER_LIVE_WORKSHOP}
                    <span className="workshop-cta-arrow">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </FormCta>
                </div>
              </div>

              <div className="workshop-overview-actions">
                <FormCta variant="download" className="workshop-download-btn">
                  <Download className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                  Download Transition Sheet
                </FormCta>
              </div>

              <div className="workshop-feature-grid mt-4">
                {OVERVIEW_FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="workshop-feature-item">
                    <span className="workshop-feature-icon">
                      <Icon className="h-4 w-4 text-burgundy" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-muted">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="workshop-trust-row mt-4">
                {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                  <span key={label} className="workshop-trust-item">
                    <Icon className="h-3.5 w-3.5 text-burgundy" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — self-paced summary + course image */}
            <div id="workshop-selfpaced" className="workshop-left-col order-2">
            <div className="workshop-date-card w-full">
              <div className="workshop-selfpaced-header">
                <div className="workshop-cal-icon-wrap">
                  <BookOpen className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <div className="workshop-selfpaced-header-copy">
                  <div className="workshop-selfpaced-header-badges">
                    <span className="workshop-live-pill">Self-paced</span>
                    <span className="workshop-selfpaced-chip">ISO 14001:2026</span>
                  </div>
                  <p className="workshop-selfpaced-header-eyebrow">Transition program</p>
                  <p className="workshop-selfpaced-header-title">
                    Learn <span className="text-rose">on your schedule</span>
                  </p>
                  <p className="workshop-selfpaced-header-sub">
                    Start instantly · pause anytime · complete at your pace
                  </p>
                </div>
              </div>

              <div className="workshop-selfpaced-panel">
                <div className="workshop-selfpaced-panel-top">
                  <span className="workshop-selfpaced-panel-label">Course enrollment</span>
                  <span className="workshop-selfpaced-value-badge">Full access</span>
                </div>

                <div className="workshop-selfpaced-price-card">
                  <p className="workshop-selfpaced-price-label">One-time course fee</p>
                  <div className="workshop-selfpaced-price-row">
                    <span className="workshop-selfpaced-amount">{SELFPACED_PRICE_DISPLAY}</span>
                    <span className="workshop-selfpaced-currency">USD</span>
                  </div>
                  <p className="workshop-selfpaced-tagline">
                    All 9 modules · downloads · certificate included
                  </p>
                </div>

                <ul className="workshop-selfpaced-perks">
                  {SELFPACED_HIGHLIGHTS.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={item.label} className="workshop-selfpaced-perk">
                        <span className="workshop-selfpaced-perk-icon">
                          <ItemIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
                        </span>
                        <span className="min-w-0">
                          <span className="workshop-selfpaced-perk-label">{item.label}</span>
                          <span className="workshop-selfpaced-perk-sub">{item.sub}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <FormCta variant="register" className="workshop-selfpaced-enroll">
                  {REGISTER_SELFPACED}
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                </FormCta>
              </div>

              <div className="workshop-date-footer">
                {LEFT_FOOTER.map(({ icon: Icon, label }) => (
                  <div key={label} className="workshop-date-footer-item">
                    <Icon className="h-4 w-4 text-rose" strokeWidth={2.25} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

              <div className="workshop-promo-block">
                <Image
                  src={WORKSHOP_PROMO_IMAGE}
                  alt="ISO 14001:2026 Transition Course"
                  width={720}
                  height={405}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="workshop-promo-img"
                />
              </div>
            </div>
          </div>

          <div className="workshop-bottom-bar">
            {BOTTOM_BAR.map((item) => (
              <div key={item.title} className="workshop-bottom-item">
                <Leaf className="h-4 w-4 shrink-0 text-rose" />
                <div>
                  <p className="text-sm font-bold text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
