"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { learnSlides } from "@/lib/data";
import { Reveal } from "./Reveal";

export function OverviewLearnSwiper() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Autoplay],
      loop: true,
      slidesPerView: 1.12,
      spaceBetween: 16,
      speed: 1600,
      grabCursor: true,
      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      },
      autoplay: prefersReducedMotion
        ? false
        : {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          },
      breakpoints: {
        640: { slidesPerView: 2.1, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 3.25 },
      },
    });
    return () => swiper.destroy();
  }, []);

  return (
    <Reveal className="mt-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="section-head-premium max-w-2xl">
          <span className="section-badge-premium">Practical transition learning</span>
          <h3 className="section-title-premium">
            What You&apos;ll Learn —{" "}
            <span className="text-gradient">skills &amp; outcomes</span>
          </h3>
          <p className="section-desc-premium">
            Gain practical understanding of the latest ISO 14001:2026 transition requirements
            through tutor-led implementation guidance, auditor-focused explanations, and real
            environmental management scenarios.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            ref={prevRef}
            type="button"
            className="swiper-button-prev-ov inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/95 text-burgundy shadow-premium backdrop-blur-sm"
            aria-label="Previous learning topic"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="swiper-button-next-ov inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/95 text-burgundy shadow-premium backdrop-blur-sm"
            aria-label="Next learning topic"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={swiperRef}
        className="swiper ov-learn-swiper ov-learn-swiper--drift mt-5 overflow-hidden px-1 pb-2"
      >
        <div className="swiper-wrapper">
          {learnSlides.map((slide) => {
            const Icon = slide.icon;
            return (
              <div key={slide.title} className="swiper-slide">
                <article className="ov-learn-card h-full">
                  <div className="ov-icon-ring text-burgundy">
                    <Icon className="h-6 w-6" strokeWidth={2.25} />
                  </div>
                  <h4 className="font-display mt-4 text-base font-bold leading-snug text-ink sm:text-lg">
                    {slide.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{slide.desc}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
