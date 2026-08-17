// lib/seo.js — helpers for the text and images that end up in search results
// and social previews.

export const SITE_URL = "https://www.vellinfotech.com";

/** 1200x630 site default, used whenever a post has no crawlable image. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

// Google renders roughly this much of each.
const MAX_DESCRIPTION = 160;
// The root layout appends " | Vell InfoTech" (16 chars) via its title template.
const MAX_TITLE = 60;

/**
 * Excerpts have been pasted in from AI tools complete with their own headers —
 * one live post's excerpt literally starts "**SEO Meta Description (under 150
 * characters):**", which was rendering into the meta description. Strip that
 * sort of scaffolding along with any leftover markdown and HTML.
 */
export function cleanText(input) {
  if (!input) return "";

  return String(input)
    // Drop a leading "**Some Label:**" / "SEO Meta Description:" style header.
    .replace(/^\s*\**\s*(seo\s+)?meta\s+description[^:\n]*:\**/i, "")
    .replace(/^\s*\**\s*(excerpt|summary|description)\s*\**\s*:\s*/i, "")
    // Any HTML that snuck in.
    .replace(/<[^>]+>/g, " ")
    // Markdown emphasis, headings and inline code.
    .replace(/[*_`#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Trims to `limit` without splitting a word, and without a dangling comma. */
export function truncate(input, limit) {
  const text = cleanText(input);
  if (text.length <= limit) return text;

  const clipped = text.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");

  return (lastSpace > limit * 0.5 ? clipped.slice(0, lastSpace) : clipped)
    .replace(/[\s,;:.\-]+$/, "");
}

/**
 * Meta description for a post: the excerpt when it is usable, otherwise the
 * opening of the body. Always cleaned and capped.
 */
export function metaDescription(post, fallback = "Read this article on the Vell InfoTech blog.") {
  const fromExcerpt = truncate(post?.excerpt, MAX_DESCRIPTION);
  if (fromExcerpt.length >= 50) return fromExcerpt;

  const fromContent = truncate(post?.content, MAX_DESCRIPTION);
  if (fromContent.length >= 50) return fromContent;

  return fromExcerpt || fromContent || fallback;
}

/**
 * The bare page title. The root layout's template adds " | Vell InfoTech", so
 * returning the brand here too produced "... | Vell InfoTech Blog | Vell InfoTech".
 */
export function pageTitle(title) {
  return truncate(title, MAX_TITLE);
}

/**
 * Crawlable image URL, or null.
 *
 * Post images are stored as base64 data URIs. Google, LinkedIn, WhatsApp and X
 * all ignore `data:` in og:image and in structured data, so those are treated as
 * "no image" and the site default is used instead.
 */
export function shareImage(post) {
  const raw = post?.imageBase64;

  if (typeof raw === "string" && /^https?:\/\//i.test(raw)) return raw;

  return DEFAULT_OG_IMAGE;
}
