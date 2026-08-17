// lib/AuthStore.js — admin session state.
//
// This used to store only { username } and treat "the key exists" as proof of
// login, which meant one line in devtools was a valid session — and it made no
// difference anyway, because the API asked for nothing. It now holds the JWT the
// backend issues, and every admin request carries it.

const KEY = "auth:user";

export const setAuth = (session) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(session));
};

export const getAuth = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
};

export const getToken = () => getAuth()?.token || null;

/**
 * A session counts only while it holds a token that has not expired. Checking the
 * expiry here avoids sending a request we already know will come back 401.
 */
export const isLoggedIn = () => {
  const session = getAuth();
  if (!session?.token) return false;

  if (session.expiresAt && Date.now() >= session.expiresAt) {
    clearAuth();
    return false;
  }

  return true;
};

/** Authorization header for admin requests, or {} when signed out. */
export const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
