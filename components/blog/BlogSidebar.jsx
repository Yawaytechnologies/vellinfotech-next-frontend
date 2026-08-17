"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const RECENT_LIMIT = 5;

// The listing sits on a light band; the article page is dark navy. Same component,
// two palettes, so the sidebar never fights the page it is on.
const THEMES = {
  light: {
    card: "rounded-2xl border border-slate-200 bg-white shadow-sm",
    heading: "text-base font-semibold text-slate-800",
    divider: "divide-y divide-slate-200",
    link: "text-slate-600 hover:text-[#005BAC]",
    activeLink: "font-semibold text-[#005BAC]",
    muted: "text-slate-400",
    input: "bg-white text-slate-800 placeholder:text-slate-400",
  },
  dark: {
    card: "rounded-2xl border border-slate-700/70 bg-[#041b3f]/95 shadow-[0_15px_40px_rgba(0,0,0,0.45)]",
    heading: "text-base font-semibold text-white",
    divider: "divide-y divide-slate-700/60",
    link: "text-slate-300 hover:text-emerald-300",
    activeLink: "font-semibold text-emerald-300",
    muted: "text-slate-500",
    input: "bg-[#031735] text-slate-100 placeholder:text-slate-500",
  },
};

/**
 * Search + Recent Posts + Categories, shared by the blog listing and the article page.
 *
 * The two pages use it differently. On the listing there is a set of posts on screen
 * to narrow, so search and category are handed in as controlled props and filter
 * live. On an article page there is nothing to filter, so the same controls fall
 * back to navigating to /blog with the query attached.
 */
export default function BlogSidebar({
  posts = [],
  currentPostId = null,
  searchValue,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  variant = "light",
}) {
  const interactive = typeof onSearchChange === "function";
  const [draft, setDraft] = useState("");
  const theme = THEMES[variant] || THEMES.light;

  const recentPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
      .filter((post) => post.id !== currentPostId)
      .slice(0, RECENT_LIMIT);
  }, [posts, currentPostId]);

  const categories = useMemo(() => {
    const counts = new Map();

    for (const post of posts) {
      const name = post.category || "Articles";
      counts.set(name, (counts.get(name) || 0) + 1);
    }

    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [posts]);

  return (
    <aside className="flex w-full flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
      {/* SEARCH */}
      <div className={`overflow-hidden ${theme.card}`}>
        {interactive ? (
          <div className="flex items-stretch">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className={`h-12 w-full min-w-0 px-4 text-sm outline-none ${theme.input}`}
            />

            <span className="flex w-14 shrink-0 items-center justify-center bg-[#F5A623] text-white">
              <FiSearch className="text-lg" />
            </span>
          </div>
        ) : (
          <form action="/blog" className="flex items-stretch">
            <input
              type="search"
              name="q"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className={`h-12 w-full min-w-0 px-4 text-sm outline-none ${theme.input}`}
            />

            <button
              type="submit"
              aria-label="Search"
              className="flex w-14 shrink-0 items-center justify-center bg-[#F5A623] text-white transition hover:bg-[#e0951c]"
            >
              <FiSearch className="text-lg" />
            </button>
          </form>
        )}
      </div>

      {/* RECENT POSTS */}
      <section className={`${theme.card} p-5`}>
        <h2 className={theme.heading}>
          Recent Posts
        </h2>

        <div className={`mt-3 ${theme.divider}`}>
          {recentPosts.length === 0 && (
            <p className={`py-3 text-sm ${theme.muted}`}>
              No other articles yet.
            </p>
          )}

          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`block py-3 text-sm leading-6 transition ${theme.link}`}
            >
              {post.title}
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={`${theme.card} p-5`}>
        <h2 className={theme.heading}>
          Categories
        </h2>

        <div className={`mt-3 ${theme.divider}`}>
          {categories.length === 0 && (
            <p className={`py-3 text-sm ${theme.muted}`}>
              No categories yet.
            </p>
          )}

          {categories.map((category) => {
            const isActive = activeCategory === category.name;

            const label = (
              <>
                <span>{category.name}</span>

                <span className={`text-xs ${theme.muted}`}>
                  ({category.count})
                </span>
              </>
            );

            const shared =
              "flex w-full items-center justify-between py-3 text-sm transition";

            return interactive ? (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  onCategoryChange(isActive ? null : category.name)
                }
                aria-pressed={isActive}
                className={`${shared} text-left ${isActive ? theme.activeLink : theme.link}`}
              >
                {label}
              </button>
            ) : (
              <Link
                key={category.name}
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className={`${shared} ${theme.link}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
