"use client";

// src/pages/Contact.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../redux/actions/enquiryAction";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ============================== Contact Page ============================== */
export default function Contact() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vell InfoTech",
    url: "https://www.vellinfotech.com",
    telephone: "+91-9600593838",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ekkatuthangal",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  /* ---------- quick actions/links ---------- */
  const actions = [
    { label: "Call", href: "tel:+919600593838", icon: PhoneIcon },
    {
      label: "WhatsApp",
      href: "https://wa.me/9600383839",
      icon: WhatsAppIcon,
      target: "_blank",
    },
    { label: "Email", href: "mailto:contact@velinfotech.com", icon: MailIcon },
    {
      label: "Directions",
      href: "https://www.google.com/maps/search/?api=1&query=Vell%20InfoTech%20Pvt.Ltd&query_place_id=ChIJvdtfnyNnUjoRO_LTE0U-L4M",
      icon: PinIcon,
      target: "_blank",
    },
  ];

  const faqs = [
    {
      q: "How do I reach Vell Infotech quickly?",
      a: "Tap Call or WhatsApp on mobile; for visits, use Directions to open Google Maps.",
    },
    {
      q: "Do you offer placement assistance?",
      a: "Yes. We align training with industry needs and provide interview prep & placement support.",
    },
    {
      q: "Can I schedule a counselling session?",
      a: "Yes. Send a message with your preferred time; our team will confirm shortly.",
    },
  ];

  /* ---------- API integration ---------- */
  const dispatch = useDispatch();
  const { status, error: serverError } = useSelector((s) => s.enquiry || {});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
    mode: "classroom",
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, form[name]);
    setErrors((prev) => ({
      ...prev,
      ...(msg ? { [name]: msg } : { [name]: undefined }),
    }));
  };

  // Validations
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

        return null;
      }

      case "phone":
        if (!val) return "Mobile number is required.";
        if (!/^[6-9]\d{9}$/.test(val))
          return "Enter valid 10-digit mobile number (starts with 6-9).";
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

  const handleSubmit = async (e) => {
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
      mode: (form.mode === "classroom" ? "class_room" : "online").toUpperCase(),
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
        mode: "classroom",
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
  };

  return (
    <div className="min-h-screen relative overflow-clip bg-[#F7FAFF] dark:bg-[#F7FAFF] pt-[82px] md:pt-[150px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <ToastContainer
        newestOnTop
        position="top-center"
        autoClose={2200}
        closeOnClick={false}
        pauseOnHover
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-violet-400/8 blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[length:32px_32px]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M0 31.5H32M31.5 0V32' stroke='%23005BAC' stroke-width='1' stroke-opacity='1'/></svg>\")",
        }}
      />

      {/* ============================== Hero ============================== */}
      <section className="relative">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-12 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
            {/* LEFT */}
            <div>
              <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4 md:mb-8">
                <a
                  href="/"
                  className="hover:text-[#005BAC] transition-colors font-medium"
                >
                  Home
                </a>
                <span className="text-slate-400">→</span>
                <span className="text-[#005BAC] font-semibold">Contact Us</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm">
                  <SparkIcon /> Response in &lt; 24 hrs
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                  <ShieldIcon /> Verified contact details
                </span>
              </div>

              <div className="relative inline-block">
                <div className="pointer-events-none absolute -inset-8 bg-gradient-to-r from-[#005BAC]/15 via-[#FF5800]/15 to-[#005BAC]/15 blur-3xl" />
                <h1 className="relative text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                  Let's Connect
                </h1>
              </div>

              <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
                Whether you're looking to upskill, start a new career, or
                explore our courses — we're here to help. Reach out via call,
                WhatsApp, email, or send us a quick message.
              </p>

              <div className="mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-[#005BAC] via-[#FF5800] to-[#005BAC]" />

              {/* Desktop quick actions */}
              <div className="hidden md:flex mt-10 flex-wrap items-center gap-3">
                {actions.map((a, idx) => (
                  <a
                    key={a.label}
                    href={a.href}
                    target={a.target}
                    rel={a.target ? "noopener noreferrer" : undefined}
                    className="group relative inline-flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-slate-700 hover:text-[#005BAC] hover:border-[#005BAC]/30 transition-all shadow-md hover:shadow-xl"
                    style={{ animationDelay: `${idx * 100}ms` }}
                    aria-label={a.label}
                  >
                    <span className="relative">
                      <span className="absolute inset-0 bg-gradient-to-br from-[#005BAC]/15 to-[#FF5800]/15 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative">
                        <a.icon />
                      </span>
                    </span>
                    {a.label}
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#005BAC]/5 via-transparent to-[#FF5800]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT illustration */}
            <div className="relative hidden md:block">
              <div className="relative ml-auto w-full md:max-w-md lg:max-w-xl">
                <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200 shadow-2xl bg-white">
                  <img
                    src="/images/contact-us.jpg"
                    alt="Contact illustration"
                    className="h-auto w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white shadow-xl border border-slate-200 px-4 py-2 flex items-center gap-2">
                  <PhoneIcon />
                  <span className="text-sm font-semibold text-slate-700">
                    We're just a call away
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== Main Content ============================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-6">
              <div className="group relative rounded-3xl bg-gradient-to-br from-white via-white to-slate-50/50 border border-slate-200/60 shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BAC]/5 via-transparent to-[#FF5800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full" />
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Reach Us Directly
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600">
                        Quick response guaranteed
                      </p>
                    </div>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="space-y-3">
                    <Row
                      icon={PhoneIcon}
                      label="Phone"
                      value="+91-9600593838"
                      href="tel:+919600593838"
                    />
                    <Row
                      icon={WhatsAppIcon}
                      label="WhatsApp"
                      value="+91-9600383839"
                      href="https://wa.me/9600383839"
                      external
                    />
                    <Row
                      icon={MailIcon}
                      label="Email"
                      value="contact@velinfotech.com"
                      href="mailto:contact@velinfotech.com"
                    />
                    <Row
                      icon={PinIcon}
                      label="Location"
                      value="Open in Google Maps"
                      href="https://www.google.com/maps/search/?api=1&query=Vell%20InfoTech%20Pvt.Ltd&query_place_id=ChIJvdtfnyNnUjoRO_LTE0U-L4M"
                      external
                    />
                  </div>
                </div>
              </div>

              <div className="group relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-xl overflow-hidden">
                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ClockIcon className="text-orange-400" />
                    <h3 className="text-xl font-bold text-white">
                      Office Hours
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    Walk-ins welcome during working hours
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-sm font-medium text-white">
                        Monday – Saturday
                      </span>
                      <span className="text-sm font-semibold text-orange-400">
                        9:30 AM – 6:30 PM
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-sm font-medium text-white">
                        Sunday
                      </span>
                      <span className="text-sm font-semibold text-slate-400">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-200/60 shadow-xl transition-all duration-500">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <StarIcon className="text-[#FF5800]" />
                    <h3 className="text-xl font-bold text-slate-900">
                      Why Choose Us
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-5">
                    Industry-aligned curriculum with real-world experience
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 group/item">
                      <span className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <TickIcon className="text-white w-4 h-4" />
                      </span>
                      <span className="text-sm text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors">
                        Hands-on training by industry practitioners
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        <TickIcon className="text-white w-4 h-4" />
                      </span>
                      <span className="text-sm text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors">
                        Real projects & comprehensive interview prep
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group/item">
                      <span className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                        <TickIcon className="text-white w-4 h-4" />
                      </span>
                      <span className="text-sm text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors">
                        Dedicated placement assistance & career support
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* ================= Form card ================= */}
            <div className="lg:col-span-3 space-y-8">
              <div
                id="contact-form"
                className="group relative rounded-3xl bg-white border border-slate-200/60 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#005BAC]/5 via-transparent to-[#FF5800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#005BAC] to-[#FF5800] flex items-center justify-center shadow-lg">
                      <SendIcon className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Send us a message
                      </h2>
                      <p className="text-sm text-slate-600">
                        We'll get back to you within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  noValidate
                  className="relative p-6 space-y-5"
                  onSubmit={handleSubmit}
                >
                  {/* Mode Toggle */}
                  <div className="flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-white border border-slate-200 shadow-sm p-1">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, mode: "classroom" }))
                        }
                        className={`${toggleBtnCls} ${
                          form.mode === "classroom"
                            ? "text-white bg-gradient-to-r from-[#005BAC] to-[#FF5800] shadow"
                            : "text-slate-700 hover:text-slate-900"
                        }`}
                        aria-pressed={form.mode === "classroom"}
                      >
                        Class Room
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, mode: "online" }))
                        }
                        className={`${toggleBtnCls} ${
                          form.mode === "online"
                            ? "text-white bg-gradient-to-r from-[#005BAC] to-[#FF5800] shadow"
                            : "text-slate-700 hover:text-slate-900"
                        }`}
                        aria-pressed={form.mode === "online"}
                      >
                        Online
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full name" required>
                      <div>
                        <input
                          className={
                            inputCls +
                            (touched.name && errors.name
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "")
                          }
                          placeholder="John Doe"
                          name="name"
                          value={form.name}
                          onChange={(e) => {
                            const cleaned = e.target.value.replace(
                              /[^A-Za-z ]/g,
                              "",
                            );
                            setField("name", cleaned);
                          }}
                          onBlur={onBlur}
                          required
                          aria-invalid={!!(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </Field>

                    <Field label="Email" required>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <MailIcon />
                        </span>
                        <input
                          type="email"
                          className={
                            `${inputCls} pl-11` +
                            (touched.email && errors.email
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "")
                          }
                          placeholder="you@example.com"
                          name="email"
                          value={form.email}
                          onChange={onChange}
                          onBlur={onBlur}
                          required
                          aria-invalid={!!(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </Field>

                    <Field label="Phone" required>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <PhoneIcon />
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="^\d{10}$"
                          title="Enter a valid 10-digit mobile number"
                          className={
                            `${inputCls} pl-11` +
                            (touched.phone && errors.phone
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "")
                          }
                          placeholder="10-digit mobile number"
                          name="phone"
                          value={form.phone}
                          onChange={(e) => {
                            let digits = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);

                            // first digit must be 6-9
                            if (digits.length === 1 && !/^[6-9]$/.test(digits))
                              digits = "";

                            setField("phone", digits);
                          }}
                          onBlur={onBlur}
                          required
                          aria-invalid={!!(touched.phone && errors.phone)}
                        />
                        {touched.phone && errors.phone && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </Field>

                    <Field label="Course Interest">
                      <div>
                        <input
                          className={
                            inputCls +
                            (touched.course && errors.course
                              ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "")
                          }
                          placeholder="Java, Python, Testing..."
                          name="course"
                          value={form.course}
                          onChange={onChange}
                          onBlur={onBlur}
                          aria-invalid={!!(touched.course && errors.course)}
                        />
                        {touched.course && errors.course && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.course}
                          </p>
                        )}
                      </div>
                    </Field>
                  </div>

                  <Field label="Your Message">
                    <div>
                      <textarea
                        className={
                          `${inputCls} min-h-[140px] resize-y` +
                          (touched.message && errors.message
                            ? " border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "")
                        }
                        placeholder="Tell us how we can help you..."
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!(touched.message && errors.message)}
                      />
                      <div className="flex justify-end text-xs text-slate-500 mt-1">
                        {form.message.length}/300
                      </div>
                      {touched.message && errors.message && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </Field>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group/btn relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white font-bold shadow-xl transition-all overflow-hidden
                                 bg-gradient-to-r from-[#005BAC] to-[#FF5800] hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 aria-disabled:opacity-70"
                      aria-label="Submit contact form"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#FF5800] to-[#005BAC] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex items-center gap-2">
                        <SendIcon />
                        {status === "loading"
                          ? "Submitting..."
                          : "Submit Message"}
                      </span>
                    </button>
                  </div>

                  {serverError && (
                    <p className="mt-2 text-sm text-red-600">
                      Submission failed: {String(serverError)}
                    </p>
                  )}
                </form>
              </div>

              {/* FAQ */}
              <div className="rounded-3xl bg-white border border-slate-200/60 shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <QuestionIcon className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Frequently Asked Questions
                      </h3>
                      <p className="text-sm text-slate-600">
                        Quick answers to common queries
                      </p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {faqs.map((f, i) => (
                    <Faq key={i} {...f} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map + CTA */}
          <div className="mt-12 group relative rounded-3xl overflow-hidden border border-slate-200/60 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-900/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent z-10 pointer-events-none" />

            <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[450px]">
              {/* Google Map */}
              <iframe
                title="Vell InfoTech, Ekkattuthangal, Chennai"
                src="https://www.google.com/maps?q=Vell%20InfoTech%2C%20No.4%2F38%2C%202nd%20Main%20Road%2C%20Kalaimagal%20Nagar%2C%20Ekkattuthangal%2C%20Chennai%2C%20Tamil%20Nadu%20600032&output=embed&iwloc=0"
                className="absolute inset-0 z-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Override Google's top-left Directions button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Vell%20InfoTech%20Pvt.Ltd&query_place_id=ChIJvdtfnyNnUjoRO_LTE0U-L4M"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Vell InfoTech location"
                className="
      hidden md:block
      absolute
      top-[18px]
      left-[390px]
      z-30
      h-[58px]
      w-[58px]
      rounded-full
      cursor-pointer
    "
              />
            </div>
          </div>

          <div className="mt-10 group relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-8 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-40" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#005BAC]/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FF5800]/20 to-transparent rounded-full blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-slate-300">
                  Choose your preferred method below — we're here to help!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {actions.map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    target={a.target}
                    rel={a.target ? "noopener noreferrer" : undefined}
                    className="group/action relative inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    aria-label={a.label}
                  >
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#005BAC]/20 to-[#FF5800]/20 opacity-0 group-hover/action:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      <a.icon />
                      {a.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-around px-3 py-3">
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              target={a.target}
              rel={a.target ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-slate-50 active:scale-95 transition-all text-[#005BAC]"
              aria-label={a.label}
            >
              <a.icon />
              <span className="text-[10px] font-semibold">{a.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== Styles/helpers ============================== */
const toggleBtnCls =
  "px-4 py-1.5 text-sm font-semibold rounded-full transition-all";

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] outline-none " +
  "focus:border-[#005BAC] focus:ring-4 focus:ring-[#005BAC]/10 placeholder:text-slate-400 transition-all " +
  "shadow-sm hover:border-slate-400 hover:shadow-md";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <div className="flex items-center gap-1 text-[13px] font-bold tracking-wide text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </div>
      {children}
    </label>
  );
}

function Row({ icon, label, value, href, external }) {
  const IconComp = icon || PhoneIcon;

  const inner = (
    <>
      <span className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl text-white bg-gradient-to-br from-[#005BAC] to-[#FF5800] shadow-lg">
        <IconComp />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
          {label}
        </div>
        <div className="text-slate-900 font-semibold text-sm truncate">
          {value}
        </div>
      </div>
    </>
  );

  const cls =
    "group flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 " +
    "bg-white hover:bg-slate-50 hover:border-[#005BAC]/30 transition-all hover:-translate-y-0.5 active:translate-y-0 " +
    "shadow-sm hover:shadow-lg relative overflow-hidden";

  return href ? (
    <a
      className={cls}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
      <span className="ml-auto flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-400 group-hover:text-[#005BAC] group-hover:border-[#005BAC]/30 transition-all">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </span>
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#005BAC]/5 via-transparent to-[#FF5800]/5" />
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white hover:bg-slate-50/50 transition-colors">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-semibold text-slate-900 pr-4 group-hover:text-[#005BAC] transition-colors">
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 group-hover:border-[#005BAC]/30 group-hover:text-[#005BAC] transition-all ${
            open ? "rotate-180 bg-[#005BAC] text-white border-[#005BAC]" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-600 text-[15px] leading-relaxed animate-fadeIn">
          {a}
        </div>
      )}
    </div>
  );
}

/* ============================== Inline Icons ============================== */
function svgP(p) {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: p?.className || "",
  };
}
function PhoneIcon(props) {
  return (
    <svg {...svgP(props)}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function MailIcon(props) {
  return (
    <svg {...svgP(props)}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PinIcon(props) {
  return (
    <svg {...svgP(props)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SendIcon(props) {
  return (
    <svg {...svgP(props)}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function TickIcon(props) {
  return (
    <svg {...svgP(props)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function WhatsAppIcon(props) {
  return (
    <svg {...svgP(props)} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function SparkIcon(props) {
  return (
    <svg {...svgP(props)}>
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
    </svg>
  );
}
function ShieldIcon(props) {
  return (
    <svg {...svgP(props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function ClockIcon(props) {
  return (
    <svg {...svgP(props)}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function StarIcon(props) {
  return (
    <svg {...svgP(props)}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function QuestionIcon(props) {
  return (
    <svg {...svgP(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
