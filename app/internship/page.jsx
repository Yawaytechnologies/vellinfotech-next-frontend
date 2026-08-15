"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { submitInternship } from "@/redux/actions/internshipAction";

const Internship = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const dispatch = useDispatch();

  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const onlyLettersSpaces = (s) =>
    s.replace(/[^A-Za-z ]+/g, "").replace(/\s{2,}/g, " ");
  const digits10 = (s) => {
    const d = String(s).replace(/\D+/g, "").slice(0, 10);
    // if first digit is not 6-9, clear it (forces correct start)
    return d && !/^[6-9]/.test(d) ? "" : d;
  };

  const VALID_COURSES = new Set([
    "Dotnet",
    "Cyber Security",
    "Networking",
    "Java",
    "Artificial Intelligence",
    "Cloud Computing",
    "Python",
    "Data Science",
    "Ethical Hacking",
    "PHP",
    "Machine Learning",
    "Data Analytics",
    "Data Science And Ai",
    "Full Stack Development",
    "Java Full Stack Developer",
    "Python Full Stack Developer",
    "Pl Sql Developer",
    "Sql Developer",
    "Scrum Master",
    "Business Analytics",
  ]);

  const validateField = (name, value) => {
    const v = (value ?? "").trim();
    switch (name) {
      case "fullName":
        if (!v) return "Full name is required.";
        if (!/^[A-Za-z ]+$/.test(v)) return "Use letters and spaces only.";
        if (v.length < 2) return "Enter at least 2 characters.";
        return null;
      case "email":
        if (!v) return "Email is required.";
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v))
          return "Enter a valid email (e.g., example@gmail.com).";
        return null;
      case "phone":
        if (!v) return "Phone number is required.";
        if (!/^[6-9]\d{9}$/.test(v))
          return "Enter a valid 10-digit mobile number starting with 6–9.";

        return null;
      case "course": {
        if (!v) return "Course / Domain is required.";
        const normalized = v.replace(/\s+/g, " ").trim();
        if (!VALID_COURSES.has(normalized))
          return "Please select a valid Course/Domain from the list.";
        return null;
      }

      case "message":
        if (!v) return "Message is required.";
        if (v.length > 300) return "Max 300 characters.";
        return null;
      default:
        return null;
    }
  };

  const validateAll = (data) => {
    const next = {};
    ["fullName", "email", "phone", "course", "message"].forEach((k) => {
      const e = validateField(k, data[k]);
      if (e) next[k] = e;
    });
    setErrors(next);
    return next;
  };

  const tBase = {
    position: "top-center",
    autoClose: 2200,
    hideProgressBar: true,
    closeButton: false,
    draggable: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    transition: Slide,
    theme: "colored",
    style: {
      borderRadius: "12px",
      padding: "10px 16px",
      minWidth: "280px",
      maxWidth: "360px",
      lineHeight: 1.25,
      fontSize: "14px",
      fontWeight: 600,
      color: "#fff",
      boxShadow: "0 10px 24px rgba(0,0,0,.18)",
    },
  };

  const toastSuccess = (m) =>
    toast(m, { ...tBase, style: { ...tBase.style, background: "#34d399" } });
  const toastError = (m) =>
    toast(m, { ...tBase, style: { ...tBase.style, background: "#ef4444" } });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === "fullName") v = capFirst(onlyLettersSpaces(value));
    if (name === "course") v = value.replace(/\s{2,}/g, " ");

    if (name === "phone") v = digits10(value);
    if (name === "message") v = capFirst(value.slice(0, 300));
    setForm((f) => ({ ...f, [name]: v }));

    const msg = validateField(name, v);
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[name] = msg;
      else delete next[name];
      return next;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, form[name]);
    setErrors((prev) => ({
      ...prev,
      ...(msg ? { [name]: msg } : { [name]: undefined }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      course: true,
      message: true,
    });
    const errs = validateAll(form);
    if (Object.keys(errs).length) {
      const first = ["fullName", "email", "phone", "course", "message"].find(
        (k) => errs[k],
      );
      toastError(errs[first] || "Please fix the highlighted fields.");
      return;
    }
    try {
      await dispatch(
        submitInternship({
          fullName: form.fullName,
          email: form.email,
          phoneNumber: form.phone,
          course: form.course,
          message: form.message,
        }),
      ).unwrap();
      toastSuccess("Thanks! Your application has been submitted.");
      setForm({ fullName: "", email: "", phone: "", course: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (err) {
      toastError(
        typeof err === "string"
          ? err
          : "Something went wrong. Please try again.",
      );
    }
  };

  const inputBase =
    "border border-gray-300 rounded px-4 py-2 w-full transition-colors";
  const ok = "focus:border-blue-500";
  const bad = "border-red-500 focus:border-red-500";
  const help = "mt-1 text-[12px] text-red-600";

  return (
    <div className="bg-background pb-10 pt-[64px] md:pt-[134px] lg:pt-[150px] overflow-x-hidden">
      <ToastContainer newestOnTop />

      {/* HERO — Banner like screenshot */}
      <section
        className="relative w-full overflow-hidden bg-no-repeat bg-cover bg-center md:bg-right lg:bg-right
min-h-[300px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[440px] flex items-center"
        style={{
          backgroundImage: `url(/images/background.webp)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-labelledby="page-title"
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />

        <div className="relative z-10 w-full max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-4 sm:px-8 md:px-14 lg:px-16 xl:px-20 2xl:px-24 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-[3.55fr_3.95fr] lg:grid-cols-2 gap-10 items-center justify-items-center md:justify-items-start">
            {/* LEFT CONTENT */}
            <div
              className="text-white text-center md:text-left lg:text-left md:pr-4 lg:pr-16 lg:pt-6
              bg-black/35 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/15
              md:bg-transparent md:backdrop-blur-0 md:rounded-none md:p-0 md:shadow-none md:border-0"
            >
              <h1
                id="page-title"
                className="text-3xl sm:text-3xl md:text-3xl font-extrabold tracking-tight drop-shadow-xl"
              >
                Internship Training
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-md text-white/90 max-w-xl leading-relaxed">
                Industry-ready internship training with real projects, expert
                mentors, and career support. Learn faster, build stronger, and
                become job-ready with confidence.
              </p>

              {/* BADGES */}
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start lg:justify-start">
                {[
                  "Live Project Experience",
                  "Mentor Guidance",
                  "Mock Interviews",
                  "Placement Support",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white
bg-white/10 border border-white/25 backdrop-blur-md
shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
hover:bg-white/15 hover:border-white/40 transition"
                  >
                    <span className="grid place-items-center h-4 w-4 rounded-[4px] bg-emerald-400/90 text-[10px] text-black">
                      ✓
                    </span>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT CIRCLE IMAGE */}
            <div className="hidden md:center justify-end"></div>
          </div>
        </div>
      </section>

      {/* ABOUT — H2 section */}
      <section
        className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        aria-labelledby="about-internship-heading"
      >
        <div className="bg-white p-4 border border-blue-100 rounded-lg shadow-sm h-full">
          <h6
            id="about-internship-heading"
            className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-2 md:mb-3 leading-snug"
          >
            Best Online Internship Training in Chennai &amp; Bangalore
          </h6>
          <p className="text-gray-700 mb-2">
            At Vell InfoTech, our internship programs are designed to bridge the
            gap between academic learning and real-world application. You'll
            gain first-hand exposure to how the IT industry works, contribute to
            live projects, and build a portfolio that sets you apart.
          </p>
          <p className="text-gray-700 mb-2">
            Think of it as your professional starting point — a place where you
            apply what you've learned, develop confidence, and build the habits
            that make you employable. Whether it's onsite or remote, our
            internships prepare you for the corporate world ahead.
          </p>
        </div>

        <div className="flex justify-center items-stretch md:order-2 h-full">
          <img
            src="/images/internship.webp"
            alt="Students collaborating during internship"
            className="w-full max-w-[720px] lg:max-w-none h-[200px] sm:h-[260px] lg:h-[340px] object-cover rounded-lg shadow"
          />
        </div>
      </section>

      {/* DOMAINS — H2 + cards with H3 */}
      <section
        className="max-w-6xl mx-auto mt-10 px-4"
        aria-labelledby="domains-heading"
      >
        <h2
          id="domains-heading"
          className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-6 text-center"
        >
          Internship Domains
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { title: "Dotnet", image: "/images/dotnet.png" },
            { title: "Cyber Security", image: "/images/cyber.png" },
            { title: "Networking", image: "/images/internet.png" },
            { title: "Java", image: "/images/java.png" },
            { title: "Artificial Intelligence", image: "/images/ai.png" },
            { title: "Cloud Computing", image: "/images/upload.png" },
            { title: "Python", image: "/images/python.png" },
            { title: "Data Science", image: "/images/datascience.png" },
            { title: "Ethical Hacking", image: "/images/crime.png" },
            { title: "PHP", image: "/images/php.png" },
            { title: "Machine Learning", image: "/images/machine.png" },
            { title: "Data Analytics", image: "/images/analytics.png" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center items-center text-center min-h-[160px] w-full px-4 py-6 rounded-xl shadow-md bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-contain mb-3"
              />
              {/* H3 per card */}
              <h3 className="font-bold text-md text-blue-900">{item.title}</h3>
              <p className="text-sm text-gray-600">Internship</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY INTERNSHIP — H2 */}
      <section
        className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        aria-labelledby="why-internship-heading"
      >
        <div className="flex justify-center items-center">
          <img
            src="/images/internship.webp"
            alt="Benefits of internships"
            className="w-full max-w-[720px] lg:max-w-none h-[200px] sm:h-[260px] lg:h-[340px] object-cover rounded-lg shadow"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-gray-700 h-full">
          <h6
            id="why-internship-heading"
            className="text-lg sm:text-xl md:text-xl font-bold text-blue-800 mb-1 whitespace-nowrap"
          >
            Why Should You Do an Internship?
          </h6>

          <ol className="list-decimal pl-2 space-y-1 text-gray-700">
            <li>
              <strong>Gain real experience:</strong> Employers value practical
              exposure as much as classroom knowledge.
            </li>
            <li>
              <strong>Strengthen your skills:</strong> You'll learn how teams
              operate, solve real challenges, and sharpen both technical and
              communication skills.
            </li>
            <li>
              <strong>Discover your strengths:</strong> Internships let you
              explore various roles and identify what field best suits your
              passion.
            </li>
            <li>
              <strong>Expand your network:</strong> The mentors and peers you
              meet can open doors to full-time opportunities in the future.
            </li>
            <li>
              <strong>Boost employability:</strong> Many companies prefer hiring
              interns who have already proven themselves during training.
            </li>
          </ol>
          <a
            href="#apply"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* TRENDING — H2 + cards with H3 */}
      <section
        className="max-w-6xl mx-auto mt-16 px-4"
        aria-labelledby="trending-heading"
      >
        <h2
          id="trending-heading"
          className="text-3xl font-bold text-center text-[#005BAC] mb-10"
        >
          Trending Internships in Chennai
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Data Science",
              image: "/images/datascience.png",
              desc: "Work with real datasets, build dashboards, learn cleaning, visualization, and basic ML workflows.",
            },
            {
              title: "Python",
              image: "/images/python.png",
              desc: "Build backend APIs, automation scripts, and mini projects using real-world coding practices.",
            },
            {
              title: "Artificial Intelligence",
              image: "/images/ai.png",
              desc: "Learn AI fundamentals, model training basics, prompt engineering, and real project implementations.",
            },
            {
              title: "Java",
              image: "/images/java.png",
              desc: "Develop backend apps using Core Java + JDBC + Spring basics with industry-style project structure.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-4 bg-gradient-to-r from-cyan-500 to-cyan-300 text-white text-center">
                <img
                  src={item.image}
                  alt={`${item.title} internship`}
                  className="h-20 mx-auto mb-4"
                />
                {/* H3 per card */}
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-gray-900">
                  {item.title} Internship
                </p>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* APPLICATION FORM — H2 */}
      <section
        id="apply"
        className="max-w-3xl mx-auto bg-white shadow rounded-lg px-5 py-6 mt-16"
        aria-labelledby="application-form-heading"
      >
        <h2
          id="application-form-heading"
          className="text-2xl font-bold mb-6 text-center text-blue-800"
        >
          Internship Application Form
        </h2>

        <form className="space-y-4" noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.fullName}
                className={`${inputBase} ${touched.fullName && errors.fullName ? bad : ok}`}
              />
              {touched.fullName && errors.fullName && (
                <p className={help}>{errors.fullName}</p>
              )}
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                className={`${inputBase} ${touched.email && errors.email ? bad : ok}`}
              />
              {touched.email && errors.email && (
                <p className={help}>{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.phone}
                className={`${inputBase} ${touched.phone && errors.phone ? bad : ok}`}
              />
              {touched.phone && errors.phone && (
                <p className={help}>{errors.phone}</p>
              )}
            </div>
            <div>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.course}
                className={`${inputBase} ${touched.course && errors.course ? bad : ok} cursor-pointer`}
              >
                <option value="">Select Course / Domain</option>
                <option>Dotnet</option>
                <option>Cyber Security</option>
                <option>Networking</option>
                <option>Java</option>
                <option>Artificial Intelligence</option>
                <option>Cloud Computing</option>
                <option>Python</option>
                <option>Data Science</option>
                <option>Ethical Hacking</option>
                <option>PHP</option>
                <option>Machine Learning</option>
                <option>Data Analytics</option>
                <option>Data Science And Ai</option>
                <option>Full Stack Development</option>
                <option>Java Full Stack Developer</option>
                <option>Python Full Stack Developer</option>
                <option>Pl Sql Developer</option>
                <option>Sql Developer</option>
                <option>Scrum Master</option>
                <option>Business Analytics</option>
              </select>
              {touched.course && errors.course && (
                <p className={help}>{errors.course}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              className={`${inputBase} ${touched.message && errors.message ? bad : ok}`}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>First letter auto-caps</span>
              <span>{form.message.length}/300</span>
            </div>
            {touched.message && errors.message && (
              <p className={help}>{errors.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Internship;
