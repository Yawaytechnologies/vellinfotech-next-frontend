// Runs the real admin data layer outside the browser to prove each screen sends
// its token. Stubs the two browser globals AuthStore depends on, then calls the
// same service functions the admin screens call.
//
// Usage: node scripts/verify-admin-auth.mjs [apiBase] [username] [password]

const API = (process.argv[2] || "http://localhost:8000").replace(/\/$/, "");
const USER = process.argv[3] || "Admin";
const PASS = process.argv[4] || "TestOnly-Local-Pass-123";

// --- minimal browser stubs, installed before any module reads them ---
const store = new Map();
globalThis.window = { location: { pathname: "/admin/course-enquired", href: "" } };
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};

process.env.NEXT_PUBLIC_API_BASE_URL = API;

const { setAuth, authHeader, isLoggedIn } = await import("../lib/AuthStore.js");

function report(name, ok, detail) {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name.padEnd(34)} ${detail}`);
  if (!ok) process.exitCode = 1;
}

// --- 1. sign in for real ---
const res = await fetch(`${API}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: USER, password: PASS }),
});

if (!res.ok) {
  console.error(`login failed: HTTP ${res.status}`);
  process.exit(1);
}

const data = await res.json();
setAuth({
  username: data.username,
  token: data.token,
  expiresAt: Date.now() + data.expiresInSeconds * 1000,
});

console.log("\n=== session ===");
report("isLoggedIn()", isLoggedIn() === true, "true");
report("authHeader() has bearer", !!authHeader().Authorization, "Authorization present");

// --- 2. drive the actual services the admin screens use ---
const enquiry = await import("../redux/service/enquiryService.js");
const feedback = await import("../redux/service/feedbackService.js");
const internship = await import("../redux/service/internshipService.js");

console.log("\n=== admin screens, via their real service modules ===");

async function check(label, fn) {
  try {
    const out = await fn();
    const rows = Array.isArray(out)
      ? out.length
      : Array.isArray(out?.content)
      ? out.content.length
      : out
      ? 1
      : 0;
    report(label, true, `loaded ${rows} record(s)`);
  } catch (e) {
    report(label, false, e?.response?.status ? `HTTP ${e.response.status}` : e.message);
  }
}

await check("Course Enquired", () => enquiry.getRegistrations());
await check("Feedback", () => feedback.getFeedbacks({}));
await check("Internships", () => internship.getInternships());

// --- 3. signed out, the same calls must be refused ---
store.clear();
console.log("\n=== signed out, the same calls must fail ===");

async function mustFail(label, fn) {
  try {
    await fn();
    report(label, false, "loaded data without a token");
  } catch (e) {
    const status = e?.response?.status || (e.message.match(/\((\d{3})\)/) || [])[1];
    report(label, String(status) === "401", `refused with ${status}`);
  }
}

await mustFail("Course Enquired", () => enquiry.getRegistrations());
await mustFail("Feedback", () => feedback.getFeedbacks({}));
await mustFail("Internships", () => internship.getInternships());

console.log(process.exitCode ? "\nFAILURES\n" : "\nALL PASS\n");
