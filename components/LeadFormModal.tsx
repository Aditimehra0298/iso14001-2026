"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  LEAD_FORM_SUCCESS_MESSAGE,
  LEAD_FORM_SUCCESS_TITLE,
} from "@/lib/constants";
import {
  LEAD_FORM_CONFIG,
  LEAD_FORM_INITIAL,
  submitLeadToSheet,
  triggerTransitionSheetDownload,
  type LeadFormVariant,
  type LeadFormValues,
} from "@/lib/lead-form";

type Props = {
  variant: LeadFormVariant | null;
  onClose: () => void;
};

export function LeadFormModal({ variant, onClose }: Props) {
  const [values, setValues] = useState<LeadFormValues>(LEAD_FORM_INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = variant ? LEAD_FORM_CONFIG[variant] : null;
  const open = Boolean(config);

  useEffect(() => {
    if (!open) return;
    setValues(LEAD_FORM_INITIAL);
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
  }, [open, variant]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !config) return null;

  const handleChange = (name: keyof LeadFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!variant || submitting) return;

    const trimmed: LeadFormValues = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    if (!trimmed.name || !trimmed.phone || !trimmed.email || !trimmed.message) {
      setError("All fields are required. Please complete every detail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await submitLeadToSheet({
      formType: variant,
      ...trimmed,
      timestamp: new Date().toISOString(),
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    if (variant === "download") {
      window.setTimeout(() => triggerTransitionSheetDownload(), 400);
    }
  };

  return (
    <div
      className="lead-form-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lead-form-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
      >
        <button
          type="button"
          className="lead-form-close"
          onClick={onClose}
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <p className="lead-form-eyebrow">ISO 14001:2026 Transition</p>
            <h2 id="lead-form-title" className="lead-form-title">
              {config.title}
            </h2>
            <p className="lead-form-subtitle">{config.subtitle}</p>

            <form className="lead-form-fields" onSubmit={handleSubmit} noValidate>
              {config.fields.map((field) => (
                <label key={field.name} className="lead-form-field">
                  <span className="lead-form-label">
                    {field.label}
                    <span className="lead-form-required" aria-hidden>
                      *
                    </span>
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      required
                      className="lead-form-input lead-form-textarea"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required
                      className="lead-form-input"
                    />
                  )}
                </label>
              ))}

              {error && (
                <p className="lead-form-error" role="alert">
                  {error}
                </p>
              )}

              <p className="lead-form-note">All fields marked with * are compulsory.</p>

              <button type="submit" className="lead-form-submit" disabled={submitting}>
                {submitting ? "Sending…" : config.submitLabel}
              </button>
            </form>
          </>
        ) : (
          <div
            className="lead-form-success"
            role="status"
            aria-live="polite"
            aria-labelledby="lead-form-success-title"
          >
            <p className="lead-form-success-icon" aria-hidden>
              ✓
            </p>
            <h2 id="lead-form-success-title" className="lead-form-success-title">
              {LEAD_FORM_SUCCESS_TITLE}
            </h2>
            <p className="lead-form-success-message">{LEAD_FORM_SUCCESS_MESSAGE}</p>
            {variant === "download" && (
              <p className="lead-form-success-note">
                Your transition sheet will download now.
              </p>
            )}
            <button type="button" className="lead-form-submit" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
