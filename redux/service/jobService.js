// src/services/jobService.js
import axios from "axios";

// Adjust this to match your backend
const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

/* -------------------- Dummy Data Fallback -------------------- */

export const DUMMY_JOBS = [
  {
    id: 1,
    jobTitle: "Java Full Stack Trainer",
    department: "Training · Full Time",
    location: "Ekkatuthangal, Chennai",
    workMode: "On-site",
    experience: "3–7 Years",
    salaryRange: "₹6L – ₹10L / year",
    updatedAt: "2 days ago",
    jobDescription:
      "Deliver Java, Spring Boot and real-time full stack projects for our classroom and online batches.",
    responsibilities:
      "Deliver classroom / online training sessions,Design assignments, case studies and mini-projects,Support students with doubts and code reviews,Coordinate with placement team for interviews and mock sessions",
    skills:
      "Java,Spring Boot,REST APIs,MySQL,React / Angular,Good communication",
  },
  {
    id: 2,
    jobTitle: "Python / Data Science Trainer",
    department: "Training · Full Time",
    location: "Ekkatuthangal, Chennai / Remote",
    workMode: "Hybrid",
    experience: "2–6 Years",
    salaryRange: "₹5L – ₹9L / year",
    updatedAt: "1 week ago",
    jobDescription:
      "Teach Python, data analysis, Pandas, NumPy and basic Machine Learning with project-based learning.",
    responsibilities:
      "Deliver Python & data science sessions,Guide students through mini-projects,Support with doubt-clearing and code reviews,Prepare assessments and assignments",
    skills:
      "Python,Pandas,NumPy,Matplotlib,SQL,Basic Machine Learning,Good communication",
  },
  {
    id: 3,
    jobTitle: "AWS & DevOps Trainer",
    department: "Cloud · Contract",
    location: "Remote (India)",
    workMode: "Remote",
    experience: "4–8 Years",
    salaryRange: "₹7L – ₹12L / year",
    updatedAt: "3 weeks ago",
    jobDescription:
      "Handle AWS, CI/CD pipelines, Docker, Kubernetes and cloud deployment sessions for working professionals.",
    responsibilities:
      "Deliver AWS & DevOps training,Create hands-on lab scenarios,Assist with real-time style projects,Support placement preparation",
    skills:
      "AWS,Docker,Kubernetes,CI/CD,Jenkins,GitHub Actions,Linux,Bash",
  },
  {
    id: 4,
    jobTitle: "Software Testing Trainer",
    department: "QA · Part Time",
    location: "Ekkatuthangal, Chennai",
    workMode: "On-site",
    experience: "2–5 Years",
    salaryRange: "₹4L – ₹7L / year",
    updatedAt: "5 days ago",
    jobDescription:
      "Cover manual testing, test case design, and Selenium-based automation with real-time scenarios.",
    responsibilities:
      "Deliver manual testing and automation sessions,Explain testing life cycle and best practices,Guide students with test case design and execution,Create mock interview scenarios",
    skills:
      "Manual Testing,Selenium,Test Case Design,JIRA or similar tools,Good communication",
  },
];

/* -------------------- API wrappers -------------------- */

// Fetch job list
export const fetchJobsApi = async () => {
  try {
    // NOTE: added "/" before api
    const res = await axios.get(`${API_BASE}/api/job-posts`);
    console.log("Jobs API Response:", res.data);

    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    console.warn(
      "Jobs API returned empty or invalid data, falling back to dummy jobs."
    );
    return DUMMY_JOBS;
  } catch (err) {
    console.error("Jobs API failed, falling back to dummy jobs:", err);
    return DUMMY_JOBS;
  }
};

// Apply for job – JSON body (NOT FormData)
export const applyJobApi = async (jobId, payload) => {
  // Backend expects JSON body like in your Swagger screenshot
  const res = await axios.post(
    `${API_BASE}/api/jobs/${jobId}/apply`,
    payload // axios sends application/json by default
  );
  return res.data;
};
