// lib/consultingApi.js — browser-side calls for the consulting admin screens and
// the public apply form.
//
// Unlike lib/api.js (which swallows errors and returns empty data so server-rendered
// pages still paint), these throw. The admin screens and the apply form need to tell
// the user what went wrong.

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const CONSULTING = `${API_BASE}/api/consulting`;

/**
 * Turns a failed response into an Error carrying the most useful message the
 * backend gave us — the {field: message} map from validation failures, or the
 * plain message from a 404.
 */
async function toError(res) {
  let payload = null;

  try {
    payload = await res.json();
  } catch {
    // Non-JSON body (proxy error page, empty 500). Fall through to the status text.
  }

  if (payload?.errors && typeof payload.errors === "object") {
    const details = Object.entries(payload.errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join("\n");

    return new Error(details || "Validation failed");
  }

  if (payload?.message) return new Error(payload.message);

  return new Error(`Request failed (${res.status} ${res.statusText})`);
}

async function request(url, options = {}) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) throw await toError(res);

  // DELETE returns 204 with no body.
  if (res.status === 204) return null;

  return res.json();
}

/* ===================== Job posts ===================== */

export function getConsultingJobPosts() {
  return request(`${CONSULTING}/job-posts`);
}

export function getConsultingJobPost(id) {
  return request(`${CONSULTING}/job-posts/${id}`);
}

export function createConsultingJobPost(payload) {
  return request(`${CONSULTING}/job-posts`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateConsultingJobPost(id, payload) {
  return request(`${CONSULTING}/job-posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteConsultingJobPost(id) {
  return request(`${CONSULTING}/job-posts/${id}`, { method: "DELETE" });
}

/* =================== Applications =================== */

export function getConsultingApplications() {
  return request(`${CONSULTING}/applications`);
}

export function deleteConsultingApplication(id) {
  return request(`${CONSULTING}/applications/${id}`, { method: "DELETE" });
}

export function submitConsultingApplication(jobId, payload) {
  return request(`${CONSULTING}/job-posts/${jobId}/apply`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ====================== Helpers ====================== */

/** "2026-08-17T18:02:04.805" -> "17/08/2026" for the public "Posted:" badge. */
export function formatPostedDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Long form used in the admin applications table. */
export function formatSubmittedAt(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/** Splits the comma-separated responsibilities/skills columns into a clean list. */
export function splitCommaList(value) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
