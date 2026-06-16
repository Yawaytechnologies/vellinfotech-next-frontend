import axios from "axios";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

export async function apiFetchBlogPosts() {
  const res = await axios.get(`${API_BASE}/api/blogposts`);
  const data = res.data;

  // Spring Page or plain array
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;

  console.warn("[apiFetchBlogPosts] Unexpected response:", data);
  return [];
}

export async function apiFetchBlogPostById(id) {
  const res = await axios.get(`${API_BASE}/api/blogposts/${id}`);
  return res.data;
}
