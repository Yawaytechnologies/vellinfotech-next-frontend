'use client';
import React from "react";
import { FaClock, FaChalkboardTeacher, FaUserGraduate, FaMoneyBillWave, FaUserTie, FaClipboardCheck, FaCertificate, FaBook } from "react-icons/fa";

const features = [
  { icon: <FaClock className="text-white text-2xl md:text-3xl" />, title: "Flexible Timings", desc: "Real-time professionals help you learn effectively around your schedule.", bg: "bg-[#005877]" },
  { icon: <FaChalkboardTeacher className="text-white text-2xl md:text-3xl" />, title: "Fully Hands-On Training", desc: "Practice-first sessions so you master skills by doing.", bg: "bg-[#15c864]" },
  { icon: <FaUserGraduate className="text-white text-2xl md:text-3xl" />, title: "100+ Students Last Year", desc: "95% positive feedback from recent learners.", bg: "bg-[#b94d6d]" },
  { icon: <FaMoneyBillWave className="text-white text-2xl md:text-3xl" />, title: "Affordable Fees", desc: "High impact training without the heavy price tag.", bg: "bg-[#ffa425]" },
  { icon: <FaUserTie className="text-white text-2xl md:text-3xl" />, title: "Corporate Expert Trainer", desc: "Mentors with deep industry experience & live projects.", bg: "bg-[#c21a28]" },
  { icon: <FaClipboardCheck className="text-white text-2xl md:text-3xl" />, title: "Updated Syllabus", desc: "Curriculum tuned to the technologies companies hire for.", bg: "bg-[#005877]" },
  { icon: <FaCertificate className="text-white text-2xl md:text-3xl" />, title: "Earn a Global Certificate", desc: "Recognized by leading employers worldwide.", bg: "bg-[#83706d]" },
  { icon: <FaBook className="text-white text-2xl md:text-3xl" />, title: "Lifetime Study Material", desc: "Ongoing access to notes, videos, and curated big-company interview questions.", bg: "bg-[#0883e9]" },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why__heading" className="py-6 md:py-10 px-2 md:px-4 max-w-7xl mx-auto">
      {/* H2 */}
      <h2 id="why__heading" className="text-xl md:text-2xl font-bold text-center mb-1">
        Why Choose Us
      </h2>
      <p className="text-base md:text-lg text-center mb-7 text-gray-700">
        Our course catalog builds practical capability for both individuals and teams.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden">
        {features.map((item, i) => {
          const isLastCol = (i + 1) % 4 === 0;
          const isLastRow = i >= features.length - 4;
          return (
            <article
              key={i}
              className={`
                flex flex-col items-center text-center
                p-5 md:p-6 transition-all duration-200 cursor-pointer group
                bg-white hover:bg-[#005BAC]/10
                ${!isLastCol ? "border-r border-gray-200" : ""}
                ${!isLastRow ? "border-b border-gray-200" : ""}
              `}
              aria-labelledby={`feature-${i}__title`}
            >
              <span className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 shadow ${item.bg} transition-all duration-200 group-hover:bg-[#005BAC]`}>
                {item.icon}
              </span>
              {/* H3 per feature */}
              <h3 id={`feature-${i}__title`} className="text-lg font-semibold mb-1 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">{item.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
