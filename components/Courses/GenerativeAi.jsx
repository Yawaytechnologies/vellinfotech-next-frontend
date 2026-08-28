"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../redux/actions/enquiryAction";
import FeedbackSection from "../common/Feedback";
import { FaLaptop, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
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
  "Build a strong foundation in Python Programming and learn how to apply it to AI development.",
  "Work with SQL and Databases to store, manage, and retrieve data efficiently.",
  "Learn Data Analysis and Statistics to understand data and make meaningful insights.",
  "Develop practical skills in Machine Learning and Deep Learning to solve real-world problems.",
  "Explore Generative AI and understand how modern AI applications are developed.",
  "Work with OpenAI, Gemini & Claude APIs to integrate AI capabilities into applications.",
  "Learn LangChain and RAG to build AI applications that can work with custom and business-specific data.",
  "Understand AI Agents and how autonomous AI workflows can be designed and implemented.",
  "Develop scalable AI backends using FastAPI and create complete Full Stack AI Applications.",
  "Learn how to deploy AI applications on cloud platforms and understand basic production practices.",
  "Gain hands-on experience through real-world projects designed around practical business use cases.",
  "Prepare for AI job opportunities with interview preparation, resume guidance, coding practice, and career support.",
];

/* =========================================================
   SYLLABUS
========================================================= */

