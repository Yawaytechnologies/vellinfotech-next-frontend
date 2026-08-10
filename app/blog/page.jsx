import { fetchBlogPosts } from "../../lib/api";
import BlogListClient from "../../components/BlogListClient";
import { FiArrowRight } from "react-icons/fi";

export const revalidate = 3600;

export const metadata = {
  title: "IT Blog | Vell InfoTech — Insights, Tips & Career Advice",
  description:
    "Read the latest IT career insights, software development tips, and training advice from Vell InfoTech's expert trainers.",
  keywords:
    "IT Career Blogs, Technology Training Blogs, Software Training Articles, IT Courses Blog, Career Guidance for IT Jobs, Programming Tutorials Blog, Digital Skills Training, Interview Tips for IT Jobs, Latest Technology Trends, IT Certification Guide",
  alternates: { canonical: "https://www.vellinfotech.com/blog" },
  openGraph: {
    title: "IT Blog | Vell InfoTech",
    description:
      "Read the latest IT career insights, software development tips, and training advice from Vell InfoTech's expert trainers.",
    url: "https://www.vellinfotech.com/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <main className="bg-[#021733] min-h-screen">
      {/* Hero */}
      <section
        className="relative w-full bg-gradient-to-br from-[#00448f] via-[#003369] to-[#010b22] py-24 px-4 text-white overflow-hidden mt-12 shadow-[0_-10px_30px_rgba(0,0,0,0.45)]"
        aria-labelledby="blog-page-title"
      >
        <div
          className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#00E0FF]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-16 pt-6 md:pt-10 lg:pt-12 pb-8 md:pb-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left px-0 md:pl-6 lg:pl-8 xl:pl-10 flex flex-col items-center md:items-start justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 pl-3 pr-4 py-1 text-[10px] md:text-xs font-semibold tracking-wide uppercase mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Vell InfoTech Blog · Careers · Training · Hiring
            </div>

            <h1
              id="blog-page-title"
              className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-tight mb-3 max-w-2xl"
            >
              <span className="block">Insights on Tech</span>
              <span className="block">Careers, Training &amp; Hiring</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl text-white/90 mb-6 max-w-2xl mx-auto md:mx-0">
              No fluff. Just real stories, salary breakdowns, and step-by-step
              playbooks for learners, career switchers, and hiring teams who
              actually care about outcomes.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start w-full">
              <a
                href="#latest-articles"
                className="group inline-flex items-center justify-between gap-2 bg-black text-white font-semibold pl-5 pr-3 py-2.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] whitespace-nowrap border border-black transition-all duration-300 ease-out hover:bg-emerald-500 hover:text-black"
              >
                <span>Browse Latest Posts</span>

                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:translate-x-1">
                  <FiArrowRight className="text-sm" />
                </span>
              </a>

              <p className="text-xs text-white/70">
                Updated frequently with fresh, industry-relevant topics.
              </p>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#00E0FF]/30 via-white/5 to-[#00ffb3]/10 blur-xl"
                aria-hidden="true"
              />

              <img
                src="/images/career.jpg"
                alt="People reading tech blog articles online"
                className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[440px] xl:max-w-[500px] 2xl:max-w-[560px] h-auto mx-auto md:mx-0 drop-shadow-2xl rounded-3xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section
        id="latest-articles"
        className="w-full bg-[#E7EFF7]"
        aria-labelledby="latest-articles-heading"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <header className="mb-5 text-center">
            <h2
              id="latest-articles-heading"
              className="text-2xl md:text-3xl font-bold text-[#021733]"
            >
              Latest Articles
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Deep-dive guides, salary insights, and beginner-friendly templates
              you can actually use in your next career move or hiring plan.
            </p>
          </header>

          <BlogListClient posts={posts} />
        </div>
      </section>
    </main>
  );
}
