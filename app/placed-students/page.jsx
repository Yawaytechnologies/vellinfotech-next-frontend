"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { submitEnquiry } from "@/redux/actions/enquiryAction";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================
   DATA SECTION
   ========================= */
const placed = [
  {
    id: 1,
    name: "Rajasopi",
    company: "Yaway Tech",
    designation: "HR",
    course: "HR",
    lpa: 1.5,
    notes: "15K/month approx",
  },
  {
    id: 2,
    name: "Muthukrishnan Gopal",
    company: "Cognizant",
    designation: "ETL Testing",
    course: "ETL",
    lpa: 9,
  },
  {
    id: 3,
    name: "Srinivasan V",
    company: "Capgemini",
    designation: "ETL Testing",
    course: "ETL",
    lpa: 8,
  },
  {
    id: 4,
    name: "Manikam Ponnusamy",
    company: "L&T",
    designation: "ETL",
    course: "ETL",
    lpa: 8.5,
  },
  {
    id: 5,
    name: "Kanimozhi Saravanan",
    company: "Citibank",
    designation: "Java Developer",
    course: "Java",
    lpa: 8.5,
  },
  {
    id: 6,
    name: "Harish Kumar",
    company: "Expleo",
    designation: "Manual Tester",
    course: "Testing",
    lpa: 3.5,
  },

  {
    id: 7,
    name: "Yamini",
    company: "Expleo",
    designation: "Manual Tester",
    course: "Testing",
    lpa: 7,
  },
  {
    id: 8,
    name: "Naveen Kumar",
    company: "Expleo",
    designation: "Manual Tester",
    course: "Testing",
    lpa: 7,
  },

  {
    id: 9,
    name: "Babu Mani",
    company: "Virtusa",
    designation: "ETL",
    course: "ETL",
    lpa: 7,
  },
  {
    id: 10,
    name: "Jay Bharathi",
    company: "Expleo",
    designation: "Manual Tester",
    course: "Testing",
    lpa: 3.5,
  },
  {
    id: 11,
    name: "Nithiya Swaminathan",
    company: "Capgemini",
    designation: "Selenium Tester",
    course: "Selenium",
    lpa: 8,
  },
  {
    id: 12,
    name: "Raghunath Srinivasan",
    company: "DXC",
    designation: "Networking",
    course: "Networking",
    lpa: 9,
  },
  {
    id: 13,
    name: "Sudha Selvarajan",
    company: "Expleo",
    designation: "Data Analyst",
    course: "Data Science",
    lpa: 6.5,
  },
  {
    id: 14,
    name: "Shyam Kumar",
    company: "Infosys",
    designation: "Networking",
    course: "Networking",
    lpa: 4,
  },
  {
    id: 15,
    name: "John Vimal",
    company: "Virtusa",
    designation: "PL/SQL Developer",
    course: "PL/SQL",
    lpa: 12,
  },
];

/* CATEGORY DATA */
const categoryData = [
  {
    id: 1,
    label: "Non-IT to IT (Career Transition)",
    count: "155+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 2,
    label: "Diploma Candidates",
    count: "147+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 3,
    label: "Non-Engineering (Arts & Science)",
    count: "118+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 4,
    label: "Engineering Students",
    count: "107+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 5,
    label: "CTC Greater than 5 LPA",
    count: "178+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 6,
    label: "Academic Percentage Less than 60%",
    count: "136+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 7,
    label: "Career Break / Gap Students",
    count: "159+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 8,
    label: "Freshers Hired",
    count: "120+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
  {
    id: 9,
    label: "Working Professionals Upskilled",
    count: "180+",
    gradient: "from-[#005BAC] to-[#0078D7]",
  },
];

const roleDataColumns = [
  [
    { role: "Data Analysts", count: "132+" },
    { role: "Fullstack Developers", count: "180+" },
    { role: "Python Developers", count: "140+" },
    { role: "Java Developers", count: "150+" },
    { role: "Software Testers", count: "123+" },
    { role: "Data Scientists", count: "101+" },
    { role: "AWS Engineers", count: "178+" },
  ],
  [
    { role: "Digital Marketing Executives", count: "171+" },
    { role: "Cloud Engineers", count: "112+" },
    { role: "Salesforce Developer", count: "119+" },
    { role: "PowerBI Developer", count: "183+" },
    { role: "Microsoft Azure Developer", count: "171+" },
    { role: "ServiceNow Engineers", count: "142+" },
    { role: "Angular Developers", count: "188+" },
  ],
  [
    { role: "Ethical Hackers", count: "185+" },
    { role: "React Developers", count: "101+" },
    { role: ".NET Developers", count: "119+" },
    { role: "Network Engineers", count: "171+" },
    { role: "Business Analysts", count: "142+" },
    { role: "AI Engineers", count: "183+" },
    { role: "Business Intelligence Developers", count: "188+" },
  ],
];

/* ========= HELPERS ========= */
const GRADS = [
  "from-[#005BAC] to-[#003c6a]",
  "from-indigo-600 to-blue-600",
  "from-cyan-600 to-teal-600",
  "from-rose-600 to-pink-600",
  "from-amber-600 to-orange-600",
];
const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
const gradFor = (key) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = key.charCodeAt(i) + ((h << 5) - h);
  return GRADS[Math.abs(h) % GRADS.length];
};
const band = (lpa) => {
  if (lpa == null) return { label: "—", cls: "bg-gray-200 text-gray-700" };
  if (lpa < 4)
    return { label: `${lpa} LPA`, cls: "bg-orange-100 text-orange-800" };
  if (lpa < 7)
    return { label: `${lpa} LPA`, cls: "bg-amber-100 text-amber-800" };
  if (lpa < 10)
    return { label: `${lpa} LPA`, cls: "bg-emerald-100 text-emerald-800" };
  if (lpa < 13) return { label: `${lpa} LPA`, cls: "bg-sky-100 text-sky-800" };
  return { label: `${lpa} LPA`, cls: "bg-violet-100 text-violet-800" };
};

