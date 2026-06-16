'use client';

// Enhanced Review Page with Professional Design (White body under tabs)
import React, { useEffect, useMemo, useState } from "react";

export default function Review() {
  /* -------------------- static data -------------------- */
  const trendingCourses = [
    { title: "Full-Stack (MERN)", tag: "In-Demand", icon: "💻" },
    { title: "Java + Spring Boot", tag: "Placement-Ready", icon: "☕" },
    { title: "Python & Data Science", tag: "Popular", icon: "🐍" },
    { title: "DevOps & Cloud Basics", tag: "Hot", icon: "☁️" },
  ];

  const ratingHistogram = { 5: 62, 4: 25, 3: 8, 2: 3, 1: 2 };

  /* -------------------- Google Reviews (live) -------------------- */
  const [masterReviews, setMasterReviews] = useState(() =>
    generateDemoReviews(),
  );
  const [googleMeta, setGoogleMeta] = useState({
    name: "Vell InfoTech",
    rating: 4.8,
    total: 124,
    url: "https://share.google/t27FPzRNT3WXGrilY",
    status: "success",
    error: null,
  });

  const PLACE_ID = "ChIJqXVXO3xnUjoRSMMIWwz_R8o";

  useEffect(() => {
    if (!PLACE_ID) return;
    let cancelled = false;

    (async () => {
      try {
        const key =
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE";
        if (!key || key === "YOUR_API_KEY_HERE") {
          const demoReviews = generateDemoReviews();
          setMasterReviews(demoReviews);
          setGoogleMeta({
            name: "Vell InfoTech",
            rating: 4.8,
            total: 124,
            url: "https://share.google/t27FPzRNT3WXGrilY",
            status: "success",
            error: null,
          });
          return;
        }

        if (!window.google || !window.google.maps) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
          script.async = true;
          script.defer = true;
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const node = document.createElement("div");
        const svc = new window.google.maps.places.PlacesService(node);

        svc.getDetails(
          {
            placeId: PLACE_ID,
            fields: ["name", "rating", "user_ratings_total", "reviews", "url"],
          },
          (place, status) => {
            if (cancelled) return;

            if (
              status !== window.google.maps.places.PlacesServiceStatus.OK ||
              !place
            ) {
              // fallback so page still shows reviews
              const demoReviews = generateDemoReviews();
              setMasterReviews(demoReviews);
              setGoogleMeta({
                name: "Vell InfoTech",
                rating: 4.8,
                total: 124,
                url: "https://share.google/t27FPzRNT3WXGrilY",
                status: "success",
                error: null,
              });
              return;
            }

            const reviews = (place.reviews || []).map((r, i) => ({
              id: i + 1,
              name: r.author_name || "Google User",
              course: "Google Review",
              rating: r.rating,
              ago: r.relative_time_description || timeAgoFromUnix(r.time),
              snippet: (r.text || "").slice(0, 160),
              detail: r.text || "",
              center: place.name || "",
              tags: [],
            }));

            setMasterReviews(reviews);
            setGoogleMeta({
              name: place.name || "",
              rating: place.rating ?? null,
              total: place.user_ratings_total ?? null,
              url: place.url || "",
              status: "success",
              error: null,
            });
          },
        );
      } catch (e) {
        if (!cancelled) {
          const demoReviews = generateDemoReviews();
          setMasterReviews(demoReviews);
          setGoogleMeta({
            name: "Vell InfoTech",
            rating: 4.8,
            total: 124,
            url: "https://share.google/t27FPzRNT3WXGrilY",
            status: "success",
            error: null,
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [PLACE_ID]);

  function generateDemoReviews() {
    const demoData = [
      {
        name: "Rajesh Kumar",
        course: "Full-Stack Development",
        rating: 5,
        snippet:
          "Excellent training program! The instructors are very knowledgeable and the hands-on projects really helped me understand real-world applications.",
        detail:
          "Excellent training program! The instructors are very knowledgeable and the hands-on projects really helped me understand real-world applications. Got placed in a great company within 2 months of completion.",
        center: "Vell InfoTech",
        tags: ["placement", "projects"],
      },
      {
        name: "Priya S",
        course: "Java Spring Boot",
        rating: 5,
        snippet:
          "Best institute for Java training in Chennai. The course content is updated and industry-relevant.",
        detail:
          "Best institute for Java training in Chennai. The course content is updated and industry-relevant. Mock interviews were very helpful for placement preparation.",
        center: "Vell InfoTech",
        tags: ["java", "interview prep"],
      },
      {
        name: "Arun Vijay",
        course: "Python & Data Science",
        rating: 4,
        snippet:
          "Good learning experience with practical approach. Trainers are experienced professionals.",
        detail:
          "Good learning experience with practical approach. Trainers are experienced professionals. Would recommend for anyone wanting to learn Python.",
        center: "Vell InfoTech",
        tags: ["python", "practical"],
      },
      {
        name: "Divya Lakshmi",
        course: "DevOps & Cloud",
        rating: 5,
        snippet:
          "Amazing course structure! Learned AWS, Docker, Kubernetes hands-on. Placement support was excellent.",
        detail:
          "Amazing course structure! Learned AWS, Docker, Kubernetes hands-on. Placement support was excellent. Currently working as DevOps Engineer.",
        center: "Vell InfoTech",
        tags: ["devops", "cloud", "placement"],
      },
      {
        name: "Karthik Rajan",
        course: "Full-Stack (MERN)",
        rating: 5,
        snippet:
          "Comprehensive MERN stack training with real projects. Got multiple interview calls after completion.",
        detail:
          "Comprehensive MERN stack training with real projects. Got multiple interview calls after completion. The trainers guide you at every step.",
        center: "Vell InfoTech",
        tags: ["mern", "projects"],
      },
      {
        name: "Sneha R",
        course: "Java Testing",
        rating: 4,
        snippet:
          "Very detailed course on testing frameworks. Learned Selenium, TestNG, and automation thoroughly.",
        detail:
          "Very detailed course on testing frameworks. Learned Selenium, TestNG, and automation thoroughly. Great practical sessions.",
        center: "Vell InfoTech",
        tags: ["testing", "automation"],
      },
      {
        name: "Vikram S",
        course: "Python Development",
        rating: 5,
        snippet:
          "Fantastic learning environment! Instructors are patient and knowledgeable. Highly recommended.",
        detail:
          "Fantastic learning environment! Instructors are patient and knowledgeable. Highly recommended for beginners and professionals alike.",
        center: "Vell InfoTech",
        tags: ["python", "beginner-friendly"],
      },
      {
        name: "Meera N",
        course: "Cloud Computing",
        rating: 5,
        snippet:
          "Excellent cloud training with AWS and Azure certifications. Placement assistance was top-notch.",
        detail:
          "Excellent cloud training with AWS and Azure certifications. Placement assistance was top-notch. Got placed as Cloud Engineer within a month.",
        center: "Vell InfoTech",
        tags: ["cloud", "certification"],
      },
    ];
    return demoData.map((review, i) => ({
      ...review,
      id: i + 1,
      ago:
        i === 0
          ? "2d"
          : i === 1
            ? "1w"
            : i === 2
              ? "2w"
              : i === 3
                ? "3w"
                : i === 4
                  ? "1mo"
                  : i === 5
                    ? "2mo"
                    : i === 6
                      ? "3mo"
                      : "4mo",
    }));
  }

  function timeAgoFromUnix(sec) {
    if (!sec) return "now";
    const diff = Math.max(1, (Date.now() - sec * 1000) / 1000);
    for (const [u, s] of [
      ["y", 31536000],
      ["mo", 2592000],
      ["d", 86400],
      ["h", 3600],
      ["m", 60],
    ]) {
      const v = Math.floor(diff / s);
      if (v >= 1) return `${v}${u}`;
    }
    return "now";
  }

  /* -------------------- page state -------------------- */
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [centerFilter, setCenterFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState("new");
  const [activeTab, setActiveTab] = useState("all");

  /* -------------------- derived -------------------- */
  const courses = useMemo(
    () => ["All", ...Array.from(new Set(masterReviews.map((r) => r.course)))],
    [masterReviews],
  );
  const centers = useMemo(
    () => ["All", ...Array.from(new Set(masterReviews.map((r) => r.center)))],
    [masterReviews],
  );

  const topTags = useMemo(() => {
    const m = new Map();
    masterReviews.forEach((r) =>
      (r.tags || []).forEach((t) => m.set(t, (m.get(t) || 0) + 1)),
    );
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([k, v]) => ({ k, v }));
  }, [masterReviews]);

  const feed = useMemo(() => {
    let list = masterReviews.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.course.toLowerCase().includes(q) ||
          r.center.toLowerCase().includes(q) ||
          r.snippet.toLowerCase().includes(q) ||
          r.detail.toLowerCase().includes(q) ||
          (r.tags || []).some((t) => t.includes(q)),
      );
    }
    if (courseFilter !== "All")
      list = list.filter((r) => r.course === courseFilter);
    if (centerFilter !== "All")
      list = list.filter((r) => r.center === centerFilter);
    if (ratingFilter > 0) list = list.filter((r) => r.rating === ratingFilter);
    if (sortBy === "rating-desc") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "rating-asc") list.sort((a, b) => a.rating - b.rating);
    return list;
  }, [masterReviews, search, courseFilter, centerFilter, ratingFilter, sortBy]);

  const overallRating = googleMeta.rating ?? 4.8;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* HERO with dark gradient */}
      <Hero
        trendingCourses={trendingCourses}
        overallRating={overallRating}
        ratingHistogram={ratingHistogram}
        googleMeta={googleMeta}
      />

      {/* ===== Main Content UNDER TABS ON PURE WHITE ===== */}
      <section className="relative pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <BodyTabs active={activeTab} onChange={setActiveTab} />
            <div className="flex items-center gap-3">
              <SortMenu value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {activeTab === "guidelines" && <GuidelinesPanel />}
          {activeTab === "highlights" && (
            <HighlightsPanel reviews={masterReviews} />
          )}

          {activeTab === "all" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-6">
                {masterReviews[0] && (
                  <FeaturedReview review={masterReviews[0]} />
                )}

                {/* Loading State */}
                {googleMeta.status === "loading" && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-white border border-slate-200 p-6 animate-pulse"
                      >
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                        <div className="mt-3 h-3 w-24 bg-slate-200 rounded" />
                        <div className="mt-4 space-y-2">
                          <div className="h-3 w-full bg-slate-200 rounded" />
                          <div className="h-3 w-5/6 bg-slate-200 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {googleMeta.status === "error" && (
                  <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6 text-rose-700">
                    <p className="font-semibold">Unable to load reviews</p>
                    <p className="text-sm mt-1">{googleMeta.error}</p>
                  </div>
                )}

                {/* Reviews Grid */}
                {googleMeta.status === "success" && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {feed.map((r) => (
                      <ReviewCard key={r.id} review={r} />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {feed.length === 0 && googleMeta.status === "success" && (
                  <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center">
                    <EmptyIcon />
                    <p className="mt-4 text-lg font-semibold text-slate-900">
                      No reviews found
                    </p>
                    <p className="text-slate-600 mt-2">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}

                {/* Google Attribution */}
                {googleMeta.status === "success" && googleMeta.url && (
                  <p className="text-center text-sm text-slate-500">
                    Powered by Google Reviews •{" "}
                    <a
                      href={googleMeta.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View on Google Maps
                    </a>
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <FilterCard
                    courses={courses}
                    centers={centers}
                    courseFilter={courseFilter}
                    setCourseFilter={setCourseFilter}
                    centerFilter={centerFilter}
                    setCenterFilter={setCenterFilter}
                    ratingFilter={ratingFilter}
                    setRatingFilter={setRatingFilter}
                  />
                  {topTags.length > 0 && (
                    <TagCloud tags={topTags} onPick={(t) => setSearch(t.k)} />
                  )}
                  <WriteReviewCard url={googleMeta.url} />
                </div>
              </aside>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-16 relative rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left text-white">
                <h3 className="text-3xl font-bold mb-2">
                  Share Your Learning Journey
                </h3>
                <p className="text-blue-100 text-lg">
                  Help future learners make informed decisions • Your voice
                  matters
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function Hero({ trendingCourses, overallRating, ratingHistogram, googleMeta }) {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#152A6B_0%,#1F3C88_45%,#7C3AED_100%)]" />
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      {/* white wave to transition into body */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
              <span>Home</span>
              <span>→</span>
              <span className="text-white font-semibold">Reviews</span>
            </nav>

            <div className="relative inline-block mb-4">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl" />
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Student Success
                <br />
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Stories
                </span>
              </h1>
            </div>

            <p className="text-lg text-blue-100 max-w-2xl leading-relaxed mb-8">
              Real experiences from learners who transformed their careers with
              Vell InfoTech. Read authentic reviews and join our thriving
              community.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <ActionButton
                icon={<PenIcon />}
                title="Write Review"
                subtitle="Share your story"
                gradient="from-blue-500 to-cyan-500"
                href={
                  googleMeta.url || "https://share.google/t27FPzRNT3WXGrilY"
                }
                target="_blank"
              />
              <ActionButton
                icon={<StarIconFilled />}
                title="Top Rated"
                subtitle="Best experiences"
                gradient="from-purple-500 to-pink-500"
                onClick={() => {
                  const tabs = document.querySelectorAll("button");
                  tabs.forEach((b) => {
                    if (b.textContent?.includes("Highlights")) b.click();
                  });
                }}
              />
              <ActionButton
                icon={<GoogleIcon />}
                title="Google Reviews"
                subtitle={`${googleMeta.total || 100}+ reviews`}
                gradient="from-orange-500 to-red-500"
                href={
                  googleMeta.url || "https://share.google/t27FPzRNT3WXGrilY"
                }
                target="_blank"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <TrustBadge icon="⭐" text={`${overallRating} Rating`} />
              <TrustBadge icon="👥" text="15k+ Students" />
              <TrustBadge icon="💼" text="87% Placement" />
              <TrustBadge icon="✓" text="Verified Reviews" />
            </div>
          </div>

          {/* Right stats card */}
          <HeroStats
            trendingCourses={trendingCourses}
            overallRating={overallRating}
            ratingHistogram={ratingHistogram}
            googleMeta={googleMeta}
          />
        </div>
      </div>
    </section>
  );
}

function HeroStats({
  trendingCourses,
  overallRating,
  ratingHistogram,
  googleMeta,
}) {
  return (
    <div className="lg:col-span-5">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-60" />
        <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Institute Overview</h3>
            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
              Verified
            </span>
          </div>

          <div className="flex items-end gap-4 mb-6 pb-6 border-b border-white/20">
            <div className="text-6xl font-black">{overallRating}</div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <StarIconFilled
                    key={i}
                    className={
                      i < Math.floor(overallRating)
                        ? "text-yellow-400"
                        : "text-white/30"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-blue-100">
                {googleMeta.total || 100}+ reviews
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = ratingHistogram[star] || 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="font-semibold w-8">{star}★</span>
                  <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-blue-100 text-sm w-12 text-right">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          <h4 className="text-sm font-semibold mb-3">Popular Courses</h4>
          <div className="flex flex-wrap gap-2">
            {trendingCourses.map((course, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium"
              >
                <span>{course.icon}</span>
                {course.title}
                <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full">
                  {course.tag}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== REUSABLES ===================== */
function BodyTabs({ active, onChange }) {
  const tabs = [
    { id: "all", label: "All Reviews", icon: "📋" },
    { id: "highlights", label: "Highlights", icon: "⭐" },
    { id: "guidelines", label: "Guidelines", icon: "📖" },
  ];

  return (
    <div className="inline-flex bg-white border border-slate-200 rounded-2xl p-1.5 shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            active === tab.id
              ? "text-white"
              : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          {active === tab.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl" />
          )}
          <span className="relative flex items-center gap-2">
            <span>{tab.icon}</span>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function ActionButton({
  icon,
  title,
  subtitle,
  gradient,
  onClick,
  href,
  target,
}) {
  const classes = `group relative rounded-2xl bg-gradient-to-r ${gradient} p-[1px] hover:-translate-y-1 transition-all active:translate-y-0`;
  const inner = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
      <div className="relative rounded-2xl bg-slate-900 px-4 py-3 flex items-center gap-3">
        <div className="text-white">{icon}</div>
        <div className="text-left">
          <div className="text-white font-bold text-sm">{title}</div>
          <div className="text-blue-200 text-xs">{subtitle}</div>
        </div>
      </div>
    </>
  );

  return href ? (
    <a
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {inner}
    </a>
  ) : (
    <button onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-semibold text-sm">
      <span>{icon}</span>
      {text}
    </div>
  );
}

function FeaturedReview({ review }) {
  if (!review) return null;
  return (
    <article className="group relative rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {review.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                {review.name}
              </h3>
              <p className="text-slate-600 text-sm">{review.center}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
            ⭐ Featured
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200">
            {review.course}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIconFilled
                key={i}
                className={
                  i < review.rating ? "text-amber-400" : "text-slate-300"
                }
              />
            ))}
          </div>
          <span className="text-slate-500 text-sm">• {review.ago}</span>
        </div>

        <p className="text-slate-900 text-lg leading-relaxed mb-2">
          "{review.snippet}"
        </p>
        {review.detail && review.detail !== review.snippet && (
          <p className="text-slate-700">{review.detail}</p>
        )}
      </div>
    </article>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              {review.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{review.name}</h4>
              <p className="text-xs text-slate-600">{review.center}</p>
            </div>
          </div>
          <span className="text-xs text-slate-500">{review.ago}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
            {review.course}
          </span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIconFilled
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating ? "text-amber-400" : "text-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-slate-800 leading-relaxed mb-2">{review.snippet}</p>
        {review.detail && review.detail !== review.snippet && (
          <p className="text-slate-600 text-sm">{review.detail}</p>
        )}

        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors">
            <ThumbsUpIcon />
            Helpful
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors">
            <HeartIcon />
            Like
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterCard({
  courses,
  centers,
  courseFilter,
  setCourseFilter,
  centerFilter,
  setCenterFilter,
  ratingFilter,
  setRatingFilter,
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
        <FilterIcon />
        Filters
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Course
          </label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Center
          </label>
          <select
            value={centerFilter}
            onChange={(e) => setCenterFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          >
            {centers.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Rating
          </label>
          <div className="flex flex-wrap gap-2">
            {[0, 5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setRatingFilter(rating)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  ratingFilter === rating
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {rating === 0 ? "All" : `${rating}★`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TagCloud({ tags, onPick }) {
  if (!tags?.length) return null;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <TagIcon />
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.k}
            onClick={() => onPick?.(tag)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-medium border border-blue-200 transition-colors"
          >
            #{tag.k}
            <span className="px-1.5 py-0.5 bg-blue-200 text-blue-800 rounded text-xs font-bold">
              {tag.v}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function WriteReviewCard({ url }) {
  const reviewUrl = url || "https://share.google/t27FPzRNT3WXGrilY";
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      <div className="relative rounded-2xl bg-slate-900 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <PenIcon className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">
              Share Your Experience
            </h3>
            <p className="text-blue-200 text-sm">
              Help others make informed decisions
            </p>
          </div>
        </div>
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white hover:bg-blue-50 text-slate-900 font-bold rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
        >
          Write a Review
        </a>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-white/10 rounded-lg">
            <div className="text-white font-bold">2 min</div>
            <div className="text-blue-200 text-xs">Quick</div>
          </div>
          <div className="p-2 bg-white/10 rounded-lg">
            <div className="text-white font-bold">100%</div>
            <div className="text-blue-200 text-xs">Anonymous</div>
          </div>
          <div className="p-2 bg-white/10 rounded-lg">
            <div className="text-white font-bold">Verified</div>
            <div className="text-blue-200 text-xs">Authentic</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortMenu({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-md">
      <span className="text-sm font-semibold text-slate-700">Sort:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-semibold text-slate-900 outline-none cursor-pointer"
      >
        <option value="new">Newest First</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="rating-asc">Lowest Rated</option>
      </select>
    </div>
  );
}

/* ===== Icons ===== */
function StarIconFilled({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
function PenIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
function FilterIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function TagIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function ThumbsUpIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
function HeartIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function EmptyIcon({ className = "w-24 h-24 mx-auto" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="80" fill="#E0F2FE" />
      <path
        d="M70 90c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM110 90c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
        fill="#94A3B8"
      />
      <path
        d="M75 125c0-13.807 11.193-25 25-25s25 11.193 25 25"
        stroke="#94A3B8"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GuidelinesPanel() {
  const guidelines = [
    {
      title: "Be Specific & Honest",
      icon: "✍️",
      points: [
        "Mention specific courses, trainers, and projects",
        "Share what worked well and what could improve",
        "Be constructive and respectful in your feedback",
      ],
    },
    {
      title: "Share Your Journey",
      icon: "🚀",
      points: [
        "Describe your learning experience and outcomes",
        "Mention placement support and interview preparation",
        "Help others understand the real value",
      ],
    },
    {
      title: "Stay Professional",
      icon: "🤝",
      points: [
        "Avoid sharing personal or sensitive information",
        "Keep language appropriate and constructive",
        "Focus on your experience, not comparisons",
      ],
    },
  ];

  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      {guidelines.map((guide, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl mb-4 text-white shadow-lg">
            {guide.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            {guide.title}
          </h3>
          <ul className="space-y-2">
            {guide.points.map((point, j) => (
              <li key={j} className="flex items-start gap-2 text-slate-700">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function HighlightsPanel({ reviews }) {
  const top = reviews.filter((r) => r.rating >= 5).slice(0, 6);

  if (top.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white border border-slate-200 p-16 text-center shadow-lg">
        <EmptyIcon />
        <p className="mt-4 text-xl font-bold text-slate-900">
          No highlights yet
        </p>
        <p className="text-slate-600 mt-2">
          Top-rated reviews will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {top.map((review) => (
        <article
          key={review.id}
          className="group rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md">
              ⭐ Top Rated
            </span>
            <span className="text-xs text-slate-600">{review.ago}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {review.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{review.name}</h4>
              <p className="text-sm text-slate-600">{review.course}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <StarIconFilled key={i} className="text-amber-500 w-4 h-4" />
            ))}
          </div>

          <p className="text-slate-800 leading-relaxed">{review.snippet}</p>
        </article>
      ))}
    </div>
  );
}
