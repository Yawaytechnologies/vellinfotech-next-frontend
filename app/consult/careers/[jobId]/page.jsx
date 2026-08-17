import Link from "next/link";

import {
  ArrowLeft,
  Briefcase,
  Clock,
  IndianRupee,
  MapPin,
} from "lucide-react";

import { fetchConsultingJobPostById } from "../../../../lib/api";
import { formatPostedDate, splitCommaList } from "../../../../lib/consultingApi";
import ConsultingApplyForm from "../../../../components/consulting/ConsultingApplyForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { jobId } = await params;
  const job = await fetchConsultingJobPostById(jobId);

  if (!job) {
    return { title: "Job Not Found | Vell InfoTech" };
  }

  return {
    title: `${job.jobTitle} | Consulting Careers at Vell InfoTech`,
    description:
      job.jobDescription ||
      `Apply for the ${job.jobTitle} consulting role at Vell InfoTech.`,
    alternates: {
      canonical: `https://www.vellinfotech.com/consult/careers/${job.id}`,
    },
  };
}

export default async function ConsultingJobDetailPage({ params }) {
  const { jobId } = await params;

  const job = await fetchConsultingJobPostById(jobId);

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

  const responsibilities = splitCommaList(job.responsibilities);
  const skills = splitCommaList(job.skills);
  const posted = formatPostedDate(job.createdAt);

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
            Join Vell Infotech&apos;s consulting team and build your professional
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
                  Posted: {posted}
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

                <p className="mt-2 whitespace-pre-wrap leading-6 text-slate-300">
                  {job.jobDescription}
                </p>
              </div>

              {responsibilities.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-white">
                    Key Responsibilities
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-5 text-slate-300">
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {skills.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-white">
                    Skills &amp; Requirements
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-5 text-slate-300">
                    {skills.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.qualification && (
                <div className="mt-6">
                  <h3 className="font-semibold text-white">
                    Qualification
                  </h3>

                  <p className="mt-2 leading-6 text-slate-300">
                    {job.qualification}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <ConsultingApplyForm jobId={job.id} jobTitle={job.jobTitle} />
        </div>
      </div>
    </section>
  );
}