const syllabusModules = [
  {
    module: "Python · Module 1",
    title: "Python Basics",
    topics: [
      "What is Python & setup (Anaconda, VS Code, Jupyter)",
      "Variables, Data Types",
      "Input / Output",
      "Operators",
      "Conditional statements (if, elif, else)",
      "Loops (for, while)",
    ],
  },
  {
    module: "Python · Module 2",
    title: "Data Structures",
    topics: [
      "Lists, Tuples, Sets, Dictionaries",
      "List comprehension",
      "Nested structures",
    ],
  },
  {
    module: "Python · Module 3",
    title: "Functions & OOP",
    topics: [
      "Functions, *args, **kwargs",
      "Lambda functions",
      "Classes & Objects",
      "Inheritance, Encapsulation, Polymorphism",
    ],
  },
  {
    module: "Python · Module 4",
    title: "File Handling & Exception Handling",
    topics: ["Read/Write files", "Try-except blocks", "Logging basics"],
  },
  {
    module: "Python · Module 5",
    title: "Libraries for AI",
    topics: ["NumPy", "Pandas", "Matplotlib / Seaborn", "Basic EDA"],
  },
  {
    module: "Python · Module 6",
    title: "APIs & Automation",
    topics: ["Requests library", "REST API basics", "JSON handling"],
  },
  {
    module: "Python · Module 7",
    title: "Memory, Threading & Testing",
    topics: [
      "Memory management",
      "Multi Threading",
      "Logging",
      "Pytest",
      "Mini Projects",
    ],
  },
  {
    module: "Gen AI · Module 1",
    title: "NLP Foundations",
    topics: [
      "Text preprocessing",
      "Tokenization",
      "Stopwords",
      "Stemming / Lemmatization",
    ],
  },
  {
    module: "Gen AI · Module 2",
    title: "Text Representation",
    topics: ["Bag of Words", "TF-IDF", "Word2Vec / Embeddings"],
  },
  {
    module: "Gen AI · Module 3",
    title: "Deep Learning Basics for NLP",
    topics: ["RNN, LSTM (conceptual)", "Attention mechanism", "Transformers"],
  },
  {
    module: "Gen AI · Module 4",
    title: "Large Language Models (LLMs)",
    topics: [
      "What are LLMs",
      "GPT, Claude, LLaMA, Gemini overview",
      "Prompt Engineering",
      "Zero-shot / Few-shot learning",
    ],
  },
  {
    module: "Gen AI · Module 5",
    title: "LangChain",
    topics: ["Chains", "Prompts", "Memory", "Tools", "Agents (intro)"],
  },
  {
    module: "Gen AI · Module 6",
    title: "Vector Databases",
    topics: ["Embeddings", "FAISS / Pinecone / Chroma", "Similarity search"],
  },
  {
    module: "Gen AI · Module 7",
    title: "RAG",
    topics: [
      "What is RAG",
      "Chunking strategies",
      "Embedding + Retrieval",
      "Building Q&A system",
    ],
  },
  {
    module: "Gen AI · Module 8",
    title: "Advanced Gen AI",
    topics: [
      "Fine-tuning basics",
      "Open-source models",
      "Multimodal AI",
      "Guardrails",
    ],
  },
  {
    module: "Gen AI · Projects",
    title: "Generative AI Projects",
    topics: [
      "Chatbot using OpenAI",
      "PDF Q&A (RAG system)",
      "Resume Analyzer",
      "Document Search Engine",
    ],
  },
  {
    module: "Agentic AI · Module 1",
    title: "Introduction to AI Agents",
    topics: [
      "What is Agentic AI",
      "Difference: LLM vs Agent",
      "Use cases (automation, workflows)",
    ],
  },
  {
    module: "Agentic AI · Module 2",
    title: "Agent Frameworks",
    topics: [
      "GitHub",
      "LangChain Agents",
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "MCP (Model Context Protocol)",
    ],
  },
  {
    module: "Agentic AI · Module 3",
    title: "Tools & Tool Calling",
    topics: ["Function calling", "API integration", "Custom tools"],
  },
  {
    module: "Agentic AI · Module 4",
    title: "Multi-Agent Systems",
    topics: [
      "Agent collaboration",
      "Task delegation",
      "Workflow orchestration",
    ],
  },
  {
    module: "Agentic AI · Module 5",
    title: "Memory & Planning",
    topics: [
      "Short-term vs long-term memory",
      "Planning agents",
      "Reflection loops",
    ],
  },
  {
    module: "Agentic AI · Module 6",
    title: "Agent + RAG Systems",
    topics: ["Combining RAG + Agents", "Autonomous Q&A systems"],
  },
  {
    module: "Agentic AI · Module 7",
    title: "LLMOps",
    topics: ["Monitoring", "Evaluation", "Logging", "Cost optimization"],
  },
  {
    module: "Agentic AI · Module 8",
    title: "Deployment",
    topics: ["Streamlit / FastAPI", "Docker basics", "Cloud (AWS / Azure)"],
  },
  {
    module: "Final Projects",
    title: "Industry-Level AI Projects",
    topics: [
      "AI Customer Support Agent",
      "Multi-Agent Report Generator",
      "Autonomous Data Analyst",
      "AI Automation Workflow (email / ticket system)",
    ],
  },
  {
    module: "Real-Time Projects",
    title: "Business-Focused AI Projects",
    topics: [
      "AI Resume Analyzer",
      "AI Email Assistant",
      "AI Content Generator",
      "AI HR Assistant",
      "AI Test Case Generator",
      "Enterprise RAG Chatbot",
      "AI Recruitment Platform",
      "Multi-Agent Business Assistant",
    ],
  },
];

/* =========================================================
   CAREER ROLES
========================================================= */

const careerRoles = [
  "AI Engineer",
  "Generative AI Developer",
  "Machine Learning Engineer",
  "LLM Engineer",
  "Prompt Engineer",
  "AI Automation Engineer",
  "Data Analyst",
  "Junior Data Scientist",
];

/* =========================================================
   FAQ
========================================================= */

