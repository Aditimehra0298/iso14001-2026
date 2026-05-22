"use client";

import { useEffect, useRef } from "react";
import { curriculumModules } from "@/lib/data";
import { Reveal } from "./Reveal";
import { RegisterBanner } from "./RegisterBanner";
import { SectionHead, SectionPremiumMesh } from "./SectionHead";
import { ModuleVideoCard } from "./ModuleVideoCard";
import {
  CurriculumPlayProvider,
  useCurriculumPlay,
} from "./CurriculumPlayContext";

function CurriculumGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const { playAllTogether } = useCurriculumPlay();
  const autoStarted = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoStarted.current) {
          autoStarted.current = true;
          playAllTogether();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [playAllTogether]);

  return (
    <section
      ref={sectionRef}
      id="curriculum"
      className="section-premium section-py"
    >
      <SectionPremiumMesh variant="warm" />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHead
            badge="9 tutor-led video modules"
            className="curriculum-section-head"
            title={
              <span className="curriculum-section-title">
                ISO 14001:2026{" "}
                <span className="text-gradient">Self-Paced Transition Program</span>
              </span>
            }
            description="Learn through structured expert-led modules focused on practical EMS transition understanding, audit preparation, lifecycle thinking, and environmental compliance effectiveness."
          />
        </Reveal>

        <Reveal className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculumModules.map((mod) => (
              <ModuleVideoCard key={mod.n} module={mod} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <RegisterBanner
            variant="urgent"
            headline="Loved the previews? Register first, then enroll for all 9 full modules."
            subline="Register first at no charge — enroll in the self-paced program for full access to all 9 modules."
          />
        </Reveal>
      </div>
    </section>
  );
}

export function CurriculumCarousel() {
  return (
    <CurriculumPlayProvider>
      <CurriculumGrid />
    </CurriculumPlayProvider>
  );
}
