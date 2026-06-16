'use client';
import React from "react";
import { useRouter } from "next/navigation";

export default function BannerSection() {
  const router = useRouter();

  const scrollToPopular = (offset = 0) => {
    const el = document.getElementById("popular-courses");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleConsultationClick = () => {
    router.push("/contact-us");
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero__heading"
      // ✅ FIX: removed mt-12 md:mt-20 (double spacing with layout <main> padding)
      className="w-full pt-10 md:pt-26 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pb-12 text-gray-900 overflow-x-hidden"
      style={{ background: "linear-gradient(to right, #005BAC, #003c6a)" }}
    >
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 animate-fade-up">
        <h1
          id="hero__heading"
          className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-white"
        >
          Good <span className="text-[#00b4d8]">coaching</span> is
          <br /> good teaching & <br /> nothing else.
        </h1>

        <h2 className="text-base md:text-lg tracking-wide text-white/95">
          Successful Coaches Are Visionaries
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => scrollToPopular(120)}
            className="px-6 py-2 border border-white text-white rounded-md hover:bg-gray-900 hover:text-white transition"
          >
            View Courses
          </button>

          <button
            onClick={handleConsultationClick}
            className="px-6 py-2 bg-[#00b4d8] text-white rounded-md font-semibold hover:bg-[#0096c7] transition"
          >
            Get Free Consultation
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center md:items-end justify-center relative animate-float">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="/images/education1.png"
            alt="Student learning and coaching illustration"
            className="h-[320px] md:h-[360px] object-contain"
          />

          <div className="bg-white shadow-md rounded-lg px-5 py-4 max-w-xs border-l-4 border-[#00b4d8] text-left">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              Ronald Richards
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              In a coaching role, you ask the questions and rely more on your
              staff, who become the experts, to provide the information.
            </p>
            <div
              className="flex items-center gap-2 text-sm text-green-600 font-medium"
              aria-label="Rating 4.9 out of 5"
            >
              <span>4.9</span>
              <span className="text-yellow-500" aria-hidden>
                ★★★★★
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap text-center text-sm font-semibold mt-10">
          <div className="flex flex-col items-center">
            <span className="text-[28px] text-pink-500 font-extrabold">
              10000+
            </span>
            <span className="text-white uppercase text-xs">Students</span>
          </div>
          <div className="w-[1px] h-10 bg-gray-300 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-[28px] text-green-600 font-extrabold">
              600+
            </span>
            <span className="text-white uppercase text-xs">Companies</span>
          </div>
          <div className="w-[1px] h-10 bg-gray-300 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-[28px] text-blue-600 font-extrabold">
              30+
            </span>
            <span className="text-white uppercase text-xs">Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
