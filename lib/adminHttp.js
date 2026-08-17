// lib/adminHttp.js — the axios instance every admin screen should use.
//
// Attaches the admin token to each request and, when the backend says the session
// is no longer good, clears it and sends the user to the login page instead of
// leaving the screen sitting there with an unexplained error.

import axios from "axios";
import { authHeader, clearAuth } from "./AuthStore";

const adminApi = axios.create();

adminApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...authHeader() };
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      clearAuth();

      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;
