'use client';

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion as Motion } from "framer-motion";

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

export default function BlogListClient({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="mt-6 text-center py-16">
        <p className="text-slate-500 text-base font-medium">No blog posts yet.</p>
        <p className="text-slate-400 text-sm mt-1">Check back soon for new articles.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
      {posts.map((post, index) => {
        const imageSrc = post.imageBase64 || "/images/career.jpg";
        const mins = readTime(post.content);

        return (
          <Motion.article
            key={post.id}
            className="group w-full bg-white backdrop-blur border border-slate-200 rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
          >
            {/* Image */}
            <Link href={`/blog/${post.id}`}>
              <div className="relative overflow-hidden">
                <img
                  src={imageSrc}
                  alt={post.title || "Blog post image"}
                  className="w-full h-32 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.src = "/images/career.jpg"; }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] uppercase tracking-wide">
                  Vel InfoTech
                </span>
                <span className="text-[10px] text-slate-400">{mins} min read</span>
              </div>

              <Link href={`/blog/${post.id}`}>
                <h3 className="text-[14px] md:text-[15px] font-semibold text-[#0B3D6E] group-hover:text-[#005BAC] leading-snug line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              {post.excerpt && (
                <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-2 flex items-center justify-end">
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-xs text-white bg-[#005BAC] hover:bg-[#004b8d] px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors"
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
  );
}
