"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Syllabus from "../coursecomponent/SyllabusLocked";
import { SYLLABI } from "../coursecomponent/Syllabi";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../redux/actions/enquiryAction";
import FeedbackSection from "../common/Feedback";
import { FaLaptop, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import AutoPopupQuoteForm from "../../components/AutoPopupQuoteForm";
import GoogleStyleReviews from "../../components/GoogleStyleReviews";

const reviewHistogram = { 5: 76, 4: 18, 3: 4, 2: 1, 1: 1 };

const reviewsData = [
  {
    id: "r1",
    name: "Thennarasu S",
    rating: 5,
    date: "2025-09-20",
    text: "Good place for job seekers. 💯 placement.",
    hasPhoto: false,
  },
  {
    id: "r2",
    name: "Benjamin Andrew",
    rating: 5,
    date: "2025-09-12",
    text: "Good service and trusted organisation.",
    hasPhoto: true,
  },
  {
    id: "r3",
    name: "Sudha Selvarajan",
    rating: 5,
    date: "2025-08-30",
    text: "Best consultancy for people who seek jobs. 100% placement guaranteed.",
    hasPhoto: false,
  },
];

export default function DigitalMarketingPage() {
  const [mode, setMode] = useState("class_room");
  const course = SYLLABI.digitalmarketing;
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.enquiry || {});

  /* ===========================
     FORM STATE + VALIDATION
     =========================== */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [isQuoteOpen, setIsQuoteOpen] = useState(true);

  React.useEffect(() => {
    if (status === "succeeded" || status === "success") {
      setIsQuoteOpen(false);
    }
  }, [status]);

  // Smooth scroll target
  const formRef = useRef(null);
  const scrollToForm = () => {
    const el = formRef.current || document.getElementById("enquiry-form");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Toast options
  const toastOpts = {
    position: "top-center",
    transition: Slide,
    autoClose: 2200,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
  };

  // helpers
  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const onlyLettersSpaces = (s) =>
    s.replace(/[^A-Za-z ]+/g, "").replace(/\s{2,}/g, " ");
  const digits10 = (s) => s.replace(/\D+/g, "").slice(0, 10);

  const validateField = (name, value) => {
    const v = (value ?? "").trim();
    switch (name) {
      case "name":
        if (!v) return "Name is required.";
        if (!/^[A-Za-z ]+$/.test(v)) return "Use letters and spaces only.";
        if (v.length < 2) return "Enter at least 2 characters.";
        return null;
      case "email":
        if (!v) return "Email is required.";
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v))
          return "Enter a valid email (e.g., name@gmail.com).";
        return null;
      case "phone":
        if (!v) return "Mobile number is required.";
        if (!/^\d{10}$/.test(v)) return "Enter a valid 10-digit mobile number.";
        return null;
      case "course":
        if (!v) return "Course name is required.";
        if (!/^[A-Za-z ]+$/.test(v)) return "Use letters and spaces only.";
        if (v.length < 2) return "Enter at least 2 characters.";
        return null;
      case "message":
        if (!v) return "Message is required.";
        if (v.length > 300) return "Max 300 characters.";
        return null;
      default:
        return null;
    }
  };

  const setField = (name, value) => {
    let v = value;
    if (name === "name") v = capFirst(onlyLettersSpaces(value));
    if (name === "course") v = capFirst(onlyLettersSpaces(value));
    if (name === "phone") v = digits10(value);
    if (name === "message") {
      v = value.length ? value[0].toUpperCase() + value.slice(1) : value;
      v = v.slice(0, 300);
    }

    setForm((prev) => ({ ...prev, [name]: v }));

    const msg = validateField(name, v);
    setErrors((prev) => {
      const n = { ...prev };
      if (msg) n[name] = msg;
      else delete n[name];
      return n;
    });
  };

  const handleChange = (e) => setField(e.target.name, e.target.value);

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, form[name]);
    setErrors((prev) => ({
      ...prev,
      ...(msg ? { [name]: msg } : { [name]: undefined }),
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // touch all
    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      message: true,
    });

    // validate all
    const fields = ["name", "email", "phone", "course", "message"];
    const next = {};
    fields.forEach((f) => {
      const er = validateField(f, form[f]);
      if (er) next[f] = er;
    });
    setErrors(next);

    if (Object.keys(next).length) {
      const first = fields.find((f) => next[f]);
      const el = document.querySelector(`[name="${first}"]`);
      if (el) el.focus();
      toast.error(next[first] || "Please fix the highlighted errors.", {
        ...toastOpts,
        style: { background: "#ef4444", color: "#fff" },
        className: "rounded-xl shadow-md text-[15px] px-4 py-3",
      });
      return;
    }

    // Map to API payload
    const payload = {
      mode: (mode || "class_room").toUpperCase(), // "ONLINE" | "OFFLINE"
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.phone.trim(), // API key is 'mobile'
      course: form.course.trim(),
      message: form.message.trim(),
    };
    try {
      await dispatch(submitEnquiry(payload)).unwrap();

      toast.success("Thanks! Your enquiry has been recorded.", {
        ...toastOpts,
        style: { background: "#16a34a", color: "#fff" },
        className: "rounded-xl shadow-md text-[15px] px-4 py-3",
      });

      // reset the form
      setForm({ name: "", email: "", phone: "", course: "", message: "" });
      setErrors({});
      setTouched({});

      // ✅ close the popup immediately on success
      setIsQuoteOpen(false);
    } catch (err) {
      console.error(err);
      const msg = typeof err === "string" ? err : "Submission failed.";
      toast.error(msg, {
        ...toastOpts,
        style: { background: "#ef4444", color: "#fff" },
        className: "rounded-xl shadow-md text-[15px] px-4 py-3",
      });
    }
  }

  // ✅ SEO: JSON-LD (updates if mode changes)
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Digital Marketing Program",
    description:
      "Join our Digital Marketing Program and master SEO, Google Ads, Social Media Marketing & Analytics. Get certified and start your digital career in 3 months!",
    provider: {
      "@type": "Organization",
      name: "Vel InfoTech",
      url: "https://www.velinfotech.com/all-courses/digital-marketing-program",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: mode === "online" ? "online" : "inPerson",
      location: {
        "@type": "Place",
        name: "Vel InfoTech — Chennai & Bangalore",
        address: "Chennai, Tamil Nadu & Bangalore, Karnataka, India",
      },
    },
  };

  const courses = [
    {
      title: "SalesForce",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968914.png",
    },
    {
      title: "ServiceNow",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ServiceNow_logo.svg/512px-ServiceNow_logo.svg.png",
    },
    {
      title: "DataScienceAi",
      image: "https://cdn-icons-png.flaticon.com/512/8100/8100831.png",
    },
    {
      title: "Plsql",
      image: "https://cdn-icons-png.flaticon.com/512/603/603201.png",
    },
  ];

  return (
    <>
      <section className="w-full overflow-x-hidden bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white px-4 sm:px-6 lg:px-10 pt-32 md:pt-36 lg:pt-40 pb-10 lg:pb-14">
        {/* Toasts */}
        <ToastContainer
          newestOnTop
          limit={2}
          className="!z-[9999]"
          toastClassName={() => "rounded-xl shadow-md"}
          bodyClassName={() => "text-[15px] font-medium"}
          theme="colored"
        />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          {/* LEFT: Content */}
          <div className="w-full lg:w-[58%] lg:flex-none">
            {/* Lead line above H1 */}
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
              Join Our 100% Job Guaranteed
            </p>
            {/* H1 — Primary keyword */}
            <h1
              id="course-title"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight mb-4 text-yellow-400"
            >
              Digital Marketing Program
            </h1>

            <ul className="space-y-3 mt-5 text-base lg:text-lg leading-7">
              <li>
                ✅ Join the <strong>Top Digital Marketing Institute</strong> to
                master end-to-end online marketing skills.
              </li>
              <li>
                ✅ Learn core tools –{" "}
                <strong>
                  SEO, SEM, Google Ads, Analytics, Social Media, Content, Email,
                  Automation Tools
                </strong>
                .
              </li>
              <li>
                ✅ Work on live campaigns with{" "}
                <strong>
                  real-time strategy, budgeting, analytics, and reporting
                </strong>
                .
              </li>
              <li>
                ✅ Choose <strong>flexible learning paths</strong> – Weekday /
                Weekend / Fast-track options.
              </li>
              <li>
                ✅ Earn an industry-recognized{" "}
                <strong>Digital Marketing Certification</strong>.
              </li>
              <li>
                ✅ Career support: Mock interviews, resume building, job
                referrals & hands-on assignments.
              </li>
            </ul>

            <button
              type="button"
              onClick={scrollToForm}
              className="group relative bg-neutral-800 h-auto min-h-[64px] w-full sm:w-80 border border-white text-left p-4 text-gray-50 text-base font-bold rounded-lg overflow-hidden
                mt-8
                before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg
                after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg
                hover:decoration-2 hover:text-rose-300
                duration-500 hover:duration-500 before:duration-500 after:duration-500
                group-hover:before:duration-500 group-hover:after:duration-500
                hover:border-rose-300 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:after:-right-8"
            >
              <div>
                <span className="text-lg font-extrabold text-violet-400 block">
                  Freshers Salary:
                </span>
                ₹3 LPA to ₹8 LPA <br />
                <span className="text-sm text-gray-300">
                  | Duration: 3 Months
                </span>
              </div>
            </button>
          </div>

          {/* RIGHT: Call to Action */}
          <div className="w-full lg:w-[38%] lg:flex-none bg-white text-black p-6 rounded-xl shadow-lg lg:max-w-md lg:mt-20">
            <h2 className="text-2xl font-bold mb-4">WANT DIGITAL CAREER?</h2>
            <p className="mb-4 text-lg">
              Become a Digital Marketing Expert in 3 Months
            </p>

            <button
              type="button"
              onClick={scrollToForm}
              className="relative mt-6 px-6 py-3 overflow-hidden rounded-full border-2 border-black bg-black text-white font-semibold text-base shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 w-fit"
            >
              <span className="absolute inset-0 z-0 before:absolute before:w-full before:aspect-square before:-left-full before:-top-1/2 before:bg-emerald-500 before:rounded-full before:transition-all before:duration-700 before:ease-in-out group-hover:before:left-0 group-hover:before:scale-150 before:-z-10"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Enquire Now
              </span>
              <span className="relative z-10">
                <svg
                  className="w-8 h-8 p-2 rounded-full border border-white text-white transform rotate-45 transition-all duration-300 ease-linear group-hover:rotate-90 group-hover:bg-white group-hover:text-emerald-500 group-hover:border-white"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Info Bar */}
        <div className="w-full mt-12 bg-[#1e88e5] py-5 rounded-md shadow-md">
          <p className="text-center text-white font-bold text-xl md:text-2xl">
            Offering{" "}
            <strong>Online and Offline Digital Marketing Training</strong> in
            <strong> Chennai &amp; Bangalore</strong>
          </p>
        </div>

        {/* Course Partners Section */}
        <section className="py-16 bg-[#002855]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-xl font-semibold uppercase tracking-wide text-white">
                <span className="text-purple-400">●</span> Our Course Partners{" "}
                <span className="text-purple-400">●</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                {
                  name: "HubSpot",
                  logo: "https://cdn.worldvectorlogo.com/logos/hubspot.svg",
                  link: "https://www.hubspot.com/",
                },
                {
                  name: "GitLab",
                  logo: "https://cdn.worldvectorlogo.com/logos/gitlab.svg",
                  link: "https://about.gitlab.com/",
                },
                {
                  name: "Monday.com",
                  logo: "https://cdn.worldvectorlogo.com/logos/monday-1.svg",
                  link: "https://monday.com/",
                },
                {
                  name: "Google Cloud",
                  logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg",
                  link: "https://cloud.google.com/",
                },
                {
                  name: "AWS",
                  logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
                  link: "https://aws.amazon.com/",
                },
                {
                  name: "Salesforce",
                  logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
                  link: "https://www.salesforce.com/",
                },
                {
                  name: "IBM",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
                  link: "https://www.ibm.com/",
                },
                {
                  name: "Slack",
                  logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
                  link: "https://slack.com/",
                },
              ].map((partner, index) => (
                <motion.a
                  key={index}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-white rounded-xl p-4 flex items-center justify-center shadow-md"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* DIGITAL MARKETING OVERVIEW */}
      <section className="px-0 py-16">
        <div className="max-w-[100%] mx-auto px-4 md:px-10">
          <div className="bg-[#f7f9fb] rounded-3xl shadow-md p-6 md:p-10">
            {/* H2 */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-5">
              Overview of Digital Marketing Course
            </h2>
            <div className="w-28 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>

            <p className="text-base md:text-lg text-gray-800 mb-8 leading-relaxed text-center md:text-left">
              Our Digital Marketing Training program is designed to provide a
              360° understanding of online marketing strategies, tools, and
              analytics. Learn how to drive website traffic, generate leads,
              build brand presence, and measure campaign ROI through hands-on
              live projects.
            </p>

            {/* H3 */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
              What You’ll Learn From Digital Marketing Training
            </h3>
            <ul className="space-y-4 text-gray-800 text-base md:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Fundamentals of SEO, SEM, Google Ads, and Social Media
                Marketing.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Content creation, copywriting, and effective brand
                communication.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Google Analytics, campaign tracking, and performance reporting.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Running Facebook, Instagram, and LinkedIn Ads.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Email marketing, marketing automation, and lead nurturing.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Exposure to industry tools (Semrush, Mailchimp, Hootsuite,
                Canva).
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">➤</span>
                Career support with mock interviews, resume prep, and placement
                guidance.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Digital Marketing CTA + Cards */}
      <section className="w-full px-6 py-20 text-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Become a Certified Digital Marketing Specialist
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Learn SEO, Google Ads, Analytics, Social Media, Content, and
            Automation from industry experts.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={scrollToForm}
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
            >
              Get Started →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-gray-900">
          {/* Cards use H3 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-left hover:shadow-xl hover:scale-[1.02] transition duration-300">
            <div className="mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Course Highlights"
                className="w-10 h-10 mb-4"
              />
              <h3 className="text-lg font-extrabold mb-2">Course Highlights</h3>
              <ul className="list-disc list-inside space-y-1 text-base text-gray-700">
                <li>✓ SEO, SEM &amp; Social Media</li>
                <li>✓ Live campaign projects</li>
                <li>✓ Resume &amp; mock interview support</li>
                <li>✓ Job-oriented, industry-backed curriculum</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-left hover:shadow-xl hover:scale-[1.02] transition duration-300">
            <div className="mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                alt="Tools You’ll Master"
                className="w-10 h-10 mb-4"
              />
              <h3 className="text-lg font-extrabold mb-2">
                Tools You’ll Master
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Google Ads",
                  "Google Analytics",
                  "Semrush",
                  "Mailchimp",
                  "Facebook Ads",
                  "Instagram Ads",
                  "Hootsuite",
                  "Canva",
                  "WordPress",
                  "LinkedIn Ads",
                ].map((tool, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-base font-medium text-gray-800 ring-1 ring-gray-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-left hover:shadow-xl hover:scale-[1.02] transition duration-300">
            <div className="mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
                alt="Topics Covered"
                className="w-10 h-10 mb-4"
              />
              <h3 className="text-lg font-extrabold mb-2">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "SEO & SEM",
                  "Google Ads",
                  "Social Media Marketing",
                  "Analytics & Reporting",
                  "Content Creation",
                  "Automation Tools",
                ].map((topic, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-base font-medium text-gray-800 ring-1 ring-gray-200"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-left hover:shadow-xl hover:scale-[1.02] transition duration-300">
            <div className="mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135710.png"
                alt="Key Skills You’ll Gain"
                className="w-10 h-10 mb-4"
              />
              <h3 className="text-lg font-extrabold mb-2">
                Key Skills You’ll Gain
              </h3>
              <ul className="list-disc list-inside space-y-1 text-base text-gray-700">
                <li>Campaign planning &amp; execution</li>
                <li>SEO, SEM &amp; Social Ads management</li>
                <li>Analytics &amp; ROI measurement</li>
                <li>Content &amp; brand strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SYLLABUS (internal headings should start at H2) */}
      <Syllabus
        title={course.title}
        accent={course.accent}
        meta={course.meta}
        preview={course.preview}
        sections={course.sections}
        useExternalForm
        cardMinH={400}
        stickyOffset={110}
      />

      {/* === WHY CHOOSE US === */}
      <section
        id="why-choose-us"
        className="py-16 bg-gradient-to-r from-[#e0f7fa] to-[#f0fcff] text-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#005BAC] mb-12">
            Why Choose Us
          </h2>

          <div className="relative border-l-4 border-[#00acc1] pl-8 space-y-14">
            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Expert Trainers
              </h3>
              <p className="text-gray-600">
                Our mentors have deep industry experience and share practical,
                hands-on insights.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Flexible Learning Modes
              </h3>
              <p className="text-gray-600">
                Learn in-person or online with weekday, weekend, and fast-track
                options.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Job-Ready Curriculum
              </h3>
              <p className="text-gray-600">
                Real projects, labs, and interview prep aligned to what
                employers expect.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-[#00acc1] rounded-full border-4 border-white"></div>
              <h3 className="text-xl font-semibold text-[#005BAC] mb-1">
                Career Support
              </h3>
              <p className="text-gray-600">
                Resume building, mock interviews, and placement assistance with
                hiring partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <GoogleStyleReviews
        title="What Our Students Say"
        orgName="Vel InfoTech"
        overallRating={4.8}
        total={1543}
        histogram={reviewHistogram}
        reviews={reviewsData}
        viewAllHref="/reviews"
        writeHref="/contact-us#enquiry-form"
      />

      {/* === FAQ === */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c6a] text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5">
              <summary className="cursor-pointer font-semibold text-[#003c6a] list-none">
                <h3 className="inline text-lg">
                  Is this course suitable for absolute beginners?
                </h3>
              </summary>
              <p className="mt-3 text-gray-700">
                Yes. We start from Core Java basics and gradually move to Spring
                Boot, REST APIs, and React.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5">
              <summary className="cursor-pointer font-semibold text-[#003c6a] list-none">
                <h3 className="inline text-lg">
                  Do you provide placement assistance?
                </h3>
              </summary>
              <p className="mt-3 text-gray-700">
                We offer resume support, mock interviews, and placement
                assistance with hiring partners.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5">
              <summary className="cursor-pointer font-semibold text-[#003c6a] list-none">
                <h3 className="inline text-lg">
                  What are the class modes and timings?
                </h3>
              </summary>
              <p className="mt-3 text-gray-700">
                Both online and classroom batches with
                weekday/weekend/fast-track options.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5">
              <summary className="cursor-pointer font-semibold text-[#003c6a] list-none">
                <h3 className="inline text-lg">Will I build real projects?</h3>
              </summary>
              <p className="mt-3 text-gray-700">
                Yes. You’ll work on guided labs and a capstone project covering
                APIs, DB integration, and a React UI.
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5">
              <summary className="cursor-pointer font-semibold text-[#003c6a] list-none">
                <h3 className="inline text-lg">Do I get a certificate?</h3>
              </summary>
              <p className="mt-3 text-gray-700">
                Yes, a course completion certificate is provided. Project
                performance is also highlighted.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="w-full px-6 py-20 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10">
          {/* LEFT: Additional Info Boxes */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-gray-900">
              <h3 className="text-xl font-bold mb-2">
                Comprehensive Curriculum
              </h3>
              <p className="text-black/90">
                Master Digital Marketing with modules covering SEO, SEM, Social
                Media, Analytics, Automation, and more.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-gray-900">
              <h3 className="text-xl font-bold mb-2">
                Career-Oriented Training
              </h3>
              <p className="text-black/90">
                Learn from digital leaders. Includes mock interviews, resume
                prep, and job assistance.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-gray-900">
              <h3 className="text-xl font-bold mb-2">100% Job Guarantee</h3>
              <p className="text-black/90">
                We assure placement support post training with strong partner
                network and hiring drives.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-gray-900">
              <h3 className="text-xl font-bold mb-2">Hands-On Projects</h3>
              <p className="text-black/90">
                Gain experience by running real campaigns and digital projects
                as part of your learning journey.
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="w-full max-w-lg" ref={formRef}>
            <div className="bg-white p-8 rounded-[30px] shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold text-center text-[#003c6a] mb-5">
                Get a Free Training Quote
              </h2>

              {/* Mode Toggle */}
              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={() => setMode("class_room")}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                    mode === "class_room"
                      ? "bg-[#003c6a] text-white"
                      : "bg-white text-[#003c6a] border border-[#003c6a]"
                  }`}
                >
                  <FaChalkboardTeacher className="text-base" /> Class Room
                </button>
                <button
                  onClick={() => setMode("online")}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                    mode === "online"
                      ? "bg-[#003c6a] text-white"
                      : "bg-white text-[#003c6a] border border-[#003c6a]"
                  }`}
                >
                  <FaLaptop className="text-base" /> Online
                </button>
              </div>

              <form
                id="enquiry-form"
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 gap-2"
              >
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.name}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.name && errors?.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="h-3 mt-0.5">
                    {touched?.name && errors?.name && (
                      <p className="text-red-600 text-xs">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.email}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.email && errors?.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="h-3 mt-0.5">
                    {touched?.email && errors?.email && (
                      <p className="text-red-600 text-xs">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.phone}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.phone && errors?.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="h-3 mt-0.5">
                    {touched?.phone && errors?.phone && (
                      <p className="text-red-600 text-xs">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Course (dropdown select) */}
                <div>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.course}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm focus:ring-2 outline-none text-gray-900",
                      touched?.course && errors?.course
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  >
                    <option value="">Select Course</option>
                    {[
                      "Java",
                      "Python",
                      "Full Stack Development",
                      "PL/SQL",
                      "SQL",
                      "Data Science",
                      "Business Analytics",
                      "Data Science & AI",
                      "Big Data Developer",
                      "Software Testing",
                      "Selenium Testing",
                      "ETL Testing",
                      "AWS Training",
                      "DevOps",
                      "Hardware Networking",
                      "Cyber Security",
                      "SAP",
                      "Salesforce",
                      "ServiceNow",
                      "RPA (Robotic Process Automation)",
                      "Production Support",
                      "Digital Marketing",
                      "Soft Skill Training",
                      "Scrum Master",
                      "Business Analyst",
                      "Product Management",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <div className="h-3 mt-0.5">
                    {touched?.course && errors?.course && (
                      <p className="text-red-600 text-xs">{errors.course}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={2}
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors?.message}
                    className={[
                      "w-full rounded-xl px-4 py-2.5 bg-[#edf2f7] border text-sm resize-none focus:ring-2 outline-none text-gray-900 placeholder:text-gray-500",
                      touched?.message && errors?.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#b6c3d1] focus:border-[#003c6a] focus:ring-[#003c6a]",
                    ].join(" ")}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-0.5">
                    <span>First letter auto-caps</span>
                    <span>{form.message.length}/300</span>
                  </div>
                  <div className="h-3 mt-0.5">
                    {touched?.message && errors?.message && (
                      <p className="text-red-600 text-xs">{errors.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full mt-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-semibold text-sm hover:from-[#0891b2] hover:to-[#16bca7] transition ${
                    status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {status === "loading" ? "Submitting..." : "Submit"}
                </button>

                {/* Optional server error */}
                {error && (
                  <p className="text-red-600 text-xs mt-1">
                    Submission failed: {String(error)}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section id="popular-courses" className="bg-[#eaf5fd] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#003c6a] mb-4">
            Popular Courses
          </h2>
          <p className="text-gray-700 text-lg">
            We present to you the most popular courses recommended by experts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <Link
              href={`/all-courses/${encodeURIComponent(course.title)}`}
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-16 h-16 mb-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <h3 className="text-md font-bold text-gray-800 text-center">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500">Online | Offline</p>

              <div className="flex items-center justify-center gap-1 text-sm mt-2 text-gray-600">
                <FaUserGraduate className="text-gray-500" />
                <span>
                  {Math.floor(Math.random() * 5000 + 10000).toLocaleString()}+
                  Learners
                </span>
              </div>

              <div className="flex justify-center items-center mt-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeedbackSection />

      <AutoPopupQuoteForm
        status={status}
        error={error}
        mode={mode}
        setMode={setMode}
        form={form}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
