"use client";

import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { highlights } from "@/lib/data";
import { OVERVIEW_POSTER, OVERVIEW_VIDEO } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { RegisterBanner } from "./RegisterBanner";

function Overview() {
  const [tab, setTab] = useState(0);
  const active = highlights[tab];
  const Icon = active.icon;

  useEffect(() => {
    const v = document.getElementById("overview-video") as HTMLVideoElement | null;
    if (!v) return;
    v.muted = true;
    const p = () => v.play().catch(() => {});
    v.addEventListener("canplay", p);
    if (v.readyState >= 2) p();
  }, []);

  return (
    <section id="overview" className="section-py relative overflow-hidden">
      <div className="ov-mesh" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="ov-collage">
          <div className="ov-collage-inner">
            <div className="ov-collage-copy">
              <span className="ov-badge-premium inline-flex w-fit items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
                ISO 14001:2026 Transition Overview
              </span>
              <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                Practical, Tutor-Led Transition Learning for{" "}
                <span className="text-gradient">
                  Auditors, EMS Professionals, Consultants, &amp; Professional Teams.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Explore key updates through clause-wise comparison, audit guidance, and downloadable
                transition resources—built for consultants, auditors, EMS professionals, and
                organizations.
              </p>
              <div className="ov-collage-stats">
                {[
                  ["8", "Core shifts", "text-burgundy"],
                  ["6", "Learning paths", "text-rose"],
                  ["100+", "Comparisons", "text-mauve"],
                ].map(([n, label, color]) => (
                  <div key={label} className="ov-float-card rounded-2xl px-4 py-3">
                    <p className={`font-display text-xl font-extrabold sm:text-2xl ${color}`}>{n}</p>
                    <p className="text-xs font-semibold text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ov-cinema ov-cinema-wide group">
              <video
                id="overview-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={OVERVIEW_POSTER}
              >
                <source src={OVERVIEW_VIDEO} type="video/mp4" />
              </video>
              <div className="ov-cinema-overlay" aria-hidden="true" />
              <div className="absolute inset-0 z-10 flex items-start justify-between p-4 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-burgundy shadow-sm">
                    <Video className="mr-1 inline h-3.5 w-3.5" /> Tutor-led preview
                  </span>
                  <span className="rounded-full bg-rose/90 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    2026 ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 sm:mt-9">
          <div className="ov-highlights-premium">
            <div className="ov-highlights-head">
              <div>
                <p className="ov-eyebrow">Transition map</p>
                <h3 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Key Transition Highlights
                </h3>
              </div>
              <p className="ov-highlights-hint max-w-md text-sm leading-relaxed text-muted lg:text-right">
                Select a clause tag or card to explore what changed and where auditors should focus
                evidence.
              </p>
            </div>

            <div className="ov-highlights-body">
              <div
                className="ov-highlights-pills flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Transition highlight clauses"
              >
                {highlights.map((item, i) => (
                  <button
                    key={item.tag + i}
                    type="button"
                    role="tab"
                    aria-selected={tab === i}
                    onClick={() => setTab(i)}
                    className={`ov-pill shrink-0 px-4 py-2 text-xs font-bold sm:text-sm ${tab === i ? "active" : ""}`}
                  >
                    {item.tag}
                  </button>
                ))}
              </div>

              <div className="ov-highlights-cards">
                {highlights.map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={`card-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={tab === i}
                      onClick={() => setTab(i)}
                      className={`ov-highlight-card ${tab === i ? "is-active" : ""}`}
                    >
                      <span className="ov-highlight-card-top">
                        <span className="ov-icon-ring-sm">
                          <ItemIcon className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                        <span className="ov-highlight-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <p className="ov-highlight-card-title">{item.title}</p>
                    </button>
                  );
                })}
              </div>

              <div className="ov-detail-panel">
                <div className="ov-detail-accent" aria-hidden="true" />
                <div className="ov-detail-icon">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <div className="ov-detail-copy min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="ov-detail-tag">{active.tag}</span>
                    <span className="text-xs font-semibold text-muted">Auditor focus</span>
                  </div>
                  <h4 className="font-display mt-3 text-lg font-extrabold leading-snug text-ink sm:text-xl">
                    {active.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {active.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <RegisterBanner
            variant="compact"
            headline="Ready to go beyond highlights?"
            subline="Register first, then enroll for clause-by-clause training built for transition audits."
          />
        </Reveal>
      </div>
    </section>
  );
}

export { Overview };
