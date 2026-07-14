'use client';
import React from "react";
import Link from "next/link";
import { MdCheckCircle, MdPeople, MdWorkspacePremium } from "react-icons/md";

const BRAND = {
  primary: "#005BAC",
  accent: "#FF5800",
  dark: "#0B2A4A",
  surface: "#F4F8FF",
};

// Default Unsplash hero (meeting/collaboration vibe)
const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop";

export default function OurClientsHeader({
  heroImage = DEFAULT_HERO,
  heroAlt = "Clients collaborating with Vel Infotech",
}) {
  return (
    <section
      className="
        relative isolate w-full overflow-hidden
        bg-[#F7FAFF] dark:bg-[#F7FAFF] text-slate-900
      "
      aria-labelledby="clients-hero__h1"
      style={{
        backgroundImage: [
          "radial-gradient(1200px 500px at 10% -10%, rgba(0,91,172,0.10) 0%, rgba(0,91,172,0) 60%)",
          "radial-gradient(900px 400px at 95% 0%, rgba(255,88,0,0.08) 0%, rgba(255,88,0,0) 55%)",
          "linear-gradient(180deg, rgba(0,91,172,0.04) 0%, rgba(0,91,172,0.02) 100%)",
        ].join(", "),
        backgroundColor: "#F7FAFF",
      }}
    >
      {/* subtle gradient orb */}
      <svg
        className="pointer-events-none absolute -top-24 -right-24 opacity-20"
        width="420"
        height="420"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF5800" />
            <stop offset="100%" stopColor="#005BAC" />
          </linearGradient>
        </defs>
        <circle cx="210" cy="210" r="210" fill="url(#g1)" />
      </svg>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 py-16 sm:px-6 sm:py-20 md:px-8 md:pt-[180px] md:pb-16 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 xl:gap-14 items-center">
          {/* Left copy */}
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium ring-1 ring-slate-200"
              style={{ background: BRAND.surface, color: BRAND.primary }}
            >
              Vel Infotech • Hiring Partners & Training Clients
            </span>

            {/* Page H1 */}
            <h1 id="clients-hero__h1" className="mt-5 text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-tight">
              We help teams{" "}
              <span className="relative inline-block" style={{ color: BRAND.primary }}>
                hire and upskill
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-1 h-[10px] w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,88,0,0.3), rgba(0,91,172,0.35))",
                    clipPath: "polygon(0 80%, 100% 60%, 100% 100%, 0% 100%)",
                  }}
                />
              </span>{" "}
              with confidence.
            </h1>

            {/* Supportive section H2 for SEO/AT (visually hidden to keep current layout) */}
            <h2 className="sr-only">
              Placement support, curated shortlists, and practical upskilling for companies in India.
            </h2>

            <p className="mt-4 text-lg sm:text-xl text-slate-700">
              Curated shortlists of project-ready juniors and practical,
              stack-aligned upskilling—built around your delivery timelines. Based in
              Chennai, partnering with companies across India.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" aria-label="Key benefits">
              {[
                {
                  icon: <MdCheckCircle className="text-emerald-500" />,
                  title: "Hire-ready Juniors",
                },
                {
                  icon: <MdWorkspacePremium className="text-indigo-500" />,
                  title: "Placement Support",
                },
                {
                  icon: <MdPeople className="text-amber-500" />,
                  title: "Fast Shortlists",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="group rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 text-sm font-medium text-slate-800 flex items-center gap-3 hover:shadow-md transition"
                >
                  <span className="text-base">{item.icon}</span>
                  <div className="flex flex-col">
                    {/* Use strong text, not extra headings, to avoid H3 noise */}
                    <strong className="font-semibold">{item.title}</strong>
                    <span className="text-[12px] text-slate-600 font-normal" />
                  </div>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-slate-300 group-hover:bg-slate-400" />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-white font-medium shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.dark} 100%)`,
                }}
              >
                Partner with us
              </Link>
            </div>
          </div>

          {/* Right hero image */}
          <div className="relative w-full min-w-0">
            <div
              className="relative rounded-[28px] p-[2px] shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,88,0,0.45), rgba(0,91,172,0.5))",
              }}
            >
              <div className="rounded-[26px] bg-white overflow-hidden ring-1 ring-slate-200">
                <img
                  src={heroImage}
                  alt={heroAlt}
                  loading="eager"
                  className="w-full h-[280px] sm:h-[360px] md:h-[340px] lg:h-[420px] xl:h-[460px] 2xl:h-[520px] object-cover transition duration-500 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_HERO;
                  }}
                />
              </div>
            </div>

            {/* Caption card */}
            <div className="pointer-events-none absolute -bottom-4 left-4 flex gap-3">
              <div className="pointer-events-auto rounded-2xl bg-white/90 backdrop-blur px-4 py-2 shadow-md ring-1 ring-slate-200">
                <p className="text-xs text-slate-600">Placement Readiness</p>
                <p className="text-sm font-semibold text-slate-900">
                  Resume + Mock Interviews
                </p>
              </div>
            </div>

            {/* Under-image glow */}
            <div
              className="absolute inset-x-6 -bottom-8 h-10 blur-2xl rounded-full"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 0%, rgba(0,91,172,0.25), transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Clean bottom cutoff so the next section isn't tinted */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(247,250,255,0) 0%, rgba(247,250,255,1) 100%)",
        }}
      />
    </section>
  );
}
