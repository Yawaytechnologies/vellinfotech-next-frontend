import { notFound } from "next/navigation";

// ── Course component imports ────────────────────────────────────────────────
import Java from "../../../components/Courses/Java";
import Python from "../../../components/Courses/Python";
import FullStackDevelopement from "../../../components/Courses/FullStackDevelopement";
import DataScience from "../../../components/Courses/DataScience";
import DataScienceAi from "../../../components/Courses/DataScienceAi";
import BusinessAnalytics from "../../../components/Courses/BusinessAnalytics";
import BusinessAnalyst from "../../../components/Courses/BusinessAnalyst";
import BigDataDeveloper from "../../../components/Courses/BigDataDeveloper";
import Sql from "../../../components/Courses/Sql";
import Plsql from "../../../components/Courses/Plsql";
import SoftwareTesting from "../../../components/Courses/SoftwareTesting";
import SeleniumTesting from "../../../components/Courses/SeleniumTesting";
import EtlTesting from "../../../components/Courses/EtlTesting";
import AwsTraining from "../../../components/Courses/AwsTraining";
import DevOps from "../../../components/Courses/DevOps";
import ServiceNow from "../../../components/Courses/ServiceNow";
import SalesForce from "../../../components/Courses/SalesForce";
import Sap from "../../../components/Courses/Sap";
import CyberSecurity from "../../../components/Courses/CyberSecurity";
import HardwareNetworking from "../../../components/Courses/HardwareNetworking";
import ProductManagement from "../../../components/Courses/ProductManagement";
import ScrumMaster from "../../../components/Courses/ScrumMaster";
import RPA from "../../../components/Courses/RPA";
import DigitalMarketing from "../../../components/Courses/DigitalMarketing";
import SoftSkillsTraining from "../../../components/Courses/SoftSkillsTraining";
import ProductionSupport from "../../../components/Courses/ProductionSupport";

