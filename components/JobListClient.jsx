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

export default function JobListClient({ jobs }) {
  const [modeFilter, setModeFilter] = useState("All");

  const filteredJobs =
    modeFilter === "All"
      ? jobs
      : jobs.filter(
          (job) =>
            job.workMode &&
            job.workMode.toLowerCase() === modeFilter.toLowerCase()
        );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 pt-12 sm:pt-28 pl-4 pb-16 text-slate-100">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-sky-500/25 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_55%)] opacity-90" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-4 px-4 lg:px-0">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl">
              Careers at{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                Vell Infotech
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
              Join our Training &amp; Development team to mentor students on
              real-time projects and help them become job-ready in Java, Python,
              Data Science, AWS, DevOps and Testing.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>We are hiring</span>
            </div>

            <div className="mt-4 hidden items-center gap-2 text-[11px] text-slate-400 sm:flex">
              <span>Scroll to view openings</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-600/70">
                <ChevronRight className="-rotate-90 h-3 w-3 text-slate-300" />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 text-right shadow-lg shadow-slate-950/40">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Total openings
            </p>
            <p className="mt-1 text-3xl font-semibold text-slate-50">
              {jobs.length.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Chennai · Hybrid · Remote
            </p>
          </div>
        </header>

        {/* Content card */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/60 backdrop-blur">
          {/* Sub-header row + filter bar */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Open Roles
              </h2>
              <p className="text-xs text-slate-400">
                Click a job to view full overview and submit your application.
              </p>
            </div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-slate-900/80 px-2 py-1">
              {FILTERS.map((filter) => {
                const isActive = modeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setModeFilter(filter)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                      isActive
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "bg-transparent text-slate-300 hover:bg-slate-800/80"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Empty state */}
          {filteredJobs.length === 0 && (
            <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-6 text-center text-sm text-slate-300">
              No openings available for this mode right now. You can still share
              your profile with us at{" "}
              <span className="font-semibold text-indigo-300">
                vellinfotech10@gmail.com
              </span>
              .
            </div>
          )}

          {/* Job cards */}
          {filteredJobs.length > 0 && (
            <div className="mt-3 space-y-3">
              {filteredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="flex w-full items-start justify-between gap-3 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900/90 to-slate-950/90 px-4 py-3.5 text-left text-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/60 hover:border-indigo-500/40"
                  aria-label={`View job overview for ${job.jobTitle}`}
                >
                  {/* Left content */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20">
                        <Briefcase className="h-4 w-4 text-indigo-300" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-50 sm:text-sm">
                          {job.jobTitle}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          {job.department}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-200">
                      {job.location && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5">
                          <MapPin className="h-3 w-3 text-indigo-300" />
                          {job.location}
                        </span>
                      )}
                      {job.experience && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5">
                          <Clock className="h-3 w-3 text-indigo-300" />
                          {job.experience}
                        </span>
                      )}
                      {job.salaryRange && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5">
                          <IndianRupee className="h-3 w-3 text-indigo-300" />
                          {job.salaryRange}
                        </span>
                      )}
                      {job.workMode && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5">
                          <Clock className="h-3 w-3 text-indigo-300" />
                          {job.workMode}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-1 text-right">
                    {job.updatedAt && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                        Posted:{" "}
                        {isNaN(new Date(job.updatedAt).getTime())
                          ? job.updatedAt
                          : new Date(job.updatedAt).toLocaleDateString("en-GB")}
                      </span>
                    )}
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-indigo-200">
                      View overview
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
