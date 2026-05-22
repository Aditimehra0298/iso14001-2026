"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LeadFormVariant } from "@/lib/lead-form";
import { useLeadForm } from "./LeadFormProvider";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: LeadFormVariant;
  children: ReactNode;
};

export function FormCta({ variant, children, className, type, onClick, ...rest }: Props) {
  const { openForm } = useLeadForm();

  return (
    <button
      type={type ?? "button"}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) openForm(variant);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
