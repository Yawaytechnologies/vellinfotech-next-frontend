import { permanentRedirect } from "next/navigation";
import { notFound } from "next/navigation";

import {
  fetchBlogPosts,
  fetchBlogPostById,
  fetchBlogPostBySlug,
} from "../../../lib/api";
import BlogDetailClient from "../../../components/BlogDetailClient";
import {
  metaDescription,
  pageTitle,
  shareImage,
  DEFAULT_OG_IMAGE,
} from "../../../lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

const BASE = "https://www.vellinfotech.com";

/**
 * Resolves a route param that may be either a slug or a legacy numeric id.
 *
 * /blog/8 was the old URL shape and is still indexed and linked, so instead of
 * maintaining a hand-written redirect per post, any all-digits param is looked up
 * by id and permanently redirected to its slug. That covers every existing post
 * and anything already shared, with nothing to keep in sync.
 */
async function resolvePost(param) {
  if (!param) return null;

  // Decode encoded URL:
  // What%20is%20Data%20Engineering
  // becomes:
  // What is Data Engineering
  let decodedParam = param;

  try {
    decodedParam = decodeURIComponent(param);
  } catch {
    decodedParam = param;
  }

  decodedParam = decodedParam.trim();

  // Old numeric URL: /blog/8
  if (/^\d+$/.test(decodedParam)) {
    const legacy = await fetchBlogPostById(decodedParam);

    if (legacy?.slug) {
      permanentRedirect(`/blog/${legacy.slug}`);
    }

    return null;
  }

  // Convert old URL/title into clean SEO slug
  const normalizedSlug = decodedParam
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Redirect only when old URL is different from clean slug
  if (normalizedSlug !== decodedParam) {
    permanentRedirect(`/blog/${normalizedSlug}`);
  }

  return fetchBlogPostBySlug(normalizedSlug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return {};

  const canonical = `${BASE}/blog/${post.slug}`;
  const description = metaDescription(post);

  return {
    // Truncated so the title stays legible in search results once the brand is on.
    title: `${pageTitle(post.title)} | Vell InfoTech`,
    description,
    alternates: { canonical },
    openGraph: {
      title: pageTitle(post.title),
      description,
      url: canonical,
      type: "article",
      images: [{ url: shareImage(post), width: 1200, height: 630 }],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const post = await resolvePost(slug);
  if (!post) notFound();

  // Powers Recent Posts and the category counts in the sidebar.
  const allPosts = await fetchBlogPosts();

  const canonical = `${BASE}/blog/${post.slug}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    // schema.org caps headline at 110 characters.
    headline: post.title?.trim().slice(0, 110),
    description: metaDescription(post),
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Organization", name: "Vell InfoTech" },
    publisher: {
      "@type": "Organization",
      name: "Vell InfoTech",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/images/Logoo.png`,
      },
    },
    ...(post.category && { articleSection: post.category }),
    // Omitted entirely rather than emitted empty when the post predates createdAt.
    ...(post.createdAt && { datePublished: post.createdAt }),
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    // Must be a crawlable URL. Base64 data URIs are not, and Google will not
    // fetch them — a data URI here can cost the Article rich result entirely.
    image: shareImage(post) || DEFAULT_OG_IMAGE,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetailClient post={post} allPosts={allPosts} />
    </>
  );
}
