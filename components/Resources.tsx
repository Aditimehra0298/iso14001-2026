"use client";

import { ClipboardList, FileDown, Presentation, Route, Table } from "lucide-react";
import { FormCta } from "./FormCta";
import { Reveal } from "./Reveal";
import { RegisterBanner } from "./RegisterBanner";
import { SectionHead, SectionPremiumMesh } from "./SectionHead";

const items = [
  { icon: FileDown, title: "Transition Cheat Sheet", formVariant: "download" as const },
  { icon: Table, title: "Comparison Matrix", formVariant: "register" as const },
  { icon: ClipboardList, title: "Audit Checklist", formVariant: "register" as const },
  { icon: Presentation, title: "Review Template", formVariant: "register" as const },
  { icon: Route, title: "Action Plan", formVariant: "register" as const },
];

export function Resources() {
  return (
    <section id="resources" className="section-premium section-py">
      <SectionPremiumMesh variant="warm" />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHead
            badge="Included resources"
            title={
              <>
                Downloadable{" "}
                <span className="text-gradient">auditor reference materials</span>
              </>
            }
          />
        </Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <Reveal key={item.title} className="card-premium text-center sm:text-left">
              <FormCta
                variant={item.formVariant}
                className="block w-full text-left transition hover:opacity-95"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-blue-premium text-burgundy sm:mx-0">
                  <item.icon className="h-6 w-6" strokeWidth={2.25} />
                </span>
                <h3 className="font-display mt-4 text-base font-extrabold text-ink sm:text-lg">
                  {item.title}
                </h3>
                {item.formVariant === "download" && (
                  <p className="mt-2 text-xs font-semibold text-burgundy">Fill form to download →</p>
                )}
              </FormCta>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <RegisterBanner
            variant="compact"
            headline="Register first — resources included after enrollment"
            subline="Cheat sheets, comparison matrix, audit checklist, review template & action plan — included with paid enrollment."
          />
        </Reveal>
      </div>
    </section>
  );
}