/* =============================
   COMPONENT
   ============================= */
const PlacedStudents = () => {
  const [mode, setMode] = useState("classroom");
  const [view, setView] = useState("circles");
  const [q, setQ] = useState("");
  const [company, setCompany] = useState("All");
  const [role, setRole] = useState("All");
  const [sort, setSort] = useState("recent");
  const dispatch = useDispatch();
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    course: "",
    message: "",
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (
      !quoteForm.name.trim() ||
      !quoteForm.email.trim() ||
      !quoteForm.phone.trim()
    ) {
      toast.error("Name, email and mobile are required.", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(quoteForm.phone.trim())) {
      toast.error("Enter a valid 10-digit mobile number starting with 6–9.", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    try {
      setQuoteSubmitting(true);
      await dispatch(
        submitEnquiry({
          mode: mode === "classroom" ? "CLASS_ROOM" : "ONLINE",
          name: quoteForm.name,
          email: quoteForm.email,
          mobile: quoteForm.phone,
          course: quoteForm.course,
          message: quoteForm.message,
        }),
      ).unwrap();
      toast.success("Thanks! We'll call you back soon.", {
        position: "top-center",
        theme: "colored",
      });
      setQuoteForm({
        name: "",
        email: "",
        phone: "",
        batch: "",
        course: "",
        message: "",
      });
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Something went wrong.", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setQuoteSubmitting(false);
    }
  };

  const companies = useMemo(
    () => [
      "All",
      ...Array.from(new Set(placed.map((p) => p.company).filter(Boolean))),
    ],
    [],
  );
  const roles = useMemo(
    () => [
      "All",
      ...Array.from(new Set(placed.map((p) => p.designation).filter(Boolean))),
    ],
    [],
  );

  const filtered = useMemo(() => {
    let data = placed;
    const term = q.trim().toLowerCase();
    if (term)
      data = data.filter((s) =>
        [s.name, s.company, s.designation, s.course, String(s.lpa ?? "")]
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
    if (company !== "All") data = data.filter((s) => s.company === company);
    if (role !== "All") data = data.filter((s) => s.designation === role);
    if (sort === "lpaHigh")
      data = [...data].sort((a, b) => (b.lpa ?? -1) - (a.lpa ?? -1));
    else if (sort === "lpaLow")
      data = [...data].sort((a, b) => (a.lpa ?? 999) - (b.lpa ?? 999));
    return data;
  }, [q, company, role, sort]);

  return (
    <div className="bg-background pb-10">
      <ToastContainer />
      {/* HERO — Single page-level H1 */}
      <header
        className="relative w-full
mt-[64px] sm:mt-[72px] md:mt-[134px] lg:mt-[150px]
min-h-[520px] sm:min-h-[480px] md:min-h-[390px] lg:min-h-[440px]
flex items-start md:items-center justify-start
py-8 sm:py-10 md:py-0
px-5 sm:px-8 md:px-10 lg:px-14"
        style={{
          backgroundImage: `url(/images/bgplacement.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-labelledby="page-title"
      >
        <div className="relative z-10 max-w-xl">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight"
          >
            Placed Students List
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-lg">
            Build your career with industry-focused training and dedicated
            placement support at Vell InfoTech.
          </p>

          <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-lg">
            Our students have successfully started their careers in leading IT
            companies across Software Development, Testing, Cloud, Data Science,
            Networking, and other technologies.
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section
        className="max-w-6xl mx-auto px-4 py-10"
        aria-labelledby="intro-heading"
      >
        <h2 id="intro-heading" className="sr-only">
          About Placements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="bg-white shadow-md rounded-lg p-6 border border-blue-400">
            {/* H2 at section level is fine; these are sibling subsections */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b-2 border-gray-400 inline-block">
              List of Students Placed from Vell InfoTech
            </h2>
            <p className="text-gray-600 mt-5 leading-relaxed">
              Our learners are successfully placed in leading IT and non-IT
              companies across various domains such as Development, Testing,
              Cloud, and Analytics.
            </p>
          </article>

          <article className="bg-white shadow-md rounded-lg px-4 py-3 border border-blue-400">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b-2 border-gray-400 inline-block">
              Training and Placement Support
            </h2>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Each learner undergoes hands-on training, mock interviews, and
              career mentorship — ensuring strong placement outcomes.
            </p>
          </article>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        className="max-w-6xl mx-auto px-4 pb-16"
        aria-labelledby="categories-heading"
      >
        <h2
          id="categories-heading"
          className="text-3xl font-semibold text-center text-gray-900 mb-5"
        >
          Placement Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`bg-gradient-to-br ${item.gradient} p-6 rounded-xl shadow-md text-center`}
            >
              {/* H3 for nested cards */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.label}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-sm font-bold text-gray-800">
                {item.count}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROLE-BASED */}
      <section
        className="max-w-8xl mx-auto px-4 pb-10"
        aria-labelledby="roles-heading"
      >
        <h2
          id="roles-heading"
          className="text-3xl font-semibold text-center text-gray-900 mb-6"
        >
          Role-Based Placements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roleDataColumns.map((col, i) => (
            <div key={i} className="rounded-lg shadow-md bg-blue-700 p-4">
              {/* Column label as H3 under this section */}
              <h3 className="text-xl font-bold text-center text-white mb-4">
                Placement Roles
              </h3>
              {col.map((r, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 px-4 my-2 rounded-lg bg-white"
                >
                  <span className="text-sm sm:text-base text-gray-800 font-medium">
                    {r.role}
                  </span>
                  <span className="px-3 py-1 text-xs sm:text-sm font-bold rounded-full bg-yellow-300 text-gray-800">
                    {r.count}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED LIST */}
      <section
        className="max-w-7xl mx-auto px-4 pb-10"
        aria-labelledby="detailed-heading"
      >
        <h2
          id="detailed-heading"
          className="text-3xl font-semibold text-center text-gray-900 mb-4"
        >
          Placed Students (Detailed)
        </h2>

        {/* Search & Filters with accessible labels */}
        <div
          className="flex flex-wrap gap-3 items-center justify-between mb-6"
          role="region"
          aria-label="Placement filters"
        >
          <div className="relative">
            <label htmlFor="search-placements" className="sr-only">
              Search placements
            </label>
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="search-placements"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, company, role…"
              className="pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-[#003c6a] w-72"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="filter-company">
              Filter by company
            </label>
            <select
              id="filter-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-3 py-2 rounded-xl border bg-white"
            >
              {companies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <label className="sr-only" htmlFor="filter-role">
              Filter by role
            </label>
            <select
              id="filter-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-3 py-2 rounded-xl border bg-white"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <label className="sr-only" htmlFor="sort-by">
              Sort by
            </label>
            <select
              id="sort-by"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl border bg-white"
            >
              <option value="recent">Sort: Recent</option>
              <option value="lpaHigh">Sort: LPA High → Low</option>
              <option value="lpaLow">Sort: LPA Low → High</option>
            </select>
          </div>
        </div>

        {/* Circle cards only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {filtered.map((s, i) => {
            const grad = gradFor(s.name + s.company);
            const b = band(s.lpa);
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.02 }}
                className="bg-white border border-gray-200 rounded-3xl p-4 text-center shadow hover:shadow-md"
                aria-label={`${s.name} at ${s.company}`}
              >
                <div
                  className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${grad} text-white font-extrabold text-xl flex items-center justify-center`}
                  aria-hidden="true"
                >
                  {initials(s.name)}
                </div>
                <h3 className="mt-3 font-bold text-[#0f172a]">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.company}</p>
                <p className="text-xs mt-1 text-gray-700">{s.designation}</p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-0.5 text-[11px] rounded-full ${b.cls}`}
                  >
                    {b.label}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No students match your search.
          </div>
        )}
      </section>

      {/* HIGHLIGHTS + ENQUIRY */}
      <section
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-7 items-center px-4 pb-10"
        aria-labelledby="extras-heading"
      >
        <h2 id="extras-heading" className="sr-only">
          Placement Extras
        </h2>

        <article className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-5">
            Placement Highlights
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>
              <strong>Industry Trends:</strong> Real-time skills required by top
              companies
            </li>
            <li>
              <strong>Top Domains:</strong> Fullstack, Cloud, Testing, Data
              Science
            </li>
            <li>
              <strong>Placement Support:</strong> For both freshers and
              experienced professionals
            </li>
            <li>
              <strong>Hiring Partners:</strong> Tie-ups with MNCs & fast-growing
              IT companies
            </li>
            <li>
              <strong>Real Projects:</strong> Hands-on live projects before
              interviews
            </li>
            <li>
              <strong>Resume Assistance:</strong> Industry-standard resume &
              LinkedIn optimization
            </li>
            <li>
              <strong>Mock Interviews:</strong> Technical + HR rounds with
              expert feedback
            </li>
          </ul>
        </article>

        <aside
          className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-gray-200"
          aria-labelledby="quote-heading"
        >
          <h2
            id="quote-heading"
            className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#005BAC] to-[#003c6a] bg-clip-text text-transparent"
          >
            Get a Free Training Quote
          </h2>

          <div
            className="flex justify-center mb-5 gap-2"
            role="group"
            aria-label="Select training mode"
          >
            <button
              onClick={() => setMode("classroom")}
              className={`flex-1 py-2 rounded-full ${mode === "classroom" ? "bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white" : "bg-gray-100 border"}`}
              aria-pressed={mode === "classroom"}
            >
              Classroom
            </button>
            <button
              onClick={() => setMode("online")}
              className={`flex-1 py-2 rounded-full ${mode === "online" ? "bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white" : "bg-gray-100 border"}`}
              aria-pressed={mode === "online"}
            >
              Online
            </button>
          </div>

          <form
            className="flex flex-col gap-4"
            aria-label="Training quote form"
            onSubmit={handleQuoteSubmit}
          >
            <label className="sr-only" htmlFor="q-name">
              Your name
            </label>
            <input
              id="q-name"
              type="text"
              placeholder="Your Name"
              value={quoteForm.name}
              onChange={(e) =>
                setQuoteForm((f) => ({ ...f, name: e.target.value }))
              }
              className="rounded-xl bg-background px-3 py-2 border focus:ring-2 focus:ring-[#003c6a]"
            />
            <label className="sr-only" htmlFor="q-email">
              Your email
            </label>
            <input
              id="q-email"
              type="email"
              placeholder="Your Email"
              value={quoteForm.email}
              onChange={(e) =>
                setQuoteForm((f) => ({ ...f, email: e.target.value }))
              }
              className="rounded-xl bg-background px-3 py-2 border focus:ring-2 focus:ring-[#003c6a]"
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="sr-only" htmlFor="q-phone">
                  Mobile number
                </label>
                <input
                  id="q-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Mobile Number"
                  value={quoteForm.phone}
                  onChange={(e) =>
                    setQuoteForm((f) => ({
                      ...f,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    }))
                  }
                  className="rounded-xl bg-background px-3 py-2 border w-full focus:ring-2 focus:ring-[#003c6a]"
                />
              </div>
              <div className="flex-1">
                <label className="sr-only" htmlFor="q-batch">
                  Batch preference
                </label>
                <select
                  id="q-batch"
                  value={quoteForm.batch}
                  onChange={(e) =>
                    setQuoteForm((f) => ({ ...f, batch: e.target.value }))
                  }
                  className="rounded-xl bg-background px-3 py-2 border w-full focus:ring-2 focus:ring-[#003c6a]"
                >
                  <option value="" disabled>
                    How &amp; Where
                  </option>
                  <option>Morning Batch</option>
                  <option>Evening Batch</option>
                  <option>Weekend</option>
                </select>
              </div>
            </div>
            <label className="sr-only" htmlFor="q-course">
              Course
            </label>
            <input
              id="q-course"
              type="text"
              placeholder="Type Course"
              value={quoteForm.course}
              onChange={(e) =>
                setQuoteForm((f) => ({ ...f, course: e.target.value }))
              }
              className="rounded-xl bg-background px-3 py-2 border focus:ring-2 focus:ring-[#003c6a]"
            />
            <label className="sr-only" htmlFor="q-message">
              Your message
            </label>
            <textarea
              id="q-message"
              placeholder="Your Message"
              rows={1}
              value={quoteForm.message}
              onChange={(e) =>
                setQuoteForm((f) => ({ ...f, message: e.target.value }))
              }
              className="rounded-xl bg-background px-3 py-2 border focus:ring-2 focus:ring-[#003c6a]"
            />
            <button
              type="submit"
              disabled={quoteSubmitting}
              className="bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-bold px-3 py-2 rounded-xl shadow-lg disabled:opacity-70"
            >
              {quoteSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </aside>
      </section>
    </div>
  );
};

export default PlacedStudents;
