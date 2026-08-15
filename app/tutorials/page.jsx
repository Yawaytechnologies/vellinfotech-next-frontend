"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { FiUser, FiCalendar, FiFolder, FiSearch } from "react-icons/fi";

const TUTORIALS = [
  {
    id: 1,
    title: "Django Tutorial — Learn Django Framework from Scratch",
    author: "Global 04",
    date: "2024-10-11",
    categories: ["Blog", "Software Engineering", "Tutorials"],
    image: "/images/tutorials.webp",
    slug: "/tutorials/django-framework-from-scratch",
    excerpt:
      "Introduction to Django, environment setup, project structure, models and views, templates, and deployment basics. Django's high-level Python web framework promotes quick development through simple, pragmatic design…",
  },
  {
    id: 2,
    title: "Building Your First Data Warehouse: A Hands-on Tutorial",
    author: "Global 04",
    date: "2024-10-10",
    categories: ["Blog", "Datawarehouse", "Tutorials"],
    image: "/images/tutorials.webp",
    slug: "/tutorials/build-your-first-data-warehouse",
    excerpt:
      "What is a data warehouse, architecture, ETL process, best practices, and a step-by-step implementation guide with common pitfalls and validation strategies…",
  },
  {
    id: 3,
    title: "Git Tutorial for Beginners — From Zero to PR",
    author: "Team",
    date: "2024-10-08",
    categories: ["Blog", "DevTools", "Tutorials"],
    image: "/images/tutorials.webp",
    slug: "/tutorials/git-beginners",
    excerpt:
      "Install Git, init repository, branching, commits, rebase vs merge, remote workflows, and opening your first pull request the right way…",
  },
  {
    id: 4,
    title: "Spring Boot REST API — Clean Controllers & Validation",
    author: "Team",
    date: "2024-10-05",
    categories: ["Blog", "Backend", "Tutorials"],
    image: "/images/tutorials.webp",
    slug: "/tutorials/spring-boot-rest",
    excerpt:
      "Build a REST API with layered architecture, DTOs, Bean Validation, global exception handling, and OpenAPI documentation…",
  },
  {
    id: 5,
    title: "React Hooks Deep Dive — useState, useEffect, and Beyond",
    author: "Team",
    date: "2024-10-02",
    categories: ["Blog", "Frontend", "Tutorials"],
    image: "/images/tutorials.webp",
    slug: "/tutorials/react-hooks-deep-dive",
    excerpt:
      "Understand how hooks compose logic, avoid infinite renders, and structure effects and custom hooks for maintainable React apps…",
  },
  {
    id: 6,
    title: "SQL Joins Explained with Visuals",
    author: "Team",
    date: "2024-09-24",
    categories: ["Blog", "Databases", "Tutorials"],
    image: "/images/tutorials.webp",
    slug: "/tutorials/sql-joins-explained",
    excerpt:
      "INNER, LEFT, RIGHT, FULL, CROSS joins — where each is useful, pitfalls to avoid, and performance notes with indexes…",
  },
];

export default function TutorialsPage() {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    if (!query.trim()) return TUTORIALS;
    const q = query.toLowerCase();
    return TUTORIALS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.excerpt.toLowerCase().includes(q) ||
        t.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <section className="bg-background min-h-screen">
      {/* Hero */}
      <div
        className="relative w-full mt-[60px] sm:mt-[100px] md:mt-[134px] lg:mt-[150px] h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] flex items-center justify-start px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20"
        style={{
          backgroundImage: "url(/images/tutorials.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <h1
          className="relative z-10 text-white font-bold leading-snug
                     text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px]
                     max-w-[95%] sm:max-w-[80%] md:max-w-[720px] tracking-wide text-left"
        >
          Explore Tutorials
        </h1>
      </div>

      {/* Search + Cards */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-4 py-10">
        {/* Search */}
        <div className="mb-6 max-w-xl">
          <label className="sr-only" htmlFor="tutorialSearch">
            Search tutorials
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 bg-white">
            <FiSearch className="opacity-60 shrink-0" />
            <input
              id="tutorialSearch"
              aria-label="Search tutorials"
              type="text"
              placeholder="Search tutorials…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none bg-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* List */}
        {items.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6 p-4 w-full">
              {/* Image – right on desktop */}
              <div className="relative w-full md:w-[58%] rounded-lg overflow-hidden md:order-2">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {t.categories.map((c) => (
                    <span
                      key={c}
                      className="bg-black/50 text-white text-[11px] px-2 py-0.5 rounded font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full md:order-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1a2650] mb-2">
                  {t.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] sm:text-sm text-gray-600 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <FiUser className="text-blue-700" /> {t.author}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FiCalendar className="text-blue-700" />
                    {new Date(t.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FiFolder className="text-blue-700" />
                    <span className="truncate max-w-[220px] sm:max-w-none">
                      {t.categories.join(", ")}
                    </span>
                  </span>
                </div>

                <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed line-clamp-4">
                  {t.excerpt}
                </p>

                <Link
                  href={t.slug}
                  className="inline-block bg-[#005BAC] hover:bg-blue-800 text-white font-semibold text-sm sm:text-[15px] px-5 py-2 rounded transition"
                >
                  Read More &raquo;
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <p className="text-slate-700">No tutorials match your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
