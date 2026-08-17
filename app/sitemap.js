import { fetchBlogPosts, fetchJobPosts } from "../lib/api";

const BASE = "https://www.vellinfotech.com";

const STATIC_ROUTES = [
  { url: `${BASE}/`, priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/about`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/reviews`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/contact-us`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/client`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/placed-students`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/sample-resume`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/internship`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/all-courses`, priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/blog`, priority: 1.0, changeFrequency: "daily" },
  { url: `${BASE}/careers`, priority: 1.0, changeFrequency: "daily" },
  { url: `${BASE}/tutorials`, priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/interview-questions`, priority: 1.0, changeFrequency: "monthly" },
  { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: "yearly" },
];

const COURSE_SLUGS = [
  "java-full-stack-developer-course",
  "python-full-stack-developer-course",
  "full-stack-development-course",
  "data-science-training-program",
  "data-science-and-ai-program",
  "business-analytics-course",
  "business-analyst-program",
  "big-data-developer-program",
  "sql-developer-course",
  "pl-sql-developer-course",
  "software-testing-program",
  "selenium-testing-program",
  "etl-testing-program",
  "aws-training-program",
  "devops-training-program",
  "servicenow-training-program",
  "salesforce-training-program",
  "sap-training-program",
  "cyber-security-program",
  "hardware-and-networking-program",
  "product-management-program",
  "scrum-master-program",
  "rpa-robotic-process-automation-course",
  "digital-marketing-program",
  "soft-skills-training",
  "production-support-program",
];

const INTERVIEW_SLUGS = ["aws", "selenium", "python", "java"];

const TUTORIAL_SLUGS = [
  "django-framework-from-scratch",
  "build-your-first-data-warehouse",
  "git-beginners",
  "spring-boot-rest",
  "react-hooks-deep-dive",
  "sql-joins-explained",
];

export default async function sitemap() {
  // Fetch dynamic IDs — gracefully handle API being down
  let blogPosts = [];
  let jobs = [];
  try {
    blogPosts = await fetchBlogPosts();
  } catch {}
  try {
    jobs = await fetchJobPosts();
  } catch {}

  const courseRoutes = COURSE_SLUGS.map((slug) => ({
    url: `${BASE}/all-courses/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const interviewRoutes = INTERVIEW_SLUGS.map((slug) => ({
    url: `${BASE}/interview/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tutorialRoutes = TUTORIAL_SLUGS.map((slug) => ({
    url: `${BASE}/tutorials/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Slug-based now; posts without one are skipped rather than emitting /blog/undefined.
  const blogRoutes = blogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: post.updatedAt || post.createdAt || new Date().toISOString(),
    }));

  const jobRoutes = jobs.map((job) => ({
    url: `${BASE}/careers/${job.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: job.updatedAt || new Date().toISOString(),
  }));

  return [
    ...STATIC_ROUTES,
    ...courseRoutes,
    ...interviewRoutes,
    ...tutorialRoutes,
    ...blogRoutes,
    ...jobRoutes,
  ];
}
