"use client";

import Image from "next/image";
import { FormCta } from "./FormCta";
import { ArrowRight, Calendar, Mail, MapPin, Phone, Tag } from "lucide-react";
import {
  LIVE_WORKSHOP_PRICE_DISPLAY,
  LIVE_WORKSHOP_PRICE_LABEL,
  SELFPACED_PRICE_DISPLAY,
  SELFPACED_PRICE_LABEL,
  SITE_CONTACT,
  SITE_LOGO,
} from "@/lib/constants";
import { REGISTER_PRIMARY } from "@/lib/marketing";

const quickLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#workshop-live", label: "Workshop" },
  { href: "#workshop-selfpaced", label: "Self-paced" },
  { href: "#changes", label: "Key Changes" },
  { href: "#curriculum", label: "Sessions" },
  { href: "#faq", label: "FAQ" },
];

const trainingLinks = [
  { href: "#attend", label: "Who Should Attend" },
  { href: "#what-youll-learn", label: "What You'll Learn" },
  { href: "#resources", label: "Resources" },
  { href: "#enroll", label: "Register" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-glow" aria-hidden="true" />

      <div className="site-footer-inner">
        <div className="site-footer-grid">
          {/* About */}
          <div className="site-footer-col site-footer-col--about">
            <a href="#hero" className="site-footer-logo">
              <Image
                src={SITE_LOGO}
                alt="Sustainable Futures Training"
                width={48}
                height={48}
                className="site-footer-logo-img"
              />
              <span className="site-footer-logo-title">Sustainable Futures Training</span>
            </a>
            <h3 className="site-footer-heading">About Us</h3>
            <p className="site-footer-content">
              We deliver tutor-led ISO 14001:2015 to ISO 14001:2026 transition training for
              auditors, consultants, EMS managers, and organizations — practical, clause-focused,
              and built for real audit environments.
            </p>
            <p className="site-footer-motto">
              Audit the connection · Verify the evidence · Judge the effectiveness
            </p>
            <FormCta variant="register" className="site-footer-cta">
              {REGISTER_PRIMARY}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </FormCta>
          </div>

          {/* Quick links */}
          <div className="site-footer-col">
            <h3 className="site-footer-heading">Quick Links</h3>
            <ul className="site-footer-link-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training */}
          <div className="site-footer-col">
            <h3 className="site-footer-heading">Training</h3>
            <ul className="site-footer-link-list">
              {trainingLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <div className="site-footer-prices">
              <FormCta
                variant="live-workshop"
                className="site-footer-price-highlight site-footer-price-highlight--live"
              >
                <span className="site-footer-price-highlight-label">
                  <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                  8-hr tutor-led workshop
                </span>
                <span className="site-footer-price-highlight-amount">
                  {LIVE_WORKSHOP_PRICE_DISPLAY}
                </span>
                <span className="site-footer-price-highlight-sub">
                  {LIVE_WORKSHOP_PRICE_LABEL} · live expert training
                </span>
              </FormCta>
              <FormCta variant="register" className="site-footer-price-highlight">
                <span className="site-footer-price-highlight-label">
                  <Tag className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                  Self-paced course
                </span>
                <span className="site-footer-price-highlight-amount">
                  {SELFPACED_PRICE_DISPLAY}
                </span>
                <span className="site-footer-price-highlight-sub">
                  {SELFPACED_PRICE_LABEL} · full access
                </span>
              </FormCta>
            </div>
          </div>

          {/* Contact */}
          <div className="site-footer-col site-footer-col--contact">
            <h3 className="site-footer-heading">Contact Us</h3>
            <p className="site-footer-content site-footer-content--sm">
              Questions about registration, workshops, or transition resources — reach us below.
            </p>

            <dl className="site-footer-contact">
              <div className="site-footer-contact-row">
                <dt>
                  <Mail className="site-footer-contact-icon" strokeWidth={2} />
                  Email
                </dt>
                <dd>
                  <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
                </dd>
              </div>

              {SITE_CONTACT.phone ? (
                <div className="site-footer-contact-row">
                  <dt>
                    <Phone className="site-footer-contact-icon" strokeWidth={2} />
                    Phone
                  </dt>
                  <dd>
                    <a href={`tel:${SITE_CONTACT.phone.replace(/[^\d+]/g, "")}`}>
                      {SITE_CONTACT.phone}
                    </a>
                  </dd>
                </div>
              ) : null}

              <div className="site-footer-contact-row">
                <dt>
                  <MapPin className="site-footer-contact-icon" strokeWidth={2} />
                  Locations
                </dt>
                <dd>
                  {SITE_CONTACT.addressLines.map((line) => (
                    <span key={line} className="site-footer-address-line">
                      {line}
                    </span>
                  ))}
                  {SITE_CONTACT.regions.map((region) => (
                    <span key={region} className="site-footer-address-line">
                      {region}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="site-footer-bar">
          <p>© {new Date().getFullYear()} Sustainable Futures Training. All rights reserved.</p>
          <p className="site-footer-bar-meta">
            ISO 14001:2026 Transition Training
            <FormCta variant="live-workshop" className="site-footer-bar-price site-footer-bar-price--live">
              Live 8-hr <strong>{LIVE_WORKSHOP_PRICE_DISPLAY}</strong>
            </FormCta>
            <FormCta variant="register" className="site-footer-bar-price">
              Self-paced <strong>{SELFPACED_PRICE_DISPLAY}</strong>
            </FormCta>
          </p>
        </div>
      </div>
    </footer>
  );
}
