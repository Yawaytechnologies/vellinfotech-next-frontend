"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";

const slides = [
  {
    image: "/images/Slider1.webp",
    headline: "Industry-Ready Training",
    subtext:
      "Master In-Demand Skills with our expertly designed training programs in IT, Software development, Data analytics, Digital marketing, and more.",
    cta: "Explore Courses",
    link: "/all-courses",
  },
  {
    image: "/images/Slider2.webp",
    headline: "100% Placement Assistance",
    subtext:
      "Our dedicated placement team partners with top companies to ensure you land the right job. Resume building, mock interviews, and career guidance included.",
    cta: "Start Your Career Journey",
    link: "/all-courses",
  },
  {
    image: "/images/Slider3.webp",
    headline: "Real-Time Projects",
    subtext:
      "Gain hands-on experience by working on real-time industry projects that boost your confidence and portfolio. Learn by doing, not just watching.",
    cta: "See Placements",
    link: "/placed-students",
  },
  {
    image: "/images/Vell.webp",
    headline: "Join Our Talent Network",
    subtext:
      "Become part of a growing network of skilled professionals and recruiters. Get noticed by top employers and stay updated with the latest job openings.",
    cta: "Enquire now",
    link: "/about",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(
      () => setIndex((prev) => (prev + 1) % slides.length),
      5000,
    );
    return () => clearTimeout(timer);
  }, [index, paused]);

  return (
    <section
      id="hero"
      aria-labelledby="hero__heading"
      className="
        relative w-full
        h-[320px] xs:h-[360px] sm:h-[370px] md:h-[390px] lg:h-[455px]
        flex items-center justify-center overflow-hidden
        bg-white
      "
      style={{ maxWidth: "1875px", margin: "0 auto" }}
    >
      {/* Visually hidden section title (keeps hierarchy clean) */}
      <h2 id="hero__heading" className="sr-only">
        Featured Highlights
      </h2>

      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={slides[index].image + index}
          src={slides[index].image}
          alt={slides[index].headline}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0 w-full h-full object-fill z-0"
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[#005BAC]/10 pointer-events-none z-10" />

      {/* Arrows (desktop) */}
      <button
        type="button"
        className="hidden md:flex absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center bg-transparent"
        onClick={() =>
          setIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={58} className="text-text-primary" />
      </button>
      <button
        type="button"
        className="hidden md:flex absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center bg-transparent"
        onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
        aria-label="Next Slide"
      >
        <FiChevronRight size={58} className="text-text-primary" />
      </button>

      {/* Overlay content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-14 lg:px-16 py-10 md:py-12">
        <div
          className="
            w-full max-w-[95vw] xs:max-w-[22rem] sm:max-w-md md:max-w-xl
            bg-background rounded-xl p-3 xs:p-5 md:p-8 shadow-lg backdrop-blur-sm flex flex-col 
          "
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            key={slides[index].headline}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="mb-3 xs:mb-4"
          >
            {/* Slide headline as H3 to sit under the hidden H2 */}
            <h3 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold text-[#005BAC] mb-2 xs:mb-3 drop-shadow-lg">
              {slides[index].headline}
            </h3>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-black/90 mb-5">
              {slides[index].subtext}
            </p>
            <a
              href={slides[index].link}
              className="inline-block text-xs xs:text-sm sm:text-base bg-gradient-to-r from-[#005BAC] to-[#0d8ecf]
              hover:from-[#0d8ecf] hover:to-[#005BAC] text-white font-semibold rounded-full px-5 xs:px-6 sm:px-7 py-2 xs:py-2.5 sm:py-3 shadow-lg transition-all duration-200"
            >
              {slides[index].cta}
            </a>
          </motion.div>

          {/* Dots */}
          <div className="flex gap-2 mt-2 xs:mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 xs:w-3 xs:h-3 rounded-full border-2 border-[#005BAC] transition-all ${i === index ? "bg-[#005BAC]" : "bg-white"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex md:hidden absolute left-1/2 -translate-x-1/2 bottom-4 gap-8 z-30">
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow border border-[#005BAC]/10"
              onClick={() =>
                setIndex((prev) => (prev - 1 + slides.length) % slides.length)
              }
              aria-label="Previous Slide"
            >
              <FiChevronLeft size={32} className="text-[#005BAC]" />
            </button>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow border border-[#005BAC]/10"
              onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
              aria-label="Next Slide"
            >
              <FiChevronRight size={32} className="text-[#005BAC]" />
            </button>
          </div>
        </div>
      </div>

      {/* Down arrow */}
      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [0, 16, 0] }}
        transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-4 z-40 bg-white/80 hover:bg-white text-[#005BAC] shadow-lg rounded-full w-12 h-12 items-center justify-center transition-all duration-200 border border-[#005BAC]/10 backdrop-blur-[2px]"
        style={{ cursor: "pointer" }}
        aria-label="Scroll to Next Section"
        onClick={() => {
          const next = document.getElementById("about");
          if (next) next.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <FiChevronDown size={36} />
      </motion.button>
    </section>
  );
}
