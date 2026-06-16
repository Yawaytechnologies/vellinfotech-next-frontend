'use client'
// src/pages/students/AddStudent.jsx
import React, { useState } from "react";

export default function AddStudent() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    console.log("AddStudent payload:", data);
    setSubmitted(true);
    // TODO: send `data` to your API
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-5 md:p-8">
      {/* Breadcrumb / Header */}
      <div className="mb-6">
        <div className="text-xs text-neutral-500">Students / Add Student</div>
        <h1 className="text-2xl font-semibold text-neutral-900 mt-1">Add Student</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-700">Basic Info</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <Field label="First Name">
            <input
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              required
              className="input"
            />
          </Field>

          {/* Last Name */}
          <Field label="Last Name">
            <input
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              required
              className="input"
            />
          </Field>

          {/* Email */}
          <Field label="Email">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="input"
            />
          </Field>

          {/* Registration Date */}
          <Field label="Registration Date">
            <input
              name="registrationDate"
              type="date"
              required
              className="input"
            />
          </Field>

          {/* Roll No */}
          <Field label="Roll No.">
            <input
              name="rollNo"
              type="text"
              placeholder="Roll No"
              required
              className="input"
            />
          </Field>

          {/* Class */}
          <Field label="Class">
            <input
              name="studentClass"
              type="text"
              placeholder="Class"
              required
              className="input"
            />
          </Field>

          {/* Gender */}
          <Field label="Gender">
            <select name="gender" required className="input">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </Field>

          {/* Mobile Number */}
          <Field label="Mobile Number">
            <input
              name="mobile"
              type="tel"
              placeholder="Mobile Number"
              pattern="^[0-9]{10}$"
              title="Enter 10 digit number"
              required
              className="input"
            />
          </Field>

          {/* Parents Name */}
          <Field label="Parents Name">
            <input
              name="parentName"
              type="text"
              placeholder="Parents Name"
              required
              className="input"
            />
          </Field>

          {/* Parents Mobile Number */}
          <Field label="Parents Mobile Number">
            <input
              name="parentMobile"
              type="tel"
              placeholder="Parents Mobile Number"
              pattern="^[0-9]{10}$"
              title="Enter 10 digit number"
              required
              className="input"
            />
          </Field>

          {/* Date of Birth */}
          <Field label="Date of Birth">
            <input name="dob" type="date" required className="input" />
          </Field>

          {/* Blood Group */}
          <Field label="Blood Group">
            <select name="bloodGroup" required className="input">
              <option value="">Blood Group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>
          </Field>

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <Field label="Address">
              <textarea
                name="address"
                placeholder="Address"
                rows={3}
                required
                className="input resize-y"
              />
            </Field>
          </div>

          {/* File upload (full width) */}
          <div className="md:col-span-2">
            <Field label="Upload (optional)">
              <input
                name="attachment"
                type="file"
                className="file-input"
              />
              {/* Browser will show "No file chosen" by default until selected */}
            </Field>
          </div>

          {/* Actions */}
          <div className="md:col-span-2 mt-2 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-neutral-300 px-5 py-2.5 text-neutral-700 hover:bg-neutral-50"
            >
              Reset
            </button>
            {submitted && (
              <span className="text-sm text-green-600">Student added successfully.</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Local UI helpers (no extra files) ---------- */
function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-neutral-700 mb-1">{label}</div>
      {children}
    </label>
  );
}

/* Tailwind “component classes” */
const base =
  "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";
const fileBase =
  "block w-full rounded-xl border border-neutral-300 bg-white text-sm text-neutral-700 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500";

if (typeof window !== "undefined") {
  // expose class names on window so we can use them in JSX without Tailwind plugin
  window.__tailwind_form_classes__ = { base, fileBase };
}
