import axios from "axios";
import { authHeader } from "../../lib/AuthStore.js";

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

const client = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// The admin screens read these lists, so the request needs the token. Public form
// submissions go through the same client and simply carry no header — authHeader()
// returns {} when signed out — so visitors are unaffected.
client.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...authHeader() };
  return config;
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
