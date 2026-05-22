import Image from "next/image";
import { whyMattersCards, type WhyMatterCard } from "@/lib/data";
import { WHY_MATTERS_IMAGE } from "@/lib/constants";
import { Reveal } from "./Reveal";
import { RegisterBanner } from "./RegisterBanner";
import { SectionPremiumMesh } from "./SectionHead";

const CARDS_UNDER_IMAGE = 3;

function WhyMatterCardItem({ card, index }: { card: WhyMatterCard; index: number }) {
  const Icon = card.icon;
  return (
    <article className="why-matter-card">
      <span className="why-matter-card-icon">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        <span className="why-matter-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="font-display mt-1 text-base font-bold leading-snug text-ink">{card.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{card.desc}</p>
      </div>
    </article>
  );
}

export function WhyThisMatters() {
  const cardsUnderImage = whyMattersCards.slice(0, CARDS_UNDER_IMAGE);
  const cardsBeside = whyMattersCards.slice(CARDS_UNDER_IMAGE);
  return (
    <section id="why-matters" className="why-matters-section section-premium section-py">
      <SectionPremiumMesh />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="why-matters-layout">
          <div className="why-matters-left">
            <Reveal className="why-matters-visual">
              <div className="why-matters-image-frame">
                <Image
                  src={WHY_MATTERS_IMAGE}
                  alt="Environmental sustainability — globe, green landscape, and renewable energy representing ISO 14001:2026 transition readiness"
                  fill
                  sizes="(max-width: 1024px) min(90vw, 420px), 400px"
                  className="why-matters-image"
                  priority
                />
                <div className="why-matters-image-overlay" aria-hidden="true" />
                <div className="why-matters-image-badge">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    ISO 14001:2026
                  </span>
                  <span className="font-display text-lg font-extrabold text-white">
                    Transition ready
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal className="why-matters-cards-under">
              {cardsUnderImage.map((card, i) => (
                <WhyMatterCardItem key={card.title} card={card} index={i} />
              ))}
            </Reveal>
          </div>

          <div className="why-matters-content">
            <Reveal>
              <p className="ov-eyebrow">Why ISO 14001:2026 transition matters</p>
              <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                Environmental compliance is evolving — organizations must be ready
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                ISO 14001:2026 introduces stronger expectations around environmental performance,
                climate-related considerations, lifecycle thinking, audit effectiveness, and
                continual improvement. Organizations and professionals must understand these updates
                to maintain compliance, strengthen EMS implementation, and prepare confidently for
                transition audits.
              </p>
            </Reveal>

            <Reveal className="mt-5">
              <div className="why-matters-cards">
                {cardsBeside.map((card, i) => (
                  <WhyMatterCardItem
                    key={card.title}
                    card={card}
                    index={i + CARDS_UNDER_IMAGE}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-5">
              <RegisterBanner
                variant="compact"
                headline="Don't wait for audit day — register now"
                subline="Register first, then enroll for the full ISO 14001:2026 transition course, tools, and certificate."
                className="mb-4"
              />
              <div className="why-matters-support">
                <p className="text-sm leading-relaxed text-ink sm:text-base">
                  Whether you are an <strong className="text-burgundy">auditor</strong>,{" "}
                  <strong className="text-burgundy">consultant</strong>,{" "}
                  <strong className="text-burgundy">EMS manager</strong>, or organizational{" "}
                  <strong className="text-burgundy">compliance professional</strong>, understanding
                  ISO 14001:2026 transition expectations is essential for maintaining environmental
                  compliance, reducing audit risks, and improving environmental management system
                  effectiveness.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
