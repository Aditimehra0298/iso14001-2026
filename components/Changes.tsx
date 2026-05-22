import { Reveal } from "./Reveal";
import { RegisterBanner } from "./RegisterBanner";
import { SectionHead, SectionPremiumMesh } from "./SectionHead";

const cards = [
  {
    clause: "Clause 4",
    title: "Environmental Context",
    body: "Environmental conditions are now explicitly named, including climate change, pollution, natural resources, biodiversity and ecosystem health.",
    focus:
      "Auditor focus: context analysis, interested parties, EMS scope and lifecycle influence.",
    bg: "bg-blue-premium",
  },
  {
    clause: "Clause 5",
    title: "Leadership & Policy",
    body: "Policy commitments are clarified with examples such as conservation of resources, sustainable resource use, climate mitigation/adaptation and biodiversity protection.",
    focus: "Auditor focus: leadership decisions, resource support and policy alignment.",
    bg: "bg-lavender",
  },
  {
    clause: "Clause 6",
    title: "Planning of Changes",
    body: "Risk/opportunity determination and action planning are separated. New Clause 6.3 introduces planned EMS change management.",
    focus:
      "Auditor focus: change reviews, environmental impact, actions and effectiveness.",
    bg: "bg-blue-premium",
  },
  {
    clause: "Clause 7",
    title: "Support & Communication",
    body: "Communication must enable workers to contribute to continual improvement. Documented information must be available and suitable for use.",
    focus:
      "Auditor focus: competence, awareness, communication records and point-of-use documents.",
    bg: "bg-lavender",
  },
  {
    clause: "Clause 8",
    title: "External Provider Control",
    body: "Outsourced processes language shifts to externally provided processes, products and services, expanding supplier and contractor audit attention.",
    focus:
      "Auditor focus: supplier controls, procurement, lifecycle and emergency preparedness.",
    bg: "bg-blue-premium",
  },
  {
    clause: "Clauses 9-10",
    title: "Effectiveness & Improvement",
    body: "Audit objectives are added, management review is restructured and continual improvement is integrated into Clause 10.1.",
    focus:
      "Auditor focus: trend analysis, objective-based audits, root cause and effectiveness verification.",
    bg: "bg-lavender",
  },
];

export function Changes() {
  return (
    <section id="changes" className="section-premium section-py">
      <SectionPremiumMesh variant="warm" />
      <div className="section-premium-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHead
            badge="Most important changes"
            title={
              <>
                What Actually Changed in
                <br />
                <span className="text-gradient whitespace-nowrap">ISO 14001:2026?</span>
              </>
            }
            description="A visual clause-wise view of the revised expectations auditors must understand during transition audits."
          />
        </Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Reveal key={c.clause} className="card-premium">
              <span className="card-premium-clause">{c.clause}</span>
              <h3 className="font-display mt-3 text-xl font-extrabold text-ink sm:text-2xl">
                {c.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
              <p className={"mt-3 rounded-xl p-3 text-sm font-bold text-burgundy " + c.bg}>
                {c.focus}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <RegisterBanner
            headline="Know the changes. Register first, then enroll to master the audit approach."
            subline="Turn every clause update into clear auditor questions, evidence checks, and client-ready guidance."
          />
        </Reveal>
      </div>
    </section>
  );
}
