import axios from "axios";

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const client = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export async function postInternship(payload, signal) {
  const { data } = await client.post("/internships", payload, { signal });
  return data;
}

export async function getInternships(signal) {
  const { data } = await client.get("/internships", { signal });
  return Array.isArray(data) ? data : (data?.data ?? []);
}

export const deleteInternship = (id, signal) =>
  client.delete(`/internships/${id}`, { signal }).then((r) => r.data);
