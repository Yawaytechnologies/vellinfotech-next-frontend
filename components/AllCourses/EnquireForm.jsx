'use client';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitEnquiry } from "../../redux/actions/enquiryAction";
import { FaLaptop, FaChalkboardTeacher } from "react-icons/fa";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiPhone, FiClock, FiStar, FiShield, FiCheckCircle } from "react-icons/fi";

export default function CallAndFormSection() {
  const [mode, setMode] = useState("classroom");
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    course: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const PHONE_PILL = "+919600593838";
  const PHONE_CALL_NOW = "+917667663035";
  const EMAIL_TO = "contact.velinfo@gmail.com";

  const phoneHref = `tel:${PHONE_PILL}`;
  const callNowHref = `tel:${PHONE_CALL_NOW}`;

  const mailtoHref =
    `mailto:${EMAIL_TO}` +
    `?subject=${encodeURIComponent(`Course Enquiry — ${form.course || "Vel InfoTech"}`)}` +
    `&body=${encodeURIComponent(
      `Hi Team,

I'm interested in ${form.course || "a course"} (${mode} mode).
Please call me at ${form.phone || "your number"}.
Batch preference: ${form.batch || "-"}

Message:
${form.message || "-"}

Thanks,
${form.name || ""}`
    )}`;

  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const lettersSpaces = (s) => s.replace(/[^A-Za-z ]+/g, "").replace(/\s{2,}/g, " ");

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

  const validateField = (field, value) => {
    const val = (value ?? "").trim();
    switch (field) {
      case "name":
        if (!val) return "Name is required.";
        if (!/^[A-Za-z ]+$/.test(val)) return "Only letters and spaces are allowed.";
        if (val.length < 2) return "Enter at least 2 characters.";
        return null;
      case "email": {
        if (!val) return "Email is required.";
        const formatOK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
        if (!formatOK) return "Email must be valid (letters/numbers and allowed symbols before @).";
        return null;
      }
      case "phone":
        if (!val) return "Mobile number is required.";
        if (!/^\d{10}$/.test(val)) return "Enter a valid 10-digit mobile number.";
        return null;
      case "batch":
        if (!val) return "Please select a batch.";
        return null;
      case "course":
        if (!val) return "Course name is required.";
        if (!/^[A-Za-z ]+$/.test(val)) return "Only letters and spaces are allowed.";
        if (val.length < 2) return "Enter at least 2 characters.";
        return null;
      case "message":
        if (val.length > 300) return "Message must be 300 characters or less.";
        return null;
      default:
        return null;
    }
  };

  const validateAll = () => {
    const fields = ["name", "email", "phone", "batch", "course", "message"];
    const next = {};
    fields.forEach((f) => {
      const err = validateField(f, form[f]);
      if (err) next[f] = err;
    });
    setErrors(next);
    return next;
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    if (name === "name") setField("name", capFirst(value));
    if (name === "course") setField("course", capFirst(value));
    if (name === "message") setField("message", capFirst(value));
  };

  const handleName = (e) => setField("name", capFirst(lettersSpaces(e.target.value)));
  const handleEmail = (e) => setField("email", e.target.value);
  const handlePhone = (e) => setField("phone", e.target.value.replace(/\D+/g, "").slice(0, 10));
  const handleCourse = (e) => setField("course", capFirst(lettersSpaces(e.target.value)));
  const handleMessage = (e) => {
    const v = e.target.value;
    setField("message", v.length ? v[0].toUpperCase() + v.slice(1) : v);
  };

  const tBase = {
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

  const notifySuccess = (msg) =>
    toast(msg, { ...tBase, style: { ...tBase.style, background: "#34d399", color: "#fff" } });

  const notifyError = (msg) =>
    toast(msg, { ...tBase, style: { ...tBase.style, background: "#ef4444", color: "#fff" } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, batch: true, course: true, message: true });

    const errs = validateAll();
    if (Object.keys(errs).length) {
      const firstErr = errs.name || errs.email || errs.phone || errs.batch || errs.course || errs.message;
      notifyError(firstErr || "Please fix the highlighted fields.");
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(
        submitEnquiry({
          mode: mode === "classroom" ? "CLASS_ROOM" : "ONLINE",
          name: form.name,
          email: form.email,
          mobile: form.phone,
          course: form.course,
          message: form.message,
        })
      ).unwrap();
      notifySuccess("Thanks! Your enquiry has been recorded.");
      setForm({ name: "", email: "", phone: "", batch: "", course: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (err) {
      notifyError(
        typeof err === "string"
          ? err
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const control =
    "h-9 rounded-xl bg-background px-3 border text-[12px] font-medium focus:ring-2 focus:ring-[#003c6a] outline-none shadow w-full";
  const ok = "border-[#003c6a]/60";
  const err = "border-red-500 focus:ring-red-500";
  const helper = (hasErr) => `h-3 text-[10px] mt-1 ${hasErr ? "text-red-600" : "text-transparent"}`;

  return (
    <>
      <ToastContainer newestOnTop position="top-center" autoClose={2200} closeOnClick={false} pauseOnHover={true} />

      <section id="advisors-contact" aria-labelledby="advisors-contact__heading" className="w-full py-12 px-4 bg-white">
        <h2 id="advisors-contact__heading" className="sr-only">Talk to a Course Advisor & Get a Free Training Quote</h2>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: Call / Advisor CTA */}
          <div className="relative w-full flex-1 overflow-hidden rounded-3xl p-8 md:p-10 text-white
                bg-gradient-to-br from-[#005BAC] via-[#0a6cc4] to-[#003c6a] shadow-xl">
            <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            {/* header -> H2 visual (but global section H2 is sr-only above) */}
            <div className="relative z-10 flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm flex items-center justify-center shadow">
                <FiPhone className="text-2xl" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  Talk to a <span className="text-cyan-200">Course Advisor</span>
                </h3>
                <p className="mt-2 text-white/90 max-w-xl">
                  Get the right course recommendation and fee details in minutes. We’ll call you back within <span className="font-semibold underline decoration-white/70">24 working hours</span>.
                </p>
              </div>
            </div>

            {/* trust chips */}
            <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/15 ring-1 ring-white/20 px-3 py-2 backdrop-blur">
                <FiStar className="text-lg" /><span className="text-sm font-semibold">4.8/5 Support</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/15 ring-1 ring-white/20 px-3 py-2 backdrop-blur">
                <FiClock className="text-lg" /><span className="text-sm font-semibold">Quick Callback</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/15 ring-1 ring-white/20 px-3 py-2 backdrop-blur">
                <FiShield className="text-lg" /><span className="text-sm font-semibold">Data Safe</span>
              </div>
            </div>

            {/* contact pills */}
            <div className="relative z-10 mt-6 grid sm:grid-cols-2 gap-3">
              <a
                href={mailtoHref}
                className="flex items-center gap-3 rounded-2xl bg-white/20 hover:bg-white/25 transition
                           ring-1 ring-white/30 px-4 py-3 backdrop-blur-lg shadow"
                aria-label="Email Vel InfoTech"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/25">📧</span>
                <span className="text-sm font-semibold">{EMAIL_TO}</span>
              </a>

              <a
                href={phoneHref}
                className="flex items-center gap-3 rounded-2xl bg-white/20 hover:bg-white/25 transition
                           ring-1 ring-white/30 px-4 py-3 backdrop-blur-lg shadow"
                aria-label="Call Vel InfoTech"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/25">📞</span>
                <span className="text-sm font-semibold">{PHONE_PILL.replace("+91", "+91 ")}</span>
              </a>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap gap-3">
              <a
                href={callNowHref}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold
                           bg-emerald-500 hover:bg-emerald-600 shadow-lg ring-1 ring-emerald-400/40 transition"
              >
                <FiPhone className="text-lg" /> Call Us Now
              </a>
              <button
                type="button"
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold
                           bg-white/15 hover:bg-white/25 ring-1 ring-white/30 backdrop-blur transition"
              >
                <FiCheckCircle className="text-lg" /> Request a Callback
              </button>
            </div>

            <p className="relative z-10 mt-4 text-xs text-white/75">
              Working hours: Mon–Sat, 9:30 AM – 7:00 PM IST
            </p>
          </div>

          {/* RIGHT: Enquiry Form */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
            <div className="relative backdrop-blur-[6px] bg-white/70 border border-white/60 shadow-2xl rounded-3xl p-8 transition-all hover:scale-[1.015] hover:shadow-2xl duration-300">
              {/* H3 for card heading */}
              <h3 className="text-2xl font-bold mb-5 text-center bg-gradient-to-r from-[#005BAC] to-[#003c6a] bg-clip-text text-transparent tracking-tight">
                Get a Free Training Quote
              </h3>

              <form className="flex flex-col gap-3" noValidate onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleName}
                    onBlur={onBlur}
                    aria-invalid={!!errors.name}
                    aria-describedby="err-name"
                    className={`${control} ${touched.name && errors.name ? err : ok}`}
                  />
                  <div id="err-name" className={helper(touched.name && errors.name)}>
                    {touched.name && errors.name ? errors.name : "placeholder"}
                  </div>
                </div>
                {/* Email */}
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleEmail}
                    onBlur={onBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby="err-email"
                    className={`${control} ${touched.email && errors.email ? err : ok}`}
                    autoComplete="email"
                  />
                  <div id="err-email" className={helper(touched.email && errors.email)}>
                    {touched.email && errors.email ? errors.email : "placeholder"}
                  </div>
                </div>
                {/* Phone + Batch */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 items-start">
                  <div>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Mobile Number"
                      value={form.phone}
                      onChange={handlePhone}
                      onBlur={onBlur}
                      aria-invalid={!!errors.phone}
                      aria-describedby="err-phone"
                      className={`${control} ${touched.phone && errors.phone ? err : ok}`}
                    />
                    <div id="err-phone" className={helper(touched.phone && errors.phone)}>
                      {touched.phone && errors.phone ? errors.phone : "placeholder"}
                    </div>
                  </div>
                  <div>
                    <select
                      name="batch"
                      value={form.batch}
                      onChange={(e) => setField("batch", e.target.value)}
                      onBlur={onBlur}
                      aria-invalid={!!errors.batch}
                      aria-describedby="err-batch"
                      className={`${control} cursor-pointer pr-7 ${touched.batch && errors.batch ? err : ok}`}
                    >
                      <option value="" disabled>How & Where</option>
                      <option>Morning Batch</option>
                      <option>Evening Batch</option>
                      <option>Weekend</option>
                    </select>
                    <div id="err-batch" className={helper(touched.batch && errors.batch)}>
                      {touched.batch && errors.batch ? errors.batch : "placeholder"}
                    </div>
                  </div>
                </div>
                {/* Course */}
                <div>
                  <input
                    name="course"
                    type="text"
                    placeholder="Type Course"
                    value={form.course}
                    onChange={handleCourse}
                    onBlur={onBlur}
                    aria-invalid={!!errors.course}
                    aria-describedby="err-course"
                    className={`${control} ${touched.course && errors.course ? err : ok}`}
                  />
                  <div id="err-course" className={helper(touched.course && errors.course)}>
                    {touched.course && errors.course ? errors.course : "placeholder"}
                  </div>
                </div>
                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                    value={form.message}
                    onChange={handleMessage}
                    onBlur={onBlur}
                    aria-invalid={!!errors.message}
                    aria-describedby="err-message"
                    className={`rounded-xl bg-background px-3 py-2 min-h-[72px] border text-[13px] font-medium focus:ring-2 focus:ring-[#003c6a] outline-none shadow w-full ${
                      touched.message && errors.message ? err : ok
                    }`}
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>Optional</span>
                    <span>{form.message.length}/300</span>
                  </div>
                  <div id="err-message" className={helper(touched.message && errors.message)}>
                    {touched.message && errors.message ? errors.message : "placeholder"}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-[#005BAC] to-[#003c6a] disabled:opacity-70 disabled:cursor-not-allowed text-white font-extrabold py-2.5 rounded-xl hover:from-[#0891b2] hover:to-[#16bca7] transition shadow-lg mt-1"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <input type="hidden" name="mode" value={mode} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
