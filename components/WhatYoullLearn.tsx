import { OverviewLearnSwiper } from "./OverviewLearnSwiper";
import { RegisterBanner } from "./RegisterBanner";
import { SectionPremiumMesh } from "./SectionHead";
import { Reveal } from "./Reveal";

/** What You'll Learn — placed after curriculum module videos */
export function WhatYoullLearn() {
  return (
    <section id="what-youll-learn" className="section-premium section-py">
      <SectionPremiumMesh />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OverviewLearnSwiper />
        <Reveal className="mt-6">
          <RegisterBanner
            variant="compact"
            headline="Turn learning into audit-ready skills — register free"
            subline="Unlock tutor-led lessons, scenarios, and downloadable tools aligned to ISO 14001:2026."
          />
        </Reveal>
      </div>
    </section>
  );
}
