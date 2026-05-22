"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Video } from "lucide-react";
import { faqItems } from "@/lib/data";
import { FAQ_VIDEO, FAQ_VIDEO_POSTER } from "@/lib/constants";
import { SectionHead, SectionPremiumMesh } from "./SectionHead";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const tryPlay = () => v.play().catch(() => {});

    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    if (v.readyState >= 2) tryPlay();

    const section = document.getElementById("faq");
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.15 }
    );
    obs.observe(section);

    return () => {
      obs.disconnect();
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section id="faq" className="section-premium section-py">
      <SectionPremiumMesh />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="faq-layout">
          {/* Left — video (50% width, same height as FAQ panel) */}
          <aside className="faq-layout-col faq-layout-video" aria-label="Workshop preview video">
            <div className="faq-equal-panel faq-video-panel">
              <div className="faq-video-frame">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={FAQ_VIDEO_POSTER}
                  className="faq-video-player"
                >
                  <source src={FAQ_VIDEO} type="video/mp4" />
                </video>
                <span className="faq-video-badge">
                  <Video className="h-3.5 w-3.5" aria-hidden />
                  Workshop preview
                </span>
              </div>
            </div>
          </aside>

          {/* Right — FAQ (50% width, equal height) */}
          <div className="faq-layout-col faq-layout-main">
            <div className="faq-equal-panel faq-faq-panel">
              <SectionHead
                centered={false}
                className="faq-layout-head"
                badge="Frequently asked questions"
                title={
                  <>
                    Common Questions About the{" "}
                    <span className="text-gradient">ISO 14001:2026 Transition Workshop</span>
                  </>
                }
                description="Answers about the live workshop, registration, resources, and what you'll learn."
              />

              <div className="faq-accordion-list">
                {faqItems.map((item, i) => (
                  <article
                    key={item.q}
                    className={`accordion-item faq-accordion-premium ${open === i ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="accordion-btn faq-accordion-btn"
                      onClick={() => setOpen(open === i ? null : i)}
                      aria-expanded={open === i}
                    >
                      <span>{item.q}</span>
                      <Plus className="accordion-icon h-5 w-5 shrink-0 text-burgundy" />
                    </button>
                    <div className="accordion-panel">
                      <p className="faq-accordion-answer">{item.a}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
