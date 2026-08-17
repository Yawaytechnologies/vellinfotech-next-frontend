// lib/api.js — server-safe fetch helpers for Next.js server components
const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

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
  try {
    const res = await fetch(`${API_BASE}/api/blogposts/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
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
  try {
    const res = await fetch(`${API_BASE}/api/job-posts/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
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
  try {
    const res = await fetch(`${API_BASE}/api/consulting/job-posts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
