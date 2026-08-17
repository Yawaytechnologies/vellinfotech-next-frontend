import axios from "axios";
import { authHeader } from "../../lib/AuthStore.js";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");
const BASE_URL = `${API_BASE}/api`;


const client = axios.create({
  baseURL: BASE_URL,
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

/**
 * @param {{
 *  name: string; email: string; phone: string;
 *  batch: string; course: string; message: string;
 * }} payload
 * @param {AbortSignal} [signal]
 */
export async function postRegistration(payload, signal) {
  // POST https://.../api/registrations
  const { data } = await client.post("/registrations", payload, { signal });
  return data; // expect created object or {success:true,...}
}

/**
 * GET /api/registrations
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array<{ mode:string; name:string; email:string; mobile:string; course:string; message:string }>>}
 */
export async function getRegistrations(signal) {
  const { data } = await client.get("/registrations", { signal });
  // Supports both raw array and wrapped { data: [...] }
  return Array.isArray(data) ? data : (data?.data ?? []);
}

export const deleteRegistration = (id, signal) =>
  client.delete(`/registrations/${id}`, { signal }).then(r => r.data);
