'use client'
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

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
      { name: "Data Science", slug: "data-science-training-program" },
      { name: "Business Analytics", slug: "business-analytics-course" },
      { name: "Data Science & AI", slug: "data-science-and-ai-program" },
      { name: "Big Data Developer", slug: "big-data-developer-program" },
    ],
  },
  {
    category: "Non Coding Courses",
    items: [
      { name: "Scrum Master", slug: "scrum-master-program" },
      { name: "Business Analyst", slug: "business-analyst-program" },
      { name: "Product Management", slug: "product-management-program" },
    ],
  },
  {
    category: "Testing",
    items: [
      { name: "Software Testing", slug: "software-testing-program" },
      { name: "Selenium Testing", slug: "selenium-testing-program" },
      { name: "ETL Testing", slug: "etl-testing-program" },
    ],
  },
  {
    category: "Cloud Computing",
    items: [
      { name: "AWS Training", slug: "aws-training-program" },
      { name: "DevOps", slug: "devops-training-program" },
    ],
  },
  {
    category: "IT Infrastructure",
    items: [
      { name: "Hardware Networking", slug: "hardware-and-networking-program" },
      { name: "Cyber Security", slug: "cyber-security-program" },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      { name: "SAP", slug: "sap-training-program" },
      { name: "Salesforce", slug: "salesforce-training-program" },
      { name: "ServiceNow", slug: "servicenow-training-program" },
      {
        name: "RPA (Robotic Process Automation)",
        slug: "rpa-robotic-process-automation-course",
      },
    ],
  },
  {
    category: "IT Operations",
    items: [{ name: "Production Support", slug: "production-support-program" }],
  },
  {
    category: "Business & Marketing",
    items: [{ name: "Digital Marketing", slug: "digital-marketing-program" }],
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
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [current, setCurrent] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarMenus, setSidebarMenus] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [desktopCoursesOpen, setDesktopCoursesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

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

  const toggleSidebarMenu = (label) =>
    setSidebarMenus((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <header className="fixed top-0 w-full z-[99999] bg-background">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 md:px-6 lg:px-8 h-16 md:h-[83px]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <div className="overflow-hidden">
                <img
                  src="/images/LL.png"
                  alt="Logo"
                  className="h-20 md:h-22 lg:h-35 w-auto object-contain cursor-pointer scale-[1.06] -m-[2px] block"
                />
              </div>
            </Link>
          </div>

          {/* Top Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-3 lg:gap-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setCurrent(link.name)}
                onMouseEnter={() => setCurrent(link.name)}
                className={`relative font-semibold text-base transition-all duration-200 ${
                  current === link.name
                    ? "text-[#005BAC]"
                    : "text-gray-800/90 hover:text-[#005BAC]"
                } group`}
                style={{
                  boxShadow:
                    current === link.name
                      ? "0 2px 18px 0 rgba(46,140,255,0.12)"
                      : "none",
                }}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Contact Numbers */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-6">
            <div className="flex flex-col items-end leading-tight">
              <span className="font-semibold text-sm md:text-md text-gray-800">
                Enquiry:
              </span>
              <a
                href="tel:+919600593838"
                className="text-[#005BAC] hover:underline text-sm md:text-md font-semibold"
              >
                +91 9600593838
              </a>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-sm md:text-md text-gray-800">
                Support:
              </span>
              <a
                href="tel:+919600383839"
                className="text-[#005BAC] hover:underline text-sm md:text-md font-semibold"
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
        <div className="hidden md:flex w-full bg-[#005BAC] min-h-[54px] items-center px-6 z-[99999] fixed top-[83px] left-0">
          <nav className="w-full flex justify-center gap-10 text-white font-semibold text-base relative">
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
                className="transition flex items-center gap-1 focus:outline-none hover:text-white/90"
              >
                All Courses <span className="text-xs">▾</span>
              </button>

              {desktopCoursesOpen && (
                <div className="absolute left-0 top-full mt-0 bg-white text-black rounded-lg shadow-lg min-w-[260px] z-[99999] flex flex-row overflow-visible">
                  <div className="flex flex-col w-64 rounded-l-lg">
                    {groupedCourses.map((cat, idx) => (
                      <div
                        key={cat.category}
                        className={`px-5 py-3 text-[15px] font-medium cursor-pointer transition-all whitespace-nowrap flex items-center justify-between ${
                          activeCategory === idx
                            ? "bg-[#f0f4fa] text-[#005BAC]"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                        onMouseEnter={() => setActiveCategory(idx)}
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
                          className="px-7 py-3 text-gray-800 hover:bg-[#f3f8fe] hover:text-[#005BAC] rounded-r-lg transition-all text-[15px] font-normal whitespace-nowrap"
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
            <Link href="/reviews" className="transition text-base font-semibold">
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
          className={`fixed top-0 left-0 h-full w-[85vw] max-w-[360px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-0.5">
            <img src="/images/LL.png" alt="Logo" className="h-29 w-auto mb-1" />
            <button onClick={() => setMenuOpen(false)}>
              <FiX className="w-8 h-8 text-text-secondary" />
            </button>
          </div>

          {/* ✅ This nav keeps your "always need this part" */}
          <nav className="flex flex-col mt-4 px-6 gap-2 overflow-y-auto flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold py-2 text-gray-700 hover:text-[#005BAC]"
              >
                {link.name}
              </Link>
            ))}

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
