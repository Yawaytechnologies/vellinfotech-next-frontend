'use client';

// src/pages/Privacy.jsx
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function Privacy() {
  const bottomRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Show "Back to Top" after some scroll
  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main
      id="privacy-page"
      className="relative isolate min-h-screen bg-white text-gray-800"
    >
      {/* Kill any global overlays or dotted backgrounds */}
      <style>{`
        #privacy-page, #privacy-page::before, #privacy-page::after {
          background: #ffffff !important;
          background-image: none !important;
        }
      `}</style>

      {/* Hero / Page header */}
      <section className="pt-28 pb-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
            <div className="p-6 md:p-8 bg-gradient-to-r from-[#eaf2ff] via-white to-[#eaf2ff]">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2650]">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: October 31, 2025
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <button
                  onClick={scrollToBottom}
                  className="px-4 py-2 rounded-full bg-[#005BAC] text-white text-sm font-semibold hover:opacity-90 transition"
                  aria-label="Scroll to bottom"
                >
                  Scroll to bottom
                </button>

                <Link
                  href="/contact-us"
                  className="px-4 py-2 rounded-full border border-[#005BAC] text-[#005BAC] text-sm font-semibold hover:bg-[#005BAC]/5 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="p-6 md:p-8 leading-relaxed">
              <p className="mb-6">
                At <strong>Vell Infotech</strong>, your privacy is our top
                priority. This Privacy Policy explains how we collect, use, and
                protect your information when you visit our website or use our
                services.
              </p>

              {/* Cards for each section */}
              <Section
                title="1. Information We Collect"
                items={[
                  <>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, and any details you provide when contacting us
                    or filling out a form.
                  </>,
                  <>
                    <strong>Technical Information:</strong> IP address, browser
                    type, device information, and website usage data collected
                    automatically through cookies and analytics tools.
                  </>,
                  <>
                    <strong>Service Information:</strong> Project or
                    service-related details you share with us during
                    communication.
                  </>,
                ]}
              />

              <Section
                title="2. How We Use Your Information"
                items={[
                  "Provide and manage our IT, web development, or digital services",
                  "Communicate with you regarding inquiries, quotes, or projects",
                  "Improve our website performance and user experience",
                  "Send updates or promotional content (only if you agree)",
                ]}
              />

              <SimpleSection title="3. Data Sharing">
                We do not sell or share your personal information with third
                parties. However, we may use trusted third-party tools and
                service providers (like hosting, analytics, or email tools) that
                process information on our behalf under strict confidentiality.
              </SimpleSection>

              <SimpleSection title="4. Data Protection">
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, loss, or misuse.
              </SimpleSection>

              <SimpleSection title="5. Cookies">
                Our website uses cookies to improve your experience and analyze
                visitor behavior. You can manage or disable cookies in your
                browser settings.
              </SimpleSection>

              <SimpleSection title="6. Your Rights">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    Request access, correction, or deletion of your personal
                    data
                  </li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at{" "}
                  <a
                    href="mailto:vellinfotech10@gmail.com"
                    className="text-[#005BAC] underline"
                  >
                    vellinfotech10@gmail.com
                  </a>{" "}
                  or visit our{" "}
                  <Link href="/contact-us" className="text-[#005BAC] underline">
                    Contact page
                  </Link>
                  .
                </p>
              </SimpleSection>

              <SimpleSection title="7. Third-Party Links">
                Our website may include links to external websites. We are not
                responsible for the content or privacy practices of these
                external sites.
              </SimpleSection>

              <SimpleSection title="8. Updates to This Policy">
                We may update this Privacy Policy periodically. The latest
                version will always be available on this page.
              </SimpleSection>

              <SimpleSection title="9. Contact Us">
                <ul className="space-y-1">
                  <li>
                    📧 Email:{" "}
                    <a
                      href="mailto:vellinfotech10@gmail.com"
                      className="text-[#005BAC] underline"
                    >
                      vellinfotech10@gmail.com
                    </a>
                  </li>
                  <li>
                    🌐 Website:{" "}
                    <a
                      href="https://www.vellinfotech.com"
                      className="text-[#005BAC] underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.vellinfotech.com
                    </a>
                  </li>
                </ul>
              </SimpleSection>

              {/* Anchor for bottom scroll target */}
              <div ref={bottomRef} className="h-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Top button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-30 rounded-full shadow-lg bg-white border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          ↑ Back to Top
        </button>
      )}
    </main>
  );
}

/* ---------- Small UI helpers ---------- */
function Section({ title, items = [] }) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
      <h2 className="text-xl md:text-2xl font-semibold text-[#005BAC] mb-2">
        {title}
      </h2>
      <ul className="list-disc list-inside space-y-1">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function SimpleSection({ title, children }) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm">
      <h2 className="text-xl md:text-2xl font-semibold text-[#005BAC] mb-2">
        {title}
      </h2>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}
