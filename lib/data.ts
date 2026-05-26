import type { LucideIcon } from "lucide-react";
import {
  ATTEND_CERTIFICATION_BODY_AUDITORS_IMAGE,
  ATTEND_CONSULTANTS_IMAGE,
  ATTEND_EMS_MANAGERS_IMAGE,
  ATTEND_INTERNAL_AUDITORS_IMAGE,
  ATTEND_LEAD_AUDITORS_IMAGE,
  ATTEND_ORGANIZATIONS_IMAGE,
  LIVE_WORKSHOP_PRICE_LABEL,
  SELFPACED_PRICE_LABEL,
} from "./constants";
import { moduleVideoPath } from "./media";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  CloudSun,
  Recycle,
  GitBranch,
  ClipboardCheck,
  Leaf,
  Search,
  TrendingUp,
  Truck,
  RefreshCw,
  Users,
  ShieldCheck,
  BarChart3,
  Crown,
} from "lucide-react";

export type Highlight = {
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
};

export const highlights: Highlight[] = [
  {
    icon: CloudSun,
    tag: "Clause 4–6",
    title: "Climate change & environmental condition integration",
    desc: "Environmental conditions—including climate change—are explicitly named in context, scope, and planning.",
  },
  {
    icon: Recycle,
    tag: "Operations",
    title: "Stronger lifecycle thinking across operations",
    desc: "Lifecycle perspective extends from design through end-of-life across operational controls.",
  },
  {
    icon: GitBranch,
    tag: "Clause 6.3",
    title: "Enhanced EMS planning & change management",
    desc: "Risks, opportunities, and planned changes are structured for clearer auditor verification.",
  },
  {
    icon: ClipboardCheck,
    tag: "Clause 9",
    title: "Updated audit and compliance expectations",
    desc: "Audit objectives join criteria and scope; compliance obligations wording is clarified.",
  },
  {
    icon: TrendingUp,
    tag: "Performance",
    title: "Improved environmental performance evaluation",
    desc: "Trend analysis and effectiveness evidence carry more weight in transition audits.",
  },
  {
    icon: Truck,
    tag: "Clause 8",
    title: "Expanded supplier & external provider controls",
    desc: "Externally provided processes, products, and services widen the audit lens.",
  },
  {
    icon: RefreshCw,
    tag: "Clause 10",
    title: "Greater focus on continual improvement",
    desc: "Continual improvement is integrated—not removed—from the improvement framework.",
  },
  {
    icon: Users,
    tag: "Clause 9",
    title: "More structured management review processes",
    desc: "Management review is split into general requirements, inputs, and results.",
  },
];

export type LearnSlide = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const learnSlides: LearnSlide[] = [
  {
    icon: GitBranch,
    title: "ISO 14001:2015 → 2026 Key Changes",
    desc: "Understand the major clause updates, terminology revisions, structural changes, and implementation expectations introduced in ISO 14001:2026.",
  },
  {
    icon: CloudSun,
    title: "Environmental Context & Sustainability",
    desc: "Learn how climate change, biodiversity, pollution, ecosystem health, and natural resource considerations are integrated into EMS planning.",
  },
  {
    icon: Recycle,
    title: "Lifecycle Thinking & Operational Control",
    desc: "Explore strengthened lifecycle approaches across products, services, procurement activities, suppliers, contractors, and externally provided processes.",
  },
  {
    icon: TrendingUp,
    title: "EMS Planning & Change Management",
    desc: "Understand risks, opportunities, planning actions, environmental objectives, and the new structured approach to EMS changes.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit Readiness & Evidence Evaluation",
    desc: "Learn how transition audits evaluate environmental performance, compliance obligations, EMS effectiveness, and objective evidence.",
  },
  {
    icon: RefreshCw,
    title: "Corrective Actions & Continual Improvement",
    desc: "Develop practical understanding of root cause analysis, recurrence prevention, corrective action effectiveness, and continual improvement expectations.",
  },
];

