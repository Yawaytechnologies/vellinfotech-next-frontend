'use client'
import React from "react";
import Link from "next/link";
import { FaGlobe, FaCalendarAlt, FaTag } from "react-icons/fa";

const InterviewCard = ({ title, date, description, route, image }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-4 w-full">
        {/* Image - mobile on top, desktop on right */}
        {image && (
  <div className="relative w-full md:w-[65%] -mx-4 sm:mx-0 rounded-none md:rounded-lg overflow-hidden">
    <img
      src={image}
      alt={title}
      className="w-full h-[150px]  md:h-[260px] object-cover rounded-none md:rounded-lg"
    />
    <div className="absolute top-3 left-3 bg-black/40 px-3 py-1 rounded z-10">
      <h2 className="text-white text-base md:text-sm font-bold text-left">
        {title}
      </h2>
    </div>
  </div>
)}


        {/* Content */}
        <div className="flex-1 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a2650] mb-2">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <FaGlobe className="text-blue-700" /> Global
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-700" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <FaTag className="text-blue-700" /> Interview
            </span>
          </div>

          <p className="text-gray-700 mb-4 text-base">{description}</p>

          <Link
            href={route}
            className="inline-block bg-[#005BAC] hover:bg-blue-800 text-white font-semibold text-sm px-5 py-2 rounded transition"
          >
            Read More &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
