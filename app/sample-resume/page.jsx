'use client';

import React, { useState } from "react";

// Sample resumes data
const resumes = [
  {
    title: "Salesforce Developer",
    category: "Salesforce",
    file: "/resumes/john-doe.pdf",
  },
  {
    title: "PL/SQL Developer",
    category: "PLSQL",
    file: "/resumes/ananya-sharma.pdf",
  },
  {
    title: "QA Engineer",
    category: "Testing",
    file: "/resumes/raj-kumar.pdf",
  },
  {
    title: "Salesforce Developer",
    category: "Salesforce",
    file: "/resumes/priya-singh.pdf",
  },
];

export default function SampleResume() {
  const categories = ["All", "Salesforce", "PLSQL", "Testing"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResumes =
    selectedCategory === "All"
      ? resumes
      : resumes.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Sample Resumes</h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resume Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {filteredResumes.length > 0 ? (
          filteredResumes.map((resume, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg w-72 flex flex-col items-center text-center"
            >
              <h2 className="text-xl font-semibold mb-2">{resume.name}</h2>
              <p className="text-gray-600 mb-4">{resume.title}</p>

              {/* Download Button */}
              <span className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed">
                Coming Soon
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No resumes found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
