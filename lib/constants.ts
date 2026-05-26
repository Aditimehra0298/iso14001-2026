import { SITE_LOGO } from "@/lib/media";

export {
  FAQ_VIDEO,
  FAQ_VIDEO_POSTER,
  HERO_POSTER,
  HERO_VIDEO,
  OVERVIEW_POSTER,
  OVERVIEW_VIDEO,
  SITE_ICON,
  SITE_LOGO,
} from "@/lib/media";

/** Free preview length per module before blur + register prompt */
export const MODULE_PREVIEW_MS = 10 * 1000;

/**
 * Who should attend — card photos (16:10).
 * Export at 800×500 px minimum; 1600×1000 px for retina.
 * Save as WebP or JPG in public/images/attend/ (see filenames in lib/data attendAudiences).
 */
export const ATTEND_CARD_IMAGE_WIDTH = 800;
export const ATTEND_CARD_IMAGE_HEIGHT = 500;
export const ATTEND_CARD_IMAGE_ASPECT = "16 / 10" as const;

/** Who should attend — Lead Auditors card */
export const ATTEND_LEAD_AUDITORS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_800/v1779430161/ChatGPT_Image_May_22_2026_11_39_02_AM_k98vyt.png";

/** Who should attend — Internal Auditors card */
export const ATTEND_INTERNAL_AUDITORS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_800/v1779430460/ChatGPT_Image_May_22_2026_11_44_01_AM_h3licb.png";

/** Who should attend — Consultants card */
export const ATTEND_CONSULTANTS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_800/v1779429869/ChatGPT_Image_May_22_2026_11_33_58_AM_jupnju.png";

/** Who should attend — EMS Managers card */
export const ATTEND_EMS_MANAGERS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_800/v1779429813/ChatGPT_Image_May_22_2026_11_32_07_AM_jxhy6z.png";

/** Who should attend — Certification Body Auditors card */
export const ATTEND_CERTIFICATION_BODY_AUDITORS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_800/v1779429927/ChatGPT_Image_May_22_2026_11_35_05_AM_op37b3.png";

/** Who should attend — Organizations card */
export const ATTEND_ORGANIZATIONS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_800/v1779430010/ChatGPT_Image_May_22_2026_11_36_28_AM_zdzwfs.png";

/** Optional left-column image for Why This Matters (add to public/) */
export const WHY_MATTERS_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_960/v1779423458/ChatGPT_Image_May_22_2026_09_46_12_AM_hxdzpt.png";
export const WHY_MATTERS_FALLBACK = SITE_LOGO;

export const WORKSHOP_BG_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/v1779409064/ChatGPT_Image_May_22_2026_05_46_58_AM_bdxxpt.png";

/** Course banner below workshop calendar — includes register CTA overlay */
export const WORKSHOP_PROMO_IMAGE =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto,w_720/v1779423663/WhatsApp_Image_2026-05-22_at_9.45.19_AM_sd3oq6.jpg";

/** Self-paced online course */
export const SELFPACED_PRICE_USD = 80;
export const SELFPACED_PRICE_DISPLAY = "$80";
export const SELFPACED_PRICE_LABEL = "$80 USD";

/** Live 8-hour tutor-led transition workshop */
export const LIVE_WORKSHOP_PRICE_USD = 100;
export const LIVE_WORKSHOP_PRICE_DISPLAY = "$100";
export const LIVE_WORKSHOP_PRICE_LABEL = "$100 USD";
export const LIVE_WORKSHOP_DATE_LABEL = "18 July 2026";

/** @deprecated Use SELFPACED_* — kept for existing imports */
export const WORKSHOP_PRICE_USD = SELFPACED_PRICE_USD;
export const WORKSHOP_PRICE_DISPLAY = SELFPACED_PRICE_DISPLAY;
export const WORKSHOP_PRICE_LABEL = SELFPACED_PRICE_LABEL;

/** Transition cheat sheet — public download after lead form */
export const TRANSITION_SHEET_PDF = "/ISO_14001_2026_Transition_.sheet.pdf";

/** Floating WhatsApp & email (fixed right side, whole site) */
export const FLOATING_CONTACT = {
  phoneDisplay: "+01 90567 42783",
  /** Digits only for wa.me (no + or spaces) */
  whatsappDigits: "19056742783",
  email: "Bdm@sfttrainings.org",
} as const;

/** Footer & contact */
export const SITE_CONTACT = {
  email: "info@sftrainings.org",
} as const;

export type SiteOffice = {
  country: string;
  phone?: string;
  tel?: string;
};

/** Footer offices — country + phone only (no street addresses) */
export const SITE_OFFICES: SiteOffice[] = [
  { country: "India", phone: "+91 9056742783", tel: "+919056742783" },
  { country: "Canada", phone: "+1 (778) 798-9624", tel: "+17787989624" },
  { country: "Dubai" },
  { country: "UK" },
  { country: "USA" },
];

export const LEAD_FORM_SUCCESS_TITLE = "Thank you!";
export const LEAD_FORM_SUCCESS_MESSAGE = "We will contact you soon.";
