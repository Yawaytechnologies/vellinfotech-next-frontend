"use client";
import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

const courses = [
  {
    title: "Java",
    image: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
  },
  {
    title: "Python",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
  },
  { title: "SoftwareTesting", image: "https://cdn.simpleicons.org/cypress" },
  {
    title: "SeleniumTesting",
    image: "https://cdn.simpleicons.org/selenium/43B02A",
  },

  {
    title: "FullStackDevelopement",
    image: "https://cdn-icons-png.flaticon.com/512/16990/16990193.png",
  },
  {
    title: "DataScience",
    image: "https://cdn-icons-png.flaticon.com/512/8649/8649623.png",
  },
  {
    title: "AwsTraining",
    image: "https://cdn-icons-png.flaticon.com/512/11518/11518934.png",
  },
  {
    title: "DevOps",
    image: "https://cdn-icons-png.flaticon.com/512/5271/5271250.png",
  },
  {
    title: "HardwareNetworking",
    image: "https://cdn-icons-png.flaticon.com/512/4828/4828804.png",
  },
  {
    title: "EtlTesting",
    image: "https://cdn-icons-png.flaticon.com/512/16813/16813580.png",
  },
  {
    title: "CyberSecurity",
    image: "https://cdn-icons-png.flaticon.com/512/7700/7700417.png",
  },
  {
    title: "BusinessAnalytics",
    image: "https://cdn-icons-png.flaticon.com/512/8955/8955275.png",
  },
  { title: "Sap", image: "https://cdn.simpleicons.org/sap" },
  {
    title: "SalesForce",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968914.png",
  },
  {
    title: "ServiceNow",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ServiceNow_logo.svg/512px-ServiceNow_logo.svg.png",
  },
  {
    title: "DataScienceAi",
    image: "https://cdn-icons-png.flaticon.com/512/8100/8100831.png",
  },
  {
    title: "GenerativeAI",
    image: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
  {
    title: "Plsql",
    image: "https://cdn-icons-png.flaticon.com/512/603/603201.png",
  },
  {
    title: "Sql",
    image: "https://cdn-icons-png.flaticon.com/512/4248/4248449.png",
  },
  {
    title: "BigDataDeveloper",
    image: "https://cdn-icons-png.flaticon.com/512/4354/4354656.png",
  },
  {
    title: "RPA",
    image: "https://cdn-icons-png.flaticon.com/512/8001/8001983.png",
  },
];

export default function AllJobCoursesSection() {
  return (
    <section
      id="popular-courses"
      aria-labelledby="popular-courses__heading"
      className="bg-[#eaf5fd] py-16 px-4"
    >
      <div className="max-w-7xl mx-auto text-center mb-10">
        {/* H2 for section */}
        <h2
          id="popular-courses__heading"
          className="text-3xl md:text-4xl font-extrabold text-[#003c6a] mb-4"
        >
          Popular Courses
        </h2>
        <p className="text-gray-700 text-lg">
          We present to you the most popular courses recommended by experts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <Link
            href={`/all-courses/${encodeURIComponent(course.title)}`}
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-16 h-16 mb-4">
              <img
                src={course.image}
                alt={`${course.title} course icon`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* H3 for card title */}
            <h3 className="text-md font-bold text-gray-800 text-center">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500">Online | Offline</p>

            <div
              className="flex items-center justify-center gap-1 text-sm mt-2 text-gray-600"
              aria-label="Learners count"
            >
              <FaUserGraduate className="text-gray-500" />
              <span>
                {Math.floor(Math.random() * 5000 + 10000).toLocaleString()}+
                Learners
              </span>
            </div>

            <div
              className="flex justify-center items-center mt-1 text-yellow-500"
              aria-label="5 star rating"
            >
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
