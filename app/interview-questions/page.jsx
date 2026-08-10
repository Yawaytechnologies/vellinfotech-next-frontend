"use client";

import React from "react";
import Link from "next/link";
import { FaGlobe, FaCalendarAlt, FaTag } from "react-icons/fa";
// import { motion } from "framer-motion";

const interviews = [
  {
    id: "aws",
    title: "AWS Interview Questions and Answers",
    date: "August 1, 2025",
    description:
      "Get comfortable with AWS fundamentals, key services, and practical deployment questions that appear in top MNC interviews.",
    image: "/images/interview2.png",
  },
  {
    id: "selenium",
    title: "Selenium Interview Questions and Answers",
    date: "August 1, 2025",
    description:
      "Brush up on Selenium WebDriver, automation frameworks, and real-world QA testing scenarios used in enterprise projects.",
    image: "/images/interview1.png",
  },
  {
    id: "python",
    title: "Python Interview Questions and Answers",
    date: "August 1, 2025",
    description:
      "Review Python essentials, logical coding rounds, OOP fundamentals, and frequently asked real-time project questions.",
    image: "/images/interview2.png",
  },
  {
    id: "java",
    title: "Java Interview Questions and Answers",
    date: "August 1, 2025",
    description:
      "Understand Java collections, multithreading, memory management, and the key OOP concepts every developer must know.",
    image: "/images/interview1.png",
  },
];

function InterviewCard({ title, date, description, route, image }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-4 w-full">
        {image && (
          <div className="relative w-full md:w-[65%] -mx-4 sm:mx-0 rounded-none md:rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-[150px] md:h-[260px] object-cover rounded-none md:rounded-lg"
            />
            <div className="absolute top-3 left-3 bg-black/40 px-3 py-1 rounded z-10">
              <h2 className="text-white text-base md:text-sm font-bold text-left">
                {title}
              </h2>
            </div>
          </div>
        )}

        <div className="flex-1 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a2650] mb-2">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <FaGlobe className="text-blue-700" /> Global
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-700" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <FaTag className="text-blue-700" /> Interview
            </span>
          </div>

          <p className="text-gray-700 mb-4 text-base">{description}</p>

          <Link
            href={route}
            className="inline-block bg-[#005BAC] hover:bg-blue-800 text-white font-semibold text-sm px-5 py-2 rounded transition"
          >
            Read More &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function InterviewQuestionsPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section
        className="
    relative w-full
    mt-[54px] sm:mt-[100px]
    h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px]
    flex items-center justify-start
    px-3 sm:px-4 md:px-8 lg:px-10
    overflow-hidden
  "
        style={{
          backgroundImage: "url('/images/interview.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-labelledby="interview-page-heading"
      >
        <div className="absolute inset-0 bg-black/10" />

        <h1
          id="interview-page-heading"
          className="
      relative z-10
      text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px]
      max-w-[95%] sm:max-w-[80%] md:max-w-[720px]
      tracking-wide
      text-left
      font-bold
      text-white
      drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]
    "
        >
          Explore Interview Guides
        </h1>
      </section>

      {/* Interview Guides Section */}
      <section
        className="max-w-6xl mx-auto px-4 py-10"
        aria-labelledby="interview-guides-heading"
      >
        <h2
          id="interview-guides-heading"
          className="text-2xl sm:text-3xl font-bold text-[#005BAC] mb-8 text-center"
        >
          Interview Questions &amp; Preparation Guides
        </h2>

        {interviews.map((item) => (
          <article
            key={item.id}
            className="mb-10"
            aria-labelledby={`${item.id}-heading`}
          >
            <h2 id={`${item.id}-heading`} className="sr-only">
              {item.title}
            </h2>
            <InterviewCard
              title={item.title}
              date={item.date}
              description={item.description}
              route={`/interview/${item.id}`}
              image={item.image}
            />
          </article>
        ))}
      </section>
    </main>
  );
}
