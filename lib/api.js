// lib/api.js — server-safe fetch helpers for Next.js server components
const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

/**
 * Fetches a single record, telling "this does not exist" apart from "the API did
 * not answer".
 *
 * That distinction matters more than it looks. The API sleeps on Render's free
 * tier and takes ~50s to wake. When a detail page treated an unreachable backend
 * the same as a missing record, it called notFound() — and Next cached that 404
 * for the full revalidate window. A live, indexed URL then served 404 for an hour
 * because the backend happened to be cold on the one request that mattered.
 *
 * So: a real 404 returns null and the caller renders not-found. Anything else
 * throws after a retry, which surfaces as a 500 that Next will not cache as a
 * missing page, and the next request re-renders correctly.
 */
async function fetchOne(url, { revalidate = 3600, retries = 1, timeoutMs = 60000 } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate },
        signal: AbortSignal.timeout(timeoutMs),
      });

      // Genuinely absent — the caller should render not-found.
      if (res.status === 404) return null;

      // 5xx is usually a backend still warming up; worth one more try.
      if (!res.ok) throw new Error(`API responded ${res.status} for ${url}`);

      return await res.json();
    } catch (error) {
      lastError = error;

      // Wait for a cold start before the retry.
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  throw lastError;
}

export async function fetchBlogPosts({ page = 0, size = 100 } = {}) {
  try {
    const res = await fetch(
      `${API_BASE}/api/blogposts?page=${page}&size=${size}&sortBy=id&direction=desc`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    return [];
  } catch {
    return [];
  }
}

export async function fetchBlogPostById(id) {
  return fetchOne(`${API_BASE}/api/blogposts/${id}`);
}

export async function fetchBlogPostBySlug(slug) {
  return fetchOne(`${API_BASE}/api/blogposts/slug/${encodeURIComponent(slug)}`);
}

export async function fetchJobPosts() {
  try {
    const res = await fetch(`${API_BASE}/api/job-posts`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchJobPostById(id) {
  return fetchOne(`${API_BASE}/api/job-posts/${id}`);
}

export async function fetchConsultingJobPosts() {
  try {
    const res = await fetch(`${API_BASE}/api/consulting/job-posts`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchConsultingJobPostById(id) {
  return fetchOne(`${API_BASE}/api/consulting/job-posts/${id}`, { revalidate: 0 });
}