export type WhyMatterCard = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const whyMattersCards: WhyMatterCard[] = [
  {
    icon: CloudSun,
    title: "Stronger Environmental Expectations",
    desc: "Organizations are now expected to address climate change, biodiversity, ecosystem health, pollution, and sustainable resource considerations more explicitly within environmental management systems.",
  },
  {
    icon: ShieldCheck,
    title: "Greater Audit & Evidence Focus",
    desc: "Transition audits will place increased emphasis on objective evidence, environmental performance evaluation, audit objectives, and EMS effectiveness verification.",
  },
  {
    icon: Recycle,
    title: "Enhanced Lifecycle Thinking",
    desc: "Environmental responsibilities now extend further across procurement activities, suppliers, contractors, operational processes, and end-of-life environmental controls.",
  },
  {
    icon: GitBranch,
    title: "Structured EMS Change Management",
    desc: "ISO 14001:2026 introduces clearer planning and environmental management system change requirements to improve operational control and implementation consistency.",
  },
  {
    icon: Crown,
    title: "Increased Leadership Accountability",
    desc: "Leadership involvement, environmental commitments, compliance obligations, and resource support expectations are becoming more visible during audits and EMS evaluations.",
  },
  {
    icon: BarChart3,
    title: "Better Continual Improvement Expectations",
    desc: "Organizations must demonstrate stronger corrective action processes, recurrence prevention, root cause evaluation, and measurable environmental improvement activities.",
  },
  {
    icon: Truck,
    title: "Stronger External Provider & Supplier Controls",
    desc: "ISO 14001:2026 places greater emphasis on controlling and influencing externally provided processes, products, and services through improved supplier communication, procurement controls, and lifecycle-based operational management.",
  },
];

export type AttendAudience = {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** public/images/attend/{slug}.jpg — 800×500 px (16:10) */
  imageSlug: string;
  /** Optional Cloudinary or public URL; overrides local file when set */
  imageUrl?: string;
};

export const attendAudiences: AttendAudience[] = [
  {
    icon: BadgeCheck,
    title: "Lead Auditors",
    desc: "Strengthen transition audit judgement.",
    imageSlug: "lead-auditors",
    imageUrl: ATTEND_LEAD_AUDITORS_IMAGE,
  },
  {
    icon: Search,
    title: "Internal Auditors",
    desc: "Prepare internal transition audits.",
    imageSlug: "internal-auditors",
    imageUrl: ATTEND_INTERNAL_AUDITORS_IMAGE,
  },
  {
    icon: Leaf,
    title: "EMS Managers",
    desc: "Update EMS processes and records.",
    imageSlug: "ems-managers",
    imageUrl: ATTEND_EMS_MANAGERS_IMAGE,
  },
  {
    icon: Briefcase,
    title: "Consultants",
    desc: "Support clients with gap analysis.",
    imageSlug: "consultants",
    imageUrl: ATTEND_CONSULTANTS_IMAGE,
  },
  {
    icon: ShieldCheck,
    title: "Certification Body Auditors",
    desc: "Audit transition evidence consistently.",
    imageSlug: "certification-body-auditors",
    imageUrl: ATTEND_CERTIFICATION_BODY_AUDITORS_IMAGE,
  },
  {
    icon: Building2,
    title: "Organizations",
    desc: "Prepare teams for ISO 14001:2026 migration.",
    imageSlug: "organizations",
    imageUrl: ATTEND_ORGANIZATIONS_IMAGE,
  },
];

export type CurriculumModule = {
  n: number;
  short: string;
  title: string;
  desc: string;
  /** Local path under public/videos — resolved to Cloudinary on Vercel at runtime */
  videoPath: string;
  /** Extra clip unlocked after registration (e.g. Module 4 part 2) */
  videoPart2Path?: string;
};