const faqData = [
  {
    question: "Who is this AI training program designed for?",
    answer:
      "The program is designed for students, engineers, analysts, and working professionals who want practical skills for today’s AI-driven industry.",
  },
  {
    question:
      "How long is the Artificial Intelligence and Generative AI course?",
    answer: "The training duration is 12–16 weeks.",
  },
  {
    question: "What is the course level?",
    answer: "The course is structured at an Intermediate to Advanced level.",
  },
  {
    question: "Is the course available online and in the classroom?",
    answer:
      "Yes. The program is offered through Online and Classroom training with Weekday and Weekend batches.",
  },
  {
    question: "Does the course start with Python?",
    answer:
      "Yes. The syllabus starts with Python basics, data structures, functions, OOP, file handling, exception handling, AI libraries, APIs, automation, memory management, multithreading, logging, Pytest, and mini projects.",
  },
  {
    question: "Will I learn SQL, Data Analysis, and Statistics?",
    answer:
      "Yes. The program includes SQL and Databases along with Data Analysis and Statistics as part of the AI learning path.",
  },
  {
    question: "Are Machine Learning and Deep Learning covered?",
    answer:
      "Yes. The course covers Machine Learning and Deep Learning concepts and also includes NLP, RNN, LSTM, attention mechanisms, and Transformers.",
  },
  {
    question: "Which Generative AI models and APIs are covered?",
    answer:
      "The course includes GPT, Claude, LLaMA, and Gemini concepts, along with OpenAI, Gemini, and Claude APIs.",
  },
  {
    question: "Does the course cover Prompt Engineering?",
    answer:
      "Yes. Prompt Engineering, Zero-shot learning, and Few-shot learning are included in the Large Language Models module.",
  },
  {
    question: "Will I learn LangChain and RAG?",
    answer:
      "Yes. The curriculum covers LangChain chains, prompts, memory, tools, agents, vector databases, embeddings, similarity search, chunking strategies, retrieval, and building RAG-based Q&A systems.",
  },
  {
    question: "Which vector databases are included?",
    answer:
      "FAISS, Pinecone, and Chroma are included as part of the Vector Databases and RAG learning path.",
  },
  {
    question: "Does the course include Agentic AI?",
    answer:
      "Yes. The Agentic AI section covers AI agents, agent frameworks, tool calling, multi-agent systems, memory and planning, Agent + RAG systems, LLMOps, and deployment.",
  },
  {
    question: "Which Agentic AI frameworks are covered?",
    answer:
      "The syllabus includes LangChain Agents, LangGraph, CrewAI, AutoGen, and MCP (Model Context Protocol), along with GitHub.",
  },
  {
    question: "Does the program include LLMOps?",
    answer:
      "Yes. LLMOps topics include monitoring, evaluation, logging, and cost optimization.",
  },
  {
    question: "Will I learn AI application deployment?",
    answer:
      "Yes. Deployment topics include Streamlit, FastAPI, Docker basics, and cloud deployment using AWS and Azure.",
  },
  {
    question: "What projects are included in the Generative AI section?",
    answer:
      "Projects include an OpenAI chatbot, PDF Q&A RAG system, Resume Analyzer, and Document Search Engine.",
  },
  {
    question: "What final Agentic AI projects are included?",
    answer:
      "Final projects include an AI Customer Support Agent, Multi-Agent Report Generator, Autonomous Data Analyst, and AI Automation Workflow for email or ticket systems.",
  },
  {
    question: "What real-time projects are included?",
    answer:
      "Real-time projects include an AI Resume Analyzer, AI Email Assistant, AI Content Generator, AI HR Assistant, AI Test Case Generator, Enterprise RAG Chatbot, AI Recruitment Platform, and Multi-Agent Business Assistant.",
  },
  {
    question: "What career opportunities can I explore after this training?",
    answer:
      "Career opportunities listed for the program include AI Engineer, Generative AI Developer, Machine Learning Engineer, LLM Engineer, Prompt Engineer, AI Automation Engineer, Data Analyst, and Junior Data Scientist.",
  },
  {
    question: "What career support is included?",
    answer:
      "The program benefits include Resume Building Support, GitHub Portfolio Development, Mock Interviews, and Placement Assistance.",
  },
];

/* =========================================================
   POPULAR COURSES
========================================================= */

