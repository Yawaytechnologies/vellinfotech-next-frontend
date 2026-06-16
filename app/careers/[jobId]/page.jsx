import { notFound } from "next/navigation";
import { fetchJobPosts, fetchJobPostById } from "../../../lib/api";
import JobDetailClient from "../../../components/JobDetailClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  const jobs = await fetchJobPosts();
  return jobs.map((job) => ({ jobId: String(job.id) }));
}

export async function generateMetadata({ params }) {
  const { jobId } = await params;
  const job = await fetchJobPostById(jobId);
  if (!job) return {};
  return {
    title: `${job.jobTitle} at ${job.department || "Vell InfoTech"} | Careers`,
    description:
      job.jobDescription?.substring(0, 160) ||
      `Apply for the ${job.jobTitle} position at Vell InfoTech.`,
    alternates: {
      canonical: `https://www.vellinfotech.com/careers/${jobId}`,
    },
    openGraph: {
      title: job.jobTitle,
      description:
        job.jobDescription?.substring(0, 160) ||
        `Apply for the ${job.jobTitle} position at Vell InfoTech.`,
      url: `https://www.vellinfotech.com/careers/${jobId}`,
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }) {
  const { jobId } = await params;
  const job = await fetchJobPostById(jobId);
  if (!job) notFound();

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.jobTitle,
    description:
      job.jobDescription ||
      "Trainer role at Vell Infotech involving concept teaching, hands-on labs and real-time project guidance.",
    datePosted: job.updatedAt || job.createdAt || undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: "Vell Infotech",
      sameAs: "https://www.vellinfotech.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    baseSalary: job.salaryRange
      ? {
          "@type": "MonetaryAmount",
          currency: "INR",
          value: {
            "@type": "QuantitativeValue",
            value: job.salaryRange,
          },
        }
      : undefined,
    employmentType: "FULL_TIME",
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
        name: "Careers",
        item: "https://www.vellinfotech.com/careers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.jobTitle,
        item: `https://www.vellinfotech.com/careers/${jobId}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <JobDetailClient job={job} />
    </>
  );
}
