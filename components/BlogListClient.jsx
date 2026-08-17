'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { motion as Motion } from "framer-motion";

import BlogSidebar from "./blog/BlogSidebar";
import { cleanText } from "../lib/seo";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.08 * i, duration: 0.4, ease: "easeOut" },
  }),
};

function readTime(content) {
  if (!content) return 1;
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function matchesSearch(post, term) {
  if (!term) return true;

  const haystack = [post.title, post.excerpt, post.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(term);
}

export default function BlogListClient({ posts = [] }) {
  // Seeded from the URL so the sidebar on an article page can hand off a query
  // (/blog?q=... or /blog?category=...) to this page.
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("q") || "");
  const [category, setCategory] = useState(() => searchParams.get("category") || null);

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return posts.filter((post) => {
      const postCategory = post.category || "Articles";
      const categoryOk = !category || postCategory === category;

      return categoryOk && matchesSearch(post, term);
    });
  }, [posts, search, category]);

  const isFiltered = Boolean(search.trim() || category);

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
      {/* LEFT — list of articles */}
      <div className="min-w-0">
        {isFiltered && (
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
              {category && (
                <>
                  {" "}in <span className="font-semibold">{category}</span>
                </>
              )}
              {search.trim() && (
                <>
                  {" "}matching{" "}
                  <span className="font-semibold">
                    &ldquo;{search.trim()}&rdquo;
                  </span>
                </>
              )}
            </span>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory(null);
              }}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-white"
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base font-medium text-slate-500">
              {posts.length === 0
                ? "No blog posts yet."
                : "No articles match your search."}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {posts.length === 0
                ? "Check back soon for new articles."
                : "Try a different keyword or category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {filteredPosts.map((post, index) => {
              const imageSrc = post.imageBase64 || "/images/career.jpg";
              const mins = readTime(post.content);
              const href = `/blog/${post.slug}`;

              return (
                <Motion.article
                  key={post.id}
                  className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.35 }}
                >
                  {/* Image */}
                  <Link href={href}>
                    <div className="relative overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={post.title || "Blog post image"}
                        className="h-32 w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { e.target.src = "/images/career.jpg"; }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col gap-2 p-3">
                    <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] uppercase tracking-wide">
                        {post.category || "Articles"}
                      </span>
                      <span className="text-[10px] text-slate-400">{mins} min read</span>
                    </div>

                    <Link href={href}>
                      <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#0B3D6E] group-hover:text-[#005BAC] md:text-[15px]">
                        {post.title}
                      </h3>
                    </Link>

                    {cleanText(post.excerpt) && (
                      <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-600">
                        {cleanText(post.excerpt)}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-end">
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-[#005BAC] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#004b8d]"
                      >
                        Read the article
                        <FiArrowRight className="text-[11px]" />
                      </Link>
                    </div>
                  </div>
                </Motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT — sidebar */}
      <BlogSidebar
        posts={posts}
        searchValue={search}
        onSearchChange={setSearch}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
    </div>
  );
}
