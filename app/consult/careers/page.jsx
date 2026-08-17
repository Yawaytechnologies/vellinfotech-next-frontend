import { fetchConsultingJobPosts } from "../../../lib/api";
import ConsultingJobListClient from "../../../components/consulting/ConsultingJobListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Consulting Careers | Vell InfoTech — Recruitment & Staffing Jobs",
  description:
    "Explore consulting career opportunities at Vell InfoTech across recruitment, staffing, business consulting and client solutions in Chennai.",
  keywords:
    "Consulting jobs Chennai, HR recruitment consultant jobs, Business development executive jobs, Staffing jobs Chennai, Recruitment consultant careers",
  alternates: {
    canonical: "https://www.vellinfotech.com/consult/careers",
  },
  openGraph: {
    title: "Consulting Careers | Vell InfoTech",
    description:
      "Explore consulting career opportunities at Vell InfoTech across recruitment, staffing, business consulting and client solutions.",
    url: "https://www.vellinfotech.com/consult/careers",
    type: "website",
  },
};

export default async function ConsultingCareersPage() {
  const jobs = await fetchConsultingJobPosts();

  return <ConsultingJobListClient jobs={jobs} />;
}