export const curriculumModules: CurriculumModule[] = [
  { n: 1, short: "Overview", title: "Module 1 — Transition Overview", desc: "Understand the purpose, structure and auditor expectations of ISO 14001:2026 transition.", videoPath: moduleVideoPath("module-01.mp4") },
  { n: 2, short: "Clause 4", title: "Module 2 — Clause 4: Context", desc: "Environmental conditions, interested parties, lifecycle scope and risk linkage.", videoPath: moduleVideoPath("module-02.mp4") },
  { n: 3, short: "Clause 5", title: "Module 3 — Clause 5: Leadership", desc: "Leadership accountability, environmental policy, compliance terminology and policy notes.", videoPath: moduleVideoPath("module-03.mp4") },
  {
    n: 4,
    short: "Clause 6",
    title: "Module 4 — Clause 6: Planning",
    desc: "Risks, opportunities, aspects, objectives and new planning of changes requirement. Includes a second part after registration.",
    videoPath: moduleVideoPath("module-04.mp4"),
    videoPart2Path: moduleVideoPath("module-04-part2.mp4"),
  },
  { n: 5, short: "Clause 7", title: "Module 5 — Clause 7: Support", desc: "Competence, awareness, communication and documented information at point of use.", videoPath: moduleVideoPath("module-05.mp4") },
  { n: 6, short: "Clause 8", title: "Module 6 — Clause 8: Operation", desc: "Operational control, emergency preparedness and external provider influence.", videoPath: moduleVideoPath("module-06.mp4") },
  { n: 7, short: "Clause 9", title: "Module 7 — Clause 9: Evaluation", desc: "Monitoring, measurement, analysis, evaluation and internal audit objectives.", videoPath: moduleVideoPath("module-07.mp4") },
  { n: 8, short: "Clause 10", title: "Module 8 — Clause 10: Improvement", desc: "Nonconformity, corrective action and integrated continual improvement.", videoPath: moduleVideoPath("module-08.mp4") },
  { n: 9, short: "Assessment", title: "Module 9 — Final Assessment", desc: "Scenario-based questions, case study application and transition audit readiness check.", videoPath: moduleVideoPath("module-09.mp4") },
];

export const faqItems = [
  {
    q: "Who should attend this workshop?",
    a: "This workshop is designed for consultants, EMS managers, internal auditors, lead auditors, sustainability professionals, compliance teams, and organizations preparing for ISO 14001:2026 transition.",
  },
  {
    q: "Is this a live tutor-led training?",
    a: "Yes. This is a live 8-hour tutor-led workshop conducted by industry professionals with practical transition and environmental management expertise.",
  },
  {
    q: "What is the duration of the workshop?",
    a: "The training is a one-day intensive workshop with approximately 8 hours of guided learning, implementation discussions, and transition-focused explanations.",
  },
  {
    q: "What will I learn during the training?",
    a: "Participants will learn ISO 14001:2015 to ISO 14001:2026 changes, lifecycle thinking, EMS planning, audit expectations, environmental context updates, operational controls, and continual improvement requirements.",
  },
  {
    q: "Will transition comparison materials be provided?",
    a: "Yes. After you register and enroll in the self-paced program or live workshop, you receive premium transition resources including comparison references, auditor guidance, implementation materials, and downloadable workshop resources.",
  },
  {
    q: "Is prior ISO 14001 knowledge required?",
    a: "Basic understanding of ISO 14001 or environmental management systems is recommended, but the workshop is structured to support both professionals and organizational teams.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Participants will receive a professional workshop completion certificate after attending the training.",
  },
  {
    q: "Is the workshop online or offline?",
    a: "The workshop is conducted online, allowing participants to join remotely from any location.",
  },
  {
    q: "Will recorded sessions be available?",
    a: "Yes. Participants will receive access to recorded workshop sessions for future learning and revision purposes.",
  },
  {
    q: "What is the registration fee?",
    a: `Self-paced course is ${SELFPACED_PRICE_LABEL} (full online access). The live 8-hour tutor-led workshop is ${LIVE_WORKSHOP_PRICE_LABEL}, including training, downloadable resources, and certificate.`,
  },
  {
    q: "How do I access the premium transition resources?",
    a: "Premium transition resources and downloadable implementation materials become available after registration.",
  },
  {
    q: "Does the workshop include practical audit guidance?",
    a: "Yes. The training includes auditor-focused explanations, evidence expectations, audit readiness guidance, and practical EMS implementation discussions.",
  },
] as const;
