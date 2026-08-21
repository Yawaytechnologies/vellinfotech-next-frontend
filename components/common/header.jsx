"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ✅ Updated groupedCourses: proper /all-courses/:slug slugs */
const groupedCourses = [
  {
    category: "Software Development",
    items: [
      { name: "Java", slug: "java-full-stack-developer-course" },
      { name: "Python", slug: "python-full-stack-developer-course" },
      { name: "Full Stack Development", slug: "full-stack-development-course" },
      { name: "PL SQL", slug: "pl-sql-developer-course" },
      { name: "SQL", slug: "sql-developer-course" },
    ],
  },
  {
    category: "Data Science & Analytics",
    items: [
      { name: "Data Science", slug: "data-science-training-course" },
      { name: "Business Analytics", slug: "business-analytics-course" },
      { name: "Data Science & AI", slug: "data-science-and-ai-course" },
      { name: "Data Engineering", slug: "data-engineering-course" },
      { name: "Big Data Developer", slug: "big-data-developer-course" },
    ],
  },
  {
    category: "Non Coding Courses",
    items: [
      { name: "Scrum Master", slug: "scrum-master-course" },
      { name: "Business Analyst", slug: "business-analyst-course" },
      { name: "Product Management", slug: "product-management-course" },
    ],
  },
  {
    category: "Testing",
    items: [
      { name: "Software Testing", slug: "software-testing-course" },
      { name: "Selenium Testing", slug: "selenium-testing-course" },
      { name: "ETL Testing", slug: "etl-testing-course" },
    ],
  },
  {
    category: "Cloud Computing",
    items: [
      { name: "AWS Training", slug: "aws-training-program" },
      { name: "DevOps", slug: "devops-training-course" },
    ],
  },
  {
    category: "IT Infrastructure",
    items: [
      { name: "Hardware Networking", slug: "hardware-and-networking-course" },
      { name: "Cyber Security", slug: "cyber-security-course" },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      { name: "SAP", slug: "sap-training-course" },
      { name: "Salesforce", slug: "salesforce-training-course" },
      { name: "ServiceNow", slug: "servicenow-training-course" },
      {
        name: "RPA (Robotic Process Automation)",
        slug: "rpa-robotic-process-automation-course",
      },
    ],
  },
  {
    category: "IT Operations",
    items: [{ name: "Production Support", slug: "production-support-course" }],
  },
  {
    category: "Business & Marketing",
    items: [{ name: "Digital Marketing", slug: "digital-marketing-course" }],
  },
  {
    category: "Professional Development",
    items: [{ name: "Soft Skill Training", slug: "soft-skills-training" }],
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/all-courses" },
  { name: "Careers", href: "/careers" },
  { name: "Clients", href: "/client" },
  { name: "Consulting", href: "/consulting" },
  { name: "Contact", href: "/contact-us" },
];

const consultingMenus = [
  {
    category: "Services",
    items: [
      {
        name: "Executive Search",
        href: "/consulting#executive-search",
      },
      {
        name: "Permanent Staffing",
        href: "/consulting#permanent-staffing",
      },
      {
        name: "RPO",
        href: "/consulting#rpo",
      },
      {
        name: "HR Consulting",
        href: "/consulting#hr-consulting",
      },
    ],
  },
  {
    category: "Industries",
    items: [
      {
        name: "Agriculture & Agribusiness",
        href: "/consulting#agriculture-agribusiness",
      },
      {
        name: "Automotive Industry",
        href: "/consulting#automotive-industry",
      },
      {
        name: "BFSI Sector",
        href: "/consulting#bfsi-sector",
      },
      {
        name: "Education & Training",
        href: "/consulting#education-training",
      },
      {
        name: "Energy Sector",
        href: "/consulting#energy-sector",
      },
      {
        name: "Healthcare",
        href: "/consulting#healthcare",
      },
      {
        name: "Information Technology",
        href: "/consulting#information-technology",
      },
      {
        name: "Manufacturing",
        href: "/consulting#manufacturing",
      },
      {
        name: "Logistics & Supply Chain",
        href: "/consulting#logistics-supply-chain",
      },
      {
        name: "Retail & E-commerce",
        href: "/consulting#retail-ecommerce",
      },
      {
        name: "Telecommunications",
        href: "/consulting#telecommunications",
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  // const [current, setCurrent] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarMenus, setSidebarMenus] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [desktopCoursesOpen, setDesktopCoursesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [consultingOpen, setConsultingOpen] = useState(false);
  const [activeConsultingMenu, setActiveConsultingMenu] = useState(0);
  const [mobileConsultingOpen, setMobileConsultingOpen] = useState(false);
  const [mobileConsultingCategory, setMobileConsultingCategory] =
    useState(null);

  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState(null);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setSidebarMenus({});
  }, [menuOpen]);

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isCareersActive =
    pathname === "/consult/careers" || pathname.startsWith("/consult/careers/");

  const isConsultingOverviewActive = pathname === "/consulting" && !currentHash;
  const isNavActive = (link) => {
    if (link.href === "/") {
      return pathname === "/";
    }

    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  const toggleSidebarMenu = (label) =>
    setSidebarMenus((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <header className="fixed top-0 w-full z-[99999] bg-background">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 md:px-4 lg:px-8 xl:px-12 h-16 sm:h-18 md:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <div className="overflow-hidden">
                <img
                  src="/images/LL.png"
                  alt="Logo"
                  className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain cursor-pointer scale-[1.06] -m-[2px] block"
                />
              </div>
            </Link>
          </div>

          {/* Top Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-3 lg:gap-5 xl:gap-8">
            {navLinks.map((link) =>
              link.name === "Consulting" ? (
                <div
                  key={link.name}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => {
                    setConsultingOpen(true);

                    if (isCareersActive || isConsultingOverviewActive) {
                      setActiveConsultingMenu(null);
                    }
                  }}
                  onMouseLeave={() => {
                    setConsultingOpen(false);
                  }}
                >
                  <Link
                    href="/consulting"
                    className={`flex items-center gap-1 font-semibold text-[13px] transition-all duration-200 lg:text-[15px] xl:text-lg ${
                      pathname === "/consulting"
                        ? "text-[#005BAC]"
                        : "text-gray-800/90 hover:text-[#005BAC]"
                    }`}
                  >
                    Consulting
                    <FiChevronDown
                      className={`transition-transform duration-200 ${
                        consultingOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {consultingOpen && (
                    <div className="absolute left-1/2 top-full z-[100000] w-max -translate-x-1/2 pt-[54px]">
                      <div className="flex w-[620px] xl:w-[720px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
                        {/* Left category panel */}
                        <div className="w-[250px] bg-gradient-to-b from-slate-950 to-slate-900 p-3 text-white">
                          <div className="mb-3 px-3 pt-2">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                              Vell InfoTech
                            </p>

                            {/* <h3 className="mt-1 text-lg font-bold">
            Consulting Solutions
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Explore our services and industries.
          </p> */}
                          </div>

                          {consultingMenus.map((menu, index) => (
                            <button
                              key={menu.category}
                              type="button"
                              onMouseEnter={() =>
                                setActiveConsultingMenu(index)
                              }
                              onClick={() => setActiveConsultingMenu(index)}
                              className={`group mb-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                                activeConsultingMenu === index
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                                  : "text-slate-200 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              <div>
                                <span className="block text-sm font-semibold">
                                  {menu.category}
                                </span>

                                <span
                                  className={`mt-0.5 block text-[11px] ${
                                    activeConsultingMenu === index
                                      ? "text-cyan-50"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {menu.category === "Services"
                                    ? "Our recruitment solutions"
                                    : "Sectors we support"}
                                </span>
                              </div>

                              <FiChevronRight
                                className={`transition-transform duration-200 ${
                                  activeConsultingMenu === index
                                    ? "translate-x-1"
                                    : "group-hover:translate-x-1"
                                }`}
                                size={18}
                              />
                            </button>
                          ))}

                          <Link
                            href="/consult/careers"
                            onMouseEnter={() => setActiveConsultingMenu(null)}
                            onClick={() => {
                              setConsultingOpen(false);
                              setActiveConsultingMenu(null);
                            }}
                            className={`group mb-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                              isCareersActive
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                                : "text-slate-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:shadow-lg"
                            }`}
                          >
                            <div>
                              <span className="block text-sm font-semibold">
                                Careers
                              </span>
                              <span
                                className={`mt-0.5 block text-[11px] ${
                                  isCareersActive
                                    ? "text-cyan-50"
                                    : "text-slate-400 group-hover:text-cyan-50"
                                }`}
                              >
                                Explore career opportunities
                              </span>
                            </div>

                            <FiChevronRight size={18} />
                          </Link>

                          <Link
                            href="/consulting"
                            onMouseEnter={() => setActiveConsultingMenu(null)}
                            onClick={() => {
                              setConsultingOpen(false);
                              setActiveConsultingMenu(null);
                            }}
                            className={`mt-3 flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                              isConsultingOverviewActive
                                ? "border-transparent bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                                : "border-white/10 text-slate-200 hover:border-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:shadow-lg"
                            }`}
                          >
                            Consulting Overview
                            <FiChevronRight />
                          </Link>
                        </div>

                        {/* Right items panel */}
                        <div className="flex min-w-[370px] bg-white p-4">
                          {activeConsultingMenu === null ? (
                            <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl bg-slate-50 px-6 text-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                                <FiChevronRight size={22} />
                              </div>

                              <h4 className="mt-4 text-lg font-bold text-slate-900">
                                Choose a category
                              </h4>

                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                Select Services or Industries to view the
                                available options.
                              </p>
                            </div>
                          ) : (
                            <>
                              <div className="mb-3 border-b border-slate-100 px-2 pb-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-600">
                                  Explore
                                </p>

                                <h4 className="mt-1 text-xl font-bold text-slate-900">
                                  {
                                    consultingMenus[activeConsultingMenu]
                                      .category
                                  }
                                </h4>
                              </div>

                              <div className=" max-h-[390px] space-y-1 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
                                {consultingMenus[
                                  activeConsultingMenu
                                ].items.map((item, itemIndex) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => {
                                      setConsultingOpen(false);
                                      setActiveConsultingMenu(null);
                                    }}
                                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-[#005BAC]"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 transition group-hover:bg-cyan-500 group-hover:text-white">
                                        {String(itemIndex + 1).padStart(2, "0")}
                                      </span>

                                      <span>{item.name}</span>
                                    </div>

                                    <FiChevronRight
                                      className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#005BAC]"
                                      size={17}
                                    />
                                  </Link>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-semibold text-[13px] transition-all duration-200 lg:text-[15px] xl:text-lg ${
                    isNavActive(link)
                      ? "text-[#005BAC]"
                      : "text-gray-800/90 hover:text-[#005BAC]"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </nav>

          {/* Contact Numbers */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-4 xl:gap-6">
            <div className="flex flex-col items-end leading-tight">
              <span className="font-semibold text-xs lg:text-sm xl:text-base text-gray-800">
                Enquiry:
              </span>
              <a
                href="tel:+919600593838"
                className="text-[#005BAC] hover:underline text-xs lg:text-sm xl:text-base font-semibold"
              >
                +91 9600593838
              </a>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-xs lg:text-sm xl:text-base text-gray-800">
                Support:
              </span>
              <a
                href="tel:+919600383839"
                className="text-[#005BAC] hover:underline text-xs lg:text-sm xl:text-base font-semibold"
              >
                +91 9600383839
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/60 backdrop-blur hover:bg-white/80 transition ml-2"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu className="w-7 h-7 text-primary" />
          </button>
        </div>

        {/* Desktop Subheader */}
        <div className="hidden md:flex w-full bg-[#005BAC] min-h-[54px] items-center px-6 z-[99999] fixed top-20 lg:top-24 left-0">
          <nav className="w-full flex justify-center items-center gap-5 lg:gap-8 xl:gap-12 text-white font-semibold text-[15px] lg:text-base relative">
            {/* All Courses dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopCoursesOpen(true)}
              onMouseLeave={() => {
                setDesktopCoursesOpen(false);
                setActiveCategory(null);
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDesktopCoursesOpen((prev) => !prev);

                  if (!desktopCoursesOpen) {
                    setActiveCategory(0);
                  }
                }}
                className="transition flex items-center gap-1 focus:outline-none hover:text-white/90"
              >
                All Courses <span className="text-xs">▾</span>
              </button>

              {desktopCoursesOpen && (
                <div className="absolute left-0 top-full mt-0 bg-white text-black rounded-lg shadow-lg min-w-[260px] z-[99999] flex flex-row overflow-visible max-h-[calc(100vh-135px)]">
                  <div className="flex flex-col w-64 rounded-l-lg max-h-[calc(100vh-170px)] overflow-y-auto">
                    {groupedCourses.map((cat, idx) => (
                      <div
                        key={cat.category}
                        className={`px-3 py-2 lg:px-5 lg:py-2 text-[13px] lg:text-[15px] font-medium cursor-pointer transition-all whitespace-nowrap flex items-center justify-between ${
                          activeCategory === idx
                            ? "bg-[#f0f4fa] text-[#005BAC]"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                        onMouseEnter={() => setActiveCategory(idx)}
                        onClick={() => setActiveCategory(idx)}
                      >
                        <span>{cat.category}</span>
                        <FiChevronRight
                          className={`text-gray-400 transition-transform duration-200 ${
                            activeCategory === idx ? "translate-x-1" : ""
                          }`}
                          size={18}
                        />
                      </div>
                    ))}
                  </div>

                  {activeCategory !== null && (
                    <div className="flex flex-col min-w-[220px] max-h-[60vh] overflow-y-auto bg-white rounded-r-lg">
                      {groupedCourses[activeCategory].items.map((item) => (
                        <Link
                          key={item.name}
                          href={`/all-courses/${item.slug}`}
                          onClick={() => {
                            setDesktopCoursesOpen(false);
                            setActiveCategory(null);
                          }}
                          className="px-4 py-2 lg:px-7 lg:py-2 text-gray-800 hover:bg-[#f3f8fe] hover:text-[#005BAC] rounded-r-lg transition-all text-[13px] lg:text-[15px] font-normal whitespace-nowrap"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Other top menu links */}
            <Link
              href="/internship"
              className="transition text-base font-semibold"
            >
              Internship
            </Link>
            <Link
              href="/placed-students"
              className="transition text-base font-semibold"
            >
              Placed Students List
            </Link>
            <Link
              href="/reviews"
              className="transition text-base font-semibold"
            >
              Reviews
            </Link>
            <Link href="/blog" className="transition text-base font-semibold">
              Blog
            </Link>

            {/* More dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                className="transition flex items-center gap-1 hover:text-white/90"
              >
                More <span className="text-xs">▾</span>
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-full mt-0 bg-white text-black rounded shadow-lg min-w-[180px] z-[99999] flex flex-col">
                  <Link
                    href="/interview-questions"
                    onClick={() => setMoreOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Interview Questions
                  </Link>
                  <Link
                    href="/tutorials"
                    onClick={() => setMoreOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Tutorials
                  </Link>
                  <Link
                    href="/sample-resume"
                    onClick={() => setMoreOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    Sample Resume
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Overlay for mobile */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-[82vw] max-w-[380px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-0.5">
            <img src="/images/LL.png" alt="Logo" className="h-20 w-auto mb-1" />
            <button onClick={() => setMenuOpen(false)}>
              <FiX className="w-8 h-8 text-text-secondary" />
            </button>
          </div>

          {/* ✅ This nav keeps your "always need this part" */}
          <nav className="flex flex-col mt-4 px-6 gap-2 overflow-y-auto flex-1">
            {navLinks.map((link) =>
              link.name === "Consulting" ? (
                <div key={link.name}>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileConsultingOpen((previous) => !previous);
                      setMobileConsultingCategory(null);
                    }}
                    className="flex w-full items-center justify-between py-2 text-base font-semibold text-gray-700 hover:text-[#005BAC]"
                  >
                    <span>Consulting</span>

                    {mobileConsultingOpen ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </button>

                  {mobileConsultingOpen && (
                    <div className="ml-3 border-l border-slate-200 pl-4">
                      <Link
                        href="/consulting"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#005BAC]"
                      >
                        Consulting Overview
                      </Link>

                      {consultingMenus.map((menu, index) => (
                        <div key={menu.category} className="mt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setMobileConsultingCategory(
                                mobileConsultingCategory === index
                                  ? null
                                  : index,
                              )
                            }
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                              mobileConsultingCategory === index
                                ? "bg-cyan-50 text-[#005BAC]"
                                : "text-gray-700 hover:bg-slate-50 hover:text-[#005BAC]"
                            }`}
                          >
                            <span>{menu.category}</span>

                            <FiChevronRight
                              className={`transition-transform duration-200 ${
                                mobileConsultingCategory === index
                                  ? "rotate-90 text-[#005BAC]"
                                  : ""
                              }`}
                            />
                          </button>

                          {mobileConsultingCategory === index && (
                            <div className="ml-3 mt-1 border-l border-slate-200 pl-3">
                              {menu.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setMobileConsultingOpen(false);
                                    setMobileConsultingCategory(null);
                                  }}
                                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-cyan-50 hover:text-[#005BAC]"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      <Link
                        href="/careers"
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileConsultingOpen(false);
                          setMobileConsultingCategory(null);
                        }}
                        className="block rounded-lg px-3 py-2 mt-1 text-sm font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#005BAC]"
                      >
                        Careers
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-base font-semibold text-gray-700 hover:text-[#005BAC]"
                >
                  {link.name}
                </Link>
              ),
            )}

            {/* Mobile All Courses */}
            <div>
              <button
                className="w-full flex items-center justify-between py-2 text-gray-700 text-md font-semibold hover:text-[#005BAC]"
                onClick={() => setMobileCoursesOpen((prev) => !prev)}
                type="button"
              >
                <span>All Courses</span>
                {mobileCoursesOpen ? <FiChevronDown /> : <FiChevronRight />}
              </button>

              {mobileCoursesOpen && (
                <div className="ml-2 pb-2">
                  {groupedCourses.map((cat, idx) => (
                    <div key={cat.category} className="mb-1">
                      <button
                        className="w-full flex items-center justify-between text-base text-gray-900 py-2 hover:text-[#005BAC]"
                        onClick={() =>
                          setMobileCategory(mobileCategory === idx ? null : idx)
                        }
                        type="button"
                      >
                        <span>{cat.category}</span>
                        <FiChevronRight
                          className={`ml-2 transition-transform ${
                            mobileCategory === idx
                              ? "rotate-90 text-[#005BAC]"
                              : ""
                          }`}
                        />
                      </button>

                      {mobileCategory === idx && (
                        <div className="pl-4">
                          {cat.items.map((item) => (
                            <Link
                              key={item.name}
                              href={`/all-courses/${item.slug}`}
                              className="block py-1 text-gray-800 hover:text-[#005BAC]"
                              onClick={() => setMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Extra links below All Courses */}
            <div className="mt-0 pt-0">
              <Link
                href="/internship"
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2 text-gray-700 hover:text-[#005BAC] block"
              >
                Internship
              </Link>

              <Link
                href="/placed-students"
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2 text-gray-700 hover:text-[#005BAC] block"
              >
                Placed Students List
              </Link>

              <Link
                href="/reviews"
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2 text-gray-700 hover:text-[#005BAC] block"
              >
                Reviews
              </Link>

              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2 text-gray-700 hover:text-[#005BAC] block"
              >
                Blog
              </Link>

              {/* Mobile More (accordion) */}
              <button
                className="w-full flex items-center justify-between py-2 text-gray-700 text-md hover:text-[#005BAC] font-semibold"
                onClick={() => setMobileMoreOpen((p) => !p)}
                type="button"
              >
                <span>More</span>
                {mobileMoreOpen ? <FiChevronDown /> : <FiChevronRight />}
              </button>

              {mobileMoreOpen && (
                <div className="pl-4 pb-2 flex flex-col">
                  <Link
                    href="/interview-questions"
                    onClick={() => setMenuOpen(false)}
                    className="py-1 text-gray-800 hover:text-[#005BAC]"
                  >
                    Interview Questions
                  </Link>

                  <Link
                    href="/tutorials"
                    onClick={() => setMenuOpen(false)}
                    className="py-1 text-gray-800 hover:text-[#005BAC]"
                  >
                    Tutorials
                  </Link>

                  <Link
                    href="/sample-resume"
                    onClick={() => setMenuOpen(false)}
                    className="py-1 text-gray-800 hover:text-[#005BAC]"
                  >
                    Sample Resume
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </aside>
      </header>
    </>
  );
}
