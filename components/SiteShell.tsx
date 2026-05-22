"use client";

import type { ReactNode } from "react";
import { FloatingContact } from "./FloatingContact";
import { LeadFormProvider } from "./LeadFormProvider";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LeadFormProvider>
      {children}
      <FloatingContact />
    </LeadFormProvider>
  );
}
