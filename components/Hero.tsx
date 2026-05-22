"use client";

import { useEffect } from "react";
import { ArrowRight, Calendar, Download, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { FormCta } from "./FormCta";
import { Reveal } from "./Reveal";
import { HERO_POSTER, HERO_VIDEO } from "@/lib/constants";
import {
  REGISTER_HERO_NOTE,
  REGISTER_LIVE_WORKSHOP,
  REGISTER_PRIMARY,
  URGENCY_LINES,
} from "@/lib/marketing";

function initBgVideo(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = true;
  const tryPlay = () => video.play().catch(() => {});
  video.addEventListener("loadeddata", tryPlay);
  video.addEventListener("canplay", tryPlay);
  if (video.readyState >= 2) tryPlay();
}

export function Hero() {
  useEffect(() => {
    initBgVideo(document.getElementById("hero-video") as HTMLVideoElement | null);
    const onVis = () => {
      if (!document.hidden) {
        initBgVideo(document.getElementById("hero-video") as HTMLVideoElement | null);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[78vh] flex-col justify-center overflow-hidden pt-24 sm:pt-28"
    >
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          id="hero-video"
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <Reveal className="hero-on-video w-full">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose/50 bg-rose/25 px-4 py-2 text-sm font-bold text-white shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            {URGENCY_LINES[0]}
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold text-white/95 backdrop-blur-md sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0" />
              ISO 14001:2026 Focused Transition Program
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white/95 backdrop-blur-md sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-rose" />
              ISO-strict clause alignment
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-rose/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md sm:text-sm">
              <Calendar className="h-4 w-4 shrink-0" />
              Live 8-hour tutor-led workshop
            </span>
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            ISO 14001:2015 → <span className="text-gradient">ISO 14001:2026</span> Transition Training
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/90 sm:text-xl">
            ISO-strict, clause-by-clause transition learning with exact change interpretation,
            auditor-focused guidance, and practical checklists — plus an optional{" "}
            <strong className="text-white">live 8-hour workshop</strong> for hands-on transition
            implementation with expert tutors.
          </p>
          <div className="hero-cta-actions mt-5">
            <FormCta
              variant="register"
              className="hero-cta-btn hero-cta-btn--primary"
            >
              <UserPlus className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              {REGISTER_PRIMARY}
              <ArrowRight className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            </FormCta>
            <FormCta variant="live-workshop" className="hero-cta-btn hero-cta-btn--secondary">
              {REGISTER_LIVE_WORKSHOP}
              <Calendar className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            </FormCta>
            <FormCta variant="download" className="hero-cta-btn hero-cta-btn--secondary">
              Download Cheat Sheet
              <Download className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            </FormCta>
          </div>
          <p className="hero-cta-note mx-auto max-w-xl">{REGISTER_HERO_NOTE}</p>
          <div className="mx-auto mt-5 grid w-full max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["100+", "Comparison Points"],
              ["ISO", "Strict Focus"],
              ["4–10", "Clause Coverage"],
              ["8 hr", "Live Workshop"],
              ["Tutor", "Led Training"],
              ["Yes", "Certificate"],
            ].map(([val, label]) => (
              <div key={label} className="hero-glass rounded-2xl p-4">
                <p className="text-2xl font-black text-burgundy">{val}</p>
                <p className="text-xs font-semibold text-muted">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
