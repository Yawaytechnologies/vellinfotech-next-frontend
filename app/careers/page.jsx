import { fetchJobPosts } from "../../lib/api";
import JobListClient from "../../components/JobListClient";

export const revalidate = 3600;

export const metadata = {
  title: "IT Job Openings | Vell InfoTech — Placement Support",
  description:
    "Browse the latest IT job openings facilitated by Vell InfoTech. We connect trained professionals with top IT companies in Chennai.",
  keywords:
    "Software developer jobs Chennai, IT jobs in Chennai for freshers, Data science jobs, DevOps engineer jobs, AWS jobs in Chennai, Data analytics jobs, Web developer jobs Chennai, Fresher jobs in IT, Full stack developer jobs, Cloud computing jobs Chennai",
  alternates: { canonical: "https://www.vellinfotech.com/careers" },
  openGraph: {
    title: "IT Jobs | Vell InfoTech",
    description:
      "Browse the latest IT job openings facilitated by Vell InfoTech. We connect trained professionals with top IT companies in Chennai.",
    url: "https://www.vellinfotech.com/careers",
    type: "website",
  },
};

export default async function CareersPage() {
  const jobs = await fetchJobPosts();

  return <JobListClient jobs={jobs} />;
}
