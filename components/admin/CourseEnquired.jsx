'use client'
import React, { useEffect, useMemo, useState } from "react";
import { FaTrash, FaSync } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link"

import { fetchRegistrations, removeRegistration } from "../../redux/actions/enquiryAction";
import {
  selectRegistrations,
  selectRegStatus,
  selectRegError,
  selectDeletingMap, // if not exported, fallback below handles it
} from "../../redux/reducer/enquirySlice";

/* ===========================
   Badge – ONLINE / CLASS ROOM / OFFLINE
=========================== */
function ModeBadge({ mode }) {
  const raw = String(mode || "").replaceAll("_", " ").trim();
  const m = raw.toUpperCase();

  let cls = "bg-gray-100 text-gray-700 border-gray-200";
  if (m === "ONLINE") cls = "bg-green-100 text-green-700 border-green-200";
  else if (m === "CLASS ROOM" || m === "CLASSROOM") cls = "bg-blue-100 text-blue-700 border-blue-200";
  else if (m === "OFFLINE") cls = "bg-amber-100 text-amber-700 border-amber-200";

  const label = m === "CLASSROOM" ? "CLASS ROOM" : raw.toUpperCase();
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${cls} whitespace-nowrap`}>
      {label || "NA"}
    </span>
  );
}

/* ===========================
   Minimal Modal
=========================== */
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[min(92vw,720px)] bg-white rounded-xl shadow-2xl border border-gray-200 p-5"
      >
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

/* ===========================
   Main Component
=========================== */
export default function StudentTable() {
  const dispatch = useDispatch();

  const rows = useSelector(selectRegistrations);
  const status = useSelector(selectRegStatus);
  const err = useSelector(selectRegError);

  // Fallback if selectDeletingMap isn’t exported yet
  const deleting = useSelector(selectDeletingMap ?? (() => ({})));

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [msgOpen, setMsgOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(fetchRegistrations());
  }, [status, dispatch]);

  // Reset to page 1 whenever dataset size changes
  useEffect(() => setPage(1), [rows.length]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageRows = useMemo(() => rows.slice(pageStart, pageStart + PAGE_SIZE), [rows, pageStart]);

  const loading = status === "loading";

  const goto = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const openDetails = (row) => {
    setActiveRow(row);
    setMsgOpen(true);
  };

  return (
    // tighter on mobile, comfy on md+, limit overly wide layouts
    <div className="px-3 py-4 md:p-6 max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="mb-3 md:mb-5">
        {/* Row 1: title + desktop actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-[#5d5cfd]">
            All Registrations
          </h2>

          {/* desktop/tablet actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => dispatch(fetchRegistrations())}
              className="bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium px-3 py-2 rounded shadow flex items-center gap-2"
              title="Refresh"
            >
              <FaSync className={loading ? "animate-spin" : ""} /> Refresh
            </button>
           
          </div>
        </div>

        {/* Row 2: mobile actions (stacked, no overlap) */}
        <div className="sm:hidden mt-2 flex gap-2">
          <button
            onClick={() => dispatch(fetchRegistrations())}
            className="flex-1 bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium px-3 py-2 rounded shadow flex items-center justify-center gap-2"
            title="Refresh"
          >
            <FaSync className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* States */}
      {err && (
        <div className="mb-4 px-4 py-3 rounded border border-red-200 bg-red-50 text-red-700">{String(err)}</div>
      )}
      {loading && (
        <div className="mb-4 px-4 py-3 rounded border border-blue-200 bg-blue-50 text-blue-700">
          Loading registrations…
        </div>
      )}

      {/* ========== MOBILE LIST (cards) – ONLY on < md ========== */}
      <div data-id="mobile-list" className="block md:hidden space-y-3">
        {status !== "loading" && rows.length === 0 && (
          <div className="py-6 px-4 text-center text-gray-500 bg-white rounded-lg shadow">
            No registrations found.
          </div>
        )}

        {pageRows.map((r, i) => {
          const rowId = r.id || r._id || `${pageStart + i}`;
          const isDeleting = !!(deleting && rowId && deleting[rowId]);

          return (
            <div key={rowId} className="rounded-xl bg-white shadow border border-gray-200 p-3 sm:p-4">
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900 leading-tight">{r.name || "—"}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.mobile || "—"}</div>
                </div>
                <ModeBadge mode={r.mode} />
              </div>

              {/* Body */}
              <div className="mt-3 text-sm">
                <div className="text-gray-700 break-words">
                  <span className="text-gray-500">Email: </span>
                  {r.email || "—"}
                </div>
                {r.course && (
                  <div className="text-gray-700 mt-1">
                    <span className="text-gray-500">Course: </span>
                    {r.course}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => openDetails(r)}
                  className="flex-1 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 flex items-center justify-center gap-1"
                >
                  <FiEye /> View
                </button>

                <button
                  onClick={() => {
                    if (!rowId) return;
                    if (window.confirm("Delete this registration?")) {
                      dispatch(removeRegistration(rowId));
                    }
                  }}
                  disabled={isDeleting}
                  className={`flex-1 px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1 ${
                    isDeleting
                      ? "bg-red-100 text-red-400 cursor-not-allowed"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                  title={isDeleting ? "Deleting..." : "Delete"}
                >
                  <FaTrash className={isDeleting ? "animate-pulse" : ""} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {/* Pagination (mobile) */}
        {rows.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <span className="mr-auto text-xs text-gray-500 px-1">
              Showing {Math.min(rows.length, page * PAGE_SIZE)} of {rows.length}
            </span>
            <button
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const active = p === page;
              return (
                <button
                  key={p}
                  onClick={() => goto(p)}
                  className={`px-3 py-1 rounded ${
                    active ? "bg-[#5d5cfd] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => goto(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${
                page === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ========== DESKTOP TABLE (md+) – ONLY on ≥ md ========== */}
      <div
        data-id="desktop-table"
        className="hidden md:block rounded-lg bg-white shadow overflow-hidden"
      >
        <div className="w-full overflow-x-auto">
          <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
            <table className="w-full text-sm table-auto min-w-[880px]">
              <thead className="bg-[#f7f8fa] text-[#525252] sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3 font-semibold text-left w-16">Sl</th>
                  <th className="py-3 px-3 font-semibold text-left w-32">Mode</th>
                  <th className="py-3 px-3 font-semibold text-left w-[18%]">Name</th>
                  <th className="py-3 px-3 font-semibold text-left w-40">Mobile</th>
                  <th className="py-3 px-3 font-semibold text-left">Email</th>
                  <th className="py-3 px-3 font-semibold text-left w-24">Details</th>
                  <th className="py-3 px-3 font-semibold text-left w-20">Action</th>
                </tr>
              </thead>

              <tbody>
                {status !== "loading" && rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                )}

                {pageRows.map((r, i) => {
                  const n = pageStart + i + 1;
                  const rowId = r.id || r._id || `${n}`;
                  const isDeleting = !!(deleting && rowId && deleting[rowId]);

                  return (
                    <tr key={rowId} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-3 px-3 font-bold text-black/60">{n < 10 ? `0${n}` : n}</td>
                      <td className="py-3 px-3">
                        <ModeBadge mode={r.mode} />
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap overflow-hidden text-ellipsis">{r.name || "-"}</td>
                      <td className="py-3 px-3 font-semibold text-gray-700 whitespace-nowrap">{r.mobile || "-"}</td>
                      <td className="py-3 px-3 break-words">{r.email || "-"}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => openDetails(r)}
                          className="inline-flex items-center gap-1 text-[#5d5cfd] hover:text-[#4e4bcc] px-2 py-1 rounded hover:bg-gray-100"
                          title="View details"
                        >
                          <FiEye /> <span className="hidden lg:inline">View</span>
                        </button>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => {
                            if (!rowId) return;
                            if (window.confirm("Delete this registration?")) {
                              dispatch(removeRegistration(rowId));
                            }
                          }}
                          disabled={isDeleting}
                          className={`text-red-500 hover:text-red-700 disabled:opacity-40 ${
                            isDeleting ? "cursor-not-allowed" : ""
                          }`}
                          title={isDeleting ? "Deleting..." : "Delete"}
                        >
                          <FaTrash className={isDeleting ? "animate-pulse" : ""} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (desktop) */}
        {rows.length > 0 && (
          <div className="flex flex-wrap items-center justify-end gap-2 p-3 border-t">
            <span className="mr-auto text-xs text-gray-500 px-1">
              Showing {Math.min(rows.length, page * PAGE_SIZE)} of {rows.length}
            </span>
            <button
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const active = p === page;
              return (
                <button
                  key={p}
                  onClick={() => goto(p)}
                  className={`px-3 py-1 rounded ${
                    active ? "bg-[#5d5cfd] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => goto(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${
                page === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <Modal open={msgOpen} onClose={() => setMsgOpen(false)} title="Registration Details">
        {activeRow && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs uppercase text-gray-500">Name</div>
                <div className="font-medium">{activeRow.name || "-"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Mode</div>
                <div className="font-medium">
                  <ModeBadge mode={activeRow.mode} />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Email</div>
                <div className="font-medium break-words">{activeRow.email || "-"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-gray-500">Mobile</div>
                <div className="font-medium">{activeRow.mobile || "-"}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs uppercase text-gray-500">Course</div>
                <div className="font-medium">{activeRow.course || "-"}</div>
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
