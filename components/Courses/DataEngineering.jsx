"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../redux/actions/enquiryAction";
import FeedbackSection from "../common/Feedback";
import {
  FaLaptop,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import AutoPopupQuoteForm from "../../components/AutoPopupQuoteForm";
import GoogleStyleReviews from "../../components/GoogleStyleReviews";

/* =========================================================
   REVIEWS
========================================================= */

const reviewHistogram = {
  5: 76,
  4: 18,
  3: 4,
  2: 1,
  1: 1,
};

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

/* =========================================================
   COURSE PARTNERS
   Replace these with approved company logos when you receive
   the final list from Esther Mam.
========================================================= */

const partners = [
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
];

/* =========================================================
   WHAT YOU WILL LEARN
========================================================= */

const learningPoints = [
  "Understand Data Engineering, Big Data & Data Lifecycle",
  "Master Python, NumPy & Pandas for data processing",
  "Work with MySQL, SQL & MongoDB databases",
  "Learn Apache Hadoop & Apache Spark for Big Data processing",
  "Build knowledge of AWS & Azure Cloud Platforms",
  "Work with AWS services such as S3, EC2, Redshift, Glue & EMR",
  "Explore Kafka, Airflow, Snowflake, Informatica & Hive",
  "Understand ETL/ELT, data pipelines, data warehousing & distributed processing",
];

/* =========================================================
   SYLLABUS
========================================================= */

const syllabusModules = [
  {
    module: "Module 1",
    title: "Introduction to Data and Opportunities",
    topics: [
      "What is Data? – Structured, Semi-structured and Unstructured Data",
      "Data Lifecycle – Capture, Store, Process, Analyze and Visualize",
      "Big Data and its characteristics – Volume, Variety and Velocity",
      "Career paths in Data Engineering",
      "Real-world use cases of Data Engineering",
    ],
  },
  {
    module: "Module 2",
    title: "Python for Data Engineering",
    topics: [
      "Introduction to Python Programming",
      "Variables, Data Types and Operators",
      "Control Flow – if/else and loops",
      "Functions",
      "Data Structures in Python",
      "Lists, Tuples, Dictionaries and Sets",
      "NumPy – Numerical Computing",
      "Pandas – Data Analysis",
      "OOP Concepts",
    ],
  },
  {
    module: "Module 3",
    title: "Databases",
    topics: [
      "Introduction to Database Systems",
      "Relational Databases vs NoSQL Databases",
      "Normalization – 1NF, 2NF, 3NF and Boyce-Codd Normal Form",
      "SQL Fundamentals",
      "SELECT, INSERT, UPDATE and DELETE",
      "JOIN Operations – INNER JOIN, LEFT JOIN and more",
      "WHERE clauses and filtering data",
    ],
  },
  {
    module: "Module 4",
    title: "MySQL",
    topics: [
      "Introduction to MySQL",
      "Why Normalization is required",
      "First, Second and Third Normal Forms",
      "Boyce-Codd Normal Form",
      "Creating and Managing Databases",
      "Working with Tables, Columns and Data Types",
      "Writing SQL queries to retrieve, manipulate and analyze data",
      "Hands-on Labs with MySQL Workbench",
    ],
  },
  {
    module: "Module 5",
    title: "MongoDB",
    topics: [
      "Introduction to MongoDB",
      "JSON data format and working with documents",
      "CRUD Operations – Create, Read, Update and Delete",
      "Querying data using MongoDB Query Language",
      "Hands-on Labs with MongoDB Compass",
    ],
  },
  {
    module: "Module 6",
    title: "Big Data Technologies",
    topics: [
      "Introduction to Big Data Processing",
      "Need for distributed computing frameworks",
      "Apache Hadoop Ecosystem",
      "HDFS, YARN and MapReduce – High-Level Overview",
      "Apache Spark for large-scale data processing",
      "Spark Basics",
    ],
  },
  {
    module: "Module 7",
    title: "Introduction to Cloud Platforms",
    topics: [
      "Benefits of using Cloud Platforms for Data Engineering",
      "Introduction to Microsoft Azure",
      "Introduction to Amazon Web Services – AWS",
    ],
  },
  {
    module: "Module 9",
    title: "AWS Data Services",
    topics: [
      "Introduction to AWS Services for Data Engineering",
      "Amazon EC2 and S3",
      "Amazon S3 for Object Storage",
      "Amazon Redshift for Data Warehousing",
      "AWS Glue for ETL/ELT Jobs",
      "Amazon EMR for Hadoop and Spark Distributed Processing",
    ],
  },
  {
    module: "Module 10",
    title: "Additional Data Engineering Technologies",
    topics: [
      "Apache Kafka – Distributed Streaming Platform",
      "Apache Airflow – Workflow Orchestration and Scheduling",
      "Snowflake – Cloud-based Data Warehouse",
      "Informatica – Data Integration and ETL/ELT Platform",
      "Hive – Data Warehouse Framework for Hadoop",
    ],
  },
];

/* =========================================================
   CAREER ROLES
========================================================= */

const careerRoles = [
  "Data Engineer",
  "ETL Developer",
  "Big Data Engineer",
  "Cloud Data Engineer",
  "Data Pipeline Developer",
  "AWS Data Engineer",
];

/* =========================================================
   FAQ
========================================================= */

const faqData = [
  {
    question: "What is a Data Engineering course?",
    answer:
      "A Data Engineering course teaches you how to collect, process, transform, store, and manage data using programming languages, databases, Big Data frameworks, cloud platforms, and data pipeline technologies.",
  },
  {
    question: "Who can join the Data Engineering course in Chennai?",
    answer:
      "The course is suitable for fresh graduates, working professionals, career switchers, IT professionals, and beginners who want to develop practical Data Engineering skills.",
  },
  {
    question: "Is this Data Engineering course suitable for beginners?",
    answer:
      "Yes. The training starts with fundamentals of data and Python programming before progressing to SQL, databases, Big Data, cloud services, and advanced Data Engineering technologies.",
  },
  {
    question:
      "What technologies are covered in the Data Engineering training?",
    answer:
      "The course covers Python, NumPy, Pandas, SQL, MySQL, MongoDB, Hadoop, Apache Spark, AWS, Azure, Kafka, Airflow, Snowflake, Informatica, and Hive.",
  },
  {
    question: "Will I learn Python for Data Engineering?",
    answer:
      "Yes. You will learn Python fundamentals, control flow, functions, data structures, OOP concepts, NumPy, and Pandas, with practical applications related to data processing.",
  },
  {
    question: "Does the course include SQL and database training?",
    answer:
      "Yes. The program provides practical training in SQL, MySQL, relational database concepts, normalization, joins, CRUD operations, filtering, and data manipulation. MongoDB is also covered for NoSQL database concepts.",
  },
  {
    question: "Does the course cover Big Data technologies?",
    answer:
      "Yes. You will learn the fundamentals of Hadoop, HDFS, YARN, MapReduce, and Apache Spark and understand how distributed systems process large volumes of data.",
  },
  {
    question: "Is Cloud Data Engineering included?",
    answer:
      "Yes. The course introduces AWS and Microsoft Azure and focuses on AWS services commonly used in Data Engineering, including Amazon S3, EC2, Redshift, AWS Glue, and EMR.",
  },
  {
    question: "What AWS services are taught in this course?",
    answer:
      "The AWS module covers Amazon S3 for storage, EC2 for computing, Redshift for data warehousing, AWS Glue for ETL/ELT, and Amazon EMR for distributed data processing.",
  },
  {
    question: "Will I learn how to build data pipelines?",
    answer:
      "Yes. The course introduces ETL/ELT workflows, data processing, pipeline concepts, and workflow orchestration, including an introduction to Apache Airflow.",
  },
  {
    question:
      "Are Kafka, Airflow, Snowflake, Informatica, and Hive included?",
    answer:
      "Yes. These technologies are introduced as part of the additional Data Engineering technologies module, helping learners understand their industry applications and use cases.",
  },
  {
    question: "Does the Data Engineering course include practical training?",
    answer:
      "Yes. The program includes hands-on exercises and labs using Python, MySQL, MongoDB, Big Data technologies, and AWS services, along with project-based learning.",
  },
  {
    question: "Is there a project included in the Data Engineering training?",
    answer:
      "Yes. Learners work on an end-to-end Data Engineering project that helps them understand how different technologies can be combined to solve practical data problems.",
  },
  {
    question: "How long is the Data Engineering course?",
    answer:
      "The training is structured across 43 days, covering technical modules, practical learning, project preparation, resume preparation, and mock interviews.",
  },
  {
    question: "Does the course include mock interviews?",
    answer:
      "Yes. The program includes three mock interviews covering Big Data, MySQL & MongoDB, AWS & Python, and overall Data Engineering concepts.",
  },
  {
    question: "Will the institute help with resume preparation?",
    answer:
      "Yes. The course includes Data Engineering resume preparation and project explanation guidance to help learners present their technical skills effectively during interviews.",
  },
  {
    question:
      "Is placement assistance available after completing the course?",
    answer:
      "Yes. The program provides placement assistance, interview preparation, resume support, and mock interviews to help learners prepare for relevant job opportunities.",
  },
  {
    question:
      "What jobs can I apply for after completing Data Engineering training?",
    answer:
      "Depending on your skills and experience, you can explore roles such as Data Engineer, Cloud Data Engineer, ETL Developer, Big Data Engineer, Data Pipeline Developer, and AWS Data Engineer.",
  },
  {
    question: "Is this course useful for career switchers?",
    answer:
      "Yes. The structured learning path helps professionals from related technical backgrounds build skills in Python, SQL, databases, Big Data, cloud platforms, and modern Data Engineering tools.",
  },
  {
    question: "Why choose a Data Engineering course in Chennai?",
    answer:
      "A structured classroom or practical training program in Chennai can provide guided learning, hands-on practice, project exposure, interview preparation, and direct trainer support, helping learners build job-ready Data Engineering skills.",
  },
];

/* =========================================================
   POPULAR COURSES
========================================================= */

const popularCourses = [
  {
    title: "Data Science",
    slug: "data-science-training-course",
    image: "https://cdn-icons-png.flaticon.com/512/8649/8649623.png",
    learners: "12,500+",
  },
  {
    title: "Data Science & AI",
    slug: "data-science-and-ai-course",
    image: "https://cdn-icons-png.flaticon.com/512/8100/8100831.png",
    learners: "11,800+",
  },
  {
    title: "Big Data Developer",
    slug: "big-data-developer-course",
    image: "https://cdn-icons-png.flaticon.com/512/4354/4354656.png",
    learners: "10,900+",
  },
  {
    title: "AWS Training",
    slug: "aws-training-program",
    image: "https://cdn-icons-png.flaticon.com/512/873/873120.png",
    learners: "13,200+",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function DataEngineeringCoursePage() {
  const [mode, setMode] = useState("class_room");

  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.enquiry || {});

  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Data Engineering",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* =========================================================
     SCROLL TO FORM
  ========================================================= */

  const scrollToForm = () => {
    const element =
      formRef.current || document.getElementById("enquiry-form");

    if (!element) return;

    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      100;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  /* =========================================================
     TOAST
  ========================================================= */

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

  /* =========================================================
     VALIDATION
  ========================================================= */

  const capFirst = (value) =>
    value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value;

  const onlyLettersSpaces = (value) =>
    value
      .replace(/[^A-Za-z ]+/g, "")
      .replace(/\s{2,}/g, " ");

  const digits10 = (value) =>
    value.replace(/\D+/g, "").slice(0, 10);

  const validateField = (name, value) => {
    const v = (value ?? "").trim();

    switch (name) {
      case "name":
        if (!v) return "Name is required.";

        if (!/^[A-Za-z ]+$/.test(v))
          return "Use letters and spaces only.";

        if (v.length < 2)
          return "Enter at least 2 characters.";

        return null;

      case "email":
        if (!v) return "Email is required.";

        if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
            v
          )
        ) {
          return "Enter a valid email.";
        }

        return null;

      case "phone":
        if (!v) return "Mobile number is required.";

        if (!/^\d{10}$/.test(v))
          return "Enter a valid 10-digit mobile number.";

        return null;

      case "course":
        if (!v) return "Course name is required.";

        return null;

      case "message":
        if (!v) return "Message is required.";

        if (v.length > 300)
          return "Maximum 300 characters.";

        return null;

      default:
        return null;
    }
  };

  const setField = (name, value) => {
    let v = value;

    if (name === "name") {
      v = capFirst(onlyLettersSpaces(value));
    }

    if (name === "phone") {
      v = digits10(value);
    }

    if (name === "message") {
      v = value.length
        ? value[0].toUpperCase() + value.slice(1)
        : value;

      v = v.slice(0, 300);
    }

    setForm((previous) => ({
      ...previous,
      [name]: v,
    }));

    const validationMessage = validateField(name, v);

    setErrors((previous) => {
      const nextErrors = {
        ...previous,
      };

      if (validationMessage) {
        nextErrors[name] = validationMessage;
      } else {
        delete nextErrors[name];
      }

      return nextErrors;
    });
  };

  const handleChange = (event) => {
    setField(event.target.name, event.target.value);
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    const validationMessage = validateField(
      name,
      form[name]
    );

    setErrors((previous) => ({
      ...previous,
      ...(validationMessage
        ? {
            [name]: validationMessage,
          }
        : {
            [name]: undefined,
          }),
    }));
  };

  /* =========================================================
     SUBMIT ENQUIRY
  ========================================================= */

  async function handleSubmit(event) {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      message: true,
    });

    const fields = [
      "name",
      "email",
      "phone",
      "course",
      "message",
    ];

    const validationErrors = {};

    fields.forEach((field) => {
      const validationMessage = validateField(
        field,
        form[field]
      );

      if (validationMessage) {
        validationErrors[field] =
          validationMessage;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      const firstField = fields.find(
        (field) => validationErrors[field]
      );

      const element = document.querySelector(
        `[name="${firstField}"]`
      );

      if (element) {
        element.focus();
      }

      toast.error(
        validationErrors[firstField] ||
          "Please fix the highlighted errors.",
        {
          ...toastOpts,
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        }
      );

      return;
    }

    const payload = {
      mode: (mode || "class_room").toUpperCase(),
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.phone.trim(),
      course: form.course.trim(),
      message: form.message.trim(),
    };

    try {
      await dispatch(
        submitEnquiry(payload)
      ).unwrap();

      toast.success(
        "Thanks! Your enquiry has been recorded.",
        {
          ...toastOpts,
          style: {
            background: "#16a34a",
            color: "#fff",
          },
        }
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "Data Engineering",
        message: "",
      });

      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);

      const message =
        typeof err === "string"
          ? err
          : "Submission failed.";

      toast.error(message, {
        ...toastOpts,
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  }

  /* =========================================================
     JSON LD
  ========================================================= */

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Data Engineering Course in Chennai",
    description:
      "Practical Data Engineering training covering Python, SQL, databases, Big Data, AWS, Azure, ETL, data pipelines and cloud Data Engineering technologies.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Vell InfoTech",
      url: "https://www.vellinfotech.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode:
        mode === "online"
          ? "online"
          : "inPerson",
      location: {
        "@type": "Place",
        name: "Vell InfoTech Chennai",
        address:
          "Chennai, Tamil Nadu, India",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd),
        }}
      />

      <main className="w-full overflow-x-hidden">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="w-full bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white px-4 sm:px-6 lg:px-8 2xl:px-12 pt-[84px] md:pt-[190px] pb-20">

          <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-12 xl:gap-16">

            {/* LEFT */}

            <div className="w-full min-w-0">

              <p className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold leading-tight mb-2">
                Join Our 100% Job Guaranteed
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 text-yellow-400">
                Data Engineering Course
              </h1>

              <ul className="mt-6 space-y-3 text-base leading-7 sm:text-lg sm:leading-8">

                <li>
                  ✅ Join the{" "}
                  <strong>
                    Best Data Engineering Institute
                  </strong>{" "}
                  to master data pipelines, cloud
                  platforms and Big Data technologies.
                </li>

                <li>
                  ✅ Learn industry-demand technologies –{" "}
                  <strong>
                    Python, SQL, PySpark, Apache Spark,
                    Databricks, AWS & Azure
                  </strong>
                  .
                </li>

                <li>
                  ✅ Work on real-world projects with
                  hands-on{" "}
                  <strong>
                    ETL, data pipelines, data warehousing
                    & cloud data engineering
                  </strong>
                  .
                </li>

                <li>
                  ✅ Choose flexible learning modes –{" "}
                  <strong>
                    Weekday / Weekend / Fast-track
                  </strong>
                  .
                </li>

                <li>
                  ✅ Earn a career-focused{" "}
                  <strong>
                    Data Engineering Certification
                  </strong>
                  .
                </li>

                <li>
                  ✅ Career support:{" "}
                  <strong>
                    Resume building, mock interviews &
                    job assistance
                  </strong>
                  .
                </li>
              </ul>

              <button
                type="button"
                onClick={scrollToForm}
                className="group relative bg-neutral-800 min-h-[64px] w-full sm:w-80 border border-white text-left p-4 text-gray-50 font-bold rounded-lg overflow-hidden mt-8 hover:text-rose-300 hover:border-rose-300 transition"
              >
                <span className="text-lg font-extrabold text-violet-400 block">
                  Data Engineering Training
                </span>

                Hands-On Learning

                <br />

                <span className="text-sm text-gray-300">
                  Duration: 43 Days
                </span>
              </button>

            </div>

            {/* RIGHT */}

            <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-5 text-black shadow-lg sm:p-6 lg:mx-0 lg:max-w-none lg:p-8">

              <h2 className="text-2xl font-bold mb-4">
                WANT IT JOB?
              </h2>

              <p className="mb-4 text-lg">
                Become a Job-Ready Data Engineer
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="mt-6 px-7 py-4 rounded-full bg-black text-white font-semibold hover:bg-emerald-500 hover:text-black transition"
              >
                Enquire Now →
              </button>

            </div>

          </div>

          {/* INFO BAR */}

          <div className="mx-auto mt-10 w-full max-w-[1800px] rounded-md bg-[#1e88e5] px-4 py-5 shadow-md">

            <p className="text-center text-base font-bold text-white sm:text-xl lg:text-2xl">
              Offering{" "}
              <strong>
                Online and Offline Data Engineering
                Course and Training in Chennai
              </strong>
            </p>

          </div>

        </section>

        {/* =====================================================
            COURSE PARTNERS
        ====================================================== */}

        <section className="py-16 bg-[#002855]">

          <div className="max-w-7xl mx-auto px-4">

            <h2 className="text-center text-xl font-semibold uppercase tracking-wide text-white mb-10">
              <span className="text-purple-400">
                ●
              </span>{" "}
              Our Course Partners{" "}
              <span className="text-purple-400">
                ●
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

              {partners.map(
                (partner, index) => (
                  <motion.a
                    key={index}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="bg-white rounded-xl p-4 flex items-center justify-center shadow-md"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 object-contain"
                    />
                  </motion.a>
                )
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            OVERVIEW
        ====================================================== */}

        <section className="px-4 md:px-10 py-16 bg-white">

          <div className="max-w-7xl mx-auto">

            <div className="bg-[#f7f9fb] rounded-3xl shadow-md p-6 md:p-10">

              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-5">
                Overview of Data Engineering Course
              </h2>

              <div className="w-28 h-1 bg-blue-600 mx-auto mb-8 rounded-full" />

              <h3 className="text-xl md:text-2xl font-bold text-[#005BAC] mb-4">
                Data Engineering Course – Overview
              </h3>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-10">
                The Data Engineering Course is a
                practical, career-focused program
                designed to build expertise in Python,
                SQL, databases, Big Data, cloud
                platforms, ETL, data pipelines and
                modern Data Engineering technologies.
                The course takes learners from
                fundamental data concepts to real-world
                Data Engineering workflows.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
                What You&apos;ll Learn
              </h3>

              <ul className="space-y-4">

                {learningPoints.map(
                  (point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-base md:text-lg text-gray-800"
                    >
                      <span className="text-purple-600">
                        ➤
                      </span>

                      {point}
                    </li>
                  )
                )}

              </ul>

            </div>

          </div>

        </section>

        {/* =====================================================
            HANDS ON + CAREER PREPARATION
        ====================================================== */}

        <section className="px-6 py-16 bg-gradient-to-b from-[#005BAC] to-[#003c6a]">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

            <div className="bg-white rounded-3xl p-7 shadow-lg">

              <h3 className="text-2xl font-bold text-[#003c6a] mb-4">
                Hands-On Learning
              </h3>

              <p className="text-gray-700 leading-7">
                Gain practical experience through SQL,
                Python, MySQL, MongoDB, Big Data and AWS
                labs, along with real-world Data
                Engineering projects and pipeline-based
                exercises.
              </p>

            </div>

            <div className="bg-white rounded-3xl p-7 shadow-lg">

              <h3 className="text-2xl font-bold text-[#003c6a] mb-4">
                Career Preparation
              </h3>

              <p className="text-gray-700 leading-7">
                Resume preparation, project explanation,
                technical interview preparation, mock
                interviews and placement assistance are
                included to help learners confidently
                pursue Data Engineering careers.
              </p>

            </div>

            <div className="bg-white rounded-3xl p-7 shadow-lg">

              <h3 className="text-2xl font-bold text-[#003c6a] mb-4">
                Career Opportunities
              </h3>

              <div className="flex flex-wrap gap-2">

                {careerRoles.map(
                  (role) => (
                    <span
                      key={role}
                      className="bg-[#eaf5fd] text-[#003c6a] px-3 py-2 rounded-full font-semibold text-sm"
                    >
                      {role}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            COURSE HIGHLIGHTS
        ====================================================== */}

        <section className="w-full px-6 py-20 bg-[#f4f8fc]">

          <div className="max-w-7xl mx-auto text-center mb-14">

            <h2 className="text-3xl md:text-5xl font-extrabold text-[#003c6a]">
              Become a Certified Data Engineering
              Professional
            </h2>

            <p className="text-lg text-gray-700 mt-4">
              Learn Data Engineering through practical
              labs, cloud platforms, Big Data
              technologies and real-world projects.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

            <div className="bg-white rounded-3xl shadow-md p-6">

              <h3 className="text-lg font-extrabold mb-4">
                Course Highlights
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>✓ Practical Data Engineering Training</li>
                <li>✓ Real-world Data Projects</li>
                <li>✓ Cloud & Big Data Training</li>
                <li>✓ Resume & Interview Support</li>
              </ul>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">

              <h3 className="text-lg font-extrabold mb-4">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-2">

                {[
                  "Python",
                  "SQL",
                  "MySQL",
                  "MongoDB",
                  "Hadoop",
                  "Spark",
                  "AWS",
                  "Azure",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">

              <h3 className="text-lg font-extrabold mb-4">
                Advanced Technologies
              </h3>

              <div className="flex flex-wrap gap-2">

                {[
                  "Kafka",
                  "Airflow",
                  "Snowflake",
                  "Informatica",
                  "Hive",
                  "Redshift",
                  "Glue",
                  "EMR",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">

              <h3 className="text-lg font-extrabold mb-4">
                Key Skills
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>Data Pipeline Development</li>
                <li>ETL / ELT Processing</li>
                <li>Data Warehousing</li>
                <li>Distributed Data Processing</li>
              </ul>

            </div>

          </div>

        </section>

        {/* =====================================================
            SYLLABUS
        ====================================================== */}

        <section className="py-20 px-4 bg-white">

          <div className="max-w-7xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003c6a] text-center mb-4">
              Data Engineering Course Training –
              Syllabus
            </h2>

            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Build your knowledge from core data
              concepts to databases, Big Data, Cloud and
              modern Data Engineering technologies.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {syllabusModules.map(
                (item) => (
                  <div
                    key={item.module}
                    className="border border-gray-200 rounded-3xl p-6 shadow-sm bg-[#f9fbff]"
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">

                      <span className="bg-[#005BAC] text-white px-4 py-2 rounded-xl font-bold w-fit">
                        {item.module}
                      </span>

                      <h3 className="text-xl font-bold text-[#003c6a]">
                        {item.title}
                      </h3>

                    </div>

                    <ul className="space-y-3">

                      {item.topics.map(
                        (topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="text-[#005BAC]">
                              ●
                            </span>

                            <span>
                              {topic}
                            </span>
                          </li>
                        )
                      )}

                    </ul>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            MOCK INTERVIEWS
        ====================================================== */}

        <section className="bg-[#003c6a] py-16 px-6 text-white">

          <div className="max-w-7xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Resume & Mock Interview Preparation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">

                <h3 className="text-xl font-bold text-yellow-300">
                  Mock Interview 1
                </h3>

                <p className="mt-3">
                  Big Data, MySQL & MongoDB
                </p>

                <p className="mt-2 text-blue-200">
                  Day 36
                </p>

              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">

                <h3 className="text-xl font-bold text-yellow-300">
                  Mock Interview 2
                </h3>

                <p className="mt-3">
                  AWS & Python
                </p>

                <p className="mt-2 text-blue-200">
                  Day 40
                </p>

              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">

                <h3 className="text-xl font-bold text-yellow-300">
                  Mock Interview 3
                </h3>

                <p className="mt-3">
                  Overall Data Engineering
                </p>

                <p className="mt-2 text-blue-200">
                  Day 43
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            WHY CHOOSE US
        ====================================================== */}

        <section
          id="why-choose-us"
          className="py-16 bg-gradient-to-r from-[#e0f7fa] to-[#f0fcff]"
        >

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#005BAC] mb-12">
              Why Choose Our Data Engineering Course?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {[
                {
                  title: "Expert Trainers",
                  text: "Learn Data Engineering concepts with practical guidance and industry-focused training.",
                },
                {
                  title: "Hands-On Training",
                  text: "Practice Python, SQL, databases, Big Data, AWS services and Data Engineering workflows.",
                },
                {
                  title: "Job-Ready Curriculum",
                  text: "Learn technologies and workflows used in modern Data Engineering projects.",
                },
                {
                  title: "Career Support",
                  text: "Resume preparation, project explanation, mock interviews and placement assistance are included.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl shadow"
                >
                  <h3 className="text-xl font-bold text-[#005BAC] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            REVIEWS
        ====================================================== */}

        <GoogleStyleReviews
          title="What Our Students Say"
          orgName="Vell InfoTech"
          overallRating={4.8}
          total={1543}
          histogram={reviewHistogram}
          reviews={reviewsData}
          viewAllHref="/reviews"
          writeHref="/contact-us#enquiry-form"
        />

        {/* =====================================================
            FAQ
        ====================================================== */}

        <section
          id="faq"
          className="py-16 bg-white"
        >

          <div className="max-w-5xl mx-auto px-6">

            <h2 className="text-3xl md:text-4xl font-bold text-[#003c6a] text-center mb-4">
              Data Engineering Course in Chennai –
              Frequently Asked Questions
            </h2>

            <p className="text-center text-gray-600 mb-10">
              Find answers about Data Engineering
              training, technologies, projects and
              placement assistance.
            </p>

            <div className="space-y-4">

              {faqData.map(
                (faq, index) => (
                  <details
                    key={faq.question}
                    className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5"
                  >

                    <summary className="cursor-pointer font-semibold text-[#003c6a] list-none flex gap-2">
                      <span>
                        {index + 1}.
                      </span>

                      <span>
                        {faq.question}
                      </span>
                    </summary>

                    <p className="mt-3 text-gray-700 leading-7">
                      {faq.answer}
                    </p>

                  </details>
                )
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            ENQUIRY
        ====================================================== */}

        <section
          ref={formRef}
          className="w-full px-6 py-20 bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white"
        >

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

            {/* LEFT */}

            <div className="w-full lg:w-1/2 grid gap-4">

              {[
                {
                  title:
                    "Comprehensive Data Engineering Curriculum",
                  text:
                    "Learn Python, SQL, databases, Big Data, cloud platforms, ETL and modern Data Engineering technologies.",
                },
                {
                  title:
                    "Career-Oriented Training",
                  text:
                    "Includes practical exercises, projects, resume preparation and mock interviews.",
                },
                {
                  title:
                    "Cloud Data Engineering",
                  text:
                    "Learn AWS and Azure concepts with AWS services including S3, EC2, Redshift, Glue and EMR.",
                },
                {
                  title:
                    "Hands-On Projects",
                  text:
                    "Work with real Data Engineering workflows, data pipelines and project-based exercises.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 shadow-lg text-gray-900"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>
                </div>
              ))}

            </div>

            {/* FORM */}

            <div className="w-full lg:w-1/2 max-w-lg">

              <div className="bg-white p-8 rounded-[30px] shadow-2xl text-gray-900">

                <h2 className="text-2xl font-bold text-center text-[#003c6a] mb-5">
                  Get a Free Training Quote
                </h2>

                <div className="flex justify-center gap-3 mb-6">

                  <button
                    type="button"
                    onClick={() =>
                      setMode("class_room")
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      mode === "class_room"
                        ? "bg-[#003c6a] text-white"
                        : "border border-[#003c6a] text-[#003c6a]"
                    }`}
                  >
                    <FaChalkboardTeacher />
                    Class Room
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMode("online")
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      mode === "online"
                        ? "bg-[#003c6a] text-white"
                        : "border border-[#003c6a] text-[#003c6a]"
                    }`}
                  >
                    <FaLaptop />
                    Online
                  </button>

                </div>

                <form
                  id="enquiry-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid gap-3"
                >

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm"
                  />

                  {touched.name &&
                    errors.name && (
                      <p className="text-red-600 text-xs">
                        {errors.name}
                      </p>
                    )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm"
                  />

                  {touched.email &&
                    errors.email && (
                      <p className="text-red-600 text-xs">
                        {errors.email}
                      </p>
                    )}

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm"
                  />

                  {touched.phone &&
                    errors.phone && (
                      <p className="text-red-600 text-xs">
                        {errors.phone}
                      </p>
                    )}

                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm"
                  >
                    <option value="Data Engineering">
                      Data Engineering
                    </option>

                    <option value="Data Science">
                      Data Science
                    </option>

                    <option value="Data Science & AI">
                      Data Science & AI
                    </option>

                    <option value="Big Data Developer">
                      Big Data Developer
                    </option>

                    <option value="AWS Training">
                      AWS Training
                    </option>
                  </select>

                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm resize-none"
                  />

                  {touched.message &&
                    errors.message && (
                      <p className="text-red-600 text-xs">
                        {errors.message}
                      </p>
                    )}

                  <div className="text-right text-xs text-gray-500">
                    {form.message.length}/300
                  </div>

                  <button
                    type="submit"
                    disabled={
                      status === "loading"
                    }
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-semibold"
                  >
                    {status === "loading"
                      ? "Submitting..."
                      : "Submit"}
                  </button>

                  {error && (
                    <p className="text-red-600 text-xs">
                      Submission failed:{" "}
                      {String(error)}
                    </p>
                  )}

                </form>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            POPULAR COURSES
        ====================================================== */}

        <section
          id="popular-courses"
          className="bg-[#eaf5fd] py-16 px-4"
        >

          <div className="max-w-7xl mx-auto text-center mb-10">

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003c6a] mb-4">
              Popular Courses
            </h2>

            <p className="text-gray-700 text-lg">
              Explore other popular technology courses
              at Vell InfoTech.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

            {popularCourses.map(
              (course) => (
                <Link
                  href={`/all-courses/${course.slug}`}
                  key={course.slug}
                  className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
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

                  <p className="text-sm text-gray-500">
                    Online | Offline
                  </p>

                  <div className="flex items-center gap-1 text-sm mt-2 text-gray-600">

                    <FaUserGraduate />

                    <span>
                      {course.learners} Learners
                    </span>

                  </div>

                  <div className="flex mt-1 text-yellow-500">

                    {[...Array(5)].map(
                      (_, index) => (
                        <AiFillStar
                          key={index}
                        />
                      )
                    )}

                  </div>

                </Link>
              )
            )}

          </div>

        </section>

        <FeedbackSection />

      </main>

      {/* =====================================================
          TOAST
      ====================================================== */}

      <ToastContainer
        newestOnTop
        limit={2}
        className="!z-[9999]"
        toastClassName={() =>
          "rounded-xl shadow-md"
        }
        bodyClassName={() =>
          "text-[15px] font-medium"
        }
        theme="colored"
      />

      {/* =====================================================
          AUTO POPUP FORM
      ====================================================== */}

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