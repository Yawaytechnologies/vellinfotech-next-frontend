import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Search,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

export const metadata = {
  title:
    "Executive Search, Staffing and HR Consulting Services | Vell InfoTech",
  description:
    "Vell InfoTech provides executive search, permanent staffing, recruitment process outsourcing, HR consulting and industry-focused recruitment services across India.",
  keywords: [
    "executive search services",
    "permanent staffing services",
    "RPO services India",
    "HR consulting services",
    "recruitment consultancy Chennai",
    "leadership hiring Chennai",
    "staffing company Chennai",
  ],
  alternates: {
    canonical: "https://www.vellinfotech.com/consulting",
  },
  openGraph: {
    title: "Recruitment and HR Consulting Services | Vell InfoTech",
    description:
      "Executive search, permanent staffing, RPO and HR consulting solutions for growing organisations.",
    url: "https://www.vellinfotech.com/consulting",
    type: "website",
  },
};

const heroHighlights = [
  ["01", "Search", "Targeted talent identification"],
  ["02", "Screening", "Structured candidate evaluation"],
  ["03", "Selection", "Interview and offer support"],
  ["04", "Joining", "Complete onboarding follow-up"],
];

const heroBenefits = [
  "Industry-Focused Hiring",
  "Confidential Recruitment",
  "End-to-End Support",
];

const recruitmentServices = [
  {
    id: "executive-search",
    number: "01",
    icon: Search,
    label: "Leadership Hiring",
    title: "Executive Search",
    description:
      "We help organisations identify and recruit experienced executives, senior managers and specialised leaders for critical business positions.",
    points: [
      "CXO and leadership hiring",
      "Director and vice-president recruitment",
      "Confidential executive search",
      "Leadership assessment",
    ],
  },
  {
    id: "permanent-staffing",
    number: "02",
    icon: Users,
    label: "Workforce Solutions",
    title: "Permanent Staffing",
    description:
      "We connect businesses with qualified professionals who match the role, company culture and long-term workforce requirements.",
    points: [
      "IT and non-IT recruitment",
      "Candidate sourcing and screening",
      "Interview coordination",
      "Offer and joining support",
    ],
  },
  {
    id: "rpo",
    number: "03",
    icon: BriefcaseBusiness,
    label: "Recruitment Outsourcing",
    title: "Recruitment Process Outsourcing",
    description:
      "Our RPO service manages complete or selected recruitment activities, helping organisations improve hiring speed and reduce recruitment workload.",
    points: [
      "Dedicated recruitment support",
      "High-volume hiring",
      "Recruitment process management",
      "Hiring reports and coordination",
    ],
  },
  {
    id: "hr-consulting",
    number: "04",
    icon: Building2,
    label: "People Advisory",
    title: "HR Consulting",
    description:
      "We support organisations in improving HR practices, workforce planning and employee management through practical consulting solutions.",
    points: [
      "HR policy support",
      "Organisation structure",
      "Performance management",
      "Workforce planning",
    ],
  },
];

const industries = [
  {
    id: "aerospace-defence",
    icon: Building2,
    title: "Aerospace & Defence",
    description:
      "Recruitment support for engineering, manufacturing and leadership roles.",
  },
  {
    id: "agriculture-agribusiness",
    icon: Factory,
    title: "Agriculture & Agribusiness",
    description:
      "Talent solutions for agriculture, food processing and farm operations.",
  },
  {
    id: "automotive-industry",
    icon: Truck,
    title: "Automotive Industry",
    description:
      "Hiring support for automotive sales, production and technical positions.",
  },
  {
    id: "bfsi-sector",
    icon: Landmark,
    title: "BFSI Sector",
    description:
      "Recruitment for banking, insurance, fintech and financial services.",
  },
  {
    id: "education-training",
    icon: GraduationCap,
    title: "Education & Training",
    description:
      "Faculty, trainer, academic and education management recruitment.",
  },
  {
    id: "energy-sector",
    icon: Factory,
    title: "Energy Sector",
    description:
      "Talent acquisition for power, renewable energy and infrastructure roles.",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Recruitment support for healthcare, hospital and life-science positions.",
  },
  {
    id: "information-technology",
    icon: BriefcaseBusiness,
    title: "Information Technology",
    description:
      "Technology hiring across software, cloud, data, cyber security and support.",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    description:
      "Workforce solutions for production, quality, maintenance and operations.",
  },
  {
    id: "logistics-supply-chain",
    icon: Truck,
    title: "Logistics & Supply Chain",
    description:
      "Hiring for logistics, warehouse, transport and supply-chain functions.",
  },
  {
    id: "retail-ecommerce",
    icon: Building2,
    title: "Retail & E-commerce",
    description:
      "Talent solutions for retail operations, sales and digital commerce.",
  },
  {
    id: "telecommunications",
    icon: Users,
    title: "Telecommunications",
    description:
      "Recruitment for telecom operations, sales and technical support roles.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We understand the role, skills, experience, location and business expectations.",
  },
  {
    number: "02",
    title: "Source",
    description:
      "We identify suitable candidates through databases, networks and direct search.",
  },
  {
    number: "03",
    title: "Evaluate",
    description:
      "Candidates are screened for experience, communication and role suitability.",
  },
  {
    number: "04",
    title: "Coordinate",
    description:
      "We manage interviews, feedback, document collection and offer discussions.",
  },
  {
    number: "05",
    title: "Support Joining",
    description:
      "We follow up with the selected candidate until successful onboarding.",
  },
];

