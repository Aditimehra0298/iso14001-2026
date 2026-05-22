import { NextResponse } from "next/server";
import type { LeadFormVariant } from "@/lib/lead-form";
import { N8N_LEAD_WEBHOOK_URL } from "@/lib/n8n-webhook";

type LeadBody = {
  formType?: LeadFormVariant;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  timestamp?: string;
};

const FORM_TYPES: LeadFormVariant[] = ["register", "live-workshop", "download"];

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const formType = body.formType;
  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!formType || !FORM_TYPES.includes(formType)) {
    return NextResponse.json({ error: "Invalid form type." }, { status: 400 });
  }
  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const payload = {
    formType,
    name,
    phone,
    email,
    message,
    timestamp: body.timestamp ?? new Date().toISOString(),
  };

  try {
    const n8nRes = await fetch(N8N_LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      console.error("n8n webhook failed:", n8nRes.status, await n8nRes.text());
      return NextResponse.json(
        { error: "Could not save your details. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("n8n webhook error:", err);
    return NextResponse.json(
      { error: "Could not save your details. Please try again." },
      { status: 502 }
    );
  }
}
