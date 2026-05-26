import { withBasePath } from "@/lib/base-path";
import { TRANSITION_SHEET_PDF } from "./constants";
import { N8N_LEAD_WEBHOOK_URL } from "./n8n-webhook";

export type LeadFormVariant = "register" | "live-workshop" | "download";

export type LeadFormField = {
  name: keyof LeadFormValues;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  autoComplete?: string;
};

export type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export const LEAD_FORM_INITIAL: LeadFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export type LeadFormConfig = {
  variant: LeadFormVariant;
  title: string;
  subtitle: string;
  submitLabel: string;
  fields: LeadFormField[];
};

export const LEAD_FORM_CONFIG: Record<LeadFormVariant, LeadFormConfig> = {
  register: {
    variant: "register",
    title: "Register First",
    subtitle:
      "Complete every field below to register. Registration is free — our team will follow up with enrollment for paid self-paced modules and the live workshop.",
    submitLabel: "Submit registration",
    fields: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+1 234 567 8900",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "you@company.com",
        autoComplete: "email",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Tell us about your role or training goals",
      },
    ],
  },
  "live-workshop": {
    variant: "live-workshop",
    title: "Reserve Live 8-Hour Tutor-Led Workshop",
    subtitle:
      "All fields are required. We will confirm your live workshop seat by email.",
    submitLabel: "Reserve workshop seat",
    fields: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+1 234 567 8900",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Gmail / email address",
        type: "email",
        placeholder: "you@gmail.com",
        autoComplete: "email",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Preferred date, location, or team size",
      },
    ],
  },
  download: {
    variant: "download",
    title: "Download Transition Sheet",
    subtitle:
      "Fill in all required details below. Your ISO 14001:2026 transition sheet will download immediately after submit.",
    submitLabel: "Get transition sheet",
    fields: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        placeholder: "Your full name",
        autoComplete: "name",
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+1 234 567 8900",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "you@company.com",
        autoComplete: "email",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Optional note (required)",
      },
    ],
  },
};

export function triggerTransitionSheetDownload() {
  const link = document.createElement("a");
  link.href = withBasePath(TRANSITION_SHEET_PDF);
  link.download = "ISO_14001_2026_Transition_Sheet.pdf";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export type LeadSubmissionPayload = LeadFormValues & {
  formType: LeadFormVariant;
  timestamp: string;
};

async function submitLeadToN8n(
  payload: LeadSubmissionPayload
): Promise<{ ok: boolean; error?: string }> {
  const webhook =
    process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL?.trim() || N8N_LEAD_WEBHOOK_URL;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, error: "Could not save your details. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

export async function submitLeadToSheet(
  payload: LeadSubmissionPayload
): Promise<{ ok: boolean; error?: string }> {
  const apiUrl = withBasePath("/api/lead");

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true };

    /* Static hosting or wrong path — no Next.js API; post to n8n directly */
    if (res.status === 404 || res.status === 405) {
      return submitLeadToN8n(payload);
    }

    let message = "Something went wrong. Please try again.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      /* use default */
    }
    return { ok: false, error: message };
  } catch {
    return submitLeadToN8n(payload);
  }
}
