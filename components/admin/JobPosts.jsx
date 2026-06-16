'use client'
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaSync, FaPlus, FaEdit } from "react-icons/fa";
import { FiEye, FiX } from "react-icons/fi";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const EMPTY_FORM = {
  jobTitle: "",
  department: "",
  experience: "",
  location: "",
  workMode: "On-site",
  salaryRange: "",
  qualification: "",
  jobDescription: "",
  responsibilities: "",
  skills: "",
};

function formatDate(dt) {
  if (!dt) return "—";
  if (Array.isArray(dt)) {
    const [y, m, d] = dt;
    return new Date(y, m - 1, d).toLocaleDateString("en-IN");
  }
  return new Date(dt).toLocaleDateString("en-IN");
}

function Modal({ open, onClose, title, wide, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl border
          border-gray-200 p-5 ${wide ? "w-[900px] max-w-[96vw]" : "w-[680px] max-w-[94vw]"}`}
      >
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 border-b z-10">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function WorkModeBadge({ mode }) {
  const m = String(mode || "").toLowerCase();
  let cls = "bg-gray-100 text-gray-600";
  if (m === "remote") cls = "bg-green-100 text-green-700";
  else if (m === "on-site" || m === "onsite") cls = "bg-blue-100 text-blue-700";
  else if (m === "hybrid") cls = "bg-amber-100 text-amber-700";
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${cls}`}>
      {mode || "NA"}
    </span>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "focus:outline-none focus:border-[#5d5cfd] focus:ring-1 focus:ring-[#5d5cfd]/30 bg-white";

function Field({ label, required, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function JobPosts() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const [appJob, setAppJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [appLoading, setAppLoading] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/api/job-posts`);
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch jobs"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const openAdd = () => {
    setEditingJob(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (job) => {
    setEditingJob(job);
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
    setFormError(null);
    setShowForm(true);
  };

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      if (editingJob) {
        const { data } = await axios.put(
          `${API_BASE}/api/job-posts/${editingJob.id}`,
          form
        );
        setJobs((prev) => prev.map((j) => (j.id === data.id ? data : j)));
      } else {
        const { data } = await axios.post(`${API_BASE}/api/job-posts`, form);
        setJobs((prev) => [data, ...prev]);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(
        err.response?.data?.message || err.message || "Failed to save"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}/api/job-posts/${id}`);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job post");
    } finally {
      setDeletingId(null);
    }
  };

  const openApplications = async (job) => {
    setAppJob(job);
    setApplications([]);
    setAppLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/jobs/${job.id}/applications`
      );
      setApplications(Array.isArray(data) ? data : []);
    } catch {
      setApplications([]);
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <div className="px-3 py-4 md:p-6 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#5d5cfd]">
          Job Posts
        </h2>
        <div className="flex gap-2">
          <button
            onClick={fetchJobs}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded shadow flex items-center gap-2 text-sm transition"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={openAdd}
            className="bg-[#5d5cfd] hover:bg-[#4e4bcc] text-white font-medium px-3 py-2 rounded shadow flex items-center gap-2 text-sm transition"
          >
            <FaPlus />
            <span className="hidden sm:inline">Add Job Post</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      {loading && (
        <div className="mb-4 px-4 py-3 rounded border border-blue-200 bg-blue-50 text-blue-700 text-sm">
          Loading job posts…
        </div>
      )}

      {/* ── Mobile cards ── */}
      <div className="block md:hidden space-y-3">
        {!loading && jobs.length === 0 && (
          <div className="py-8 px-4 text-center text-gray-500 bg-white rounded-lg shadow text-sm">
            No job posts yet. Click{" "}
            <span className="font-medium text-[#5d5cfd]">+ Add Job Post</span>{" "}
            to create one.
          </div>
        )}
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl bg-white shadow border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-gray-900 leading-tight">
                  {job.jobTitle}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {job.department}
                </div>
              </div>
              <WorkModeBadge mode={job.workMode} />
            </div>
            <div className="mt-1.5 text-xs text-gray-500">
              {job.location} · {job.experience}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => openApplications(job)}
                className="flex-1 px-2 py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center gap-1 font-medium transition"
              >
                <FiEye size={13} /> Applications
              </button>
              <button
                onClick={() => openEdit(job)}
                className="flex-1 px-2 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center justify-center gap-1 font-medium transition"
              >
                <FaEdit size={11} /> Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                disabled={deletingId === job.id}
                className="flex-1 px-2 py-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 text-xs flex items-center justify-center gap-1 font-medium transition disabled:opacity-50"
              >
                <FaTrash
                  size={11}
                  className={deletingId === job.id ? "animate-pulse" : ""}
                />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop table ── */}
      <div className="hidden md:block rounded-lg bg-white shadow overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
            <table className="w-full text-sm table-auto min-w-[820px]">
              <thead className="bg-[#f7f8fa] text-[#525252] sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3 font-semibold text-left w-10">
                    Sl
                  </th>
                  <th className="py-3 px-3 font-semibold text-left">
                    Title / Department
                  </th>
                  <th className="py-3 px-3 font-semibold text-left w-28">
                    Work Mode
                  </th>
                  <th className="py-3 px-3 font-semibold text-left w-44">
                    Location
                  </th>
                  <th className="py-3 px-3 font-semibold text-left w-28">
                    Experience
                  </th>
                  <th className="py-3 px-3 font-semibold text-left w-24">
                    Apps
                  </th>
                  <th className="py-3 px-3 font-semibold text-left w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && jobs.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-gray-400 text-sm"
                    >
                      No job posts yet. Click{" "}
                      <span className="text-[#5d5cfd] font-medium">
                        + Add Job Post
                      </span>{" "}
                      to create one.
                    </td>
                  </tr>
                )}
                {jobs.map((job, i) => (
                  <tr
                    key={job.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 font-bold text-black/40 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-900">
                        {job.jobTitle}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {job.department}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <WorkModeBadge mode={job.workMode} />
                    </td>
                    <td className="py-3 px-3 text-gray-600 text-xs">
                      {job.location}
                    </td>
                    <td className="py-3 px-3 text-gray-600 text-xs">
                      {job.experience}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => openApplications(job)}
                        className="inline-flex items-center gap-1 text-[#5d5cfd] hover:text-[#4e4bcc] px-2 py-1 rounded hover:bg-indigo-50 text-xs font-medium transition"
                      >
                        <FiEye size={13} /> View
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEdit(job)}
                          className="text-gray-400 hover:text-[#5d5cfd] p-1.5 rounded hover:bg-gray-100 transition"
                          title="Edit"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          disabled={deletingId === job.id}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition disabled:opacity-40"
                          title="Delete"
                        >
                          <FaTrash
                            size={12}
                            className={
                              deletingId === job.id ? "animate-pulse" : ""
                            }
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingJob ? "Edit Job Post" : "Add New Job Post"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="px-3 py-2 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Job Title" required>
              <input
                className={inputCls}
                value={form.jobTitle}
                onChange={set("jobTitle")}
                required
                placeholder="e.g. Java Full Stack Trainer"
              />
            </Field>
            <Field label="Department" required>
              <input
                className={inputCls}
                value={form.department}
                onChange={set("department")}
                required
                placeholder="e.g. Training · Full Time"
              />
            </Field>
            <Field label="Experience" required>
              <input
                className={inputCls}
                value={form.experience}
                onChange={set("experience")}
                required
                placeholder="e.g. 3–7 Years"
              />
            </Field>
            <Field label="Location" required>
              <input
                className={inputCls}
                value={form.location}
                onChange={set("location")}
                required
                placeholder="e.g. Ekkatuthangal, Chennai"
              />
            </Field>
            <Field label="Work Mode" required>
              <select
                className={inputCls}
                value={form.workMode}
                onChange={set("workMode")}
                required
              >
                <option>On-site</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
            </Field>
            <Field label="Salary Range" required>
              <input
                className={inputCls}
                value={form.salaryRange}
                onChange={set("salaryRange")}
                required
                placeholder="e.g. ₹6L – ₹10L / year"
              />
            </Field>
            <Field label="Qualification" required>
              <input
                className={inputCls}
                value={form.qualification}
                onChange={set("qualification")}
                required
                placeholder="e.g. B.E / B.Tech / MCA"
              />
            </Field>
          </div>

          <Field label="Job Description" required>
            <textarea
              className={inputCls}
              rows={3}
              value={form.jobDescription}
              onChange={set("jobDescription")}
              required
              placeholder="Describe the role and what the candidate will do…"
            />
          </Field>

          <Field label="Key Responsibilities (comma-separated)" required>
            <textarea
              className={inputCls}
              rows={3}
              value={form.responsibilities}
              onChange={set("responsibilities")}
              required
              placeholder="Deliver classroom sessions,Design assignments,Support students with doubts"
            />
          </Field>

          <Field label="Skills Required (comma-separated)" required>
            <textarea
              className={inputCls}
              rows={2}
              value={form.skills}
              onChange={set("skills")}
              required
              placeholder="Java,Spring Boot,React,Good communication"
            />
          </Field>

          <div className="flex justify-end gap-3 pt-3 border-t mt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#5d5cfd] hover:bg-[#4e4bcc] disabled:opacity-60 text-white text-sm font-semibold flex items-center gap-2 transition"
            >
              {saving && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {editingJob ? "Save Changes" : "Create Job Post"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Applications Modal ── */}
      <Modal
        open={!!appJob}
        onClose={() => setAppJob(null)}
        title={`Applications — ${appJob?.jobTitle || ""}`}
        wide
      >
        {appLoading ? (
          <div className="py-10 text-center text-gray-400 text-sm">
            Loading applications…
          </div>
        ) : applications.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">
            No applications received for this job post yet.
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-500 mb-3">
              {applications.length} application
              {applications.length !== 1 ? "s" : ""} received
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-gray-50 text-gray-500 text-xs">
                  <tr>
                    <th className="py-2 px-3 text-left font-semibold">Name</th>
                    <th className="py-2 px-3 text-left font-semibold">Type</th>
                    <th className="py-2 px-3 text-left font-semibold">Email</th>
                    <th className="py-2 px-3 text-left font-semibold">Phone</th>
                    <th className="py-2 px-3 text-left font-semibold">
                      Qualification
                    </th>
                    <th className="py-2 px-3 text-left font-semibold">
                      Experience
                    </th>
                    <th className="py-2 px-3 text-left font-semibold">
                      Applied On
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-900">
                        {app.name}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            app.candidateType === "Experienced"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {app.candidateType}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">
                        {app.email}
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">
                        {app.phone}
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">
                        {app.qualification}
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">
                        {app.candidateType === "Fresher"
                          ? "Fresher"
                          : `${app.totalExperience ?? 0} yrs`}
                      </td>
                      <td className="py-2 px-3 text-gray-400 text-xs">
                        {formatDate(app.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