const advantages = [
  "Executive and leadership hiring expertise",
  "IT and non-IT recruitment support",
  "Industry-focused sourcing",
  "Access to active and passive candidates",
  "Confidential recruitment process",
  "Interview and joining coordination",
];

export default function ConsultingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Recruitment and HR Consulting Services",
    provider: {
      "@type": "Organization",
      name: "Vell InfoTech",
      url: "https://www.vellinfotech.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [
      "Executive Search",
      "Permanent Staffing",
      "Recruitment Process Outsourcing",
      "HR Consulting",
      "Industry Recruitment",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <main className="overflow-x-hidden bg-white text-slate-950">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-[#061b35] pt-8 text-white sm:pt-10 lg:pt-12 xl:pt-14">
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.25),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(20,184,166,0.15),transparent_32%)]" />

          <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="mx-auto grid w-full max-w-[2200px] grid-cols-1 items-start gap-10 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 lg:py-20 xl:grid-cols-[minmax(0,1.12fr)_minmax(500px,0.88fr)] xl:items-center xl:gap-12 xl:px-12 xl:py-20 2xl:gap-20 2xl:px-16 2xl:py-24">
            {/* Hero Left */}
            <div className="mx-auto w-full max-w-[900px] text-center xl:mx-0 xl:text-left">
              <div className="relative z-10 mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-center text-[11px] font-medium leading-5 text-sky-100 backdrop-blur sm:px-4 sm:text-sm md:px-5 lg:px-6">
                <Sparkles className="h-4 w-4 shrink-0" />

                <span>
                  Executive Search. Staffing Solutions. HR Consulting.
                </span>
              </div>

              <h1 className="mx-auto max-w-[900px] text-[28px] font-bold leading-[1.15] tracking-tight min-[375px]:text-[32px] sm:text-[40px] sm:leading-[1.12] md:text-[48px] lg:text-[54px] xl:mx-0 xl:text-[56px] 2xl:text-[64px]">
                Connecting Businesses With
                <span className="mt-2 block bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  The Right Talent
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[720px] text-[15px] leading-7 text-slate-300 sm:text-lg sm:leading-8 xl:mx-0 xl:max-w-[670px]">
                Vell InfoTech helps organisations recruit experienced leaders,
                qualified professionals and specialised talent through executive
                search, permanent staffing, RPO and HR consulting services.
              </p>

              <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:flex-wrap xl:justify-start">
                <a
                  href="#contact-cta"
                  className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300 sm:w-auto sm:px-7 sm:text-base"
                >
                  Discuss Your Hiring Need
                </a>

                <a
                  href="#executive-search"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:w-auto sm:px-7 sm:text-base"
                >
                  Explore Our Services
                  <ChevronRight className="h-5 w-5 shrink-0" />
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-5 xl:justify-start">
                {heroBenefits.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />

                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Right */}
            <div className="relative mx-auto block w-full max-w-[650px] xl:ml-auto">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-400/15 to-blue-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 pt-1.5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl border border-white/10 bg-[#0c294f]/95 p-5 sm:p-6 2xl:p-7">
                  <div className="flex items-center justify-between gap-5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        Vell Recruitment
                      </p>

                      <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl 2xl:text-3xl">
                        Hiring Support That Delivers
                      </h2>
                    </div>

                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-400 text-slate-950 sm:h-14 sm:w-14">
                      <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {heroHighlights.map(([number, title, description]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/10 sm:min-h-[145px] sm:p-5"
                      >
                        <span className="text-xs font-bold text-cyan-300">
                          {number}
                        </span>

                        <h3 className="mt-2 text-lg font-semibold">{title}</h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-400 p-4 text-slate-950">
                    <p className="text-sm font-medium">
                      From requirement to successful joining
                    </p>

                    <p className="mt-1 text-lg font-bold sm:text-xl">
                      One Partner. Every Stage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Short Highlights */}
        <section className="relative z-10 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Leadership", "Executive search"],
              ["Permanent", "Staffing support"],
              ["Scalable", "RPO solutions"],
              ["Practical", "HR consulting"],
            ].map(([title, description], index) => (
              <div
                key={title}
                className={`p-6 text-center ${
                  index < 3 ? "lg:border-r lg:border-slate-200" : ""
                } ${
                  index < 2 ? "border-b border-slate-200 sm:border-b-0" : ""
                }`}
              >
                <p className="text-lg font-bold text-slate-950">{title}</p>

                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recruitment Services */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Services
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Recruitment Solutions for Every Hiring Need
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Choose the recruitment support that matches your hiring volume,
                timeline and business requirements.
              </p>
            </div>

            <div className="mt-12 space-y-8 lg:mt-16">
              {recruitmentServices.map((service, index) => {
                const Icon = service.icon;

                return (
                  <article
                    id={service.id}
                    key={service.id}
                    className="scroll-mt-40 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div
                      className={`grid items-stretch lg:grid-cols-2 ${
                        index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="p-6 sm:p-8 lg:p-12">
                        <div className="flex items-center gap-4">
                          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                            <Icon className="h-7 w-7" />
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
                              {service.label}
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-400">
                              SERVICE {service.number}
                            </p>
                          </div>
                        </div>

                        <h3 className="mt-6 text-3xl font-bold text-slate-950 sm:text-4xl">
                          {service.title}
                        </h3>

                        <p className="mt-5 max-w-xl leading-8 text-slate-600">
                          {service.description}
                        </p>

                        {/* <Link
                          href="/contact-us"
                          className="group mt-7 inline-flex items-center gap-2 font-bold text-blue-700"
                        >
                          Discuss Your Requirement

                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link> */}
                      </div>

                      <div className="bg-slate-50 p-6 sm:p-8 lg:p-12">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                          Key Support
                        </p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          {service.points.map((point) => (
                            <div
                              key={point}
                              className="flex min-h-[88px] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                            >
                              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />

                              <span className="font-semibold leading-6 text-slate-700">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section
          id="industries"
          className="scroll-mt-40 bg-slate-50 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Industries We Support
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Industry-Focused Recruitment Solutions
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                We understand different industries require different skills,
                experience and recruitment strategies.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {industries.map((industry) => {
                const Icon = industry.icon;

                return (
                  <article
                    id={industry.id}
                    key={industry.id}
                    className="scroll-mt-40 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-950">
                      {industry.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {industry.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Recruitment Process
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                Simple, Transparent and Result-Focused
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-700 text-sm font-bold text-white">
                    {step.number}
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-[#071b36] py-16 text-white sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Why Vell InfoTech?
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Your Recruitment and HR Consulting Partner
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                We combine industry knowledge, candidate networks and structured
                recruitment support to help organisations hire with confidence.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((advantage) => (
                <div
                  key={advantage}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />

                  <span className="font-medium leading-6 text-slate-100">
                    {advantage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers */}
        <section
          id="careers"
          className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Careers
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Explore Career Opportunities at Vell InfoTech
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                View our latest job openings and apply for suitable
                opportunities with Vell InfoTech.
              </p>

              <Link
                href="/careers"
                className="group mt-8 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-[#005BAC] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700 sm:text-base"
              >
                View Job Openings
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact-cta"
          className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-600 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-16 lg:px-16">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:26px_26px]" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
                Recruitment Support
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Need the Right Talent for Your Business?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                Whether you are hiring one executive or building an entire team,
                our recruitment consultants are ready to support you.
              </p>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hr@vellinfotech.com&su=Hiring%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-50"
              >
                Contact Our Team
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
