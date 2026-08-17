"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

const INITIAL_JOBS = [
  {
    id: 1,
    jobTitle: "HR Recruitment Consultant",
    department: "Consulting",
    experience: "1-3 Years",
    location: "Chennai",
    workMode: "On-site",
    salaryRange: "3-5 LPA",
    qualification: "Any Degree / MBA",
    jobDescription:
      "Handle recruitment requirements, candidate sourcing, screening, interview coordination and client communication.",
    responsibilities:
      "Candidate sourcing, Resume screening, Interview coordination, Client coordination, Follow-up with candidates",
    skills:
      "Recruitment, Communication, Candidate Screening, Client Handling, MS Office",
    applications: 4,
  },
  {
    id: 2,
    jobTitle: "Business Development Executive",
    department: "Consulting",
    experience: "1-4 Years",
    location: "Chennai",
    workMode: "Hybrid",
    salaryRange: "3-6 LPA",
    qualification: "Any Degree / MBA",
    jobDescription:
      "Identify new business opportunities, understand client requirements and build long-term client relationships.",
    responsibilities:
      "Lead generation, Client meetings, Business development, Proposal coordination, Client relationship management",
    skills:
      "Business Development, Sales, Communication, Negotiation, Client Handling",
    applications: 2,
  },
];

const EMPTY_FORM = {
  jobTitle: "",
  department: "Consulting",
  experience: "",
  location: "",
  workMode: "On-site",
  salaryRange: "",
  qualification: "",
  jobDescription: "",
  responsibilities: "",
  skills: "",
};

