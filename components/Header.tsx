"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE_LOGO } from "@/lib/constants";
import { REGISTER_PRIMARY } from "@/lib/marketing";
import { FormCta } from "./FormCta";

export function Header() {
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setOnHero(e.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        onHero ? "header-on-hero" : "header-scrolled"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <Image
            src={SITE_LOGO}
            alt=""
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 object-contain"
            priority
          />
          <span>
            <span className="brand-title block text-sm font-extrabold text-cream sm:text-base">
              Sustainable Futures Training
            </span>
            <span className="brand-sub block text-xs text-cream/75">
              ISO 14001 Transition Course
            </span>
          </span>
        </a>
        <div className="nav-links hidden items-center gap-7 text-sm font-bold text-cream/90 lg:flex">
          <a href="#overview" className="nav-link hover:text-white">
            Overview
          </a>
          <a href="#workshop-live" className="nav-link hover:text-white">
            Workshop
          </a>
          <a href="#workshop-selfpaced" className="nav-link hover:text-white">
            Self-paced
          </a>
          <a href="#changes" className="nav-link hover:text-white">
            Changes
          </a>
          <a href="#curriculum" className="nav-link hover:text-white">
            Curriculum
          </a>
          <a href="#what-youll-learn" className="nav-link hover:text-white">
            Learn
          </a>
          <a href="#faq" className="nav-link hover:text-white">
            FAQ
          </a>
        </div>
        <FormCta
          variant="register"
          className="hidden rounded-full bg-rose px-5 py-2.5 text-sm font-extrabold text-white shadow-soft ring-2 ring-white/25 hover:bg-burgundy-soft sm:inline-flex"
        >
          {REGISTER_PRIMARY}
        </FormCta>
      </nav>
    </header>
  );
}
