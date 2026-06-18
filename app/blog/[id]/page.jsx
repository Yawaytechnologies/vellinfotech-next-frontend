import { fetchBlogPosts, fetchBlogPostById } from "../../../lib/api";
import BlogDetailClient from "../../../components/BlogDetailClient";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await fetchBlogPostById(id);
  if (!post) return {};
  return {
    title: `${post.title} | Vell InfoTech Blog`,
    description:
      post.excerpt ||
      (post.content ? post.content.replace(/<[^>]+>/g, " ").substring(0, 160).trim() : "Read this article on Vell InfoTech blog."),
    alternates: { canonical: `https://www.vellinfotech.com/blog/${id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      url: `https://www.vellinfotech.com/blog/${id}`,
      type: "article",
      images: post.imageBase64 ? [{ url: post.imageBase64 }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const post = await fetchBlogPostById(id);
  if (!post) notFound();

  const plainDescription = post.excerpt ||
    (post.content ? post.content.replace(/<[^>]+>/g, " ").substring(0, 200).trim() : "");

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: plainDescription,
    url: `https://www.vellinfotech.com/blog/${id}`,
    datePublished: post.createdAt || post.date || "",
    author: { "@type": "Organization", name: "Vell InfoTech" },
    publisher: {
      "@type": "Organization",
      name: "Vell InfoTech",
      logo: {
        "@type": "ImageObject",
        url: "https://www.vellinfotech.com/images/Logoo.png",
      },
    },
    ...(post.imageBase64 && {
      image: post.imageBase64,
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.vellinfotech.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.vellinfotech.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.vellinfotech.com/blog/${id}`,
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
      <BlogDetailClient post={post} />
    </>
  );
}
