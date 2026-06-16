'use client';

import React from "react";

import {
  Briefcase,
  TrendingUp,
  Users,
  BookOpenCheck,
  Laptop2,
  Award,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaUsers, FaLightbulb, FaHandsHelping, FaAward } from "react-icons/fa";

const cultureData = [
  {
    title: "Collaboration",
    description: "We achieve great things together.",
    icon: <FaUsers className="text-blue-600 text-6xl" />,
  },
  {
    title: "Innovation",
    description: "Creative solutions are at the heart of our success.",
    icon: <FaLightbulb className="text-yellow-500 text-6xl" />,
  },
  {
    title: "Integrity",
    description: "We uphold the highest standards of integrity.",
    icon: <FaHandsHelping className="text-green-600 text-6xl" />,
  },
  {
    title: "Excellence",
    description: "Excellence is our culture, not our goal.",
    icon: <FaAward className="text-red-600 text-6xl" />,
  },
];

const About = () => {
  // Smooth scroll helper (no routing, no page reload)
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <header
        id="about-hero"
        aria-labelledby="about-hero__heading"
        className="relative w-full mt-10 md:mt-24
         min-h-[240px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[440px]
         overflow-hidden bg-no-repeat bg-cover bg-center md:bg-right lg:bg-right"
        style={{ backgroundImage: `url(/images/Background1.png)` }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-14 lg:px-16 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-[8.55fr_1.95fr] lg:grid-cols-2 gap-10 items-center justify-items-center md:justify-items-start">
            {/* LEFT CONTENT */}
            <div className="text-white text-center md:text-left md:pr-4 lg:pr-16 lg:pt-6 lg:text-center">
              <h1
                id="about-hero__heading"
                className="text-3xl sm:text-3xl md:text-3xl font-extrabold tracking-tight drop-shadow-xl"
              >
                Vell InfoTech
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-md text-white/90 max-w-xl leading-relaxed">
                Industry-ready training with real projects, expert mentors, and
                career support. Learn faster, build stronger, and get job-ready
                with confidence.
              </p>

              {/* Quick highlights */}
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start lg:justify-center">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white
  bg-white/10 border border-white/25 backdrop-blur-md
  shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
  hover:bg-white/15 hover:border-white/40 transition"
                >
                  ✅ 100+ Hiring Partners
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white
  bg-white/10 border border-white/25 backdrop-blur-md
  shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
  hover:bg-white/15 hover:border-white/40 transition"
                >
                  ✅ Project-based Training
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white
  bg-white/10 border border-white/25 backdrop-blur-md
  shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
  hover:bg-white/15 hover:border-white/40 transition"
                >
                  ✅ Mock Interviews
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white
  bg-white/10 border border-white/25 backdrop-blur-md
  shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
  hover:bg-white/15 hover:border-white/40 transition"
                >
                  ✅ Placement Support
                </span>
              </div>

              {/* CTA buttons (scroll to section ids) */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:justify-center">
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="group inline-flex items-center justify-center rounded-xl px-7 py-3 font-semibold
  bg-white text-[#003366] shadow-[0_14px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/30
  transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.30)] active:translate-y-0"
                >
                  Enquire Now
                </button>

                <button
                  type="button"
                  onClick={() => scrollToId("training-methodology")}
                  className="group inline-flex items-center justify-center rounded-xl px-7 py-3 font-semibold
  border border-white/35 bg-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
  backdrop-blur-md transition hover:bg-white/10 hover:border-white/55 hover:-translate-y-0.5
  active:translate-y-0"
                >
                  View Methodology
                </button>
              </div>
            </div>

            {/* END RIGHT */}
          </div>
        </div>
      </header>

      {/* WHY CHOOSE US */}
      <section
        id="why-choose-us"
        aria-labelledby="why-choose-us__heading"
        className="py-20 bg-gradient-to-r from-[#e0f7fa] to-[#f0fcff] text-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2
            id="why-choose-us__heading"
            className="text-4xl font-bold text-center text-[#005BAC] mb-12"
          >
            Why Choose Us
          </h2>

          <div className="relative border-l-4 border-[#00acc1] pl-8 space-y-14">
            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Expert Trainers
              </h3>
              <p className="text-gray-600">
                Our mentors come from real industry backgrounds and bring
                hands-on insights.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Flexible Learning Modes
              </h3>
              <p className="text-gray-600">
                Attend classes online or in person at your convenience.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Job-Ready Curriculum
              </h3>
              <p className="text-gray-600">
                Learn what employers want through real-world projects and
                practical labs.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Career Support
              </h3>
              <p className="text-gray-600">
                We provide resume building, mock interviews, and direct
                placement help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING METHODOLOGY */}
      <section
        id="training-methodology"
        aria-labelledby="training-methodology__heading"
        className="py-24 px-8 sm:px-16 md:px-32 bg-[#e0f7fa]"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            id="training-methodology__heading"
            className="py-10 text-3xl font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Our Training Methodology
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delayChildren: 0.2, staggerChildren: 0.2 },
              },
            }}
          >
            {[
              {
                label: "Foundation Theory",
                icon: (
                  <BookOpenCheck className="w-10 h-10 text-[#0077cc] mb-4 mx-auto" />
                ),
                desc: "Start with core concepts delivered by expert instructors using engaging explanations.",
              },
              {
                label: "Hands-on Practice",
                icon: (
                  <Laptop2 className="w-10 h-10 text-[#00acc1] mb-4 mx-auto" />
                ),
                desc: "Students work on structured lab exercises, gaining confidence with real tools.",
              },
              {
                label: "Project-based Evaluation",
                icon: (
                  <Award className="w-10 h-10 text-[#66bb6a] mb-4 mx-auto" />
                ),
                desc: "Apply knowledge on capstone projects assessed for technical and creative strength.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 text-gray-700 border-t-4 border-[#0077cc]"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.label}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IMPACT / STATS TIMELINE */}
      <section
        id="our-impact"
        aria-labelledby="our-impact__heading"
        className="relative py-20 bg-gradient-to-br from-[#F0F8FF] to-[#D6E9FF]"
      >
        <h2 id="our-impact__heading" className="sr-only">
          Our Impact
        </h2>

        <div className="hidden lg:block absolute left-24 top-0 h-full border-l-4 border-gradient-to-b from-[#005BAC] via-[#00ACC1] to-[#338DFF]"></div>

        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-24">
          <div className="flex items-center gap-8 relative">
            <div className="flex-shrink-0 w-16 h-40 rounded-l-xl bg-gradient-to-b from-[#005BAC] to-[#003366]"></div>
            <div className="flex-1 bg-white rounded-xl shadow-lg px-8 py-6 relative">
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-[#005BAC] flex items-center justify-center shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#003366]">
                Job Placement Rate
              </h3>
              <p className="mt-2 text-gray-700 max-w-xl">
                90% of our students secure jobs within 6 months after
                graduating.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 relative">
            <div className="flex-shrink-0 w-16 h-40 rounded-l-xl bg-gradient-to-b from-[#00ACC1] to-[#007B8A]"></div>
            <div className="flex-1 bg-white rounded-xl shadow-lg px-8 py-6 relative">
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-[#00ACC1] flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#005B66]">
                Average Salary Hike
              </h3>
              <p className="mt-2 text-gray-700 max-w-xl">
                Graduates report a 40% average salary increase in their first
                role after training.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 relative">
            <div className="flex-shrink-0 w-16 h-40 rounded-l-xl bg-gradient-to-b from-[#338DFF] to-[#004C99]"></div>
            <div className="flex-1 bg-white rounded-xl shadow-lg px-8 py-6 relative">
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-[#338DFF] flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#002F66]">
                Hiring Partners
              </h3>
              <p className="mt-2 text-gray-700 max-w-xl">
                Trusted by 100+ leading tech companies for skilled talent.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-28 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xl italic text-[#003366] font-semibold leading-relaxed">
            We go beyond teaching tools—our mission is helping people redesign
            their tomorrow.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        aria-labelledby="testimonials__heading"
        className="py-16 bg-[#fafafa]"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            id="testimonials__heading"
            className="text-3xl font-semibold text-gray-800 mb-8"
          >
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            We measure our impact by the career breakthroughs our learners
            achieve. Here's how Vell InfoTech has helped them grow.
          </p>

          <div className="flex flex-wrap justify-center gap-12">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-lg text-gray-700 italic">
                "Good place for job seekers. 💯 placement."
              </p>
              <div className="mt-6 flex items-center">
                <img
                  src="/images/Thennarasu S.png"
                  alt="Thennarasu S"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Thennarasu S
                  </h3>
                </div>
              </div>
            </div>

            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-lg text-gray-700 italic">
                Good service and trusted Organisation
              </p>
              <div className="mt-6 flex items-center">
                <img
                  src="/images/benjamin Andrew.png"
                  alt="Benjamin Andrew"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Benjamin Andrew
                  </h3>
                </div>
              </div>
            </div>

            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-lg text-gray-700 italic">
                Best Consultancy for the people who seek jobs.100 percentage
                placement guaranteed.
              </p>
              <div className="mt-6 flex items-center">
                <img
                  src="/images/Sudha Selvarajan.png"
                  alt="Sudha Selvarajan"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Sudha Selvarajan
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section
        id="our-culture"
        aria-labelledby="our-culture__heading"
        className="bg-gray-50 py-16"
      >
        <div className="container mx-auto px-6">
          <h2
            id="our-culture__heading"
            className="text-3xl font-bold mb-10 text-center"
          >
            Our Culture
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start relative">
            <div className="w-full md:w-1/2 flex flex-col items-start md:items-center mb-8 md:mb-0">
              {cultureData.slice(0, 2).map((item, index) => (
                <div key={index} className="text-left mb-16">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-300"></div>

            <div className="w-full md:w-1/2 flex flex-col items-start md:items-center">
              {cultureData.slice(2).map((item, index) => (
                <div key={index} className="text-left mb-16">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section
        id="core-values"
        aria-labelledby="core-values__heading"
        className="py-20 bg-gradient-to-br from-[#d0e8ff] via-[#a3cfff] to-[#74b6ff]"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            id="core-values__heading"
            className="text-4xl font-bold text-[#002b66] mb-6 tracking-tight"
          >
            Our Core Values
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            At Vell InfoTech, our values drive our mission and shape the way we
            work and grow together.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-[#0d47a1] hover:scale-105 transform">
              <h3 className="text-xl font-semibold text-[#0d47a1] mb-3">
                🔷 Integrity
              </h3>
              <p className="text-gray-600">
                We act with honesty and transparency in everything we do—no
                compromises.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-[#1976d2] hover:scale-105 transform">
              <h3 className="text-xl font-semibold text-[#1976d2] mb-3">
                🌊 Growth
              </h3>
              <p className="text-gray-600">
                We grow ourselves so we can help others grow—both personally and
                professionally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-[#2196f3] hover:scale-105 transform">
              <h3 className="text-xl font-semibold text-[#2196f3] mb-3">
                🚀 Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in everything—from training to
                technology to service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-[#64b5f6] hover:scale-105 transform">
              <h3 className="text-xl font-semibold text-[#64b5f6] mb-3">
                💬 Empathy
              </h3>
              <p className="text-gray-600">
                We listen, understand, and respond with compassion—our students
                come first.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              These values guide us every day as we build an inclusive,
              empowering, and forward-thinking learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        aria-labelledby="contact__heading"
        className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-16 px-6 sm:px-12 md:px-24 rounded-lg shadow-lg max-w-7xl mx-auto text-center text-white"
      >
        <h2
          id="contact__heading"
          className="text-4xl font-extrabold mb-6 drop-shadow-md"
        >
          Get in Touch
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto drop-shadow-sm">
          Have any questions? Want to know more about our courses? We're here to
          help!
        </p>
        <div className="space-y-4">
          <a
            href="mailto:vellinfotech10@gmail.com"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            vellinfotech10@gmail.com
          </a>
          <br />
          <a
            href="tel:+917669100251"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            +91-7669 100 251
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