// ── Course map ──────────────────────────────────────────────────────────────
const COURSE_MAP = {
  "java-full-stack-developer-course": {
    component: Java,
    title: "Java Full Stack Developer Course in Chennai",
    description:
      "Learn Java programming and full-stack development with Spring Boot, Hibernate, and React at Vell InfoTech Chennai. Job-ready with 100% placement support.",
    keywords:
      "java training chennai, java full stack course, spring boot training, java developer course chennai",
  },
  "python-full-stack-developer-course": {
    component: Python,
    title: "Python Full Stack Developer Course in Chennai",
    description:
      "Master Python, Django, React, and REST APIs with hands-on projects at Vell InfoTech. Build a full-stack portfolio and land your first developer role.",
    keywords:
      "python training chennai, python full stack course, django training, python developer course",
  },
  "full-stack-development-course": {
    component: FullStackDevelopement,
    title: "Full Stack Development Course in Chennai",
    description:
      "Comprehensive full-stack development training covering front-end and back-end technologies with real-world projects and placement assistance at Vell InfoTech.",
    keywords:
      "full stack development course chennai, full stack training, MERN stack course, web development training",
  },
  "data-science-training-program": {
    component: DataScience,
    title: "Data Science Training Program in Chennai",
    description:
      "Gain expertise in data analysis, machine learning, Python, and statistics with Vell InfoTech's industry-aligned data science training program in Chennai.",
    keywords:
      "data science course chennai, data science training, machine learning course, data analytics chennai",
  },
  "data-science-and-ai-program": {
    component: DataScienceAi,
    title: "Data Science and AI Program in Chennai",
    description:
      "Advance your career with Vell InfoTech's Data Science and AI program — covering deep learning, NLP, computer vision, and real-world AI projects in Chennai.",
    keywords:
      "data science and AI course chennai, artificial intelligence training, AI course with placement, deep learning course",
  },
  "business-analytics-course": {
    component: BusinessAnalytics,
    title: "Business Analytics Course in Chennai",
    description:
      "Learn business analytics tools including Power BI, Tableau, Excel, and SQL to make data-driven business decisions with Vell InfoTech's expert-led program.",
    keywords:
      "business analytics course chennai, Power BI training, Tableau training, data analytics course",
  },
  "business-analyst-program": {
    component: BusinessAnalyst,
    title: "Business Analyst Program in Chennai",
    description:
      "Become a certified Business Analyst with Vell InfoTech — master requirements gathering, process modeling, JIRA, and Agile methodologies with placement support.",
    keywords:
      "business analyst course chennai, BA training, business analyst certification, JIRA training",
  },
  "big-data-developer-program": {
    component: BigDataDeveloper,
    title: "Big Data Developer Program in Chennai",
    description:
      "Master Hadoop, Spark, Hive, and Kafka with Vell InfoTech's Big Data Developer Program. Build scalable data pipelines with real-world big data projects.",
    keywords:
      "big data course chennai, hadoop training, spark training, big data developer program",
  },
  "sql-developer-course": {
    component: Sql,
    title: "SQL Developer Course in Chennai",
    description:
      "Build a solid foundation in SQL and relational databases with Vell InfoTech's SQL Developer Course — covering queries, stored procedures, indexing, and optimization.",
    keywords:
      "SQL course chennai, SQL training, database training chennai, SQL developer course",
  },
  "pl-sql-developer-course": {
    component: Plsql,
    title: "PL/SQL Developer Course in Chennai",
    description:
      "Master Oracle PL/SQL programming — stored procedures, triggers, functions, and packages — with Vell InfoTech's hands-on PL/SQL Developer Course in Chennai.",
    keywords:
      "PL/SQL course chennai, Oracle PL/SQL training, database developer course, SQL developer training",
  },
  "software-testing-program": {
    component: SoftwareTesting,
    title: "Software Testing Program in Chennai",
    description:
      "Learn manual and automation testing fundamentals, SDLC, STLC, test case design, and defect management with Vell InfoTech's Software Testing Program.",
    keywords:
      "software testing course chennai, manual testing training, QA course, software testing program chennai",
  },
  "selenium-testing-program": {
    component: SeleniumTesting,
    title: "Selenium Testing Program in Chennai",
    description:
      "Automate web application testing using Selenium WebDriver, TestNG, and CI/CD integration at Vell InfoTech's Selenium Testing Program in Chennai.",
    keywords:
      "selenium testing course chennai, selenium webdriver training, automation testing course, selenium with java",
  },
  "etl-testing-program": {
    component: EtlTesting,
    title: "ETL Testing Program in Chennai",
    description:
      "Become proficient in ETL testing — data warehouse validation, ETL processes, SQL, and testing tools — with Vell InfoTech's ETL Testing Program in Chennai.",
    keywords:
      "ETL testing course chennai, data warehouse testing, ETL training program, database testing course",
  },
  "aws-training-program": {
    component: AwsTraining,
    title: "AWS Training Program in Chennai",
    description:
      "Get AWS certified with Vell InfoTech's comprehensive AWS Training Program — covering EC2, S3, Lambda, RDS, and cloud architecture fundamentals in Chennai.",
    keywords:
      "AWS training chennai, AWS certification course, cloud training chennai, Amazon Web Services course",
  },
  "devops-training-program": {
    component: DevOps,
    title: "DevOps Training Program in Chennai",
    description:
      "Master DevOps tools — Docker, Kubernetes, Jenkins, Git, Terraform, and Ansible — with Vell InfoTech's hands-on DevOps Training Program and placement support.",
    keywords:
      "DevOps course chennai, Docker training, Kubernetes training, DevOps training program",
  },
  "servicenow-training-program": {
    component: ServiceNow,
    title: "ServiceNow Training Program in Chennai",
    description:
      "Become a ServiceNow developer or administrator with Vell InfoTech's ServiceNow Training Program — covering ITSM, workflows, scripting, and certifications.",
    keywords:
      "ServiceNow training chennai, ServiceNow developer course, ITSM training, ServiceNow certification",
  },
  "salesforce-training-program": {
    component: SalesForce,
    title: "Salesforce Training Program in Chennai",
    description:
      "Learn Salesforce CRM administration, Apex development, Lightning components, and SOQL with Vell InfoTech's Salesforce Training Program in Chennai.",
    keywords:
      "Salesforce training chennai, Salesforce developer course, Salesforce admin training, CRM training chennai",
  },
  "sap-training-program": {
    component: Sap,
    title: "SAP Training Program in Chennai",
    description:
      "Gain hands-on SAP skills across key modules with Vell InfoTech's SAP Training Program — designed for freshers and professionals seeking SAP careers in Chennai.",
    keywords:
      "SAP training chennai, SAP course, SAP FICO training, SAP certification chennai",
  },
  "cyber-security-program": {
    component: CyberSecurity,
    title: "Cyber Security Program in Chennai",
    description:
      "Launch your cyber security career with Vell InfoTech's comprehensive program — ethical hacking, network security, penetration testing, and security certifications.",
    keywords:
      "cyber security course chennai, ethical hacking training, network security course, information security training",
  },
  "hardware-and-networking-program": {
    component: HardwareNetworking,
    title: "Hardware and Networking Program in Chennai",
    description:
      "Learn computer hardware, network configuration, CCNA concepts, and IT support skills with Vell InfoTech's Hardware and Networking Program in Chennai.",
    keywords:
      "hardware networking course chennai, CCNA training, networking course, IT hardware training chennai",
  },
  "product-management-program": {
    component: ProductManagement,
    title: "Product Management Program in Chennai",
    description:
      "Develop product strategy, roadmapping, user research, and Agile execution skills with Vell InfoTech's Product Management Program designed for aspiring PMs.",
    keywords:
      "product management course chennai, product manager training, agile product management, PM certification",
  },
  "scrum-master-program": {
    component: ScrumMaster,
    title: "Scrum Master Program in Chennai",
    description:
      "Get Scrum Master certified with Vell InfoTech — master Agile frameworks, sprint planning, team facilitation, and Scrum ceremonies with real-world practice.",
    keywords:
      "Scrum Master course chennai, Agile training, Scrum certification, CSM training chennai",
  },
  "rpa-robotic-process-automation-course": {
    component: RPA,
    title: "RPA — Robotic Process Automation Course in Chennai",
    description:
      "Automate business processes with UiPath, Blue Prism, and Automation Anywhere at Vell InfoTech's RPA training program with placement assistance in Chennai.",
    keywords:
      "RPA course chennai, UiPath training, robotic process automation, automation anywhere training",
  },
  "digital-marketing-program": {
    component: DigitalMarketing,
    title: "Digital Marketing Program in Chennai",
    description:
      "Master SEO, social media marketing, Google Ads, content strategy, and email marketing with Vell InfoTech's Digital Marketing Program in Chennai.",
    keywords:
      "digital marketing course chennai, SEO training, Google Ads course, social media marketing training",
  },
  "soft-skills-training": {
    component: SoftSkillsTraining,
    title: "Soft Skills Training in Chennai",
    description:
      "Enhance communication, leadership, interview skills, and professional etiquette with Vell InfoTech's Soft Skills Training — essential for career success.",
    keywords:
      "soft skills training chennai, communication skills course, interview preparation training, personality development",
  },
  "production-support-program": {
    component: ProductionSupport,
    title: "Production Support Program in Chennai",
    description:
      "Learn L1/L2/L3 production support, incident management, ITIL processes, and ticketing tools with Vell InfoTech's Production Support Program in Chennai.",
    keywords:
      "production support course chennai, L2 support training, ITIL training, IT support course",
  },
};

// ── Static params for SSG ───────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(COURSE_MAP).map((slug) => ({ slug }));
}

// ── Dynamic metadata per course ─────────────────────────────────────────────
export function generateMetadata({ params }) {
  const course = COURSE_MAP[params.slug];
  if (!course) return {};
  return {
    title: `${course.title} | Vell InfoTech`,
    description: course.description,
    keywords: course.keywords,
    alternates: {
      canonical: `https://www.vellinfotech.com/all-courses/${params.slug}`,
    },
    openGraph: {
      title: `${course.title} | Vell InfoTech`,
      description: course.description,
      url: `https://www.vellinfotech.com/all-courses/${params.slug}`,
    },
  };
}

// ── Page component ──────────────────────────────────────────────────────────
export default function CoursePage({ params }) {
  const course = COURSE_MAP[params.slug];
  if (!course) notFound();

  const CourseComponent = course.component;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Vell InfoTech",
      url: "https://www.vellinfotech.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.vellinfotech.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Courses",
        item: "https://www.vellinfotech.com/all-courses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: `https://www.vellinfotech.com/all-courses/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CourseComponent />
    </>
  );
}