const popularCourses = [
  {
    title: "Data Science & AI",
    slug: "data-science-and-ai-course",
    image: "https://cdn-icons-png.flaticon.com/512/8100/8100831.png",
    learners: "11,800+",
  },
  {
    title: "Data Science",
    slug: "data-science-training-course",
    image: "https://cdn-icons-png.flaticon.com/512/8649/8649623.png",
    learners: "12,500+",
  },
  {
    title: "Python Full Stack",
    slug: "python-full-stack-developer-course",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    learners: "10,700+",
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

export default function ArtificialIntelligenceGenAICoursePage() {
  const [mode, setMode] = useState("class_room");

  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.enquiry || {});

  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Artificial Intelligence & Generative AI",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* =========================================================
     SCROLL TO FORM
  ========================================================= */

  const scrollToForm = () => {
    const element = formRef.current || document.getElementById("enquiry-form");

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - 100;

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
    value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

  const onlyLettersSpaces = (value) =>
    value.replace(/[^A-Za-z ]+/g, "").replace(/\s{2,}/g, " ");

  const digits10 = (value) => value.replace(/\D+/g, "").slice(0, 10);

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

        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v)) {
          return "Enter a valid email.";
        }

        return null;

      case "phone":
        if (!v) return "Mobile number is required.";

        if (!/^\d{10}$/.test(v)) return "Enter a valid 10-digit mobile number.";

        return null;

      case "course":
        if (!v) return "Course name is required.";

        return null;

      case "message":
        if (!v) return "Message is required.";

        if (v.length > 300) return "Maximum 300 characters.";

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
      v = value.length ? value[0].toUpperCase() + value.slice(1) : value;

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

    const validationMessage = validateField(name, form[name]);

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

    const fields = ["name", "email", "phone", "course", "message"];

    const validationErrors = {};

    fields.forEach((field) => {
      const validationMessage = validateField(field, form[field]);

      if (validationMessage) {
        validationErrors[field] = validationMessage;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      const firstField = fields.find((field) => validationErrors[field]);

      const element = document.querySelector(`[name="${firstField}"]`);

      if (element) {
        element.focus();
      }

      toast.error(
        validationErrors[firstField] || "Please fix the highlighted errors.",
        {
          ...toastOpts,
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        },
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
      await dispatch(submitEnquiry(payload)).unwrap();

      toast.success("Thanks! Your enquiry has been recorded.", {
        ...toastOpts,
        style: {
          background: "#16a34a",
          color: "#fff",
        },
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "Artificial Intelligence & Generative AI",
        message: "",
      });

      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);

      const message = typeof err === "string" ? err : "Submission failed.";

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
    name: "Artificial Intelligence and Generative AI Course",
    description:
      "AI training covering Python, SQL, Data Analysis, Statistics, Machine Learning, Deep Learning, Generative AI, OpenAI, Gemini, Claude, LangChain, RAG, AI Agents, FastAPI, Full Stack AI Development and Cloud Deployment.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Vell InfoTech",
      url: "https://www.vellinfotech.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: mode === "online" ? "online" : "inPerson",
      location: [
        {
          "@type": "Place",
          name: "Vell InfoTech Chennai",
          address: "Chennai, Tamil Nadu, India",
        },
        {
          "@type": "Place",
          name: "Vell InfoTech Bangalore",
          address: "Bangalore, Karnataka, India",
        },
      ],
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
                Join Our AI Course with 100% Job-Focused Training
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 text-yellow-400">
                Artificial Intelligence & Generative AI Course
              </h1>

              <ul className="mt-6 space-y-3 text-base leading-7 sm:text-lg sm:leading-8">
                <li>
                  ✅ Join the <strong>Best AI Training Institute</strong> to
                  master Python, SQL, Data Analysis & Statistics.
                </li>

                <li>
                  ✅ Learn{" "}
                  <strong>
                    Machine Learning, Deep Learning & Generative AI
                  </strong>{" "}
                  with industry-relevant concepts.
                </li>

                <li>
                  ✅ Master <strong>OpenAI, Gemini & Claude APIs</strong> to
                  build powerful AI applications.
                </li>

                <li>
                  ✅ Learn <strong>LangChain, RAG & AI Agents</strong> for
                  next-generation AI development.
                </li>

                <li>
                  ✅ Build AI applications using{" "}
                  <strong>FastAPI & Full Stack AI Development</strong>.
                </li>

                <li>
                  ✅ Gain practical experience with{" "}
                  <strong>Cloud Deployment & real-world AI projects</strong>.
                </li>

                <li>
                  ✅ Get complete{" "}
                  <strong>
                    Interview Preparation, Resume Building & Career Support
                  </strong>{" "}
                  to become job-ready.
                </li>
              </ul>

              <button
                type="button"
                onClick={scrollToForm}
                className="group relative bg-neutral-800 min-h-[64px] w-full sm:w-80 border border-white text-left p-4 text-gray-50 font-bold rounded-lg overflow-hidden mt-8 hover:text-rose-300 hover:border-rose-300 transition"
              >
                <span className="text-lg font-extrabold text-violet-400 block">
                  AI & Generative AI Training
                </span>
                Intermediate → Advanced
                <br />
                <span className="text-sm text-gray-300">
                  Duration: 12–16 Weeks
                </span>
              </button>
            </div>

            {/* RIGHT */}

            <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-5 text-black shadow-lg sm:p-6 lg:mx-0 lg:max-w-none lg:p-8">
              <h2 className="text-2xl font-bold mb-4">WANT AI JOB?</h2>

              <p className="mb-4 text-lg">
                Become Job-Ready in AI & Generative AI
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
                Online and Offline Gen. AI Training Course in Chennai &
                Bangalore
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
              <span className="text-purple-400">●</span> Our Course Partners{" "}
              <span className="text-purple-400">●</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
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
                    alt={`${partner.name} logo`}
                    className="w-auto max-w-[160px] h-14 object-contain"
                    loading="lazy"
                  />
                </motion.a>
              ))}
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
                Overview of AI Course
              </h2>

              <div className="w-28 h-1 bg-blue-600 mx-auto mb-8 rounded-full" />

              <h3 className="text-xl md:text-2xl font-bold text-[#005BAC] mb-4">
                AI Course – Overview
              </h3>

              <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-10">
                Our AI Training Program is designed to help students and working
                professionals build practical skills for today&apos;s AI-driven
                industry. Starting with Python and SQL, the course takes you
                through data analysis, statistics, machine learning, deep
                learning, Generative AI, and modern AI application development.
                You&apos;ll gain hands-on experience with OpenAI, Gemini,
                Claude, LangChain, RAG, AI Agents, FastAPI, Full Stack AI
                Development, and Cloud Deployment while working on practical
                projects and preparing for real-world job opportunities.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
                What You&apos;ll Learn From AI Training
              </h3>

              <ul className="space-y-4">
                {learningPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-base md:text-lg text-gray-800"
                  >
                    <span className="text-purple-600">➤</span>

                    {point}
                  </li>
                ))}
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
                Gain practical experience with Python, OpenAI, Gemini, Claude,
                LangChain, RAG, AI Agents, FastAPI, Full Stack AI Development,
                Cloud Deployment, and real-world AI projects.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-lg">
              <h3 className="text-2xl font-bold text-[#003c6a] mb-4">
                Career Preparation
              </h3>

              <p className="text-gray-700 leading-7">
                Prepare for AI job opportunities with interview preparation,
                resume guidance, coding practice, GitHub portfolio development,
                mock interviews, and placement assistance.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-lg">
              <h3 className="text-2xl font-bold text-[#003c6a] mb-4">
                Career Opportunities
              </h3>

              <div className="flex flex-wrap gap-2">
                {careerRoles.map((role) => (
                  <span
                    key={role}
                    className="bg-[#eaf5fd] text-[#003c6a] px-3 py-2 rounded-full font-semibold text-sm"
                  >
                    {role}
                  </span>
                ))}
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
              Become a Job-Ready AI & Generative AI Professional
            </h2>

            <p className="text-lg text-gray-700 mt-4">
              12–16 Weeks • Students, Engineers, Analysts & Professionals •
              Intermediate → Advanced • Online / Classroom • Weekday & Weekend
              Batches
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="text-lg font-extrabold mb-4">Program Benefits</h3>

              <ul className="space-y-2 text-gray-700">
                <li>✓ Hands-on Practical Training</li>
                <li>✓ Real-Time Industry Projects</li>
                <li>✓ Resume Building Support</li>
                <li>✓ Mock Interviews & Placement Assistance</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="text-lg font-extrabold mb-4">Key Technologies</h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "NumPy",
                  "Pandas",
                  "NLP",
                  "Transformers",
                  "LLMs",
                  "OpenAI",
                  "LangChain",
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
              <h3 className="text-lg font-extrabold mb-4">Advanced AI Stack</h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "LangGraph",
                  "CrewAI",
                  "AutoGen",
                  "MCP",
                  "RAG",
                  "FAISS",
                  "Pinecone",
                  "Chroma",
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
                Development & Deployment
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>AI Agents & Multi-Agent Systems</li>
                <li>LLMOps</li>
                <li>FastAPI & Streamlit</li>
                <li>Docker, AWS & Azure</li>
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
              Artificial Intelligence and Generative AI Training Syllabus
            </h2>

            <p className="text-center text-gray-600 max-w-4xl mx-auto mb-4">
              Curriculum Path: Python → NLP → Transformers → LLMs → LangChain →
              RAG → Agentic AI → LLMOps → Deployment
            </p>

            <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12">
              Key Technologies: Python | NumPy | Pandas | NLP | Transformers |
              LLMs | OpenAI | LangChain | LangGraph | CrewAI | AutoGen | MCP |
              RAG | FAISS | Pinecone | Chroma | AI Agents | LLMOps | FastAPI |
              Streamlit | Docker | AWS | Azure
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {syllabusModules.map((item) => (
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
                    {item.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-[#005BAC]">●</span>

                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            MOCK INTERVIEWS
        ====================================================== */}

        <section className="bg-[#003c6a] py-16 px-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Career & Portfolio Preparation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-300">
                  Resume Building Support
                </h3>

                <p className="mt-3">
                  Prepare your resume for AI, Generative AI, Machine Learning,
                  LLM, Prompt Engineering, and AI Automation opportunities.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-300">
                  GitHub Portfolio Development
                </h3>

                <p className="mt-3">
                  Build a project portfolio using Generative AI, RAG, AI Agents,
                  multi-agent systems, and business-focused AI applications.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-300">
                  Mock Interviews & Placement Assistance
                </h3>

                <p className="mt-3">
                  Practice interview preparation and coding while receiving
                  career support for AI job opportunities.
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
              Why Choose Our AI & Generative AI Course?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Hands-On Practical Training",
                  text: "Learn by working with Python, AI APIs, LangChain, RAG, AI Agents, FastAPI, Full Stack AI Development, and deployment workflows.",
                },
                {
                  title: "Real-Time Industry Projects",
                  text: "Build practical AI applications including RAG systems, AI assistants, recruitment tools, and multi-agent business solutions.",
                },
                {
                  title: "Modern AI Technology Stack",
                  text: "Work with Transformers, LLMs, OpenAI, LangGraph, CrewAI, AutoGen, MCP, vector databases, LLMOps, Docker, AWS, and Azure.",
                },
                {
                  title: "Career Support",
                  text: "Get resume building support, GitHub portfolio development, mock interviews, placement assistance, and interview preparation.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl shadow"
                >
                  <h3 className="text-xl font-bold text-[#005BAC] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">{item.text}</p>
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

        <section id="faq" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c6a] text-center mb-4">
              Artificial Intelligence & Generative AI Course – Frequently Asked
              Questions
            </h2>

            <p className="text-center text-gray-600 mb-10">
              Find answers about AI training, Generative AI, Agentic AI,
              projects, deployment, and career support.
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border border-gray-200 rounded-xl bg-[#f9fbff] p-5"
                >
                  <summary className="cursor-pointer font-semibold text-[#003c6a] list-none flex gap-2">
                    <span>{index + 1}.</span>

                    <span>{faq.question}</span>
                  </summary>

                  <p className="mt-3 text-gray-700 leading-7">{faq.answer}</p>
                </details>
              ))}
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
                  title: "Comprehensive AI & Generative AI Curriculum",
                  text: "Learn Python, SQL, Data Analysis, Statistics, Machine Learning, Deep Learning, NLP, Transformers, LLMs, Generative AI, RAG, and Agentic AI.",
                },
                {
                  title: "Generative AI Application Development",
                  text: "Build AI applications using OpenAI, Gemini, Claude, LangChain, vector databases, RAG, FastAPI, and Full Stack AI Development.",
                },
                {
                  title: "Agentic AI & LLMOps",
                  text: "Learn LangGraph, CrewAI, AutoGen, MCP, tool calling, multi-agent systems, memory, planning, monitoring, evaluation, logging, and cost optimization.",
                },
                {
                  title: "Projects, Deployment & Career Support",
                  text: "Work on real-time AI projects, deploy with Streamlit, FastAPI, Docker, AWS and Azure, and get resume, GitHub portfolio, mock interview and placement support.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 shadow-lg text-gray-900"
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>

                  <p>{item.text}</p>
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
                    onClick={() => setMode("class_room")}
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
                    onClick={() => setMode("online")}
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

                  {touched.name && errors.name && (
                    <p className="text-red-600 text-xs">{errors.name}</p>
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

                  {touched.email && errors.email && (
                    <p className="text-red-600 text-xs">{errors.email}</p>
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

                  {touched.phone && errors.phone && (
                    <p className="text-red-600 text-xs">{errors.phone}</p>
                  )}

                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm"
                  >
                    <option value="Artificial Intelligence & Generative AI">
                      Artificial Intelligence & Generative AI
                    </option>

                    <option value="Data Science & AI">Data Science & AI</option>

                    <option value="Data Science">Data Science</option>

                    <option value="Python Full Stack">Python Full Stack</option>

                    <option value="AWS Training">AWS Training</option>
                  </select>

                  {touched.course && errors.course && (
                    <p className="text-red-600 text-xs">{errors.course}</p>
                  )}

                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-xl px-4 py-3 bg-[#edf2f7] border text-sm resize-none"
                  />

                  {touched.message && errors.message && (
                    <p className="text-red-600 text-xs">{errors.message}</p>
                  )}

                  <div className="text-right text-xs text-gray-500">
                    {form.message.length}/300
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#005BAC] to-[#003c6a] text-white font-semibold"
                  >
                    {status === "loading" ? "Submitting..." : "Submit"}
                  </button>

                  {error && (
                    <p className="text-red-600 text-xs">
                      Submission failed: {String(error)}
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

        <section id="popular-courses" className="bg-[#eaf5fd] py-16 px-4">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003c6a] mb-4">
              Popular Courses
            </h2>

            <p className="text-gray-700 text-lg">
              Explore other popular technology courses at Vell InfoTech.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {popularCourses.map((course) => (
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

                <p className="text-sm text-gray-500">Online | Offline</p>

                <div className="flex items-center gap-1 text-sm mt-2 text-gray-600">
                  <FaUserGraduate />

                  <span>{course.learners} Learners</span>
                </div>

                <div className="flex mt-1 text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar key={index} />
                  ))}
                </div>
              </Link>
            ))}
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
        toastClassName={() => "rounded-xl shadow-md"}
        bodyClassName={() => "text-[15px] font-medium"}
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
