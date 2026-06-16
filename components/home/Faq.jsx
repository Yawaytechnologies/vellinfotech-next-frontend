'use client';
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  { question: "We Readily Embrace Newness", answer: <>Technology evolves relentlessly—and faster than ever. To stay ahead, learn with Vel InfoTech. We offer classroom and live-online programs in AWS, Python, Data Science, AI, Machine Learning, Hadoop, DevOps, Angular, Java, Oracle, SAS, and more. Our syllabus tracks current industry needs so you become job-ready without spending years in a traditional tech school.</> },
  { question: "We cater to your learning needs, irrespective of your location", answer: <>Vel InfoTech provides flexible online options for students and working professionals worldwide. Wherever you are, high-quality training reaches you.</> },
  { question: "You receive training from a great faculty", answer: <>Our trainers are seasoned professionals and subject-matter experts who love teaching and mentoring.</> },
  { question: "What kind of learning experience will I get?", answer: <>Enroll to experience cross-disciplinary, project-driven learning with real-world use cases and mentor feedback.</> },
  { question: "Study on your own schedule", answer: <>Learn at your pace with self-study resources and attend live sessions when it suits you. Access materials anytime.</> },
  { question: "Who can benefit?", answer: <>Students, recent graduates, career changers, and working professionals can all gain from our industry-aligned courses.</> },
  { question: "Why Vel InfoTech?", answer: <>We combine a market-driven curriculum, experienced mentors, and hands-on projects to help you advance your IT career.</> },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const toggleIdx = (idx) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section id="faqs" aria-labelledby="faqs__heading" className="py-12 bg-[#f9fafb]">
      <div className="max-w-3xl mx-auto px-4">
        {/* H2 */}
        <h2 id="faqs__heading" className="text-3xl font-bold text-center mb-2 text-gray-800">
          What Makes Us Different
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We build real, job-ready capability through practical training and guided projects.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded shadow">
              {/* H3 wraps the toggle */}
              <h3 className="text-lg">
                <button
                  onClick={() => toggleIdx(idx)}
                  className={`w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none ${
                    openIdx === idx ? "font-bold" : "font-semibold"
                  } text-gray-800`}
                  aria-expanded={openIdx === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span>{faq.question}</span>
                  <span>
                    {openIdx === idx ? <FaMinus className="text-gray-400" /> : <FaPlus className="text-gray-400" />}
                  </span>
                </button>
              </h3>
              {openIdx === idx && (
                <div id={`faq-panel-${idx}`} className="px-6 pb-6 text-gray-700 text-base animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
