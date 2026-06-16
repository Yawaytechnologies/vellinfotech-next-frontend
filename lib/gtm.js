// lib/gtm.js
export const GTM_ID = "GTM-XXXXXXX"; // Replace with actual GTM ID from vel-infotech-frontend/src/analytics/gtm.js

export function pushToDataLayer(obj = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

export function trackPageView(url) {
  pushToDataLayer({
    event: "page_view",
    page_location: url || (typeof window !== "undefined" ? window.location.href : ""),
    page_path: url || (typeof window !== "undefined" ? window.location.pathname : ""),
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}
