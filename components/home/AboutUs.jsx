'use client';
// src/pages/components/home/AboutSection.jsx  (adjust path to where you keep it)
import React, { useState } from "react";
import { FaLaptop, FaChalkboardTeacher } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../redux/actions/enquiryAction";

export default function AboutSection() {
  const [mode, setMode] = useState("class_room");
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.enquiry || {});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const toastOpts = {
    position: "top-center",
    autoClose: 2200,
    hideProgressBar: true,
    closeButton: false,
    newestOnTop: true,
    draggable: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    theme: "colored",
    transition: Slide,
    style: {
      borderRadius: "10px",
      padding: "8px 12px",
      minWidth: "260px",
      maxWidth: "320px",
      lineHeight: 1.25,
      fontSize: "14px",
      fontWeight: 600,
      boxShadow: "0 8px 20px rgba(0,0,0,.18)",
      color: "#fff",
    },
  };

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      const err = validateField(field, value);
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };
  const handleChange = (e) => setField(e.target.name, e.target.value);
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, form[name]);
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[name] = msg;
      else delete next[name];
      return next;
    });
  };

  const validateField = (field, value) => {
    const val = (value ?? "").trim();
    switch (field) {
      case "name":
        if (!val) return "Name is required.";
        if (!/^[A-Za-z ]+$/.test(val))
          return "Only letters and spaces are allowed.";
        if (val.length < 2) return "Enter at least 2 characters.";
        return null;
      case "email": {
        if (!val) return "Email is required.";
        if (/[,\s]/.test(val)) return "Enter a valid email address.";

        const emailOk = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          val,
        );
        if (!emailOk || /\.\./.test(val)) return "Enter a valid email address.";

        const [, domainRaw] = val.split("@");
        const domain = (domainRaw || "").toLowerCase();
        if (!domain || domain.startsWith(".") || domain.endsWith("."))
          return "Enter a valid email address.";

        const allowedDomains = [
          "gmail.com",
          "yahoo.com",
          "yahoo.in",
          "outlook.com",
          "hotmail.com",
          "live.com",
          "icloud.com",
          "proton.me",
          "protonmail.com",
        ];
        if (!allowedDomains.includes(domain)) {
          return "Please use a valid email (Gmail/Yahoo/Outlook etc).";
        }

        return null;
      }

      case "phone":
        if (!val) return "Mobile number is required.";
        if (!/^[6-9]\d{9}$/.test(val))
          return "Enter a valid 10-digit mobile number (starts with 6-9).";
        return null;
      case "course":
        if (!val) return "Course name is required.";
        if (!/^[A-Za-z ]+$/.test(val))
          return "Only letters and spaces are allowed.";
        if (val.length < 2) return "Enter at least 2 characters.";
        return null;
      case "message":
        if (val.length > 300) return "Message must be 300 characters or less.";
        return null;
      default:
        return null;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      message: true,
    });

    const fields = ["name", "email", "phone", "course", "message"];
    const next = {};
    fields.forEach((f) => {
      const er = validateField(f, form[f]);
      if (er) next[f] = er;
    });
    setErrors(next);

    if (Object.keys(next).length) {
      const first = fields.find((f) => next[f]);
      const el = document.querySelector(`[name="${first}"]`);
      if (el) el.focus();
      toast.error(next[first] || "Please fix the highlighted errors.", {
        ...toastOpts,
        style: { background: "#ef4444", color: "#fff" },
        className: "rounded-xl shadow-md text-[15px] px-4 py-3",
      });
      return;
    }

    const payload = {
      mode: (mode || "class_room").toUpperCase(),
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.phone.trim(),
      course: form.course.trim(),
      message: form.message.trim(),
    };

    try {
      await dispatch(submitEnquiry(payload)).unwrap();

      toast.success("Thanks! Your enquiry has been recorded.", {
        ...toastOpts,
        style: { background: "#16a34a", color: "#fff" },
        className: "rounded-xl shadow-md text-[15px] px-4 py-3",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
      setErrors({});
      setTouched({});
    } catch (err) {
      const msg = typeof err === "string" ? err : "Submission failed.";
      toast.error(msg, {
        ...toastOpts,
        style: { background: "#ef4444", color: "#fff" },
        className: "rounded-xl shadow-md text-[15px] px-4 py-3",
      });
    }
  }

  return (
    <>
      <ToastContainer
        newestOnTop
        position="top-center"
        autoClose={2200}
        closeOnClick={false}
        pauseOnHover
      />

      {/* ---- HARD white (with subtle dots) that cannot be overridden ---- */}
      <section
        id="about"
        aria-labelledby="about__heading"
        className="relative isolate overflow-hidden py-16 px-4 md:px-8 lg:px-0"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `
            radial-gradient(circle, #e0e7ef 2.5px, transparent 2.5px),
            radial-gradient(circle, #e0e7ef 2.5px, transparent 2.5px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      >
        {/* neutralize any global ::before/::after that might be attached to #about */}
        <style>{`
          #about::before, #about::after {
            background: none !important;
            content: none !important;
          }
        `}</style>

        {/* ✅ Single page H1 lives here */}
        <h1
          id="about__heading"
          className="text-[2.2rem] md:text-[1.8rem] font-black text-[#171717] mb-3 text-center leading-tight"
        ></h1>

        <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row gap-12 items-stretch z-10">
          {/* LEFT */}
          <div className="flex-1 flex flex-col justify-center pl-0 md:pl-2 lg:pl-8">
            <p className="text-gray-700 text-xl mb-7 leading-relaxed">
              <span className="font-semibold text-[#005BAC]">
                Elevate your career with curated training,
              </span>{" "}
              built by 650+ industry experts for real-world success. Join
              thousands of professionals accelerating their future.
            </p>

            <div className="bg-white border border-[#a7f3d0]/30 shadow-lg rounded-2xl p-6 mb-5">
              {/* H3 inside the card */}
              <h3 className="text-lg font-bold text-[#005BAC] mb-2 tracking-wide">
                About Vel InfoTech
              </h3>
              <ul className="text-gray-800 text-base space-y-2 mb-3 list-disc list-inside">
                <li>
                  <span className="font-bold">Industry Leader:</span> Recognized
                  as a high-impact IT education brand.
                </li>
                <li>
                  <span className="font-bold">Expert-Led:</span> 650+
                  world-class trainers & real project mentorship.
                </li>
                <li>
                  <span className="font-bold">Tailored Pathways:</span> Flexible
                  for students, graduates, and working pros.
                </li>
                <li>
                  <span className="font-bold">Proven Outcomes:</span> 10,000+
                  students placed with top IT MNCs.
                </li>
              </ul>
              <div className="text-gray-600 text-sm mt-2">
                <span className="font-semibold">Benefits:</span> Faster
                onboarding, productivity gains, cost-effective upskilling, and
                global recognition.
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="/all-courses"
                className="px-6 py-3 bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-bold rounded-2xl shadow hover:shadow-xl hover:from-[#0891b2] hover:to-[#16bca7] transition-all duration-200 text-lg tracking-wide"
              >
                View All Courses
              </Link>
            </div>
          </div>

          {/* RIGHT: Enquiry Card */}
          <div className="flex-1 w-full max-w-lg mx-auto md:mx-0 flex flex-col justify-center px-0 md:px-4">
            <div className="relative backdrop-blur-[6px] bg-white/70 border border-white/60 shadow-2xl rounded-3xl p-8 transition-all hover:scale-[1.015] hover:shadow-2xl duration-300">
              {/* H2 for the form block under the page H1 */}
              <h2 className="text-2xl font-bold mb-5 text-center bg-gradient-to-r from-[#005BAC] to-[#003c6a] bg-clip-text text-transparent tracking-tight">
                Get a Free Training Quote
              </h2>

              {/* Mode Toggle */}
              <div className="flex justify-center mb-6 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("class_room")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium shadow
                    ${
                      mode === "class_room"
                        ? "bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white shadow-lg"
                        : "bg-white/60 text-black border border-[#a7f3d0]/40"
                    } transition-all duration-200`}
                  aria-pressed={mode === "class_room"}
                >
                  <FaChalkboardTeacher className="text-base" /> Class Room
                </button>
                <button
                  type="button"
                  onClick={() => setMode("online")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium shadow
                    ${
                      mode === "online"
                        ? "bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white shadow-lg"
                        : "bg-white/60 text-black border border-[#a7f3d0]/40"
                    } transition-all duration-200`}
                  aria-pressed={mode === "online"}
                >
                  <FaLaptop className="text-base" /> Online
                </button>
              </div>

              {/* Form */}
              <form
                id="enquiry-form"
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 gap-2"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^A-Za-z ]/g, "");
                      setField("name", cleaned);
                    }}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.name}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.name && errors?.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="h-3 mt-0.5">
                    {touched?.name && errors?.name && (
                      <p className="text-red-600 text-xs">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => {
                      setField("email", e.target.value);
                      setTouched((t) => ({ ...t, email: true })); // ✅ show validation immediately
                    }}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.email}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.email && errors?.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="h-3 mt-0.5">
                    {touched?.email && errors?.email && (
                      <p className="text-red-600 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={(e) => {
                      // keep only digits and limit to 10
                      let onlyDigits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      // 🔥 force first digit 6-9
                      if (
                        onlyDigits.length === 1 &&
                        !/^[6-9]$/.test(onlyDigits)
                      ) {
                        onlyDigits = ""; // don't allow starting 0-5
                      }

                      setField("phone", onlyDigits);
                    }}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.phone}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.phone && errors?.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="h-3 mt-0.5">
                    {touched?.phone && errors?.phone && (
                      <p className="text-red-600 text-xs">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.course}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900",
                      touched?.course && errors?.course
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  >
                    <option value="">Select Course</option>
                    {[
                      "Java",
                      "Python",
                      "Full Stack Development",
                      "PL/SQL",
                      "SQL",
                      "Data Science",
                      "Business Analytics",
                      "Data Science & AI",
                      "Big Data Developer",
                      "Software Testing",
                      "Selenium Testing",
                      "ETL Testing",
                      "AWS Training",
                      "DevOps",
                      "Hardware Networking",
                      "Cyber Security",
                      "SAP",
                      "Salesforce",
                      "ServiceNow",
                      "RPA (Robotic Process Automation)",
                      "Production Support",
                      "Digital Marketing",
                      "Soft Skill Training",
                      "Scrum Master",
                      "Business Analyst",
                      "Product Management",
                    ].map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>

                  <div className="h-3 mt-0.5">
                    {touched?.course && errors?.course && (
                      <p className="text-red-600 text-xs">{errors.course}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.message}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm resize-none focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.message && errors?.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                    <span>First letter auto-caps</span>
                    <span>{form.message.length}/300</span>
                  </div>
                  <div className="h-3 mt-0.5">
                    {touched?.message && errors?.message && (
                      <p className="text-red-600 text-xs">{errors.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full mt-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-semibold text-sm hover:from-[#0891b2] hover:to-[#16bca7] transition ${
                    status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {status === "loading" ? "Submitting..." : "Submit"}
                </button>

                {error && (
                  <p className="text-red-600 text-xs mt-1">
                    Submission failed: {String(error)}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
