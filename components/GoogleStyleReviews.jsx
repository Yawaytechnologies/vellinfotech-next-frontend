'use client';
// src/components/GoogleStyleReviews.jsx
import React from "react";

/* ---------- Small star row (supports half) ---------- */
function Stars({ value = 4.8, size = 16, className = "" }) {
  const id = React.useId(); // unique for gradient
  const full = Math.floor(value);
  const frac = value - full;
  const half = frac >= 0.25 && frac < 0.75;
  const empty = 5 - full - (half ? 1 : 0);

  const Star = ({ type }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="inline-block"
      fill={type === "empty" ? "none" : "currentColor"}
      stroke="currentColor"
      strokeWidth={type === "empty" ? 1.5 : 0}
    >
      {type === "half" ? (
        <>
          <defs>
            <linearGradient id={`halfStar-${id}`} x1="0" x2="1">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
            fill={`url(#halfStar-${id})`}
            stroke="currentColor"
            strokeWidth="1"
          />
        </>
      ) : (
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
      )}
    </svg>
  );

  return (
    <div className={`flex items-center gap-1 text-amber-500 ${className}`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} type="full" />
      ))}
      {half && <Star type="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} type="empty" />
      ))}
    </div>
  );
}

/* ---------- Avatar: photoUrl or initials (kept; not part of "with photos" UI) ---------- */
function Av({ name = "", photoUrl = "" }) {
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U";

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={`${name}'s profile`}
        className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover shrink-0 border border-black/5"
        loading="lazy"
      />
    );
  }

  return (
    <div className="grid place-items-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-sm select-none">
      {initials}
    </div>
  );
}

