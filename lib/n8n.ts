/** n8n webhook — all lead forms append to one Google Sheet workflow */
export const N8N_LEAD_WEBHOOK_URL =
  process.env.N8N_LEAD_WEBHOOK_URL ??
  "https://damnart-ai-guladab.n8n-wsk.com/webhook/iso14001-lead";

export type LeadWebhookPayload = {
  formType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  timestamp: string;
};
