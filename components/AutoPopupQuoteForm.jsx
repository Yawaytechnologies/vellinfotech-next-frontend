'use client';
// AutoPopupQuoteForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaLaptop, FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AutoPopupQuoteForm({
  /* ---- control (optional) ---- */
  isOpen, // boolean (optional). If provided, component becomes controlled.
  onOpenChange, // function(bool) (optional). Used with isOpen.

  /* ---- optional behavior ---- */
  autoOpenDelay = 5000, // ms before auto-show (uncontrolled mode)

  /* ---- form + state props from parent ---- */
  status,
  error,
  mode,
  setMode,
  form,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) {
  /* ============== Controlled vs Uncontrolled ============== */
  const isControlled =
    typeof isOpen === "boolean" && typeof onOpenChange === "function";

  // Uncontrolled (fallback) state
  const [internalOpen, internalSetOpen] = useState(false);

  // In uncontrolled mode, auto-open after delay
  useEffect(() => {
    if (isControlled) return;
    const t = setTimeout(() => internalSetOpen(true), autoOpenDelay);
    return () => clearTimeout(t);
  }, [isControlled, autoOpenDelay]);

  // Helpers to read/write "open" in either mode
  const open = isControlled ? isOpen : internalOpen;
  const setOpen = (next) => {
    if (isControlled) onOpenChange(next);
    else internalSetOpen(next);
  };

  /* ============== Focus first field when opened ============== */
  const firstFieldRef = useRef(null);
  useEffect(() => {
    if (open) firstFieldRef.current?.focus();
  }, [open]);

  /* ============== Close on ESC ============== */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* ============== Lock scroll when open ============== */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ============== Auto-close when submit succeeds ============== */
  useEffect(() => {
    if (!open) return;

    if (status === "succeeded" || status === "success") {
      toast.dismiss();
      toast.success(
        "Submitted successfully!\nThanks! We will contact you soon.",
      );

      setOpen(false);
      return;
    }

    if (status === "failed" || status === "error") {
      toast.error(error ? String(error) : "Submission failed. Try again.");
    }
  }, [status, open, error]);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-start px-2
mt-14 sm:mt-6 md:mt-26 lg:mt-35  
pt-4 sm:pt-7 lg:pt-2 pb-1
lg:items-center lg:justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="quote-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close quote form"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
      />

      {/* Modal card */}
      <div
        className="relative w-[min(92vw,480px)]  lg:w-[480px] h-auto max-h-[90vh] overflow-y-auto mx-auto my-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="animate-in fade-in zoom-in-65 duration-200">
          <div className="w-full max-w-xl mx-auto">
            <div className="relative bg-white p-2 sm:p-4 lg:p-6 rounded-xl shadow-xl border border-slate-200 flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Close button (top-right) */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 hover:shadow-lg transition flex items-center justify-center z-[2]"
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>

              <h3
                id="quote-title"
                className="text-base sm:text-lg font-bold text-center text-[#003c6a] mb-0"
              >
                Get a Free Training Quote
              </h3>

              {/* Toggle Buttons */}
              <div className="flex justify-center gap-2 mt-1 mb-2">
                <button
                  type="button"
                  onClick={() => setMode("class_room")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                    mode === "class_room"
                      ? "bg-[#003c6a] text-white"
                      : "bg-white text-[#003c6a] border border-[#003c6a]"
                  }`}
                >
                  <FaChalkboardTeacher className="text-base" /> Class Room
                </button>
                <button
                  type="button"
                  onClick={() => setMode("online")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                    mode === "online"
                      ? "bg-[#003c6a] text-white"
                      : "bg-white text-[#003c6a] border border-[#003c6a]"
                  }`}
                >
                  <FaLaptop className="text-base" /> Online
                </button>
              </div>

              {/* Form */}
              <form
                id="enquiry-form"
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 gap-0.5 sm:gap-1"
              >
                {/* Name */}
                <div>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^A-Za-z ]/g, "");
                      // call parent handler with cleaned value
                      handleChange({
                        target: { name: "name", value: cleaned },
                      });
                    }}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.name}
                    className={[
                      "w-full rounded-xl px-2 py-2 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.name && errors?.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="min-h-[3px]">
                    {touched?.name && errors?.name && (
                      <p className="text-red-600 text-xs">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => {
                      const v = e.target.value;
                      handleChange({ target: { name: "email", value: v } });

                      // force error show while typing (only if parent uses touched)
                      if (typeof handleBlur === "function") {
                        // fake blur trigger not good
                      }
                    }}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.email}
                    className={[
                      "w-full rounded-xl px-2 py-2 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.email && errors?.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="min-h-[3px]">
                    {touched?.email && errors?.email && (
                      <p className="text-red-600 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={(e) => {
                      let digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      // force first digit 6-9
                      if (digits.length === 1 && !/^[6-9]$/.test(digits))
                        digits = "";

                      handleChange({
                        target: { name: "phone", value: digits },
                      });
                    }}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.phone}
                    className={[
                      "w-full rounded-xl px-2 py-2 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.phone && errors?.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="min-h-[3px]">
                    {touched?.phone && errors?.phone && (
                      <p className="text-red-600 text-xs">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Course */}
                <div>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.course}
                    className={[
                      "w-full rounded-xl px-2 py-2 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900",
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
                  <div className="min-h-[3px]">
                    {touched?.course && errors?.course && (
                      <p className="text-red-600 text-xs">{errors.course}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={1}
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.message}
                    maxLength={300}
                    className={[
                      "w-full rounded-xl px-2 py-2 bg-[#edf2f7] border text-sm resize-none focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.message && errors?.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                    <span>{form.message.length}/300</span>
                  </div>
                  <div className="min-h-[3px]">
                    {touched?.message && errors?.message && (
                      <p className="text-red-600 text-xs">{errors?.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full mt-1 py-2 rounded-xl bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-semibold text-sm hover:from-[#0891b2] hover:to-[#16bca7] transition ${
                    status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {status === "loading" ? "Submitting..." : "Submit"}
                </button>

                {/* Server error */}
                {error && (
                  <p className="text-red-600 text-xs mt-1">
                    Submission failed: {String(error)}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
