import TutorialDetailClient from "./TutorialDetailClient";

const tutorialMeta = {
  "django-framework-from-scratch": {
    title: "Django Tutorial — Learn Django Framework from Scratch | Vell InfoTech",
    description:
      "Step-by-step Django tutorial covering environment setup, MVT pattern, models, views, templates, and deployment basics.",
  },
  "build-your-first-data-warehouse": {
    title: "Building Your First Data Warehouse | Vell InfoTech",
    description:
      "Hands-on tutorial on data warehouse architecture, ETL/ELT pipelines, Snowflake/BigQuery setup, and performance optimization.",
  },
  "git-beginners": {
    title: "Git Tutorial for Beginners — From Zero to PR | Vell InfoTech",
    description:
      "Learn Git from scratch: install, first repo, branching, remote workflows, and opening your first pull request.",
  },
  "spring-boot-rest": {
    title: "Spring Boot REST API — Clean Controllers & Validation | Vell InfoTech",
    description:
      "Build a production-ready Spring Boot REST API with DTOs, Bean Validation, exception handling, and OpenAPI docs.",
  },
  "react-hooks-deep-dive": {
    title: "React Hooks Deep Dive — useState, useEffect & Beyond | Vell InfoTech",
    description:
      "Master React hooks: useState, useEffect, custom hooks, and how to avoid common pitfalls like infinite renders.",
  },
  "sql-joins-explained": {
    title: "SQL Joins Explained with Visuals | Vell InfoTech",
    description:
      "Understand INNER, LEFT, RIGHT, FULL OUTER and CROSS joins with example queries and performance tips.",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "django-framework-from-scratch" },
    { slug: "build-your-first-data-warehouse" },
    { slug: "git-beginners" },
    { slug: "spring-boot-rest" },
    { slug: "react-hooks-deep-dive" },
    { slug: "sql-joins-explained" },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = tutorialMeta[slug];
  if (!meta) {
    return {
      title: "Tutorial | Vell InfoTech",
      description: "IT tutorials and learning resources from Vell InfoTech.",
    };
  }
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://www.vellinfotech.com/tutorials/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.vellinfotech.com/tutorials/${slug}`,
    },
  };
}

export default async function TutorialDetailPage({ params }) {
  const { slug } = await params;
  return <TutorialDetailClient slug={slug} />;
}
