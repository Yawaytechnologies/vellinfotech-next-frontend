'use client';
import React, { useState } from "react";
import {
  FaClock, FaUserGraduate, FaSignal, FaCalendarAlt,
  FaBookOpen, FaCheckCircle
} from "react-icons/fa";

/**
 * Always-unlocked syllabus
 */
export default function Syllabus({
  title = "Course Syllabus",
  accent = "#005BAC",
  meta = { duration: "", audience: "", level: "", mode: "", schedule: "" },
  preview = [],           // safe chips
  outline = [],           // flat items (optional)
  sections = [],          // [{ title, items: [string] }]
  initialModules = 4,     // how many modules visible before "Show more"
  initialItemsPerModule = 4, // how many items per module before "Show more"
  stickyOffset = 110,
  cardMinH = 0,
}) {
  return (
    <section className="relative w-full bg-[#f6f9ff] py-10 sm:py-12">
      {/* Accent bar */}
      <div className="absolute inset-x-0 top-0 h-[6px]" style={{ backgroundColor: accent }} />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">{title}</h2>
          <p className="text-slate-600 mt-2 flex items-center gap-3 flex-wrap">
            {meta?.duration && <Badge icon={FaClock} text={meta.duration} accent={accent} />}
            {meta?.audience && <Badge icon={FaUserGraduate} text={meta.audience} />}
            {meta?.level && <Badge icon={FaSignal} text={`Level: ${meta.level}`} />}
            {(meta?.mode || meta?.schedule) && (
              <Badge
                icon={FaCalendarAlt}
                text={`${meta.mode || ""}${meta.mode && meta.schedule ? " • " : ""}${meta.schedule || ""}`}
              />
            )}
          </p>
        </header>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: curriculum */}
          <div className="lg:col-span-2">
            <Card>
              <div
                className="p-5 sm:p-6 relative"
                style={cardMinH ? { minHeight: cardMinH } : undefined}
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FaBookOpen className="text-slate-500" /> Curriculum
                </h3>

                {/* Always-safe preview chips */}
                {preview?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preview.map((t) => (
                      <span key={t} className="text-[12px] px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Full content (always visible now) */}
                <div className="mt-4">
                  {sections?.length > 0 ? (
                    <SectionsWithGlobalToggle
                      sections={sections}
                      accent={accent}
                      initialModules={initialModules}
                      initialItemsPerModule={initialItemsPerModule}
                    />
                  ) : (
                    outline?.length > 0 && (
                      <ul className="divide-y divide-slate-100">
                        {outline.map((item, idx) => (
                          <li key={idx} className="py-3 font-medium text-slate-900">
                            {typeof item === "string" ? item : item?.title || ""}
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: sticky info column */}
          <aside className="lg:col-span-1 lg:self-stretch h-full">
            <div className="sticky space-y-6" style={{ top: stickyOffset ?? 110 }}>
              {/* Card 1 – At a Glance */}
              <Card>
                <div className="p-5 sm:p-6">
                  <h4 className="font-bold text-slate-900">At a Glance</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      Instructor-led
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      Projects included
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      Interview prep
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Card 2 – Next Batch & Timings */}
              <Card>
                <div className="p-5 sm:p-6">
                  <h4 className="font-bold text-slate-900">Next Batch & Timings</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <FaCalendarAlt className="mt-0.5 text-slate-500" />
                      Weekday: Mon–Fri, 7–9 PM IST
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCalendarAlt className="mt-0.5 text-slate-500" />
                      Weekend: Sat–Sun, 10 AM–1 PM IST
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCalendarAlt className="mt-0.5 text-slate-500" />
                      Fast-Track: On request
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Card 3 – Placement & Support */}
              <Card>
                <div className="p-5 sm:p-6">
                  <h4 className="font-bold text-slate-900">Placement & Support</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="mt-0.5 text-emerald-500" />
                      1:1 resume review &amp; mock interviews
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="mt-0.5 text-emerald-500" />
                      Referral drives with partner companies
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="mt-0.5 text-emerald-500" />
                      Career guidance post-course
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pieces ---------- */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_10px_30px_rgba(80,89,143,0.12)] border border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

function Badge({ icon: Icon, text, accent }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-700">
      {Icon ? <Icon className="text-slate-500" style={accent ? { color: accent } : undefined} /> : null}
      <span>{text}</span>
    </span>
  );
}

/* ---------- Sections with ONE global Show more / Show less ---------- */
function SectionsWithGlobalToggle({
  sections,
  accent = "#005BAC",
  initialModules = 4,
  initialItemsPerModule = 4,
  labels = { showMore: "Show more", showLess: "Show less" },
}) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = React.useRef(null);

  if (!Array.isArray(sections) || sections.length === 0) return null;

  const visibleSections = expanded ? sections : sections.slice(0, initialModules);

  const hiddenModules = Math.max(0, sections.length - initialModules);
  const hiddenItems = sections.reduce((sum, sec, i) => {
    const items = Array.isArray(sec.items) ? sec.items.length : 0;
    if (expanded) return 0;
    if (i >= initialModules) return sum + items; // whole module hidden
    const over = Math.max(0, items - initialItemsPerModule);
    return sum + over;
  }, 0);

  const anyExpandable =
    hiddenModules > 0 ||
    sections.some((sec, i) => {
      const len = sec.items?.length || 0;
      return expanded ? false : i < initialModules ? len > initialItemsPerModule : len > 0;
    });

  const handleToggle = () => {
    if (expanded && containerRef.current) {
      // Smooth scroll back to top of the section when collapsing
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpanded((v) => !v);
  };

  return (
    <div ref={containerRef}>
      {/* Modules */}
      <div className="divide-y divide-slate-100">
        {visibleSections.map((sec, idx) => {
          const items = Array.isArray(sec.items) ? sec.items : [];
          const showItems = expanded ? items : items.slice(0, initialItemsPerModule);
          return (
            <div key={idx} className="py-4">
              <div className="font-semibold text-slate-900">{sec.title}</div>
              {showItems.length > 0 && (
                <ul className="mt-2 list-disc ml-5 text-slate-700 space-y-1">
                  {showItems.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Single bottom toggle */}
      {anyExpandable && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={handleToggle}
            className="text-sm font-semibold px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
            style={{ color: accent, borderColor: `${accent}55` }}
            aria-expanded={expanded}
          >
            {expanded
              ? labels.showLess
              : hiddenModules > 0 || hiddenItems > 0
              ? `${labels.showMore} (${
                  [
                    hiddenModules > 0 ? `${hiddenModules} more module${hiddenModules > 1 ? "s" : ""}` : null,
                    hiddenItems > 0 ? `${hiddenItems} more item${hiddenItems > 1 ? "s" : ""}` : null,
                  ]
                    .filter(Boolean)
                    .join(", ")
                })`
              : labels.showMore}
          </button>
        </div>
      )}
    </div>
  );
}

