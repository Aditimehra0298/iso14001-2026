"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LeadFormVariant } from "@/lib/lead-form";
import { LeadFormModal } from "./LeadFormModal";

type LeadFormContextValue = {
  openForm: (variant: LeadFormVariant) => void;
  closeForm: () => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<LeadFormVariant | null>(null);

  const openForm = useCallback((v: LeadFormVariant) => setVariant(v), []);
  const closeForm = useCallback(() => setVariant(null), []);

  const value = useMemo(() => ({ openForm, closeForm }), [openForm, closeForm]);

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      <LeadFormModal variant={variant} onClose={closeForm} />
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) {
    throw new Error("useLeadForm must be used within LeadFormProvider");
  }
  return ctx;
}