/* ---------- Pill button ---------- */
function Pill({ children, active, badge, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3.5 py-1.5 rounded-full text-sm border transition-all inline-flex items-center gap-2
        ${
          active
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
        }`}
    >
      {children}
      {typeof badge === "number" ? (
        <span
          className={`text-[11px] px-1.5 py-0.5 rounded-full border
          ${
            active
              ? "border-blue-200 bg-white/80 text-blue-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}

/* ---------- Default dummy reviews ---------- */
const DEFAULT_REVIEWS = [
  { id: "r1", name: "Thennarasu S", rating: 5, date: "2025-09-20", text: "Good place for job seekers. 💯 placement.", photoUrl: "" },
  { id: "r2", name: "Benjamin Andrew", rating: 5, date: "2025-09-12", text: "Good service and trusted organisation.", photoUrl: "" },
  { id: "r3", name: "Sudha Selvarajan", rating: 5, date: "2025-08-30", text: "Best consultancy for people who seek jobs. 100% placement guaranteed.", photoUrl: "" },
  { id: "r4", name: "Meena R", rating: 4, date: "2025-10-01", text: "Trainers are helpful and course content is practical.", photoUrl: "" },
  { id: "r5", name: "Aravind P", rating: 3, date: "2025-07-22", text: "Good institute, could improve lab timing flexibility.", photoUrl: "" },
  { id: "r6", name: "Priya K", rating: 2, date: "2025-06-10", text: "Placement took longer than expected for me.", photoUrl: "" },
];

/* ---------- Helpers ---------- */
function parseDate(d) {
  try {
    return new Date(d).getTime() || 0;
  } catch {
    return 0;
  }
}

export default function GoogleStyleReviews({
  title = "What Our Students Say",
  orgName = "Vell InfoTech",
  overallRating = 4.8,
  total = 1543,
  histogram = { 5: 76, 4: 18, 3: 4, 2: 1, 1: 1 },
  reviews = [],
  viewAllHref = "/reviews",
  writeHref = "/contact-us#enquiry-form",
}) {
  const data = (reviews && reviews.length ? reviews : DEFAULT_REVIEWS).slice();

  // Filter counts (removed "with photos")
  const counts = {
    all: data.length,
    latest: data.length,
    positive: data.filter((r) => r.rating >= 4).length,
    critical: data.filter((r) => r.rating <= 3).length,
  };

  const [filter, setFilter] = React.useState("all");

  const filtered = React.useMemo(() => {
    let arr = data.slice();
    if (filter === "latest") {
      arr.sort((a, b) => parseDate(b.date) - parseDate(a.date));
      return arr;
    }
    if (filter === "positive") return arr.filter((r) => r.rating >= 4);
    if (filter === "critical") return arr.filter((r) => r.rating <= 3);
    return arr; // all
  }, [filter, data]);

  return (
    <section className="relative py-12 sm:py-16 bg-[#f7f9fc]" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* ---------- Header ---------- */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2
              id="reviews-heading"
              className="text-[28px] leading-tight sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900"
            >
              {title}
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Reviews for <span className="font-semibold">{orgName}</span>
            </p>
          </div>

          {/* Desktop/Tablet actions (inline) */}
          <div className="hidden md:flex items-center gap-2">
            {writeHref && (
              <a
                href={writeHref}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
              >
                ✍️ Write a review
              </a>
            )}
            {viewAllHref && (
              <a
                href={viewAllHref}
                className="inline-flex rounded-lg bg-blue-600 text-white px-3.5 py-2 text-sm hover:bg-blue-700 shadow-sm"
              >
                View all
              </a>
            )}
          </div>
        </div>

        {/* ---------- Top row: rating + histogram ---------- */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* Rating card + Filters */}
          <div className="rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-5 sm:p-7 hover:shadow-[0_16px_40px_rgba(2,6,23,0.07)] transition-shadow">
            <div className="flex items-center gap-4">
              <div className="text-4xl sm:text-5xl font-semibold text-slate-900">
                {overallRating.toFixed(1)}
              </div>
              <Stars value={overallRating} className="translate-y-[1px]" />
            </div>
            <div className="text-sm text-slate-500 mt-2">
              {total.toLocaleString()} reviews
            </div>

            {/* Filter chips (removed "With photos") */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 items-center justify-start">
              <Pill active={filter === "all"} badge={counts.all} onClick={() => setFilter("all")}>
                All
              </Pill>
              <Pill active={filter === "latest"} badge={counts.latest} onClick={() => setFilter("latest")}>
                Latest
              </Pill>
              <Pill active={filter === "positive"} badge={counts.positive} onClick={() => setFilter("positive")}>
                Positive
              </Pill>
              <Pill active={filter === "critical"} badge={counts.critical} onClick={() => setFilter("critical")}>
                Critical
              </Pill>

              <span className="ml-auto hidden md:inline-block text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Verified feedback
              </span>
            </div>
          </div>

          {/* Histogram (now using prop) */}
          <div className="rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-5 sm:p-7 hover:shadow-[0_16px_40px_rgba(2,6,23,0.07)] transition-shadow">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((b) => {
                const pct = Math.max(0, Math.min(100, (histogram[b] ?? 0)));
                return (
                  <div key={b} className="grid grid-cols-[20px_1fr_42px] items-center gap-3">
                    <div className="text-sm text-slate-600">{b}</div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-right text-sm text-slate-600">{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- Reviews grid (filtered) ---------- */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No reviews found for this filter.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 sm:gap-6">
            {filtered.map((r) => (
              <article
                key={r.id}
                className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.05)] p-5 sm:p-6 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(2,6,23,0.07)] transition-all"
              >
                {/* left accent */}
                <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-3xl bg-gradient-to-b from-blue-500 to-indigo-500" />
                <div className="flex items-center gap-3">
                  <Av name={r.name} photoUrl={r.photoUrl} />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {r.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Stars value={r.rating} size={14} />
                      <span aria-hidden>•</span>
                      <time>
                        {r.date ? new Date(r.date).toLocaleDateString() : ""}
                      </time>
                    </div>
                  </div>
                </div>
                <p className="text-[15px] text-slate-800 mt-4 leading-7">
                  {r.text}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ---------- Mobile actions INSIDE this section (scoped) ---------- */}
      {(writeHref || viewAllHref) && (
        <div
          className="
            md:hidden absolute right-3 bottom-3 z-30
            flex gap-2
          "
        >
          {writeHref && (
            <a
              href={writeHref}
              className="shadow-lg rounded-xl border px-3 py-2 text-xs font-semibold bg-white text-slate-900 hover:bg-slate-50 ring-1 ring-black/5"
              aria-label="Write a review"
            >
              ✍️ <span className="hidden xs:inline">Write a review</span>
            </a>
          )}
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="shadow-lg rounded-xl px-3 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
              aria-label="View all reviews"
            >
              View all
            </a>
          )}
        </div>
      )}
    </section>
  );
}
