'use client';
// src/components/home/LanguageStack.jsx
import React from "react";
import {
  FaJs, FaCode, FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs,
  FaServer, FaDatabase, FaFire, FaCloud, FaDocker, FaLinux, FaGitAlt,
  FaGem, FaPhp, FaSwift, FaMobileAlt, FaWind, FaSyncAlt, FaSass,
  FaProjectDiagram, FaVuejs, FaAngular, FaLeaf,
} from "react-icons/fa";

/* ===== DATA (kept local to remove "rows is not defined") ===== */
const rows = [
  [
    { label: "JavaScript", Icon: FaJs },
    { label: "TypeScript", Icon: FaCode },
    { label: "Python", Icon: FaPython },
    { label: "Java", Icon: FaJava },
    { label: "C#", Icon: FaCode },
    { label: "C++", Icon: FaCode },
    { label: "Go", Icon: FaCode },
    { label: "Rust", Icon: FaCode },
  ],
  [
    { label: "HTML5", Icon: FaHtml5 },
    { label: "CSS3", Icon: FaCss3Alt },
    { label: "React", Icon: FaReact },
    { label: "Next.js", Icon: FaCode },
    { label: "Node.js", Icon: FaNodeJs },
    { label: "Express", Icon: FaServer },
    { label: "Django", Icon: FaPython },
    { label: "Spring", Icon: FaLeaf },
  ],
  [
    { label: "MongoDB", Icon: FaDatabase },
    { label: "MySQL", Icon: FaDatabase },
    { label: "PostgreSQL", Icon: FaDatabase },
    { label: "Firebase", Icon: FaFire },
    { label: "AWS", Icon: FaCloud },
    { label: "Docker", Icon: FaDocker },
    { label: "Linux", Icon: FaLinux },
    { label: "Git", Icon: FaGitAlt },
  ],
  [
    { label: "Ruby", Icon: FaGem },
    { label: "PHP", Icon: FaPhp },
    { label: "Swift", Icon: FaSwift },
    { label: "Kotlin", Icon: FaCode },
    { label: "Dart", Icon: FaCode },
    { label: "Flutter", Icon: FaMobileAlt },
    { label: "Tailwind CSS", Icon: FaWind },
    { label: "Redux", Icon: FaSyncAlt },
    { label: "Sass", Icon: FaSass },
    { label: "GraphQL", Icon: FaProjectDiagram },
    { label: "Vue.js", Icon: FaVuejs },
    { label: "Angular", Icon: FaAngular },
  ],
];

const BRAND_COLORS = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  Java: "#007396",
  "C#": "#512BD4",
  "C++": "#00599C",
  Go: "#00ADD8",
  Rust: "#000000",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  React: "#61DAFB",
  "Next.js": "#000000",
  "Node.js": "#5FA04E",
  Express: "#000000",
  Django: "#092E20",
  Spring: "#6DB33F",
  MongoDB: "#47A248",
  MySQL: "#4479A1",
  PostgreSQL: "#336791",
  Firebase: "#FFCA28",
  AWS: "#FF9900",
  Docker: "#2496ED",
  Linux: "#FCC624",
  Git: "#F05032",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  Swift: "#F05138",
  Kotlin: "#7F52FF",
  Dart: "#0175C2",
  Flutter: "#02569B",
  "Tailwind CSS": "#38BDF8",
  Redux: "#764ABC",
  Sass: "#CC6699",
  GraphQL: "#E10098",
  "Vue.js": "#42B883",
  Angular: "#DD0031",
};

const marqueeStyle = `
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes marqueeReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
`;

function MarqueeRow({ items, reverse = false, duration = 24 }) {
  const pills = Array(4).fill(items).flat();
  return (
    <div className="overflow-hidden w-full my-2 relative">
      <div
        className="pointer-events-none absolute left-0 top-0 w-24 h-full z-20"
        style={{ background: "linear-gradient(to right, #f4f7fd 60%, #fff0 100%)" }}
      />
      <div
        className="flex gap-6 min-w-fit"
        style={{ animation: `${reverse ? "marqueeReverse" : "marquee"} ${duration}s linear infinite` }}
      >
        {pills.map(({ label, Icon }, i) => (
          <span
            key={`${label}-${i}`}
            className="flex items-center gap-2 mt-1 mb-1 bg-white rounded-3xl px-4 py-3 min-w-[170px] shadow-3xl text-gray-800 text-xs font-medium justify-center transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 cursor-pointer select-none relative"
            style={{ boxShadow: "0 8px 32px 0 rgba(80,89,143,0.13)" }}
          >
            <Icon
              className="text-xl md:text-2xl"
              style={{ color: BRAND_COLORS[label] || undefined }}
              aria-hidden
            />
            <span>{label}</span>
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute right-0 top-0 w-24 h-full z-20"
        style={{ background: "linear-gradient(to left, #f4f7fd 60%, #fff0 100%)" }}
      />
    </div>
  );
}

export default function ElementsMarqueeSection() {
  return (
    <section
      id="stacks"
      aria-labelledby="stacks__heading"
      className="relative py-14 w-full bg-[#f4f7fd] overflow-hidden"
    >
      <h2 id="stacks__heading" className="text-2xl text-center font-black mb-10 tracking-tight z-30 relative">
        <span className="text-[#005BAC]">30+</span>{" "}
        <span className="text-[#232946]">Programming Languages & Frameworks</span>
      </h2>

      <style>{marqueeStyle}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-1 relative z-10">
        <MarqueeRow items={rows[0]} reverse={false} duration={190} />
        <MarqueeRow items={rows[1]} reverse={true} duration={190} />
        <MarqueeRow items={rows[2]} reverse={false} duration={190} />
        {/* Uncomment to show the fourth row
        <MarqueeRow items={rows[3]} reverse={true} duration={190} />
        */}
      </div>
    </section>
  );
}
