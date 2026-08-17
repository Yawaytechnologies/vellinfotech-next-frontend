import { authHeader } from "../../lib/AuthStore.js";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");
const BASE_URL = `${API_BASE}/api`;

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function normalizeForApi(data) {
  const recommendBool =
    typeof data.recommend === "boolean"
      ? data.recommend
      : (data.wouldRecommend || "").toString().trim().toLowerCase() === "yes";

  return {
    name: data.name || "",
    email: data.email || "",
    courseTitle: data.courseTitle || "",
    trainerName: data.trainerName || "",
    courseRating: Number(data.courseRating),
    trainerRating: Number(data.trainerRating),
    recommend: recommendBool,
    comments: data.comments || "",
    submittedAt: data.submittedAt || new Date().toISOString(),
  };
}

export async function postFeedback(payload, { signal } = {}) {
  const body = normalizeForApi(payload);

  const res = await fetch(`${BASE_URL}/feedbacks`, {
    method: "POST",
    headers: { ...JSON_HEADERS, ...authHeader() },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to submit feedback (${res.status})${text ? `: ${text.slice(0, 300)}` : ""}`
    );
  }
  return res.json();
}

/**
 * Returns the FULL paged object from the API so the slice can store meta.
 * Shape like:
 * {
 *   content: [...],
 *   totalPages, totalElements, number, size, ...
 * }
 */
export async function getFeedbacks({ signal } = {}) {
  const res = await fetch(`${BASE_URL}/feedbacks`, { headers: authHeader(), signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to load feedbacks (${res.status})${text ? `: ${text.slice(0, 300)}` : ""}`
    );
  }
  return res.json();
}

export async function deleteFeedback(id, { signal } = {}) {
  const res = await fetch(`${BASE_URL}/feedbacks/${id}`, {
    method: "DELETE",
    headers: authHeader(),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to delete feedback (${res.status})${text ? `: ${text.slice(0, 300)}` : ""}`
    );
  }
  try {
    return await res.json();
  } catch {
    return { success: true };
  }
}
