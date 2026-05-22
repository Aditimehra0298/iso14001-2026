import { LIVE_WORKSHOP_PRICE_DISPLAY, SELFPACED_PRICE_DISPLAY } from "./constants";

/** Primary CTA — registration is free; course modules are paid after enroll */
export const REGISTER_PRIMARY = "Register Now";

export const REGISTER_MODULE_CTA = "Register Now — Unlock Full Session";

export const REGISTER_BADGE = "Register first · paid module access";

export const REGISTER_FOOTNOTE =
  "Free to register · full modules unlock after paid enrollment";

export const REGISTER_DEFAULT_HEADLINE =
  "Register first — then unlock every module & tool";

export const REGISTER_DEFAULT_SUBLINE = `Watch short previews at no cost. Register, then enroll in the live workshop (${LIVE_WORKSHOP_PRICE_DISPLAY}) or self-paced (${SELFPACED_PRICE_DISPLAY}) for full videos, audio, checklists, and your certificate.`;

export const REGISTER_HERO_NOTE =
  "Register first at no charge. All 9 modules, full audio, and downloadable auditor tools unlock after paid enrollment.";

export const REGISTER_SELFPACED = `Enroll Self-Paced — ${SELFPACED_PRICE_DISPLAY}`;
export const REGISTER_LIVE_WORKSHOP = `Reserve Live Workshop — ${LIVE_WORKSHOP_PRICE_DISPLAY}`;
/** @deprecated Use REGISTER_SELFPACED */
export const REGISTER_WORKSHOP = REGISTER_SELFPACED;

export const REGISTER_PERKS = [
  "All 9 tutor-led modules after enrollment",
  "Download auditor cheat sheets & checklists",
  "Certificate of completion included",
  "Live workshop + replay access",
] as const;

export const URGENCY_LINES = [
  "Registration open for ISO 14001:2026 transition",
  "Register first · then enroll for self-paced or live access",
  "Built for lead auditors, EMS teams & consultants",
] as const;

export const SOCIAL_PROOF = "Trusted by auditors & EMS professionals worldwide";
