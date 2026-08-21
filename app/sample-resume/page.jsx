"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { submitEnquiry } from "../../redux/actions/enquiryAction";
import AutoPopupQuoteForm from "../../components/AutoPopupQuoteForm";

/* =========================================================
   SAMPLE RESUMES
========================================================= */

const resumes = [
  {
    id: 1,
    category: "Java Developer",
    file: "/resumes/Java Developer-1.pdf",
  },
  {
    id: 2,
    category: "Java Developer",
    file: "/resumes/Java Developer-2.pdf",
  },
  {
    id: 3,
    category: "Data Analyst",
    file: "/resumes/Data Analyst-1.pdf",
  },
  {
    id: 4,
    category: "Data Analyst",
    file: "/resumes/Data Analyst-2.pdf",
  },
  {
    id: 5,
    category: "Testing",
    file: "/resumes/Test Engineer-1.pdf",
  },
  {
    id: 6,
    category: "Testing",
    file: "/resumes/Test Engineer-2.pdf",
  },
];

const categories = ["All", "Java Developer", "Data Analyst", "Testing"];

/* =========================================================
   COMPONENT
========================================================= */

export default function SampleResume() {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.enquiry || {});

  /* =========================================================
     PAGE STATE
  ========================================================= */

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedResume, setSelectedResume] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const [registered, setRegistered] = useState(false);

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [mode, setMode] = useState("class_room");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  /* =========================================================
     CHECK WHETHER FORM WAS ALREADY SUBMITTED

     First successful registration:
     resumeRegistered = true

     After that:
     popup will not appear again.
  ========================================================= */

  useEffect(() => {
    const value = localStorage.getItem("resumeRegistered");

    if (value === "true") {
      setRegistered(true);
    }
  }, []);

  /* =========================================================
     FILTER RESUMES
  ========================================================= */

  const filteredResumes =
    selectedCategory === "All"
      ? resumes
      : resumes.filter((resume) => resume.category === selectedCategory);

  /* =========================================================
     DOWNLOAD
  ========================================================= */

  const downloadResume = (resume) => {
    if (!resume?.file) return;

    const link = document.createElement("a");

    link.href = resume.file;

    link.download = resume.file.split("/").pop();

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* =========================================================
     DOWNLOAD BUTTON CLICK
  ========================================================= */

  const handleDownload = (resume) => {
    /*
     * User already submitted
     * the popup successfully.
     */
    if (registered) {
      downloadResume(resume);
      return;
    }

    /*
     * First attempt:
     * popup is mandatory.
     */
    setSelectedResume(resume);
    setShowPopup(true);
  };

  /* =========================================================
     FIELD VALIDATION
  ========================================================= */

  const validateField = (name, value) => {
    const val = (value ?? "").trim();

    switch (name) {
      case "name":
        if (!val) {
          return "Name is required.";
        }

        if (!/^[A-Za-z ]+$/.test(val)) {
          return "Use letters and spaces only.";
        }

        if (val.length < 2) {
          return "Enter at least 2 characters.";
        }

        return null;

      case "email":
        if (!val) {
          return "Email is required.";
        }

        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val)) {
          return "Enter a valid email.";
        }

        return null;

      case "phone":
        if (!val) {
          return "Mobile number is required.";
        }

        if (!/^[6-9]\d{9}$/.test(val)) {
          return "Enter a valid 10-digit mobile number.";
        }

        return null;

      case "course":
        if (!val) {
          return "Course is required.";
        }

        return null;

      case "message":
        if (!val) {
          return "Message is required.";
        }

        if (val.length > 300) {
          return "Maximum 300 characters.";
        }

        return null;

      default:
        return null;
    }
  };

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    /*
     * Name
     */
    if (name === "name") {
      newValue = value.replace(/[^A-Za-z ]/g, "").replace(/\s{2,}/g, " ");
    }

    /*
     * Phone
     */
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    /*
     * Message
     */
    if (name === "message") {
      newValue = value.slice(0, 300);
    }

    setForm((previous) => ({
      ...previous,
      [name]: newValue,
    }));

    const validationError = validateField(name, newValue);

    setErrors((previous) => {
      const nextErrors = {
        ...previous,
      };

      if (validationError) {
        nextErrors[name] = validationError;
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  /* =========================================================
     HANDLE BLUR
  ========================================================= */

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    const validationError = validateField(name, form[name]);

    setErrors((previous) => {
      const nextErrors = {
        ...previous,
      };

      if (validationError) {
        nextErrors[name] = validationError;
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  /* =========================================================
     SUBMIT FORM
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = ["name", "email", "phone", "course", "message"];

    /*
     * Mark all fields touched.
     */
    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      message: true,
    });

    /*
     * Validate everything.
     */
    const validationErrors = {};

    fields.forEach((field) => {
      const validationError = validateField(field, form[field]);

      if (validationError) {
        validationErrors[field] = validationError;
      }
    });

    setErrors(validationErrors);

    /*
     * Stop when errors exist.
     */
    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidField = fields.find((field) => validationErrors[field]);

      const element = document.querySelector(`[name="${firstInvalidField}"]`);

      if (element) {
        element.focus();
      }

      return;
    }

    /*
     * Save selected resume now,
     * before async API submission.
     */
    const resumeToDownload = selectedResume;

    const payload = {
      mode: (mode || "class_room").toUpperCase(),

      name: form.name.trim(),

      email: form.email.trim(),

      mobile: form.phone.trim(),

      course: form.course.trim(),

      message: form.message.trim(),
    };

    try {
      /*
       * EXISTING WORKING
       * ENQUIRY API
       */
      await dispatch(submitEnquiry(payload)).unwrap();

      /*
       * Registration completed.
       */
      localStorage.setItem("resumeRegistered", "true");

      setRegistered(true);

      /*
       * Close popup.
       */
      setShowPopup(false);

      /*
       * Clear form.
       */
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });

      setErrors({});
      setTouched({});

      /*
       * Download selected PDF.
       */
      if (resumeToDownload) {
        setTimeout(() => {
          downloadResume(resumeToDownload);
        }, 150);
      }

      setSelectedResume(null);
    } catch (submitError) {
      console.error("Resume enquiry failed:", submitError);
    }
  };

  /* =========================================================
     POPUP OPEN / CLOSE
  ========================================================= */

  const handlePopupChange = (nextOpen) => {
    setShowPopup(nextOpen);

    /*
     * User manually closed popup.
     */
    if (!nextOpen) {
      setSelectedResume(null);
      setErrors({});
      setTouched({});
    }
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <>
      <main className="min-h-screen w-full bg-gray-100 pt-[110px] sm:pt-[120px] md:pt-[160px] lg:pt-[165px] pb-12 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8" >
        <div className=" w-full max-w-[1400px] mx-auto " >
          {/* =================================================
              TITLE
          ================================================= */}

          <div className="text-center mb-7 md:mb-9" >
            <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold text-[#021733] leading-tight " >
              Sample Resumes
            </h1>

            <p className=" mt-2 text-sm sm:text-base text-gray-600">
              Download sample resumes for popular IT job roles.
            </p>
          </div>

          {/* =================================================
              CATEGORY FILTER
          ================================================= */}

          <div className=" flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-10" >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={` px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg font-medium whitespace-nowrap transition-all
                    ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }
                  `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* =================================================
              RESUME CARDS
          ================================================= */}

          <div
            className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 w-full " >
            {filteredResumes.length > 0 ? (
              filteredResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl shadow-lg min-h-[225px] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
                  {/* PDF ICON */}

                  <div
                    className=" w-14 h-14 flex items-center justify-center bg-red-50 rounded-xl mb-4 " >
                    <span className="text-3xl">📄</span>
                  </div>

                  {/* TITLE */}

                  <h2
                    className=" text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-snug" >
                    {resume.title}
                  </h2>

                  {/* CATEGORY */}

                  <p
                    className=" text-sm sm:text-base text-gray-600 mb-5 " >
                    {resume.category}
                  </p>

                  {/* DOWNLOAD */}

                  <button
                    type="button"
                    onClick={() => handleDownload(resume)}
                    className=" mt-auto min-w-[150px] px-6 py-3 bg-[#005BAC] text-white rounded-lg font-semibold hover:bg-[#003c6a] transition " >
                    Download
                  </button>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10 " >
                No resumes found in this category.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* =====================================================
          EXISTING WORKING POPUP
      ====================================================== */}

      <AutoPopupQuoteForm
        isOpen={showPopup}
        onOpenChange={handlePopupChange}
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

      {/* =====================================================
          TOAST
      ====================================================== */}

      <ToastContainer
        newestOnTop
        limit={2}
        className="!z-[999999]"
        toastClassName={() => "rounded-xl shadow-md"}
        bodyClassName={() => "text-[15px] font-medium"}
        theme="colored"
      />
    </>
  );
}
