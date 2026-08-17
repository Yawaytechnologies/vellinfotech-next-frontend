import Link from "next/link";

import {
  ArrowLeft,
  Briefcase,
  Clock,
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const demoJobs = {
  1: {
    id: 1,
    jobTitle: "HR Recruitment Consultant",
    department: "Consulting",
    location: "Chennai",
    experience: "1-3 Years",
    salaryRange: "3-5 LPA",
    workMode: "On-site",
    posted: "17/08/2026",

    description:
      "Join Vell Infotech's consulting team and work closely with clients, candidates and internal teams to deliver professional recruitment and staffing solutions.",

    responsibilities: [
      "Handle end-to-end recruitment activities",
      "Understand client hiring requirements",
      "Source and screen suitable candidates",
      "Schedule and coordinate interviews",
      "Maintain candidate communication",
      "Coordinate with clients and internal teams",
    ],

    skills: [
      "Recruitment",
      "Communication",
      "Candidate Screening",
      "Client Coordination",
      "Interview Coordination",
      "MS Office",
    ],
  },

  2: {
    id: 2,
    jobTitle: "Business Development Executive",
    department: "Consulting",
    location: "Chennai",
    experience: "1-4 Years",
    salaryRange: "3-6 LPA",
    workMode: "Hybrid",
    posted: "17/08/2026",

    description:
      "Work with Vell Infotech's consulting team to identify new business opportunities, understand client requirements and develop long-term professional relationships.",

    responsibilities: [
      "Identify new business opportunities",
      "Connect with prospective clients",
      "Understand customer requirements",
      "Coordinate client meetings",
      "Support proposals and presentations",
      "Maintain long-term client relationships",
    ],

    skills: [
      "Business Development",
      "Communication",
      "Client Handling",
      "Sales",
      "Negotiation",
      "Presentation Skills",
    ],
  },
};

export default async function ConsultingJobDetailPage({ params }) {
  const { jobId } = await params;

  const job = demoJobs[jobId];

  if (!job) {
    return (
      <section className="min-h-screen bg-slate-950 px-4 pb-16 pt-[170px] text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-semibold">Job Not Found</h1>

          <Link
            href="/consult/careers"
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to Careers
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 pb-16 pt-[90px] text-slate-100 md:pt-[170px]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-4 h-64 w-64 rounded-full bg-indigo-600/25 blur-3xl" />

        <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />

        <div className="absolute bottom-[-4rem] left-1/4 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#020617_0,_#020617_50%,_#020617_100%)] opacity-95" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
            Consulting Job Overview
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {job.jobTitle}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Join Vell Infotech's consulting team and build your professional
            career through client-focused consulting and business solutions.
          </p>

          <Link
            href="/consult/careers"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-indigo-500 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />

            Back to all openings
          </Link>
        </header>

        {/* Two Columns */}
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Job Meta Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/60 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20">
                    <Briefcase className="h-5 w-5 text-indigo-300" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {job.jobTitle}
                    </h2>

                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      {job.department}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-emerald-500/15 px-3 py-1.5 text-[11px] font-medium text-emerald-200">
                  Posted: {job.posted}
                </span>
              </div>

              {/* Information */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-950/70 px-4 py-3">
                  <p className="text-[11px] text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {job.location}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/70 px-4 py-3">
                  <p className="text-[11px] text-slate-400">
                    Experience Range
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {job.experience}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/70 px-4 py-3">
                  <p className="text-[11px] text-slate-400">
                    Compensation
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {job.salaryRange}
                  </p>
                </div>
              </div>

              {/* Pills */}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1.5">
                  <MapPin className="h-3.5 w-3.5 text-indigo-300" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-300" />
                  {job.experience}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1.5">
                  <IndianRupee className="h-3.5 w-3.5 text-indigo-300" />
                  {job.salaryRange}
                </span>

                <span className="rounded-full bg-slate-950 px-3 py-1.5">
                  {job.workMode}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-200 shadow-xl shadow-slate-950/60 sm:p-6">
              <div>
                <h3 className="font-semibold text-white">
                  Role Overview
                </h3>

                <p className="mt-2 leading-6 text-slate-300">
                  {job.description}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-white">
                  Key Responsibilities
                </h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-5 text-slate-300">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-white">
                  Skills &amp; Requirements
                </h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-5 text-slate-300">
                  {job.skills.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
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

            {/* Design-only form */}
            <div className="space-y-4">
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
                      defaultChecked
                    />
                    Fresher
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="candidateType"
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
                  placeholder="2026"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="text-xs font-medium text-slate-200">
                  Skills *
                </label>

                <textarea
                  rows={3}
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
                  placeholder="Briefly describe your experience, skills and profile."
                  className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-900/50 transition hover:bg-indigo-700"
                >
                  Submit Application
                </button>
              </div>
            </div>

            <p className="mt-5 border-t border-slate-800 pt-4 text-[11px] leading-5 text-slate-400">
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