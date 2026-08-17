"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Eye,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import {
  deleteConsultingApplication,
  formatSubmittedAt,
  getConsultingApplications,
} from "../../../../lib/consultingApi";

export default function ConsultingJobApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [deleteApplication, setDeleteApplication] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getConsultingApplications();
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      setLoadError(
        error.message || "Could not load consulting job applications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const filteredApplications = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return applications;

    return applications.filter((item) => {
      return (
        (item.name || "").toLowerCase().includes(value) ||
        (item.email || "").toLowerCase().includes(value) ||
        (item.phone || "").includes(value) ||
        (item.applyingForPosition || "")
          .toLowerCase()
          .includes(value) ||
        (item.candidateType || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [applications, search]);

  const handleRefresh = () => {
    setSearch("");
    loadApplications();
  };

  const confirmDelete = async () => {
    if (!deleteApplication) return;

    setDeleting(true);
    setDeleteError("");

    try {
      await deleteConsultingApplication(deleteApplication.id);

      setApplications((prev) =>
        prev.filter((item) => item.id !== deleteApplication.id)
      );

      setDeleteApplication(null);
    } catch (error) {
      setDeleteError(error.message || "Could not delete the application.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fb] px-5 py-8 md:px-8 lg:px-10">
      {/* ================================
          HEADER
      ================================= */}
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5B55FF]">
            Consulting Job Applications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View candidates who applied for Consulting positions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />

          Refresh
        </button>
      </div>

      {/* ================================
          LOAD ERROR
      ================================= */}
      {loadError && (
        <div className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{loadError}</span>

          <button
            type="button"
            onClick={loadApplications}
            className="shrink-0 rounded-md border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      )}

      {/* ================================
          SEARCH
      ================================= */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name, email, phone or position..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-[#625BFF]"
        />
      </div>

      {/* ================================
          TABLE
      ================================= */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead className="bg-[#f7f7fa]">
              <tr className="text-left text-sm font-semibold text-slate-700">
                <th className="px-4 py-4">
                  SI
                </th>

                <th className="px-4 py-4">
                  Type
                </th>

                <th className="px-4 py-4">
                  Name
                </th>

                <th className="px-4 py-4">
                  Phone
                </th>

                <th className="px-4 py-4">
                  Email
                </th>

                <th className="px-4 py-4">
                  Position Applied
                </th>

                <th className="px-4 py-4">
                  Submitted
                </th>

                <th className="px-4 py-4">
                  Details
                </th>

                <th className="px-4 py-4">
                  Del
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map(
                (application, index) => (
                  <tr
                    key={application.id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-5 text-sm font-medium text-slate-500">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          application.candidateType ===
                          "Experienced"
                            ? "border-violet-200 bg-violet-50 text-violet-700"
                            : "border-sky-200 bg-sky-50 text-sky-700"
                        }`}
                      >
                        {
                          application.candidateType
                        }
                      </span>
                    </td>

                    <td className="px-4 py-5 font-medium text-slate-900">
                      {application.name}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-700">
                      {application.phone}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-700">
                      {application.email}
                    </td>

                    <td className="px-4 py-5">
                      <span className="font-medium text-[#625BFF]">
                        {
                          application.applyingForPosition
                        }
                      </span>
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-500">
                      {formatSubmittedAt(
                        application.createdAt
                      )}
                    </td>

                    <td className="px-4 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedApplication(
                            application
                          )
                        }
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#625BFF] transition hover:text-[#4f46ed]"
                      >
                        <Eye className="h-4 w-4" />

                        View
                      </button>
                    </td>

                    <td className="px-4 py-5">
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError("");
                          setDeleteApplication(
                            application
                          );
                        }}
                        className="text-red-500 transition hover:text-red-700"
                        title="Delete application"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              )}

              {loading &&
                filteredApplications.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-sm text-slate-500"
                    >
                      Loading applications...
                    </td>
                  </tr>
                )}

              {!loading &&
                filteredApplications.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-sm text-slate-500"
                    >
                      No Consulting job
                      applications found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            {filteredApplications.length} of{" "}
            {applications.length}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400"
            >
              Previous
            </button>

            <button
              type="button"
              className="rounded-md bg-[#625BFF] px-3 py-1.5 text-sm font-medium text-white"
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ================================
          APPLICATION DETAILS MODAL
      ================================= */}
      {selectedApplication && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[88vh] w-full max-w-[820px] overflow-y-auto rounded-xl bg-white shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Consulting Job Application
                  Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Candidate application
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Details */}
            <div className="grid gap-x-10 gap-y-6 p-6 md:grid-cols-2">
              <ApplicationInfo
                label="Name"
                value={
                  selectedApplication.name
                }
              />

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Candidate Type
                </p>

                <span
                  className={`mt-1 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                    selectedApplication.candidateType ===
                    "Experienced"
                      ? "border-violet-200 bg-violet-50 text-violet-700"
                      : "border-sky-200 bg-sky-50 text-sky-700"
                  }`}
                >
                  {
                    selectedApplication.candidateType
                  }
                </span>
              </div>

              <ApplicationInfo
                label="Email"
                value={
                  selectedApplication.email
                }
              />

              <ApplicationInfo
                label="Phone"
                value={
                  selectedApplication.phone
                }
              />

              <ApplicationInfo
                label="Position Applied"
                value={
                  selectedApplication.applyingForPosition
                }
                highlight
              />

              <ApplicationInfo
                label="Qualification"
                value={
                  selectedApplication.qualification
                }
              />

              <ApplicationInfo
                label="Passing Year"
                value={
                  selectedApplication.passingYear
                }
              />

              <ApplicationInfo
                label="Submitted"
                value={formatSubmittedAt(
                  selectedApplication.createdAt
                )}
              />

              {/* Experienced Fields */}
              {selectedApplication.candidateType ===
                "Experienced" && (
                <>
                  <ApplicationInfo
                    label="Total Experience"
                    value={
                      selectedApplication.totalExperience
                    }
                  />

                  <ApplicationInfo
                    label="Relevant Experience"
                    value={
                      selectedApplication.relevantExperience
                    }
                  />

                  <ApplicationInfo
                    label="Notice Period"
                    value={
                      selectedApplication.noticePeriod
                    }
                  />

                  <ApplicationInfo
                    label="Current CTC"
                    value={
                      selectedApplication.currentCtc
                    }
                  />
                </>
              )}

              {/* Skills */}
              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase text-slate-400">
                  Skills
                </p>

                <div className="mt-2 rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  {selectedApplication.skills || "-"}
                </div>
              </div>

              {/* Profile Summary */}
              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase text-slate-400">
                  Short Message / Profile Summary
                </p>

                <div className="mt-2 whitespace-pre-wrap rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800">
                  {selectedApplication.profileSummary ||
                    "-"}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================
          DELETE MODAL
      ================================= */}
      {deleteApplication && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">
              Delete Application
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Are you sure you want to delete
              the application from{" "}
              <span className="font-semibold text-slate-900">
                {deleteApplication.name}
              </span>
              ?
            </p>

            {deleteError && (
              <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteApplication(null)
                }
                disabled={deleting}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =====================================
   APPLICATION INFO
===================================== */

function ApplicationInfo({
  label,
  value,
  highlight = false,
}) {
  const hasValue =
    value !== null && value !== undefined && value !== "";

  return (
    <div>
      <p className="text-xs font-medium uppercase text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-medium ${
          highlight
            ? "text-[#625BFF]"
            : "text-slate-900"
        }`}
      >
        {hasValue ? value : "-"}
      </p>
    </div>
  );
}
