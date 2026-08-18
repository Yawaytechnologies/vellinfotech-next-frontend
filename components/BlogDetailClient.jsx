"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import BlogSidebar from "./blog/BlogSidebar";
import { cleanText } from "../lib/seo";

function readTime(content) {
  if (!content) return 1;
  const words = content
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogDetailClient({ post, allPosts = [] }) {
  const { title, content, excerpt, imageBase64, category } = post;
  const imageSrc = imageBase64 || "/images/career.jpg";
  const mins = readTime(content);
  const isHtml = typeof content === "string" && /<[a-z][\s\S]*>/i.test(content);

  return (
    <main className="bg-[#021733] min-h-screen text-white pt-20 md:pt-[190px] lg:pt-[200px] xl:pt-[210px] 2xl:pt-[220px] pb-24">
      <div className="w-full max-w-[2200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-300 hover:text-white transition-colors"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <FiArrowLeft className="text-[13px]" />
            </span>
            Back to all articles
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_260px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-12">
          {/* LEFT — the article */}
          <div className="min-w-0">
            {/* Article card */}
            <article className="w-full min-w-0 bg-[#031735] rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] border border-slate-800 overflow-hidden">
              {/* Hero image */}
              <div className="relative h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-[360px] w-full overflow-hidden">
                <img
                  src={imageSrc}
                  alt={title || "Blog post hero image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/career.jpg";
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#021733]/85 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="px-5 sm:px-6 md:px-6 lg:px-8 xl:px-10 pb-8 md:pb-10 -mt-10 relative">
                <div className="bg-[#041b3f]/95 rounded-2xl border border-slate-700/70 px-4 md:px-6 lg:px-7 py-5 md:py-7 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      {category || "Articles"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {mins} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-[32px] 2xl:text-4xl font-extrabold leading-tight mb-3 md:mb-4">
                    {title}
                  </h1>

                  {/* Excerpt */}
                  {cleanText(excerpt) && (
                    <p className="text-sm md:text-[15px] text-slate-200/95 mb-5 md:mb-6 leading-relaxed border-l-2 border-emerald-400/40 pl-4 italic">
                      {cleanText(excerpt)}
                    </p>
                  )}

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600/60 to-transparent mb-5 md:mb-6" />

                  {/* Body */}
                  <div className="text-[13px] md:text-[15px] text-slate-100 leading-relaxed md:leading-[1.9]">
                    {isHtml ? (
                      <div
                        className="prose prose-invert prose-sm md:prose-base max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    ) : (
                      <p className="whitespace-pre-line">{content}</p>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* Back to blog */}
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm text-slate-200 transition-colors"
              >
                <FiArrowLeft className="text-sm" />
                Back to all articles
              </Link>
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <BlogSidebar
            posts={allPosts}
            currentPostId={post.id}
            variant="dark"
          />
        </div>
      </div>
    </main>
  );
}
