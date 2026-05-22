"use client";

import { ArrowRight, Check, UserPlus, Zap } from "lucide-react";
import { REGISTER_LIVE_WORKSHOP, REGISTER_PERKS, REGISTER_PRIMARY, REGISTER_SELFPACED } from "@/lib/marketing";
import { FormCta } from "./FormCta";
import { Reveal } from "./Reveal";
import { SectionPremiumMesh } from "./SectionHead";

export function Enroll() {
  return (
    <section id="enroll" className="section-premium px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <SectionPremiumMesh />
      <Reveal className="section-premium-inner relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-gradient-to-br from-burgundy via-mauve to-rose p-6 text-white shadow-premium ring-1 ring-white/20 sm:p-8 lg:p-10">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <span className="enroll-spots-badge">
              <Zap className="h-3.5 w-3.5" />
              Spots filling · register today
            </span>
            <p className="mt-4 text-sm font-black uppercase tracking-[.22em] text-blue-premium/90">
              Your transition starts here
            </p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-5xl">
              Register first. Audit ISO 14001:2026 with confidence.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-cream/90 sm:text-lg">
              Registration is free — enroll in the self-paced program or live July 18 workshop for
              full clause comparisons, tutor-led modules, cheat sheets, checklists, and your
              certificate.
            </p>
            <ul className="enroll-perk-grid">
              {REGISTER_PERKS.map((perk) => (
                <li key={perk} className="enroll-perk-item">
                  <Check className="h-4 w-4 shrink-0 text-rose" strokeWidth={2.5} />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <FormCta
              variant="register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-center font-extrabold text-burgundy shadow-lg hover:-translate-y-1 hover:bg-cream"
            >
              <UserPlus className="h-5 w-5" />
              {REGISTER_PRIMARY}
              <ArrowRight className="h-5 w-5" />
            </FormCta>
            <FormCta
              variant="live-workshop"
              className="rounded-full border border-white/40 px-7 py-4 text-center font-extrabold text-white hover:-translate-y-1 hover:bg-white/10"
            >
              {REGISTER_LIVE_WORKSHOP}
            </FormCta>
            <FormCta
              variant="register"
              className="rounded-full border border-white/40 px-7 py-4 text-center font-extrabold text-white hover:-translate-y-1 hover:bg-white/10"
            >
              {REGISTER_SELFPACED}
            </FormCta>
            <FormCta
              variant="download"
              className="text-center text-sm font-bold text-cream/90 underline-offset-2 hover:text-white hover:underline"
            >
              Download transition sheet first →
            </FormCta>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
