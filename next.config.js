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
        source: "/all-courses/FullStackDevelopment",
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
        destination: "/all-courses/scrum-master-course",
        permanent: true,
      },
      {
        source: "/all-courses/DataScience",
        destination: "/all-courses/data-science-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/BusinessAnalytics",
        destination: "/all-courses/business-analytics-course",
        permanent: true,
      },
      {
        source: "/all-courses/DataScienceAi",
        destination: "/all-courses/data-science-and-ai-course",
        permanent: true,
      },
      {
        source: "/all-courses/DataEngineering",
        destination: "/all-courses/data-engineering-course",
        permanent: true,
      },
      {
        source: "/all-courses/BigDataDeveloper",
        destination: "/all-courses/big-data-developer-course",
        permanent: true,
      },
      {
        source: "/all-courses/SoftwareTesting",
        destination: "/all-courses/software-testing-course",
        permanent: true,
      },
      {
        source: "/all-courses/SeleniumTesting",
        destination: "/all-courses/selenium-testing-course",
        permanent: true,
      },
      {
        source: "/all-courses/EtlTesting",
        destination: "/all-courses/etl-testing-course",
        permanent: true,
      },
      {
        source: "/all-courses/AwsTraining",
        destination: "/all-courses/aws-training-program",
        permanent: true,
      },
      {
        source: "/all-courses/DevOps",
        destination: "/all-courses/devops-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/ProductManagement",
        destination: "/all-courses/product-management-course",
        permanent: true,
      },
      {
        source: "/all-courses/BusinessAnalyst",
        destination: "/all-courses/business-analyst-course",
        permanent: true,
      },
      {
        source: "/all-courses/HardwareNetworking",
        destination: "/all-courses/hardware-and-networking-course",
        permanent: true,
      },
      {
        source: "/all-courses/CyberSecurity",
        destination: "/all-courses/cyber-security-course",
        permanent: true,
      },
      {
        source: "/all-courses/Sap",
        destination: "/all-courses/sap-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/SalesForce",
        destination: "/all-courses/salesforce-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/ServiceNow",
        destination: "/all-courses/servicenow-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/RPA",
        destination: "/all-courses/rpa-robotic-process-automation-course",
        permanent: true,
      },
      {
        source: "/all-courses/ProductionSupport",
        destination: "/all-courses/production-support-course",
        permanent: true,
      },
      {
        source: "/all-courses/DigitalMarketing",
        destination: "/all-courses/digital-marketing-course",
        permanent: true,
      },
      {
        source: "/all-courses/SoftSkillsTraining",
        destination: "/all-courses/soft-skills-training",
        permanent: true,
      },
      // Course URLs moved from -program to -course (link structure sheet).
      // AWS is intentionally excluded; it stays -program.
      {
        source: "/all-courses/data-science-training-program",
        destination: "/all-courses/data-science-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/data-science-and-ai-program",
        destination: "/all-courses/data-science-and-ai-course",
        permanent: true,
      },
      {
        source: "/all-courses/big-data-developer-program",
        destination: "/all-courses/big-data-developer-course",
        permanent: true,
      },
      {
        source: "/all-courses/scrum-master-program",
        destination: "/all-courses/scrum-master-course",
        permanent: true,
      },
      {
        source: "/all-courses/business-analyst-program",
        destination: "/all-courses/business-analyst-course",
        permanent: true,
      },
      {
        source: "/all-courses/product-management-program",
        destination: "/all-courses/product-management-course",
        permanent: true,
      },
      {
        source: "/all-courses/software-testing-program",
        destination: "/all-courses/software-testing-course",
        permanent: true,
      },
      {
        source: "/all-courses/selenium-testing-program",
        destination: "/all-courses/selenium-testing-course",
        permanent: true,
      },
      {
        source: "/all-courses/etl-testing-program",
        destination: "/all-courses/etl-testing-course",
        permanent: true,
      },
      {
        source: "/all-courses/devops-training-program",
        destination: "/all-courses/devops-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/hardware-and-networking-program",
        destination: "/all-courses/hardware-and-networking-course",
        permanent: true,
      },
      {
        source: "/all-courses/cyber-security-program",
        destination: "/all-courses/cyber-security-course",
        permanent: true,
      },
      {
        source: "/all-courses/sap-training-program",
        destination: "/all-courses/sap-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/salesforce-training-program",
        destination: "/all-courses/salesforce-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/servicenow-training-program",
        destination: "/all-courses/servicenow-training-course",
        permanent: true,
      },
      {
        source: "/all-courses/production-support-program",
        destination: "/all-courses/production-support-course",
        permanent: true,
      },
      {
        source: "/all-courses/digital-marketing-program",
        destination: "/all-courses/digital-marketing-course",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
