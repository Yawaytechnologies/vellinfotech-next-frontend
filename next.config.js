/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    return [
      // General URL normalization
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/tutorials",
        permanent: true,
      },
      // Legacy course alias redirects (27 entries from LEGACY_COURSE_ALIASES in App.jsx)
      {
        source: "/all-courses/Java",
        destination: "/all-courses/java-full-stack-developer-course",
        permanent: true,
      },
      {
        source: "/all-courses/Python",
        destination: "/all-courses/python-full-stack-developer-course",
        permanent: true,
      },
      {
        source: "/all-courses/FullStackDevelopement",
        destination: "/all-courses/full-stack-development-course",
        permanent: true,
      },
      {
        source: "/all-courses/Plsql",
        destination: "/all-courses/pl-sql-developer-course",
        permanent: true,
      },
      {
        source: "/all-courses/Sql",
        destination: "/all-courses/sql-developer-course",
        permanent: true,
      },
      {
        source: "/all-courses/ScrumMaster",
        destination: "/all-courses/scrum-master-program",
        permanent: true,
      },
      {
        source: "/all-courses/DataScience",
        destination: "/all-courses/data-science-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/BusinessAnalytics",
        destination: "/all-courses/business-analytics-course",
        permanent: true,
      },
      {
        source: "/all-courses/DataScienceAi",
        destination: "/all-courses/data-science-and-ai-program",
        permanent: true,
      },
      {
        source: "/all-courses/BigDataDeveloper",
        destination: "/all-courses/big-data-developer-program",
        permanent: true,
      },
      {
        source: "/all-courses/SoftwareTesting",
        destination: "/all-courses/software-testing-program",
        permanent: true,
      },
      {
        source: "/all-courses/SeleniumTesting",
        destination: "/all-courses/selenium-testing-program",
        permanent: true,
      },
      {
        source: "/all-courses/EtlTesting",
        destination: "/all-courses/etl-testing-program",
        permanent: true,
      },
      {
        source: "/all-courses/AwsTraining",
        destination: "/all-courses/aws-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/DevOps",
        destination: "/all-courses/devops-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/ProductManagement",
        destination: "/all-courses/product-management-program",
        permanent: true,
      },
      {
        source: "/all-courses/BusinessAnalyst",
        destination: "/all-courses/business-analyst-program",
        permanent: true,
      },
      {
        source: "/all-courses/HardwareNetworking",
        destination: "/all-courses/hardware-and-networking-program",
        permanent: true,
      },
      {
        source: "/all-courses/CyberSecurity",
        destination: "/all-courses/cyber-security-program",
        permanent: true,
      },
      {
        source: "/all-courses/Sap",
        destination: "/all-courses/sap-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/SalesForce",
        destination: "/all-courses/salesforce-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/ServiceNow",
        destination: "/all-courses/servicenow-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/RPA",
        destination: "/all-courses/rpa-robotic-process-automation-course",
        permanent: true,
      },
      {
        source: "/all-courses/ProductionSupport",
        destination: "/all-courses/production-support-program",
        permanent: true,
      },
      {
        source: "/all-courses/DigitalMarketing",
        destination: "/all-courses/digital-marketing-program",
        permanent: true,
      },
      {
        source: "/all-courses/SoftSkillsTraining",
        destination: "/all-courses/soft-skills-training",
        permanent: true,
      },
      {
        source: "/all-courses/big-data-developer-course",
        destination: "/all-courses/big-data-developer-program",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
