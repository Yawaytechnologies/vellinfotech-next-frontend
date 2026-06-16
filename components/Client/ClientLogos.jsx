'use client';
import React, { useMemo, useState } from "react";
import Link from "next/link";

/** ---- Vell palette ---- */
const BRAND = {
  primary: "#0B5ED7",
  primaryDark: "#084298",
  surface: "#EAF3FF",
  accent: "#FFC107",
};

/** ---- Logo data (from public/images/clientlogo) ---- */
const ENTERPRISE_LOGOS = [
  { src: "/images/clientlogo/capgemini.png", alt: "Capgemini" },
  { src: "/images/clientlogo/accenture-logo.png", alt: "Accenture" },
  { src: "/images/clientlogo/cognizant-logo_brandlogos.net_u6t45.png", alt: "Cognizant" },
  { src: "/images/clientlogo/intel_2006-logo_brandlogos.net_vatnn.png", alt: "Intel" },
  { src: "/images/clientlogo/hcl-technologies-vector-logo.png", alt: "HCL" },
  { src: "/images/clientlogo/zoho-logo_brandlogos.net_kduhg.png", alt: "Zoho" },
  { src: "/images/clientlogo/encore-cs6-vector-logo.png", alt: "Encore IT" },
  { src: "/images/clientlogo/wily.png", alt: "Wily IT Services" },
  { src: "/images/clientlogo/transworld.png", alt: "Transworld" },
  { src: "/images/clientlogo/dmi-digital-management-seeklogo.png", alt: "DMI" },
  { src: "/images/clientlogo/astra--eps--vector-logo.png", alt: "Adastra" },
  { src: "/images/clientlogo/datamatics.png", alt: "Data Matics" },
];

const FEATURED_LOGOS = [
  { src: "/images/clientlogo/google.png", alt: "Google" },
  { src: "/images/clientlogo/microsoft.png", alt: "Microsoft" },
  { src: "/images/clientlogo/amazon.png", alt: "Amazon" },
  { src: "/images/clientlogo/meta.png", alt: "Meta" },
];

const STARTUP_LOGOS = [
  { src: "/images/clientlogo/freshworks-seeklogo.png", alt: "Freshworks" },
  { src: "/images/clientlogo/chargebee.png", alt: "Chargebee" },
  { src: "/images/clientlogo/zoho-logo_brandlogos.net_kduhg.png", alt: "Zoho" },
  { src: "/images/clientlogo/grayorane.png", alt: "GreyOrange" },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "enterprise", label: "Enterprises" },
  { key: "startup", label: "Startups" },
];

const uniqByAlt = (arr) =>
  Array.from(new Map(arr.map((o) => [o.alt, o])).values());
const cn = (...a) => a.filter(Boolean).join(" ");

function LogoCard({ src, alt }) {
  const [err, setErr] = useState(false);

  const placeholder = "/images/clientlogo/_placeholder.svg";

  return (
    <div
      className="group relative flex items-center justify-center rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: "#DDE6F6" }}
      role="img"
      aria-label={alt}
      title={alt}
    >
      <img
        src={err || !src ? placeholder : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width="200"
        height="64"
        onError={() => setErr(true)}
        className="max-h-16 w-auto object-contain select-none"
      />
      <span className="sr-only">{alt}</span>
    </div>
  );
}

function LogoGrid({ items }) {
  if (!items?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((l, i) => (
        <LogoCard key={`${l.alt}-${i}`} src={l.src} alt={l.alt} />
      ))}
    </div>
  );
}

export default function HiringPartners() {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");

  const all = useMemo(
    () => uniqByAlt([...FEATURED_LOGOS, ...ENTERPRISE_LOGOS, ...STARTUP_LOGOS]),
    [],
  );

  const counts = {
    all: all.length,
    featured: FEATURED_LOGOS.length,
    enterprise: ENTERPRISE_LOGOS.length,
    startup: STARTUP_LOGOS.length,
  };

  const filtered = useMemo(() => {
    const pool =
      active === "all"
        ? all
        : active === "featured"
          ? FEATURED_LOGOS
          : active === "enterprise"
            ? ENTERPRISE_LOGOS
            : STARTUP_LOGOS;

    if (!q.trim()) return pool;
    const k = q.toLowerCase();
    return pool.filter(({ alt }) => alt.toLowerCase().includes(k));
  }, [active, q, all]);

  return (
    <section
      className="relative mx-auto mt-6 max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="partners-heading"
      style={{ background: BRAND.surface, borderRadius: 20 }}
    >
      {/* Header */}
      <header className="relative z-10 mb-8 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{
            background: "#ffffff",
            color: BRAND.primaryDark,
            border: "1px solid #DDE6F6",
          }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: BRAND.accent }}
          />
          Hiring Partners
        </span>

        <h2
          id="partners-heading"
          className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
        >
          Our Hiring Partners
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-slate-700">
          We offer lifelong{" "}
          <strong style={{ color: BRAND.primary }}>Placement Support</strong>{" "}
          and tailored interview prep—until you get placed.
        </p>
      </header>

      {/* Blue tab bar */}
      <div
        className="mb-6 rounded-2xl px-3 py-3"
        style={{ background: BRAND.primary }}
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter partners"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active === t.key
                    ? "bg-white text-slate-900"
                    : "bg-white/10 text-white hover:bg-white/20",
                )}
                aria-pressed={active === t.key}
              >
                {t.label}
                <span
                  className={cn(
                    "ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px]",
                    active === t.key
                      ? "bg-white/70 text-slate-900"
                      : "bg-black/20 text-white",
                  )}
                >
                  {counts[t.key]}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <label htmlFor="partner-search" className="sr-only">
              Search partners
            </label>
            <div className="relative">
              <input
                id="partner-search"
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search companies…"
                className="w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                style={{ borderColor: "#DDE6F6" }}
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                ⌘K
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <LogoGrid items={filtered} />

      {/* CTA */}
      <div
        className="mt-12 rounded-3xl p-1"
        style={{
          background: `linear-gradient(90deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
        }}
      >
        <div className="flex flex-col items-start justify-between gap-4 rounded-[calc(1.5rem-4px)] bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Recruiters: Hire pre-vetted, job-ready talent
            </h3>
            <p className="mt-1 text-slate-600">
              Tailored shortlists, mock-interviewed candidates, quick
              onboarding.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/contact-us"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: BRAND.primary }}
            >
              Partner with us
            </Link>

            <a
              href="/placed-students"
              className="rounded-xl border px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              style={{ borderColor: "#DDE6F6" }}
            >
              View placement stats
            </a>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="mt-10 overflow-hidden rounded-2xl border bg-white py-4"
        style={{ borderColor: "#DDE6F6" }}
      >
        <div className="flex animate-[scroll_35s_linear_infinite] gap-10 hover:opacity-100">
          {[...FEATURED_LOGOS, ...ENTERPRISE_LOGOS]
            .concat(FEATURED_LOGOS)
            .map((l, i) => (
              <div key={`mq-${l.alt}-${i}`} className="shrink-0">
                <img
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  decoding="async"
                  width="140"
                  height="44"
                  className="mx-6 h-11 w-auto object-contain"
                />
              </div>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
