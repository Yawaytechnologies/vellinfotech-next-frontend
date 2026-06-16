"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  applyForJob,
  clearApplyStatus,
} from "../redux/actions/jobActions";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  FileText,
  Mail,
  Phone,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function JobDetailClient({ job }) {
  const dispatch = useDispatch();
  const { applying, applyError, applySuccessMessage } = useSelector(
    (state) => state.jobs
  );

  // Candidate form state
  const [candidateType, setCandidateType] = useState("Fresher");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [skills, setSkills] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [relevantExperience, setRelevantExperience] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [coverMessage, setCoverMessage] = useState("");

  useEffect(() => {
    dispatch(clearApplyStatus());
    setCoverMessage("");
  }, [dispatch, job?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job) return;

    const emailOk =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        candidateEmail.trim()
      );

    if (!candidateName.trim()) {
      alert("Name is required.");
      return;
    }
    if (!candidateEmail.trim() || !emailOk) {
      alert("Enter a valid Email ID.");
      return;
    }
    if (!candidatePhone.trim()) {
      alert("Phone number is required.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(candidatePhone.trim())) {
      alert("Enter a valid 10-digit mobile number starting with 6–9.");
      return;
    }
    if (!qualification || !passingYear || !skills) {
      alert("Qualification, Passing Year and Skills are required.");
      return;
    }
    if (candidateType === "Experienced") {
      if (!totalExperience || !relevantExperience || !noticePeriod || !currentCtc) {
        alert(
          "For experienced candidates, Total Experience, Relevant Experience, Notice Period and Current CTC are required."
        );
        return;
      }
    }

    const payload = {
      candidateType,
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone,
      qualification,
      passingYear: Number(passingYear),
      applyingForPosition: job.jobTitle,
      skills,
      totalExperience:
        candidateType === "Fresher" ? 0 : Number(totalExperience || 0),
      relevantExperience:
        candidateType === "Fresher" ? 0 : Number(relevantExperience || 0),
      noticePeriod:
        candidateType === "Fresher" ? "Not Applicable" : noticePeriod,
      currentCtc: candidateType === "Fresher" ? 0 : Number(currentCtc || 0),
    };

    dispatch(applyForJob(job.id, payload));
  };

  const postedLabel = job.updatedAt
    ? isNaN(new Date(job.updatedAt).getTime())
      ? job.updatedAt
      : new Date(job.updatedAt).toLocaleDateString("en-GB")
    : null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 pt-16 sm:pt-20 md:pt-28 pb-16 text-slate-100">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-4 h-64 w-64 rounded-full bg-indigo-600/25 blur-3xl animate-pulse" />
        <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-4rem] left-1/4 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#020617_0,_#020617_50%,_#020617_100%)] opacity-95" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 lg:px-0">
        {/* Header */}
        <header className="mb-8 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
            Job Overview
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl">
            {job.jobTitle}
          </h1>
          <p className="text-sm text-slate-300 sm:text-base">
            Join Vell Infotech as a{" "}
            <span className="font-medium text-indigo-200">{job.department}</span>{" "}
            and mentor learners through real-time projects and job-oriented
            training.
          </p>
          <div className="pt-2">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-[11px] font-medium text-slate-200 shadow-sm transition hover:border-indigo-500 hover:text-indigo-100"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to all openings
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1.1fr]">
          {/* Left: Job Info */}
          <div className="space-y-4">
            {/* Meta card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/60">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20">
                      <Briefcase className="h-4 w-4 text-indigo-300" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-50">
                        {job.jobTitle}
                      </h2>
                      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        {job.department}
                      </p>
                    </div>
                  </div>
                </div>
                {postedLabel && (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-200">
                    Posted: {postedLabel}
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-3 text-xs text-slate-200 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-900 px-3 py-2.5">
                  <p className="text-[11px] text-slate-400">Location</p>
                  <p className="mt-1 text-sm font-medium text-slate-50">
                    {job.location || "Not specified"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900 px-3 py-2.5">
                  <p className="text-[11px] text-slate-400">Experience Range</p>
                  <p className="mt-1 text-sm font-medium text-slate-50">
                    {job.experience || "Not specified"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900 px-3 py-2.5">
                  <p className="text-[11px] text-slate-400">Compensation</p>
                  <p className="mt-1 text-sm font-medium text-slate-50">
                    {job.salaryRange || "As per industry standards"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300">
                {job.location && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1">
                    <MapPin className="h-3 w-3 text-indigo-300" />
                    {job.location}
                  </span>
                )}
                {job.experience && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1">
                    <Clock className="h-3 w-3 text-indigo-300" />
                    {job.experience}
                  </span>
                )}
                {job.salaryRange && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1">
                    <IndianRupee className="h-3 w-3 text-indigo-300" />
                    {job.salaryRange}
                  </span>
                )}
              </div>
            </div>

            {/* Description & responsibilities */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-200 shadow-xl shadow-slate-950/60">
              <div>
                <p className="font-semibold text-slate-50">Role Overview</p>
                <p className="mt-1 text-sm text-slate-200">
                  {job.jobDescription ||
                    "You will be responsible for delivering concept clarity, hands-on labs and real-time project guidance to our students."}
                </p>
              </div>

              {job.responsibilities && (
                <div>
                  <p className="font-semibold text-slate-50">
                    Key Responsibilities
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px]">
                    {job.responsibilities.split(",").map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.skills && (
                <div>
                  <p className="font-semibold text-slate-50">
                    Skills &amp; Requirements
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px]">
                    {job.skills.split(",").map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Apply form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/85 p-5 shadow-2xl shadow-slate-950/70">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                  <FileText className="h-4 w-4 text-indigo-300" />
                </div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Apply for this role
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">
                Fields marked * are mandatory
              </p>
            </div>

            {applySuccessMessage && (
              <div className="mb-3 rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-3 py-2 text-xs text-emerald-100">
                {applySuccessMessage}
              </div>
            )}

            {applyError && (
              <div className="mb-3 rounded-lg border border-red-500/50 bg-red-500/15 px-3 py-2 text-xs text-red-100">
                {applyError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              {/* Candidate Type */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Candidate Type *
                </label>
                <div className="flex gap-4 text-xs text-slate-100">
                  <label className="inline-flex items-center gap-1">
                    <input
                      type="radio"
                      name="candidateType"
                      value="Fresher"
                      checked={candidateType === "Fresher"}
                      onChange={() => setCandidateType("Fresher")}
                    />
                    Fresher
                  </label>
                  <label className="inline-flex items-center gap-1">
                    <input
                      type="radio"
                      name="candidateType"
                      value="Experienced"
                      checked={candidateType === "Experienced"}
                      onChange={() => setCandidateType("Experienced")}
                    />
                    Experienced
                  </label>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                  value={candidateName}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^A-Za-z\s]/g, "");
                    setCandidateName(v);
                  }}
                  onBlur={() =>
                    setCandidateName((p) => p.trim().replace(/\s+/g, " "))
                  }
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Email *
                </label>
                <div className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-2.5">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    className="h-8 w-full border-none bg-transparent text-sm text-slate-50 outline-none"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Phone *
                </label>
                <div className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-2.5">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    className="h-8 w-full border-none bg-transparent text-sm text-slate-50 outline-none"
                    value={candidatePhone}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 10);
                      if (v.length === 1 && !/^[6-9]$/.test(v)) v = "";
                      setCandidatePhone(v);
                    }}
                  />
                </div>
              </div>

              {/* Qualification */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Highest Qualification *
                </label>
                <input
                  type="text"
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="B.E CSE, B.Sc IT, MCA, etc."
                />
              </div>

              {/* Passing Year */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Passing Year *
                </label>
                <input
                  type="number"
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  placeholder="2024"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Skills *
                </label>
                <textarea
                  rows={2}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-2 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                  placeholder="React, Node.js, Java, SQL etc."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              {/* Experienced-only fields */}
              {candidateType === "Experienced" && (
                <>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-slate-200">
                        Total Experience (years) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                        value={totalExperience}
                        onChange={(e) => setTotalExperience(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-slate-200">
                        Relevant Experience (years) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                        value={relevantExperience}
                        onChange={(e) => setRelevantExperience(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-slate-200">
                        Notice Period *
                      </label>
                      <input
                        type="text"
                        className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        placeholder="Immediate / 15 / 30 / 60 days"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-slate-200">
                        Current CTC (LPA) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                        value={currentCtc}
                        onChange={(e) => setCurrentCtc(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Short message (frontend only) */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Short Message / Profile Summary
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-2 text-sm text-slate-50 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Briefly describe your training experience, current role and notice period."
                  value={coverMessage}
                  onChange={(e) => setCoverMessage(e.target.value)}
                />
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={applying}
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-900/60 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {applying && <Loader2 className="h-4 w-4 animate-spin" />}
                  Submit Application
                </button>
              </div>
            </form>

            <p className="mt-3 text-[11px] text-slate-400">
              You can also send your resume directly to{" "}
              <span className="font-semibold text-indigo-200">
                vellinfotech10@gmail.com
              </span>{" "}
              with the job title in the subject line.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
