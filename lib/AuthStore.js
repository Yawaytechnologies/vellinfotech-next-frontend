// src/utils/authStore.js
const KEY = "auth:user";

export const setAuth = (user) => localStorage.setItem(KEY, JSON.stringify(user));
export const getAuth = () => {
  const v = localStorage.getItem(KEY);
  return v ? JSON.parse(v) : null;
};
export const clearAuth = () => localStorage.removeItem(KEY);
export const isLoggedIn = () => !!getAuth();
