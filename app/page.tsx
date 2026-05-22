import { SiteShell } from "@/components/SiteShell";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Overview } from "@/components/Overview";
import { TransitionWorkshop } from "@/components/TransitionWorkshop";
import { WhyThisMatters } from "@/components/WhyThisMatters";
import { Changes } from "@/components/Changes";
import { CurriculumCarousel } from "@/components/CurriculumCarousel";
import { WhatYoullLearn } from "@/components/WhatYoullLearn";
import Attend from "@/components/Attend";
import { Resources } from "@/components/Resources";
import { Faq } from "@/components/Faq";
import { Enroll } from "@/components/Enroll";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <SiteShell>
      <Header />
      <main>
        <Hero />
        <Overview />
        <TransitionWorkshop />
        <WhyThisMatters />
        <Changes />
        <CurriculumCarousel />
        <WhatYoullLearn />
        <Attend />
        <Resources />
        <Faq />
        <Enroll />
      </main>
      <Footer />
    </SiteShell>
  );
}
