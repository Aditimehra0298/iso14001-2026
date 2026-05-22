"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon, type LucideIcon } from "lucide-react";
import { attendAudiences } from "@/lib/data";
import {
  ATTEND_CARD_IMAGE_ASPECT,
  ATTEND_CARD_IMAGE_HEIGHT,
  ATTEND_CARD_IMAGE_WIDTH,
} from "@/lib/constants";
import { Reveal } from "./Reveal";
import { RegisterBanner } from "./RegisterBanner";
import { SectionHead, SectionPremiumMesh } from "./SectionHead";

function attendImageSrc(slug: string) {
  return `/images/attend/${slug}.jpg`;
}

function AttendCardImage({
  slug,
  title,
  icon: Icon,
  imageUrl,
}: {
  slug: string;
  title: string;
  icon: LucideIcon;
  imageUrl?: string;
}) {
  const src = imageUrl ?? attendImageSrc(slug);
  const [usePlaceholder, setUsePlaceholder] = useState(!imageUrl);

  return (
    <div
      className="attend-card-image"
      style={{ aspectRatio: ATTEND_CARD_IMAGE_ASPECT }}
    >
      {!usePlaceholder && (
        <Image
          src={src}
          alt={`${title} — ISO 14001:2026 transition training`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="attend-card-image-photo object-cover"
          onError={() => setUsePlaceholder(true)}
        />
      )}

      <div
        className={`attend-card-image-placeholder ${usePlaceholder ? "is-visible" : ""}`}
        aria-hidden={!usePlaceholder}
      >
        <Icon className="h-8 w-8 text-primary/50" strokeWidth={1.5} />
        <p className="attend-card-image-placeholder-title">{title}</p>
        <p className="attend-card-image-placeholder-size">
          {ATTEND_CARD_IMAGE_WIDTH} × {ATTEND_CARD_IMAGE_HEIGHT} px
        </p>
        <p className="attend-card-image-placeholder-ratio">16:10 · JPG or WebP</p>
        <p className="attend-card-image-placeholder-path">
          <ImageIcon className="inline h-3 w-3" aria-hidden />
          public/images/attend/{slug}.jpg
        </p>
      </div>
    </div>
  );
}

function Attend() {
  return (
    <section id="attend" className="section-premium section-py">
      <SectionPremiumMesh />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHead
            badge="Who should attend"
            title={
              <>
                <span className="text-gradient">
                  For Auditors, EMS, Consultants &amp; Professional Teams
                </span>{" "}
                Preparing for the Transition Program
              </>
            }
            description="Each role card includes a photo area sized for professional audience imagery (800×500 px, 16:10 ratio)."
          />
        </Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attendAudiences.map((a) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.title} className="attend-card">
                <AttendCardImage
                  slug={a.imageSlug}
                  title={a.title}
                  icon={Icon}
                  imageUrl={a.imageUrl}
                />
                <div className="attend-card-body">
                  <span className="attend-card-icon">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-ink sm:text-xl">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <RegisterBanner
            variant="compact"
            headline="Built for your role — register first, then enroll"
            subline="Lead auditors, EMS managers, consultants, and certification body auditors all use this transition path."
          />
        </Reveal>
      </div>
    </section>
  );
}

export { Attend };
export default Attend;
