"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Mail, Phone } from "lucide-react";

import { submitConsultingApplication } from "../../lib/consultingApi";

function emptyForm(jobTitle) {
  return {
    candidateType: "Fresher",
    name: "",
    email: "",
    phone: "",
    qualification: "",
    passingYear: "",
    skills: "",
    profileSummary: "",
    totalExperience: "",
    relevantExperience: "",
    noticePeriod: "",
    currentCtc: "",
    applyingForPosition: jobTitle || "",
  };
}

export default function ConsultingApplyForm({ jobId, jobTitle }) {
  const [form, setForm] = useState(() => emptyForm(jobTitle));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isExperienced = form.candidateType === "Experienced";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    // The backend wants numbers, and blank optional fields must go as null rather
    // than "" so validation does not reject them.
    const toNumber = (value) =>
      value === "" || value === null ? null : Number(value);

    const payload = {
      candidateType: form.candidateType,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      qualification: form.qualification.trim(),
      passingYear: toNumber(form.passingYear),
      applyingForPosition: jobTitle,
      skills: form.skills.trim(),
      profileSummary: form.profileSummary.trim() || null,
      totalExperience: isExperienced ? toNumber(form.totalExperience) : null,
      relevantExperience: isExperienced
        ? toNumber(form.relevantExperience)
        : null,
      noticePeriod: isExperienced ? form.noticePeriod.trim() || null : null,
      currentCtc: isExperienced ? toNumber(form.currentCtc) : null,
    };

    try {
      await submitConsultingApplication(jobId, payload);

      setSubmitted(true);
      setForm(emptyForm(jobTitle));
    } catch (err) {
      setError(err.message || "Could not submit your application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="h-fit rounded-2xl border border-emerald-500/30 bg-slate-900/85 p-6 text-center shadow-2xl shadow-slate-950/70">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-6 w-6 text-emerald-300" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-white">
          Application submitted
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Thank you for applying for{" "}
          <span className="font-medium text-indigo-200">{jobTitle}</span>. Our
          team will review your profile and get in touch if it is a match.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 rounded-lg border border-indigo-400/40 px-4 py-2 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/10 hover:text-white"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900/85 p-5 shadow-2xl shadow-slate-950/70 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20">
            <FileText className="h-4 w-4 text-indigo-300" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Apply for this role
            </h3>

            <p className="mt-1 text-[10px] text-slate-400">
              Complete your profile below
            </p>
          </div>
        </div>

        <p className="text-right text-[10px] text-slate-400">
          * Mandatory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="whitespace-pre-line rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-xs leading-5 text-red-200">
            {error}
          </div>
        )}

        {/* Candidate Type */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Candidate Type *
          </label>

          <div className="mt-2 flex gap-6 text-xs text-slate-200">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="candidateType"
                value="Fresher"
                checked={form.candidateType === "Fresher"}
                onChange={handleChange}
              />
              Fresher
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="candidateType"
                value="Experienced"
                checked={isExperienced}
                onChange={handleChange}
              />
              Experienced
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Full Name *
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={80}
            placeholder="Your full name"
            className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-indigo-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Email *
          </label>

          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 focus-within:border-indigo-400">
            <Mail className="h-4 w-4 text-slate-500" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={120}
              placeholder="you@example.com"
              className="h-10 w-full bg-transparent text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Phone *
          </label>

          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 focus-within:border-indigo-400">
            <Phone className="h-4 w-4 text-slate-500" />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Enter a 10 digit mobile number"
              placeholder="10 digit mobile number"
              className="h-10 w-full bg-transparent text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* Qualification */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Highest Qualification *
          </label>

          <input
            type="text"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="B.E CSE, B.Sc IT, MCA etc."
            className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>

        {/* Year */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Passing Year *
          </label>

          <input
            type="number"
            name="passingYear"
            value={form.passingYear}
            onChange={handleChange}
            required
            min={1900}
            max={2100}
            placeholder="2026"
            className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>

        {/* Experienced-only details. The admin console renders exactly these four
            for Experienced candidates, so they have to be collected here. */}
        {isExperienced && (
          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-indigo-300">
              Experience details
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-200">
                  Total Experience (years) *
                </label>

                <input
                  type="number"
                  name="totalExperience"
                  value={form.totalExperience}
                  onChange={handleChange}
                  required
                  min={0}
                  step="0.5"
                  placeholder="3"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-200">
                  Relevant Experience (years) *
                </label>

                <input
                  type="number"
                  name="relevantExperience"
                  value={form.relevantExperience}
                  onChange={handleChange}
                  required
                  min={0}
                  step="0.5"
                  placeholder="2"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-200">
                  Notice Period *
                </label>

                <input
                  type="text"
                  name="noticePeriod"
                  value={form.noticePeriod}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  placeholder="30 Days / Immediate"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-200">
                  Current CTC (LPA) *
                </label>

                <input
                  type="number"
                  name="currentCtc"
                  value={form.currentCtc}
                  onChange={handleChange}
                  required
                  min={0}
                  step="0.1"
                  placeholder="4.2"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Skills *
          </label>

          <textarea
            rows={3}
            name="skills"
            value={form.skills}
            onChange={handleChange}
            required
            placeholder="Recruitment, Communication, Client Handling etc."
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="text-xs font-medium text-slate-200">
            Short Message / Profile Summary
          </label>

          <textarea
            rows={4}
            name="profileSummary"
            value={form.profileSummary}
            onChange={handleChange}
            placeholder="Briefly describe your experience, skills and profile."
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-900/50 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>

      <p className="mt-5 border-t border-slate-800 pt-4 text-[11px] leading-5 text-slate-400">
        You can also send your resume directly to{" "}
        <span className="font-semibold text-indigo-200">
          vellinfotech10@gmail.com
        </span>{" "}
        with the job title in the subject line.
      </p>
    </div>
  );
}
