'use client'
import React, { useEffect, useMemo, useState } from "react";
import { FaTrash, FaSync } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import axios from "axios";

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,720px)] bg-white rounded-xl shadow-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="px-2.5 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function formatDate(val) {
  if (!val) return "-";
  try {
    return new Date(val).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return val;
  }
}

export default function Internships() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState(null);
  const [deleting, setDeleting] = useState({});

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const load = async () => {
    setStatus("loading");
    setErr(null);
    try {
      const { data } = await axios.get(`${BASE}/api/internships`);
      setRows(data);
      setStatus("success");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load");
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { setPage(1); }, [rows.length]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageRows = useMemo(() => rows.slice(pageStart, pageStart + PAGE_SIZE), [rows, pageStart]);
  const loading = status === "loading";

  const goto = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const openDetails = (row) => { setActiveRow(row); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Delete this internship application?")) return;
    setDeleting((d) => ({ ...d, [id]: true }));
    try {
      await axios.delete(`${BASE}/api/internships/${id}`);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || "Delete failed");
    } finally {
      setDeleting((d) => { const n = { ...d }; delete n[id]; return n; });
    }
  };

  const Pagination = () =>
    rows.length > 0 ? (
      <div className="flex flex-wrap items-center justify-end gap-2 p-3 border-t">
        <span className="mr-auto text-xs text-gray-500 px-1">
          Showing {Math.min(rows.length, page * PAGE_SIZE)} of {rows.length}
        </span>
        <button onClick={() => goto(page - 1)} disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const p = idx + 1;
          return (
            <button key={p} onClick={() => goto(p)}
              className={`px-3 py-1 rounded ${p === page ? "bg-[#5d5cfd] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {p}
            </button>
          );
        })}
        <button onClick={() => goto(page + 1)} disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Next
        </button>
      </div>
    ) : null;

  return (
    <div className="px-3 py-4 md:p-6 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="mb-3 md:mb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#5d5cfd]">
            Internship Applications
          </h2>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={load}
              className="bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium px-3 py-2 rounded shadow flex items-center gap-2"
              title="Refresh">
              <FaSync className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>
        <div className="sm:hidden mt-2 flex gap-2">
          <button onClick={load}
            className="flex-1 bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium px-3 py-2 rounded shadow flex items-center justify-center gap-2">
            <FaSync className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {err && <div className="mb-4 px-4 py-3 rounded border border-red-200 bg-red-50 text-red-700">{err}</div>}
      {loading && <div className="mb-4 px-4 py-3 rounded border border-blue-200 bg-blue-50 text-blue-700">Loading applications…</div>}

      {/* Mobile cards */}
      <div className="block md:hidden space-y-3">
        {!loading && rows.length === 0 && (
          <div className="py-6 px-4 text-center text-gray-500 bg-white rounded-lg shadow">No applications found.</div>
        )}
        {pageRows.map((r, i) => {
          const isDel = !!deleting[r.id];
          return (
            <div key={r.id ?? i} className="rounded-xl bg-white shadow border border-gray-200 p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900 leading-tight">{r.fullName || "—"}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.phoneNumber || "—"}</div>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {r.course || "—"}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-700 break-words">
                <span className="text-gray-500">Email: </span>{r.email || "—"}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => openDetails(r)}
                  className="flex-1 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 flex items-center justify-center gap-1">
                  <FiEye /> View
                </button>
                <button onClick={() => handleDelete(r.id)} disabled={isDel}
                  className={`flex-1 px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1 ${isDel ? "bg-red-100 text-red-400 cursor-not-allowed" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>
                  <FaTrash className={isDel ? "animate-pulse" : ""} /> Delete
                </button>
              </div>
            </div>
          );
        })}
        <Pagination />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg bg-white shadow overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
            <table className="w-full text-sm table-auto min-w-[860px]">
              <thead className="bg-[#f7f8fa] text-[#525252] sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3 font-semibold text-left w-12">Sl</th>
                  <th className="py-3 px-3 font-semibold text-left w-[18%]">Full Name</th>
                  <th className="py-3 px-3 font-semibold text-left w-36">Phone</th>
                  <th className="py-3 px-3 font-semibold text-left">Email</th>
                  <th className="py-3 px-3 font-semibold text-left w-[18%]">Course / Domain</th>
                  <th className="py-3 px-3 font-semibold text-left w-36">Submitted</th>
                  <th className="py-3 px-3 font-semibold text-left w-20">Details</th>
                  <th className="py-3 px-3 font-semibold text-left w-16">Del</th>
                </tr>
              </thead>
              <tbody>
                {!loading && rows.length === 0 && (
                  <tr><td colSpan={8} className="py-6 px-4 text-center text-gray-500">No applications found.</td></tr>
                )}
                {pageRows.map((r, i) => {
                  const n = pageStart + i + 1;
                  const isDel = !!deleting[r.id];
                  return (
                    <tr key={r.id ?? i} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-3 px-3 font-bold text-black/60">{n < 10 ? `0${n}` : n}</td>
                      <td className="py-3 px-3 whitespace-nowrap overflow-hidden text-ellipsis">{r.fullName || "-"}</td>
                      <td className="py-3 px-3 font-semibold text-gray-700 whitespace-nowrap">{r.phoneNumber || "-"}</td>
                      <td className="py-3 px-3 break-words">{r.email || "-"}</td>
                      <td className="py-3 px-3">
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                          {r.course || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500 whitespace-nowrap text-xs">{formatDate(r.createdAt)}</td>
                      <td className="py-3 px-3">
                        <button onClick={() => openDetails(r)}
                          className="inline-flex items-center gap-1 text-[#5d5cfd] hover:text-[#4e4bcc] px-2 py-1 rounded hover:bg-gray-100"
                          title="View details">
                          <FiEye /> <span className="hidden lg:inline">View</span>
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <button onClick={() => handleDelete(r.id)} disabled={isDel}
                          className={`text-red-500 hover:text-red-700 disabled:opacity-40 ${isDel ? "cursor-not-allowed" : ""}`}
                          title={isDel ? "Deleting..." : "Delete"}>
                          <FaTrash className={isDel ? "animate-pulse" : ""} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination />
      </div>

      {/* Details Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Internship Application Details">
        {activeRow && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs uppercase text-gray-500">Full Name</div>
                <div className="font-medium">{activeRow.fullName || "-"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Phone</div>
                <div className="font-medium">{activeRow.phoneNumber || "-"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Email</div>
                <div className="font-medium break-words">{activeRow.email || "-"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Course / Domain</div>
                <div className="font-medium">{activeRow.course || "-"}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs uppercase text-gray-500">Submitted</div>
                <div className="font-medium">{formatDate(activeRow.createdAt)}</div>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-gray-500 mb-1">Message</div>
              <div className="p-3 rounded border bg-gray-50 text-gray-800 whitespace-pre-wrap">
                {activeRow.message || "-"}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
