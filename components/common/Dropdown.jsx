'use client'
import React, {useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

/**
 * Maps course display names → correct slug in /all-courses/:slug
 * Keep in sync with CourseRouter.jsx ROUTES.
 */

const ref = useRef(null);

useEffect(() => {
  const handler = (e) => {
    if (!ref.current) return;
    if (!ref.current.contains(e.target)) setOpen(false);
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, []);


const COURSE_GROUPS = [
  {
    label: "Cloud Computing Training",
    sub: [
      { name: "AWS Training", slug: "aws-training-program" },
      { name: "DevOps", slug: "devops-training-program" },
      { name: "Production Support", slug: "production-support-program" },
    ],
  },
  {
    label: "Programming Languages",
    sub: [
      { name: "Java", slug: "java-full-stack-developer-course" },
      { name: "Python", slug: "python-full-stack-developer-course" },
    ],
  },
  {
    label: "Software Testing",
    sub: [
      { name: "Software Testing", slug: "software-testing-program" },
      { name: "Selenium Testing", slug: "selenium-testing-program" },
      { name: "ETL Testing", slug: "etl-testing-program" },
    ],
  },
  {
    label: "Web Design & Development",
    sub: [
      { name: "Full Stack", slug: "full-stack-development-course" },
      { name: "ReactJS", slug: "reactjs" },
      { name: "MERN Stack", slug: "mern-stack" },
      { name: "Angular", slug: "angular" },
      { name: "WordPress", slug: "wordpress" },
      { name: "HTML", slug: "html" },
      { name: "CSS", slug: "css" },
      { name: "MEAN Stack", slug: "mean-stack" },
      { name: "Vue.js", slug: "vuejs" },
      { name: "jQuery", slug: "jquery" },
    ],
  },
  {
    label: "Data Science & AI",
    sub: [
      { name: "Data Science", slug: "data-science-training-program" },
      { name: "AI", slug: "data-science-and-ai-program" },
      { name: "Business Analytics", slug: "business-analytics-course" },
      { name: "Big Data Developer", slug: "big-data-developer-program" },
    ],
  },
];

export default function AllCoursesDropdown() {
  const [hovered, setHovered] = useState(0); // index of hovered group
  const [open, setOpen] = useState(false); // ✅ controls dropdown

  return (
    <div ref={ref} className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
  type="button"
  onClick={() => setOpen((v) => !v)}
  className="transition flex items-center gap-1 focus:outline-none"
>
  All Courses <span className="text-xs">▾</span>
</button>




      {/* Dropdown Panel */}
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-white text-black rounded shadow-2xl min-w-[540px] z-50 flex">
          {/* LEFT COLUMN: Main Categories */}
          <div className="flex flex-col w-60 border-r border-gray-200 py-2">
            {COURSE_GROUPS.map((grp, idx) => (
              <button
                key={grp.label}
                className={`flex items-center justify-between px-4 py-2 text-left hover:bg-blue-50 hover:text-[#005BAC] font-medium transition ${
                  idx === hovered
                    ? "bg-[#005BAC] text-white font-bold"
                    : "bg-white text-gray-800"
                }`}
                onMouseEnter={() => setHovered(idx)}
                tabIndex={-1}
              >
                {grp.label}
                <FiChevronRight className="ml-1" />
              </button>
            ))}
          </div>

          {/* RIGHT COLUMN: Subcourses */}
          <div className="flex flex-col min-w-[220px] py-2">
            {COURSE_GROUPS[hovered].sub.map((sc) => (
              <Link
                key={sc.name}
                href={`/all-courses/${sc.slug}`}
                onClick={() => setOpen(false)} // ✅ close menu on click
                className="px-4 py-2 hover:bg-gray-100 text-gray-800 whitespace-nowrap font-normal transition"
              >
                {sc.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
