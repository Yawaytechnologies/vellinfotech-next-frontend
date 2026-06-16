import InterviewDetailClient from "./InterviewDetailClient";

const interviewMeta = {
  aws: {
    title: "AWS Interview Questions & Answers | Vell InfoTech",
    description:
      "Prepare for AWS cloud interviews with curated fresher and experienced-level questions on EC2, S3, IAM, Lambda, VPC and more.",
  },
  selenium: {
    title: "Selenium Interview Questions & Answers | Vell InfoTech",
    description:
      "Ace your Selenium automation testing interviews with expert questions on WebDriver, TestNG, POM, Grid and more.",
  },
  python: {
    title: "Python Interview Questions & Answers | Vell InfoTech",
    description:
      "Prepare for Python interviews with questions covering OOP, decorators, generators, data structures and more.",
  },
  java: {
    title: "Java Interview Questions & Answers | Vell InfoTech",
    description:
      "Get ready for Java interviews with questions on OOP, collections, multithreading, Spring Framework and more.",
  },
};

export async function generateStaticParams() {
  return [
    { id: "aws" },
    { id: "selenium" },
    { id: "python" },
    { id: "java" },
  ];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const meta = interviewMeta[id];
  if (!meta) {
    return {
      title: "Interview Questions | Vell InfoTech",
      description: "IT interview preparation guides from Vell InfoTech.",
    };
  }
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://www.vellinfotech.com/interview/${id}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.vellinfotech.com/interview/${id}`,
    },
  };
}

export default async function InterviewDetailPage({ params }) {
  const { id } = await params;
  return <InterviewDetailClient id={id} />;
}
