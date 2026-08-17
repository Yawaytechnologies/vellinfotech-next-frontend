"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

const FILTERS = ["All", "On-site", "Hybrid", "Remote"];

const demoJobs = [
  {
    id: 1,
    jobTitle: "HR Recruitment Consultant",
    department: "Consulting",
    location: "Chennai",
    experience: "1-3 Years",
    salaryRange: "3-5 LPA",
    workMode: "On-site",
    posted: "17/08/2026",
  },
  {
    id: 2,
    jobTitle: "Business Development Executive",
    department: "Consulting",
    location: "Chennai",
    experience: "1-4 Years",
    salaryRange: "3-6 LPA",
    workMode: "Hybrid",
    posted: "17/08/2026",
  },
];

export default function ConsultingCareersPage() {
  const [modeFilter, setModeFilter] = useState("All");

  const filteredJobs =
    modeFilter === "All"
      ? demoJobs
      : demoJobs.filter(
          (job) =>
            job.workMode.toLowerCase() === modeFilter.toLowerCase()
        );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 pb-16 pt-[80px] text-slate-100 md:pt-[170px]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />

        <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_55%)] opacity-90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Consulting Careers at{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                Vell Infotech
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Build your career with our consulting team and work across
              recruitment, staffing, business consulting and client solutions.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span>We are hiring</span>
            </div>

            <div className="mt-5 hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <span>Scroll to view openings</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-700">
                <ChevronRight className="-rotate-90 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Total Openings */}
          <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/60 px-6 py-5 text-left shadow-lg shadow-slate-950/40 md:w-auto md:min-w-[230px] md:text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Total Openings
            </p>

            <p className="mt-2 text-4xl font-semibold text-white">
              {demoJobs.length.toString().padStart(2, "0")}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Chennai · Hybrid · On-site
            </p>
          </div>
        </header>

        {/* Main Card */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-slate-950/60 backdrop-blur sm:p-6">
          {/* Top */}
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Open Consulting Roles
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Explore our current consulting opportunities and apply for a
                suitable role.
              </p>
            </div>

            {/* Filters */}
            <div className="flex w-fit flex-wrap items-center gap-1 rounded-full bg-slate-950/60 p-1">
              {FILTERS.map((filter) => {
                const active = modeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setModeFilter(filter)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                      active
                        ? "bg-indigo-500 text-white shadow"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* No Jobs */}
          {filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-10 text-center text-sm text-slate-300">
              No consulting openings are currently available for this work mode.
            </div>
          )}

          {/* Job Cards */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-slate-950/60 sm:p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">
                        <Briefcase className="h-5 w-5 text-indigo-300" />
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-white sm:text-lg">
                          {job.jobTitle}
                        </h3>

                        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          {job.department}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-200">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5">
                        <MapPin className="h-3.5 w-3.5 text-indigo-300" />
                        {job.location}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5">
                        <Clock className="h-3.5 w-3.5 text-indigo-300" />
                        {job.experience}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5">
                        <IndianRupee className="h-3.5 w-3.5 text-indigo-300" />
                        {job.salaryRange}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5">
                        <Clock className="h-3.5 w-3.5 text-indigo-300" />
                        {job.workMode}
                      </span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                      Posted: {job.posted}
                    </span>

                    <Link
                      href={`/consult/careers/${job.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/30 px-3 py-2 text-xs font-medium text-indigo-200 transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
                    >
                      View overview

                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}