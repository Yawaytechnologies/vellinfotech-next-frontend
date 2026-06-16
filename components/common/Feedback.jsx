'use client'
// src/components/FeedbackSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "../../redux/actions/feedbackAction";

export default function FeedbackSection({ hideHeader = false }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  const dispatch = useDispatch();
  const { submitting, submitted, error } = useSelector((s) => s.feedback || {});

  // Lock background scroll (on <html>) when modal open
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prevOverflow; };
  }, [open]);

  // ESC to close
  useEffect(() => {
  const onOpen = () => openAndFocus(); // uses your existing helper
  window.addEventListener("vi:open-feedback", onOpen);
  return () => window.removeEventListener("vi:open-feedback", onOpen);
}, []);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    courseTitle: "",
    trainerName: "",
    courseRating: "",
    trainerRating: "",
    wouldRecommend: "yes",
    comments: "",
  });

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const required = (v) => String(v || "").trim().length > 0;
  const is1to5 = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 1 && n <= 5;
  };
  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    if (form.email && !isValidEmail(form.email)) {
      alert("Please enter a valid email address or clear the field.");
      return;
    }
    if (
      !required(form.courseTitle) ||
      !required(form.trainerName) ||
      !required(form.courseRating) ||
      !required(form.trainerRating)
    ) {
      alert("Please fill Course, Trainer, and both Ratings.");
      return;
    }
    if (!is1to5(form.courseRating) || !is1to5(form.trainerRating)) {
      alert("Ratings must be numbers between 1 and 5.");
      return;
    }

    const payload = {
      name: form.name || "",
      email: form.email || "",
      courseTitle: form.courseTitle,
      trainerName: form.trainerName,
      courseRating: Number(form.courseRating),
      trainerRating: Number(form.trainerRating),
      recommend: (form.wouldRecommend || "").toLowerCase() === "yes",
      comments: form.comments || "",
      submittedAt: new Date().toISOString(),
    };

    const action = await dispatch(submitFeedback(payload));
    if (submitFeedback.fulfilled.match(action)) {
      setForm({
        name: "",
        email: "",
        courseTitle: "",
        trainerName: "",
        courseRating: "",
        trainerRating: "",
        wouldRecommend: "yes",
        comments: "",
      });
      setTimeout(() => setOpen(false), 800);
    } else {
      alert(action.payload || "Failed to submit feedback. Please try again.");
    }
  };

  const inputCls =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm " +
    "text-gray-900 placeholder:text-gray-500 caret-gray-900 shadow-sm " +
    "focus:border-[#0073CE] focus:ring-2 focus:ring-[#0073CE]/30";

  const openAndFocus = () => {
    setOpen(true);
    // Ensure we’re at the top and focus the dialog
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => dialogRef.current?.focus(), 150);
    });
  };

  return (
    <section className="w-full">
      {/* Header band (optional) */}
      {!hideHeader && (
        <div className="w-full bg-gradient-to-r from-[#005BAC] via-[#0073CE] to-[#00AEEF]">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-sm">
              We value your feedback
            </h2>
            <p className="mt-2 opacity-90">
              Share quick thoughts about the course and trainer.
            </p>
            <button
              onClick={openAndFocus}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-3 font-semibold text-gray-900 shadow-sm ring-1 ring-white/70 hover:bg-white"
            >
              Give Feedback
            </button>
          </div>
        </div>
      )}

      {/* If you’re using this in a sidebar, show a small trigger too */}
      {hideHeader && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-lg font-bold text-slate-900">Share your feedback</h3>
          <p className="text-slate-600 text-sm mt-1">
            Takes less than 2 minutes.
          </p>
          <button
            onClick={openAndFocus}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#5B3CF3] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Give Feedback
          </button>
        </div>
      )}

      {/* Modal in a PORTAL (so it escapes overflow/transform parents) */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100000] bg-black/60"
            onClick={() => { if (!submitting) setOpen(false); }}
            aria-hidden="true"
          >
            <div
              className="
                flex min-h-dvh items-start justify-center
                p-2 sm:p-4 overflow-y-auto
              "
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-title"
                tabIndex={-1}
                ref={dialogRef}
                onClick={(e) => e.stopPropagation()}
                className="
                  w-[min(92vw,740px)]
                  mt-6 sm:mt-10
                  max-h-[calc(100dvh-3rem)]
                  rounded-3xl bg-white shadow-2xl outline-none text-gray-900
                  flex flex-col overflow-hidden
                "
              >
                {/* Header */}
                <div className="px-5 sm:px-6 pt-5 pb-3 border-b shrink-0 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <h2 id="feedback-title" className="text-2xl font-semibold">
                      Course &amp; Trainer Feedback
                    </h2>
                    <button
                      onClick={() => !submitting && setOpen(false)}
                      className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                      aria-label="Close"
                      title="Close"
                      disabled={submitting}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Body (scrolls inside the modal) */}
                <form
                  onSubmit={handleSubmit}
                  className="px-5 sm:px-6 py-4 space-y-3 overflow-y-auto grow"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Your Name (optional)
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        className={inputCls}
                        placeholder="e.g., Priya K"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        className={inputCls}
                        placeholder="you@example.com"
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.courseTitle}
                        onChange={update("courseTitle")}
                        className={inputCls}
                        placeholder="e.g., React Fundamentals"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Trainer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.trainerName}
                        onChange={update("trainerName")}
                        className={inputCls}
                        placeholder="e.g., Mr. Sharma"
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Course Rating *
                      </label>
                      <select
                        required
                        value={form.courseRating}
                        onChange={update("courseRating")}
                        className={inputCls}
                        disabled={submitting}
                      >
                        <option value="" disabled className="text-gray-500">
                          Select rating
                        </option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n} className="text-gray-900">
                            {n} / 5
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Trainer Rating *
                      </label>
                      <select
                        required
                        value={form.trainerRating}
                        onChange={update("trainerRating")}
                        className={inputCls}
                        disabled={submitting}
                      >
                        <option value="" disabled className="text-gray-500">
                          Select rating
                        </option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n} className="text-gray-900">
                            {n} / 5
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-gray-800">
                      Would you recommend this course?
                    </span>
                    <div className="mt-2 flex gap-6">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                        <input
                          type="radio"
                          name="wouldRecommend"
                          value="yes"
                          checked={form.wouldRecommend === "yes"}
                          onChange={update("wouldRecommend")}
                          className="h-4 w-4 accent-[#0073CE] rounded-full"
                          disabled={submitting}
                        />
                        Yes
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                        <input
                          type="radio"
                          name="wouldRecommend"
                          value="no"
                          checked={form.wouldRecommend === "no"}
                          onChange={update("wouldRecommend")}
                          className="h-4 w-4 accent-[#0073CE] rounded-full"
                          disabled={submitting}
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800">
                      Comments
                    </label>
                    <textarea
                      rows={3}
                      value={form.comments}
                      onChange={update("comments")}
                      className={inputCls}
                      placeholder="What worked well? What can we improve?"
                      disabled={submitting}
                    />
                  </div>
                </form>

                {/* Footer */}
                <div className="px-5 sm:px-6 py-3 border-t bg-white shrink-0 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => !submitting && setOpen(false)}
                    className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center rounded-full bg-[#5B3CF3] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit Feedback"}
                  </button>
                </div>

                {/* Messages */}
                {submitted && (
                  <p className="px-5 sm:px-6 pb-4 text-sm font-medium text-green-700">
                    Thanks! Your feedback was submitted.
                  </p>
                )}
                {error && !submitting && (
                  <p className="px-5 sm:px-6 pb-4 text-sm font-medium text-red-600">
                    {String(error)}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