export default function ConsultingJobPostsPage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const [modalType, setModalType] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setSelectedJob(null);
    setForm(EMPTY_FORM);
    setModalType("add");
  };

  const openEditModal = (job) => {
    setSelectedJob(job);

    setForm({
      jobTitle: job.jobTitle || "",
      department: job.department || "",
      experience: job.experience || "",
      location: job.location || "",
      workMode: job.workMode || "On-site",
      salaryRange: job.salaryRange || "",
      qualification: job.qualification || "",
      jobDescription: job.jobDescription || "",
      responsibilities: job.responsibilities || "",
      skills: job.skills || "",
    });

    setModalType("edit");
  };

  const openViewModal = (job) => {
    setSelectedJob(job);
    setModalType("view");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJob(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "add") {
      const newJob = {
        id: Date.now(),
        ...form,
        applications: 0,
      };

      setJobs((prev) => [...prev, newJob]);
    }

    if (modalType === "edit" && selectedJob) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === selectedJob.id
            ? {
                ...job,
                ...form,
              }
            : job
        )
      );
    }

    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteJob) return;

    setJobs((prev) =>
      prev.filter((job) => job.id !== deleteJob.id)
    );

    setDeleteJob(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f6fb] px-6 py-8 md:px-10">
      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5B55FF]">
            Consulting Job Posts
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage consulting career opportunities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />

            Refresh
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-lg bg-[#625BFF] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#5048f4]"
          >
            <Plus className="h-5 w-5" />

            Add Consulting Job
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#f7f7fa]">
              <tr className="text-left text-sm font-semibold text-slate-700">
                <th className="px-5 py-4">
                  SI
                </th>

                <th className="px-5 py-4">
                  Title / Department
                </th>

                <th className="px-5 py-4">
                  Work Mode
                </th>

                <th className="px-5 py-4">
                  Location
                </th>

                <th className="px-5 py-4">
                  Experience
                </th>

                <th className="px-5 py-4">
                  Apps
                </th>

                <th className="px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job.id}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >
                  {/* SI */}
                  <td className="px-5 py-5 text-sm font-medium text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  {/* TITLE */}
                  <td className="px-5 py-5">
                    <p className="font-semibold text-slate-900">
                      {job.jobTitle}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {job.department}
                    </p>
                  </td>

                  {/* WORK MODE */}
                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        job.workMode === "Remote"
                          ? "bg-green-100 text-green-700"
                          : job.workMode === "Hybrid"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {job.workMode}
                    </span>
                  </td>

                  {/* LOCATION */}
                  <td className="px-5 py-5 text-sm text-slate-700">
                    {job.location}
                  </td>

                  {/* EXPERIENCE */}
                  <td className="px-5 py-5 text-sm text-slate-700">
                    {job.experience}
                  </td>

                  {/* APPLICATION COUNT */}
                  <td className="px-5 py-5">
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                      {job.applications}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => openViewModal(job)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#625BFF]"
                      >
                        <Eye className="h-4 w-4" />

                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(job)}
                        className="text-slate-400 transition hover:text-[#625BFF]"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteJob(job)}
                        className="text-red-400 transition hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-14 text-center text-sm text-slate-500"
                  >
                    No Consulting job posts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing {jobs.length} of {jobs.length}
          </p>

          <div className="flex gap-2">
            <button
              disabled
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400"
            >
              Previous
            </button>

            <button
              className="rounded-md bg-[#625BFF] px-3 py-1.5 text-sm font-medium text-white"
            >
              1
            </button>

            <button
              disabled
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          ADD / EDIT MODAL
      ==================================================== */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[88vh] w-full max-w-[720px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-300 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                {modalType === "add"
                  ? "Add New Consulting Job Post"
                  : "Edit Consulting Job Post"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* SCROLL BODY */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
                  <InputField
                    label="Job Title"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. HR Recruitment Consultant"
                  />

                  <InputField
                    label="Department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g. Consulting"
                  />

                  <InputField
                    label="Experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 1-3 Years"
                  />

                  <InputField
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Chennai"
                  />

                  {/* WORK MODE */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Work Mode
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      name="workMode"
                      value={form.workMode}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#625BFF]"
                    >
                      <option value="On-site">
                        On-site
                      </option>

                      <option value="Hybrid">
                        Hybrid
                      </option>

                      <option value="Remote">
                        Remote
                      </option>
                    </select>
                  </div>

                  <InputField
                    label="Salary Range"
                    name="salaryRange"
                    value={form.salaryRange}
                    onChange={handleChange}
                    placeholder="e.g. 3-5 LPA"
                  />

                  <InputField
                    label="Qualification"
                    name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                    placeholder="e.g. Any Degree / MBA"
                  />
                </div>

                {/* JOB DESCRIPTION */}
                <TextAreaField
                  label="Job Description"
                  name="jobDescription"
                  value={form.jobDescription}
                  onChange={handleChange}
                  placeholder="Describe the role and what the candidate will do..."
                />

                {/* RESPONSIBILITIES */}
                <TextAreaField
                  label="Key Responsibilities (comma-separated)"
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder="Candidate sourcing, Interview coordination, Client handling"
                />

                {/* SKILLS */}
                <TextAreaField
                  label="Skills Required (comma-separated)"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Recruitment, Communication, Client Handling"
                />
              </div>

              {/* MODAL FOOTER */}
              <div className="flex shrink-0 justify-end gap-3 border-t border-slate-300 bg-white px-6 py-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#625BFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5149f6]"
                >
                  {modalType === "add"
                    ? "Create Consulting Job Post"
                    : "Update Consulting Job Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================
          VIEW MODAL
      ==================================================== */}
      {modalType === "view" && selectedJob && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[88vh] w-full max-w-[700px] overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-xl font-bold text-slate-900">
                Consulting Job Details
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              <Info
                label="Job Title"
                value={selectedJob.jobTitle}
              />

              <Info
                label="Department"
                value={selectedJob.department}
              />

              <Info
                label="Experience"
                value={selectedJob.experience}
              />

              <Info
                label="Location"
                value={selectedJob.location}
              />

              <Info
                label="Work Mode"
                value={selectedJob.workMode}
              />

              <Info
                label="Salary Range"
                value={selectedJob.salaryRange}
              />

              <Info
                label="Qualification"
                value={selectedJob.qualification}
              />

              <Info
                label="Applications"
                value={selectedJob.applications}
              />

              <div className="md:col-span-2">
                <Info
                  label="Job Description"
                  value={selectedJob.jobDescription}
                />
              </div>

              <div className="md:col-span-2">
                <Info
                  label="Key Responsibilities"
                  value={selectedJob.responsibilities}
                />
              </div>

              <div className="md:col-span-2">
                <Info
                  label="Skills Required"
                  value={selectedJob.skills}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg bg-[#625BFF] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          DELETE CONFIRMATION
      ==================================================== */}
      {deleteJob && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">
              Delete Consulting Job
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {deleteJob.jobTitle}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteJob(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* INPUT */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        <span className="text-red-500">
          *
        </span>
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#625BFF]"
      />
    </div>
  );
}

/* TEXTAREA */

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mt-5">
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        <span className="text-red-500">
          *
        </span>
      </label>

      <textarea
        rows={3}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#625BFF]"
      />
    </div>
  );
}

/* VIEW INFO */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 whitespace-pre-wrap text-sm font-medium leading-6 text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}